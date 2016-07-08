var appEnv = process.env.NODE_ENV || 'development';
var appConfig = require('./config');
appConfig = appConfig[appEnv] || appConfig.development;

module.exports = {
    __ENV: {
        localhost: appEnv === 'localhost',
        development: appEnv === 'development',
        testing: appEnv === 'testing',
        staging: appEnv === 'staging',
        bt: appEnv === 'bt',
        production: appEnv === 'production'
    },
    __API_URL: JSON.stringify(appConfig.API_URL),
    __BROKER_URL: JSON.stringify(appConfig.BROKER_URL),
    __SIGNALR_URL: JSON.stringify(appConfig.SIGNALR_URL),
    __PRODUCT_ID: JSON.stringify(appConfig.PRODUCT_ID)
};
