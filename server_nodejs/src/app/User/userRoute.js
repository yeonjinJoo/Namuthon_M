// 호출 시 -> index.js -> Router
// URL 지정하는 곳
// index.js -> userRoute.js -> userController.js -> userProvider.js -> userDao.js
module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
     
    // 1. 유저 생성 (회원가입) API
     app.post('/app/users', user.postUsers);

    // 2. 유저 조회 API ( + 검색 )
     app.get('/app/users', user.getUsers);

     // 3. 유저 로그인 API
     app.post('/app/login', user.login);

};
