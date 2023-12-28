// 데이터베이스 다루는 애한테 이런거 너가해줘! 요청하기
const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

exports.retrieveUserList = async function(email){
    if(!email){
        const connection = await pool.getConnection(async(conn) => conn);
        const userListResult = await userDao.selectUser(connection);
        connection.release();

        return userListResult;
    }
    else{
        const connection = await pool.getConnection(async(conn) => conn);
        const userListResult = await userDao.selectUserEmail(connection, email);
        connection.release();

        return userListResult;
    }
};

exports.retrieveFollowerList = async function(uid){
    const connection = await pool.getConnection(async(conn) => conn);
    const followerListResult = await userDao.selectFollowerId(connection, uid);
    connection.release();

    return followerListResult;
}

exports.retrieveFollowingList = async function(uid){
    const connection = await pool.getConnection(async(conn) => conn);
    const followingListResult = await userDao.selectFollowingId(connection, uid);
    connection.release();

    return followingListResult;
}

exports.emailCheck = async function(email){
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return emailCheckResult;
};

exports.nameCheck = async function(name){
    const connection = await pool.getConnection(async (conn) => conn);
    const nameCheckResult = await userDao.selectUserName(connection, name);
    connection.release();

    return nameCheckResult;
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

exports.followingCheck = async function (followingInfoParams){
    const connection = await pool.getConnection(async (conn) => conn);
    const followingCheckResult = await userDao.selectFollowingExist(
        connection,
        followingInfoParams
    );
    connection.release();
    return followingCheckResult;
}

exports.accountCheck = async function(email){
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectUserAccount(connection, email);
    connection.release();

    return userAccountResult;
};
