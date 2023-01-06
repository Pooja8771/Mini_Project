module.exports = function(app){
    var userHandlers =require('../controller/userController.js');
    app.route('/auth/register').post(userHandlers.register);
    app.route('/auth/sign_in').post(userHandlers.sign_in);
    app.route('/ profile').post(userHandlers.loginRequired,userHandlers.get_profile);

    
}

// login required to check whether we have recieved a login or sign in request