const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

 /**
  * API No. 1
  * API Name : 유저 생성 (회원가입) API
  * [POST] /app/users
  */
 exports.postUsers = async function(req, res){
    /**
     * Body : name, password, nickname, region
     */
    const {name, password, nickname, region} = req.body;

    // 비밀번호 빈 값 체크
    if(!password){
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    }

    // 비밀번호 길이 체크
    if(password.length < 6 || password.length > 20){
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    }

    // 이름 빈 값 체크
    if(!name){
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    }

    // 이름 길이 체크
    if(name.length > 20){
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
    }

    const signUpResponse = await userService.createUser(
        name,
        password,
        nickname,
        region
    );

    return res.send(signUpResponse);

 }

 //After 로그인 인증 방법 (JWT)
 /**
  * API NO. 2
  * API Name : 로그인 API ( + 맞춤 지원사업 Return )
  * [POST] /app/login
  * body : nickname, password
  */
 exports.login = async function(req, res){
    const {nickname, password} = req.body;

    // nickname, password 형식적 Validation

    const signInResponse = await userService.postSignIn(nickname, password);

    return res.send(signInResponse);
 }

 /**
  * API NO.3
  * API Name : 맞춤 쉼터 Return API
  * [GET] /app/shelters
  * body : nickname
  */
 exports.getShelters = async function(req, res){
    const {nickname} = req.body;

    const shelterResponse = await userService.getUserShelters(nickname);

    return res.send(shelterResponse);
 }