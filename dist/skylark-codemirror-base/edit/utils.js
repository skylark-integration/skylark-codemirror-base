/**
 * skylark-codemirror-base - A version of codemirror 5.45 core library that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror-base/
 * @license MIT
 */
define(["../measurement/position_measurement"],function(e){"use strict";return{themeChanged:function(s){s.display.wrapper.className=s.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+s.options.theme.replace(/(^|\s)\s*/g," cm-s-"),e.clearCaches(s)}}});
//# sourceMappingURL=../sourcemaps/edit/utils.js.map
