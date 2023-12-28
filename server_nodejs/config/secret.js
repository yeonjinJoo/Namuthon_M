// const crypto = require("crypto");
// const { stringify } = require("querystring");

// async function makeJwtsecret(){
//     var jwtsecret = await crypto.createHash("sha512")
//         .update(password)
//         .digest("hex");
    
//     return `${jwtsecret}`;
// }

// 해당 KEY 값들을 꼭 바꿔서 사용하기!
// 반드시 .gitignore에 추가하기!
module.exports = {
    // makeJwtsecret,
    'jwtsecret' :  '4cf4eda798a9e16ecda171b4b6089a158b0463973520876f0827291342436d52ed38e0cf4d7b24aa947c0b34289f1bc984215f9ba9e0cb8d6a81effa47004dd1',
};