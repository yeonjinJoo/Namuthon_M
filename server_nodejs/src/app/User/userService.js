const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const jwtMake = require("../../../config/jwtUtils"); 

// Service: Create, Update, Delete 비즈니스 로직 처리
// 오류 확인도 하는 듯

exports.createUser = async function(name, password, nickname, region){
    try{
        // 이름 중복 확인
        const nameRows = await userProvider.nameCheck(name);

        if(nameRows.length > 0){
            return errResponse(baseResponse.SIGNUP_REDUNDANT_NAME);
        }

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        console.log(hashedPassword);

        const insertUserInfoParams = [name, hashedPassword, nickname, region];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`);
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch(err){
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.postSignIn = async function(nickname, password){
    try{
        // 닉네임 여부 확인
        const nicknameRows = await userProvider.nicknameCheck(nickname);
        console.log(nicknameRows);
        if(nicknameRows.length < 1){
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
        }

        const selectNickname = nicknameRows[0].u_nickname;

        // 비밀번호 확인
        const hashedPassword = await crypto.createHash("sha512")
            .update(password)
            .digest("hex");
        
        console.log({selectNickname, hashedPassword});

        const selectUserPasswordParams = [selectNickname, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        console.log(passwordRows);

        if(passwordRows[0].u_pw != hashedPassword){
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        const userInfoRows = await userProvider.accountCheck(nickname);

        let uid = userInfoRows[0].u_id;

        // change
        const regionRows = await userProvider.regionCheck(uid);
        let region = regionRows[0].u_region;

        const supportList = await userProvider.retrieveSupportList(region);

        let token = jwtMake.makeToken(uid);

        console.log("token : " + token);

        let refreshToken = jwtMake.makeRefreshToken();
        console.log("refresh token : "+ refreshToken);

        const updateRefreshTokenParams = [refreshToken, uid];

        const connection = await pool.getConnection(async (conn) => conn);

        const refreshTokenResult = await userDao.updateRefreshToken(connection, updateRefreshTokenParams);

        connection.release();

        return response(baseResponse.SUCCESS, supportList);
        // return response(baseResponse.SUCCESS, {'u_id' : userInfoRows[0].uid, 'jwt-accessToken' : token, 'jwt-refreshToken' : refreshToken});

    }catch(err){
        logger.error(`App - postSignIn Service error\n: ${err.message}\n ${JSON.stringify(err)}}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
