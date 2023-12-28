// 호출 시 -> index.js -> Router
// URL 지정하는 곳
// index.js -> userRoute.js -> userController.js -> userProvider.js -> userDao.js
module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
     
    // 1. 유저 생성 (회원가입) API
     app.post('/app/users', user.postUsers);

     // 2. 유저 로그인 API ( + 지원사업 return )
     app.post('/app/login', user.login);

     // 3. 쉼터 정보 API 
     app.get('/app/shelters', user.getShelters);

};
