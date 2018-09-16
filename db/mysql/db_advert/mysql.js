/*
    author     : bak chulhyong
    created    : 2018 - 09 - 16
    modified   : 2018 - 09 - 16
    description: mysql
*/
const mysql = require('mysql');

const EQUIP = require('../../../common/equip.js');
const LOG   = require('../../../common/log.js');

let g_dbpool    = null;
let g_intervals = [];

const ERR = {
    NO_DATA : {
        code : 'WN_NO_DATA',
    },
};

module.exports.ERR = ERR;

function keepAlive()
{
    g_dbpool.getConnection(function( err, connection ) {
        if( err ) {
            if( connection != null ) {
                LOG.err(null, "### DB(Pool) onKeepAlived failed... [" + connection.threadId + "]");
                const interval_obj = g_intervals[connection.threadId];
                clearInterval(interval_obj);
                connection.release();
            } else {
                LOG.err(null, "### DB(Pool) onKeepAlived failed... [", connection, "]");
            }
			return;
		}
        connection.ping();
        connection.release();
    });
}

module.exports.connect = function( dbname, callback ) {
    let dbcfg = EQUIP.getConfig(dbname);
	if( dbcfg == null ) {
		LOG.err(null, "### DB[" + dbname + "] CONFIG ERROR");
        callback('CONFIG ERROR');
		return;
	}

    if( g_dbpool != null ) {
        LOG.log(null, "### DB[" + dbname + "] Already Connected");
        callback(null);
        return;
    }

    g_dbpool = mysql.createPool(dbcfg);
	if( g_dbpool == null ) {
		LOG.err(null, "### DB[" + dbname + "] CreatePool Error");
        callback('CreatePool Error');
		return;
	}
	LOG.log(null, "### DB[" + dbname + "] Connecting...");

	// Event OnConnection
    g_dbpool.on('connection', function(connection) {
		LOG.log(null, "### DB[" + dbname + "] Connect Success! [" + connection.threadId + "]");
		const interval_obj = setInterval(keepAlive, dbcfg.heartbit * 1000);
        g_intervals[connection.threadId] = interval_obj;
    });

	// Event OnError
    g_dbpool.on('error', function(err) {
		LOG.err(null, "### DB[" + dbname + "] Connect Failed...");
    });

	// Limit Connection Count
	let ccnt = dbcfg.connectionLimit;
	if( ccnt == null || ccnt < 5 )
		ccnt = 5;
	ccnt = Math.round(ccnt * 30 / 100);
	LOG.log(null, "### DB[" + dbname + "] Prepare Count [" + ccnt + "]");

    let cpos;
	for( cpos=0; cpos< ccnt; cpos++ ) {
		g_dbpool.getConnection(function(err, connection) {
            if( err != null ) {
                LOG.err(null, "### DB[" + dbname + "] getConnection Error [" + err + "]");
            } else {
                LOG.log(null, "### DB[" + dbname + "] getConnection OK! [" + connection.threadId + "]");
            }
            if( connection != null )
                connection.release();
		});
	}

    g_dbpool.getConnection(function(err, connection) {
        if( err != null ) {
            LOG.err(null, "### DB[" + dbname + "] getConnection Error.");
        } else {
            LOG.log(null, "### DB[" + dbname + "] getConnection OK! [" + connection.threadId + "]");
        }
        if( connection != null )
            connection.release();
        callback(err);
    });

	// HeartBit Check...
	if( dbcfg.heartbit == null || dbcfg.heartbit <= 30 )
        dbcfg.heartbit = 30;
	LOG.log(null, "### DB[" + dbname + "] KeepAlived... [" + dbcfg.heartbit + " sec]");
}

function getError(sql, qerr, rows)
{
    var rerr = qerr;
    if( rerr != null ) {
        LOG.err(null, 'SQL Error:' + rerr + '[' + sql + ']');
    }
    else
    if( rows == null ) {
        LOG.log(null, 'SQL rows null');
        rerr = { code: 'WN_NO_DATA' };
    }
    else
    if( rows != null ) {
        if( rows.length <= 0 ) {
            rerr = ERR.NO_DATA;
        } else
        if( rows[0] == null ) {
            if( (sql.indexOf('UPDATE ') < 0) &&
                (sql.indexOf('INSERT ') < 0) &&
                (sql.indexOf('DELETE ') < 0)
            ) {
                LOG.err(null, '# EXCEPTION # sql null-record:'
                    + rows
                    + '########################### ignore updaet,insert,delete...'
                );
            }
        }
    }
    return rerr;
}
module.exports.executeQuery = function(dbconn, owner, sql)
{
	var query_obj = new Promise( function(resolved, rejected) {
        if( sql == null ) {
            var values = {};
            values.self = owner;
            values.rows = null;
            values.err  = ERR.NO_DATA;
            resolved( values );
            return;
        } else
        if( dbconn == null ) {
    		g_dbpool.getConnection(function(err, connection) {
    			if( err ) {
    				LOG.err(owner, 'Mysql Connection Error:' + err);

                    var values = {};
                    values.self = owner;
                    values.rows = rows;
                    values.err  = err;
    				resolved( values );
    				return;
    			}
    			LOG.log(owner, "SQL ConnectionID [" + connection.threadId + "]");
                connection.query(sql, function(err, rows) {
                    connection.release();

                    var values = {};
                    values.self = owner;
                    values.rows = rows;
                    values.err  = getError(sql, err, rows);
                    resolved(values);
                });
            });
        } else {
            dbconn.query(sql, function(err, rows) {
                var values = {};
                values.self = owner;
                values.rows = rows;
                values.err  = getError(sql, err, rows);
                resolved(values);
            });
        }
    });
    return query_obj;
}

module.exports.beginTransaction = function(owner)
{
    var query_obj = new Promise( function(resolved, rejected) {
		g_dbpool.getConnection(function(err, connection) {
			if( err ) {
				LOG.err(owner, 'MYSQL Connection Error:' + err);
				resolved( null );
				return;
			}
			LOG.log(owner, "SQL ConnectionID [" + connection.threadId + "]");

            connection.beginTransaction(function(berr) {
                if( berr ) {
                    LOG.err(owner, 'MYSQL BeginTransaction Error:' + err);
                    connection.release();
                    resolved( null );
                    return;
                }
                var values = {};
                values.self = owner;
                values.err  = berr;
                values.conn = connection;
                resolved(values);
            });
        });
    });
    return query_obj;
}

module.exports.endTransaction = function(values, err)
{
    if( values != null ) {
        err = err || values.err;
        if( err != null ) {
            LOG.err(null, '[' + values.conn.threadId + '] MYSQL BeginTransaction Rollback:' + err);
            values.conn.rollback();
        } else {
            LOG.log(null, '[' + values.conn.threadId + '] MYSQL BeginTransaction Commit');
            values.conn.commit();
        }
        values.conn.release();
    }
}
