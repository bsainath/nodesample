var loginservice = require('./services/loginservice');
exports.routing = function(app){

    app.get('/login',loginservice.login);
    app.get('/logincheck',loginservice.logincheck);
}