//Developed by Sy Le. Coprighted by Salesforce.com 2015
'use strict';

var _util = require('./dist/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//render
_util2.default.render(function () {
    //navs
    var navItems = $('\n        <div id="navbar" class="navbar-collapse collapse">\n            <ul class="nav navbar-nav navbar-right">\n                <li><a href="index.html">Statistics</a></li>\n                <li><a href="controls.html">Controls</a></li>\n                <li><a href="config.html">Config</a></li>\n            </ul>\n        </div>\n    ').appendTo('#nav > div.container-fluid');

    //search box
    var searchForm = $('\n\t\t<form class="navbar-form navbar-right">\n        \t<input id="headerSearchBox" type="text" class="form-control" placeholder="Search...">\n    \t</form>\n    ').submit(function (e) {
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
}); //utils