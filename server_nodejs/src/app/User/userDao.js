// 데이터베이스랑 직접 소통하는 애

// 이름으로 회원 조회
async function selectUserName(connection, name){
    // `` 얘는 백틱이라 불림. Grave. 한글일 때 option + 하거나 영어일땐 그냥 물결표 누르면 됨
    const selectUserNameQuery = `SELECT u_id FROM USER WHERE u_name = ?;`;
    const [nameRows] = await connection.query(selectUserNameQuery, name);
    return nameRows;
}

// id로 거주지 조회
async function selectUserRegion(connection, uid){
    const selectUserRegionQuery = `SELECT u_region FROM USER WHERE u_id = ?;`;
    const [regionRows] = await connection.query(selectUserRegionQuery, uid);
    return regionRows;
}

// 거주지로 지원사업 조회
async function selectUserSupport(connection, region){
    const selectUserSupportQuery = `
        SELECT s_title, s_image, s_period, s_link, s_region, s_recruit
        FROM SUPPORT
        WHERE s_region = ? OR s_region = "전국";`;
    
    const [supportRows] = await connection.query(selectUserSupportQuery, region);
    return supportRows;
}

// 거주지로 쉼터 조회
async function selectUserShelter(connection, region){
    const selectUserShelterQuery = `
        SELECT st_region, st_name, st_addr, st_phonenum
        FROM SHELTER
        WHERE st_region = ?;`;
    
    const [shelterRows] = await connection.query(selectUserShelterQuery, region);
    return shelterRows;
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

// 쉼터 생성
async function insertShelterInfo(connection, insertShelterInfoParams){
    const insertShelterInfoQuery = `
                            INSERT INTO SHELTER(st_region, st_name, st_addr, st_phonenum)
                            VALUES (?,?,?,?);                    
        `;
    
    const insertShelterInfoRow = await connection.query(
        insertShelterInfoQuery,
        insertShelterInfoParams
    );

    return insertShelterInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams){
    const selectUserPasswordQuery = `
        SELECT u_pw
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

async function selectAllShelters(connection){
    const getSheltersQuery = `SELECT * FROM SHELTER;`;
    const [shelterRows] = await connection.query(getSheltersQuery);
    return shelterRows;
}

module.exports = {
    selectUserName,
    selectUserSupport,
    selectUserShelter,
    insertUserInfo,
    insertShelterInfo,
    selectUserPassword,
    selectUserAccount,
    selectUserRegion,
    updateRefreshToken,
    selectUserNickname,
    selectAllShelters
}