"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_fs=require("fs"),_fs2=_interopRequireDefault(_fs),_restClient=require("./dist/restClient"),_restClient2=_interopRequireDefault(_restClient),_util=require("./dist/util"),_util2=_interopRequireDefault(_util),AboutPage=React.createClass({displayName:"AboutPage",render:function(){return React.createElement("div",{className:"row"},React.createElement("div",{className:"col-sm-12"},React.createElement("div",{className:"mb15"},React.createElement("strong",null,"Aura-Explorer Version")," : ",this.props.packageInfo.version),React.createElement("div",{className:"mb15"},React.createElement("strong",null,"Explorer Config"),React.createElement("pre",null,JSON.stringify(this.props.explorerConfig,null,2))),React.createElement("div",{className:"mb15"},React.createElement("strong",null,"Aura Explorer JSON"),React.createElement("pre",null,this.props.auraExplorerJson)),React.createElement("div",null,React.createElement("strong",null,"Aura Upstream Pom.xml"),React.createElement("pre",null,this.props.auraStreamPom))))},selectNameSpace:function(keyword){location.href=_util2["default"].getQueryUrl(keyword+":")},selectControl:function(keyword){location.href=_util2["default"].getQueryUrl(""+keyword)}});_util2["default"].render(function(){var packageInfo=_restClient2["default"].getPackageInfo(),explorerConfig=_restClient2["default"].getExplorerConfig(),auraExplorerJson=_restClient2["default"].getAuraExplorerJson(),auraStreamPom=_restClient2["default"].getAuraStreamPom();ReactDOM.render(React.createElement(AboutPage,{packageInfo:packageInfo,explorerConfig:explorerConfig,auraExplorerJson:auraExplorerJson,auraStreamPom:auraStreamPom}),document.querySelector("#body"))});