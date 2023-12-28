const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    // RDS 엔드포인트
    host: 'db-namu.c9iouwsogcyd.ap-southeast-2.rds.amazonaws.com',
    user: 'root',
    port: '3306',
    password: 'Yeonjin8609!',
    database: 'db_namu'
});

module.exports = {
    pool: pool
};