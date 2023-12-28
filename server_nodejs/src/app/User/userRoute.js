// 호출 시 -> index.js -> Router
// URL 지정하는 곳
// index.js -> userRoute.js -> userController.js -> userProvider.js -> userDao.js
module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
     app.get('/app/test', user.getTest);
     
    // 1. 유저 생성 (회원가입) API
     app.post('/app/users', user.postUsers);

    // 2. 유저 조회 API ( + 검색 )
     app.get('/app/users', user.getUsers);

     // 3. 유저 로그인 API
     app.post('/app/login', user.login);

     // 4. 유저 팔로워 조회 API
     app.get('/app/followers', user.getFollowers);

     // 5. 유저 팔로잉 조회 API
     app.get('/app/followings', user.getFollowings);

     // 6. 유저 팔로잉하기 API
     app.post('/app/followings', user.makeFollowing);

};
