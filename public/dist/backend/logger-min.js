"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _colors=require("colors"),_colors2=_interopRequireDefault(_colors);exports["default"]={error:function(){console.error.apply(null,arguments)},info:function(){parseInt(process.env.debug)>=1&&console.log.apply(this,arguments)},debug:function(){parseInt(process.env.debug)>=2&&console.log.apply(this,arguments)},log:function(){console.log.apply(this,arguments)}};