'use strict';

require('angular/angular');
require('angular-mocks');

window.beforeEach = global.beforeEach;
window.afterEach = global.afterEach;

global.angular = window.angular;

global._ = window._ = require('lodash');
global.jQuery = window.jQuery = require('jquery');

global.$ = window.$ = global.jQuery;

require('ngStorage');
require('../src/assets/javascripts/jquery.signalR.min');
require('angular-signalr-hub');


let globals = require('../config/globals');
globals.__API_URL = JSON.parse(globals.__API_URL);
globals.__BROKER_URL = JSON.parse(globals.__BROKER_URL);
globals.__SIGNALR_URL = JSON.parse(globals.__SIGNALR_URL);
globals.__PRODUCT_ID = JSON.parse(globals.__PRODUCT_ID);

_.extend(window, globals);
_.extend(global, globals);

module.exports = {
    inject: window.angular.mock.inject,
    module: window.angular.mock.module,
    dump: window.angular.mock.dump
};

