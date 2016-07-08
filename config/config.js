'use strict';

module.exports = {
  localhost: {
    API_URL: 'http://stocks.tradency.com/BUMAPI/',
    BROKER_URL: 'http://si.tradencytests.com/b78/invastsec/',
    SIGNALR_URL: 'http://srqa.Tradency.com:8081/signalr/',
    PRODUCT_ID: 6
  },
  development: {
    API_URL: 'http://roboxws.tradency.com/',
    BROKER_URL: 'https://robox.tradency.com/B183/robofx_v3/',
    SIGNALR_URL: 'http://Roboxpush.Tradency.com/signalr/',
    PRODUCT_ID: 6
  },
  testing: {
    API_URL: '//ws.tradencytests.com/SI_WS/',
    BROKER_URL: '',
    SIGNALR_URL: '//srqa.Tradency.com:8081/signalr/',
    PRODUCT_ID: 6
  },
  staging: {
    API_URL: '//stagesi.tradency.com/SI_WS/',
    BROKER_URL: '',
    SIGNALR_URL: '//srstg.tradency.com:8081/signalr/',
    PRODUCT_ID: 6
  },
  bt: {
    API_URL: '//TestRoboFXWS.Tradency.com/',
    BROKER_URL: '',
    SIGNALR_URL: '//Testrobofxpush.tradency.com/signalr/',
    PRODUCT_ID: 6
  },
  production: {
    API_URL: '//roboxws.tradency.com/',
    BROKER_URL: '',
    SIGNALR_URL: '//Roboxpush.Tradency.com/signalr/',
    PRODUCT_ID: 6
  },
  mobile: {
    API_URL: 'http://roboxws.tradency.com/',
    BROKER_URL: 'https://robox.tradency.com/B187/FXDD_Robox/',
    SIGNALR_URL: 'http://Roboxpush.Tradency.com/signalr/',
    PRODUCT_ID: 6
  }
};