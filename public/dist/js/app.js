//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('dist/js/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//render

exports.default = function () {
    //navs
    var navItems = $('\n        <div class="container-fluid">\n            <div class="navbar-header">\n                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n                <span class="sr-only">Toggle navigation</span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                </button>\n                <strong class="navbar-brand">\n                Aura Explorer\n                <small>Statistics</small>\n                </strong>\n            </div>\n            <div id="navbar" class="navbar-collapse collapse">\n                <ul class="nav navbar-nav navbar-right">\n                    <li><a href="index.html">Statistics</a></li>\n                    <li><a href="controls.html">Controls</a></li>\n                    <li><a href="config.html">Config</a></li>\n                </ul>\n            </div>\n        </div>\n    ').prependTo('#nav');

    //search box
    var searchForm = $('\n        <form class="navbar-form navbar-right">\n            <input id="headerSearchBox" type="text" class="form-control" placeholder="Search...">\n        </form>\n    ').submit(function (e) {
        var keyword = $.trim($(e.target).find('input').val()).toLowerCase();
        location.href = _util2.default.getQueryUrl('' + keyword);
        return false;
    }).appendTo('#navbar').find('input').popover({
        trigger: 'focus',
        title: 'Matching Component',
        placement: 'bottom',
        content: "Most control names are of form <namespace>:<controlName>"
    });

    //scroll to top
    var btnScrollToTop = $('<button id="btnScrollToTop" class="btn btn-primary">^</button>').click(function () {
        return $(document).scrollTop(0);
    }).appendTo('#navbar');
}; //utils