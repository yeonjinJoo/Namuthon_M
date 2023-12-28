// 데이터베이스 다루는 애한테 이런거 너가해줘! 요청하기
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

exports.retrieveSupportList = async function(region){
    const connection = await pool.getConnection(async(conn) => conn);
    const supportListResult = await userDao.selectUserSupport(connection, region);
    connection.release();

    return supportListResult;
}

exports.retrieveShelterList = async function(region){
    const connection = await pool.getConnection(async(conn) => conn);
    const shelterListResult = await userDao.selectUserShelter(connection, region);
    connection.release();

    return shelterListResult;
}

exports.nameCheck = async function(name){
    const connection = await pool.getConnection(async (conn) => conn);
    const nameCheckResult = await userDao.selectUserName(connection, name);
    connection.release();

    return nameCheckResult;
}

exports.shelterCheck = async function(){
    const connection = await pool.getConnection(async (conn) => conn);
    const shelterCheckResult = await userDao.selectAllShelters(connection);
    connection.release();

    return shelterCheckResult;
}

exports.passwordCheck = async function (selectUserPasswordParams){
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
};

exports.accountCheck = async function(nickname){
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectUserAccount(connection, nickname);
    connection.release();

    return userAccountResult;
};

exports.nicknameCheck = async function(nickname){
    const connection = await pool.getConnection(async (conn) => conn);
    const nicknameCheckResult = await userDao.selectUserNickname(connection, nickname);
    connection.release();

    return nicknameCheckResult;
}

exports.regionCheck = async function(uid){
    const connection = await pool.getConnection(async (conn) => conn);
    const regionCheckResult = await userDao.selectUserRegion(connection, uid);
    connection.release();

    return regionCheckResult;
}