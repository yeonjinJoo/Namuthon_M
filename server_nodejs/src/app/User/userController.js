const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
 exports.getTest = async function (req, res) {
     return res.send(response(baseResponse.SUCCESS))
 };

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

 /**
  * API NO. 4
  * API Name : 팔로워 조회 API
  * [GET] /api/followers
  */
 exports.getFollowers = async function(req, res){
    /**
     * Query String : name
     */
    const name = req.query.name;

    if(!name){
        return res.send(response(baseResponse.USER_NAME_TO_FIND_EMPTY));
    }
    else{
        const userListByName = await userProvider.nameCheck(name);
        const uid = userListByName[0].userId;

        const followerListById = await userProvider.retrieveFollowerList(uid);
        return res.send(response(baseResponse.SUCCESS, followerListById));
    }
 }

  /**
  * API NO. 5
  * API Name : 팔로잉 조회 API
  * [GET] /app/followings
  */
  exports.getFollowings = async function(req, res){
    /**
     * Query String : name
     */
    const name = req.query.name;

    if(!name){
        return res.send(response(baseResponse.USER_NAME_TO_FIND_EMPTY));
    }
    else{
        const userListByName = await userProvider.nameCheck(name);
        const uid = userListByName[0].userId;

        const followingListById = await userProvider.retrieveFollowingList(uid);
        return res.send(response(baseResponse.SUCCESS, followingListById));
    }
 }

 /**
  * API NO.6
  * API Name : 유저 팔로잉하기 API
  * [POST] /app/followings
  */
 exports.makeFollowing = async function(req, res){
    /**
     * Query String : myName, otherName
     */
    const myName = req.query.myName;
    const otherName = req.query.otherName;

    if(!myName || !otherName){
        return res.send(response(baseResponse.USER_NAME_TO_FIND_EMPTY));
    }
    else{
        const userListByName = await userProvider.nameCheck(myName);
        const otherListByName = await userProvider.nameCheck(otherName);

        // User doesn't exist
        if(userListByName.length < 1 || otherListByName.length < 1){
            return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
        }
    
        const myId = userListByName[0].userId;
        const otherId = otherListByName[0].userId;
    
        const followingResponse = await userService.createFollowing(
            myId,
            otherId
        );
    
        return res.send(followingResponse);
    }
 }