// 데이터베이스랑 직접 소통하는 애

// 모든 유저 조회
async function selectUser(connection){
    // `` 얘는 백틱이라 불림. Grave. 한글일 때 option + 하거나 영어일땐 그냥 물결표 누르면 됨
    const selectUserListQuery = `SELECT u_name, u_email FROM USER;`;
    const [userRows] = await connection.query(selectUserListQuery);

    return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email){
    const selectUserEmailQuery = `SELECT u_name, u_email FROM USER WHERE u_email = ?;`;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}

// 이름으로 회원 조회
async function selectUserName(connection, name){
    const selectUserNameQuery = `SELECT u_id FROM USER WHERE u_name = ?;`;
    const [nameRows] = await connection.query(selectUserNameQuery, name);
    return nameRows;
}

// userId의 팔로워 조회
async function selectFollowerId(connection, uid){
    const selectFollowerQuery = `SELECT U.u_name from USER as U
                                    JOIN FOLLOWER as F
                                    WHERE F.userId = ? AND U.userId = F.followerId;`;
    
    const [followerRows] = await connection.query(selectFollowerQuery, uid);
    return followerRows;
}

// userId의 팔로잉 조회
async function selectFollowingId(connection, uid){
    const selectFollowingQuery = `SELECT U.u_name from USER as U
                                    JOIN FOLLOWING as F
                                    WHERE F.userId = ? AND U.userId = F.followingId;`;

    const [followingRows] = await connection.query(selectFollowingQuery, uid);
    return followingRows;
}

// 팔로잉 존재하는지 조회
async function selectFollowingExist(connection,followingInfoParams){
    const selectFollowingExistQuery = `SELECT userId FROM FOLLOWING WHERE userId = ? AND followingId = ?;`;

    const [followingExistRows] = await connection.query(selectFollowingExistQuery, followingInfoParams);
    return followingExistRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams){
    const insertUsertInfoQuery = `
                        INSERT INTO USER(u_name, u_pw, u_nickname, u_region)
                        VALUES (?, ?, ?, ?);
        `;
    const insertUserInfoRow = await connection.query(
        insertUsertInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// 팔로잉 생성
async function insertFollowingInfo(connection, followingInfoParams){
    // 팔로잉 Query
    const insertFollowingInfoQuery = `
                        INSERT INTO FOLLOWING(userId, followingId)
                        VALUES (?, ?);`;
    
    // other의 팔로워 업데이트 Query
    const insertFollowerInfoQuery = `
                        INSERT INTO FOLLOWER(followerId, userId)
                        VALUES (?, ?);`;

    const insertFollowingInfoRow = await connection.query(insertFollowingInfoQuery, followingInfoParams);
    const insertFollowerInfoRow = await connection.query(insertFollowerInfoQuery, followingInfoParams);

    return {
        insertFollowingInfoRow,
        insertFollowerInfoRow
    };
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams){
    const selectUserPasswordQuery = `
        SELECT u_name, u_pw
        FROM USER
        WHERE u_nickname = ? AND u_pw = ?;`;
    
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );

    return selectUserPasswordRow;
}

// user id값 가져오기
async function selectUserAccount(connection, nickname){
    const selectUserAccountQuery = `
        SELECT u_id
        FROM USER
        WHERE u_nickname = ?;`;

    const selectUserAccounRow = await connection.query(
        selectUserAccountQuery,
        nickname
    );
    return selectUserAccounRow[0];
}

// refresh token db 저장
async function updateRefreshToken(connection, updateRefreshTokenParams){
    const updateRefreshTokenQuery = `
        UPDATE USER
        SET u_token = ?
        WHERE u_id = ?;`;

    const updateRefreshTokenRow = await connection.query(
        updateRefreshTokenQuery,
        updateRefreshTokenParams
    );

    return updateRefreshTokenRow;
}

async function selectUserNickname(connection, nickname){
    const selectUserNameQuery = `SELECT u_id, u_nickname FROM USER WHERE u_nickname = ?;`;
    const [nicknameRows] = await connection.query(selectUserNameQuery, nickname);
    return nicknameRows;
}

module.exports = {
    selectUser,
    selectUserEmail,
    selectUserName,
    selectFollowerId,
    selectFollowingId,
    selectFollowingExist,
    insertUserInfo,
    insertFollowingInfo,
    selectUserPassword,
    selectUserAccount,
    updateRefreshToken,
    selectUserNickname
}