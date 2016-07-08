var appEnv = process.env.NODE_ENV || 'development';
var appConfig = require('./config/config');
appConfig = appConfig[appEnv] || appConfig.development;

module.exports = {
    __ENV: {
        development: appEnv === 'development',
        production: appEnv === 'production',
        test: appEnv === 'testing',
        mobile: appEnv === 'mobile'
    },
    __API_URL: JSON.stringify(appConfig.API_URL),
    __BROKER_URL: JSON.stringify(appConfig.BROKER_URL),
    __SIGNALR_URL: JSON.stringify(appConfig.SIGNALR_URL),
    __PRODUCT_ID: JSON.stringify(appConfig.PRODUCT_ID)
};