"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _typeof(obj){return obj&&"undefined"!=typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj}Object.defineProperty(exports,"__esModule",{value:!0});var _lodash=require("lodash"),_lodash2=_interopRequireDefault(_lodash),_util=require("dist/util"),_util2=_interopRequireDefault(_util),KeyValTableComponent=React.createClass({displayName:"KeyValTableComponent",render:function(){var _props=this.props,objects=_props.objects,keyLabel=_props.keyLabel,valueLabel=_props.valueLabel,emptyMsg=_props.emptyMsg,clickToViewDetail=_props.clickToViewDetail,showHeader=_props.showHeader,showIndex=_props.showIndex,domKey="KeyValTableComponent-"+keyLabel+"-"+valueLabel;if(0===_lodash2["default"].size(objects))return React.createElement("div",{key:domKey},emptyMsg);var _ret=function(){var rowCount=0,domTableRows=_lodash2["default"].chain(_lodash2["default"].keys(objects)).sort().map(function(objKey){var objVal=objects[objKey],domCellText=clickToViewDetail===!0?React.createElement("a",{href:_util2["default"].getQueryUrl(objKey)},objKey):objKey,rowIdxCell=showIndex===!0?React.createElement("td",null,++rowCount):null;return React.createElement("tr",{key:"KeyValTableComponent-"+keyLabel+"-"+valueLabel+"-"+objKey},rowIdxCell,React.createElement("td",null,domCellText),React.createElement("td",null,objVal))}).value(),headerIdxCell=showIndex===!0?React.createElement("th",null):null,domTableHeaders=showHeader===!0?React.createElement("thead",null,React.createElement("tr",null,headerIdxCell,React.createElement("th",null,keyLabel),React.createElement("th",null,valueLabel))):null;return{v:React.createElement("table",{key:domKey,className:"table table-bordered table-hover table-condensed table-striped"},domTableHeaders,React.createElement("tbody",null,domTableRows))}}();return"object"===("undefined"==typeof _ret?"undefined":_typeof(_ret))?_ret.v:void 0},shouldComponentUpdate:function(nextProps,nextState){return!0}});exports["default"]=KeyValTableComponent;