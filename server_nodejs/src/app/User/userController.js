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

 /**
  * API NO. 2
  * API Name : 유저 조회 API ( + 이메일로 검색 조회 )
  * [GET] /app/users
  */
 exports.getUsers = async function (req, res){

    /**
     * Query String : email
     */
    const email = req.query.email;

    if(!email){
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    }else{
        // 특정 유저 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
 }

 //After 로그인 인증 방법 (JWT)
 /**
  * API NO. 3
  * API Name : 로그인 API
  * [POST] /api/login
  * body : email, password
  */
 exports.login = async function(req, res){
    const {nickname, password} = req.body;

    // email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(nickname, password);

    return res.send(signInResponse);
 }