const jwt = require('jsonwebtoken');
const secret_config = require('./secret');

const makeToken = (Object) =>{
    let token = jwt.sign(
        {
            userId: Object,
        }, // 토큰의 내용 ( payload )
        secret_config.jwtsecret, // 비밀키
        {
            expiresIn: "2m",
            subject: "userInfo",
        } // 유효 기간 2분
    );
    return token;
};

const makeRefreshToken = () => {
    let token = jwt.sign(
        {},
        secret_config.jwtsecret, // 비밀키
        {
            expiresIn: "10d",
            subject: "userInfo",
        } // 유효 기간
    );
    return token;
};

module.exports = {
    makeToken,
    makeRefreshToken
};