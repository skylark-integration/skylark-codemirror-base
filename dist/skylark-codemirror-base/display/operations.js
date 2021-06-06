/**
 * skylark-codemirror-base - A version of codemirror 5.45 core library that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror-base/
 * @license MIT
 */
define(["../line/pos","../line/spans","../measurement/position_measurement","../util/event","../util/dom","../util/operation_group","./focus","./scrollbars","./selection","./scrolling","./update_display","./update_lines"],function(e,t,l,o,r,i,n,s,a,p,c,u){"use strict";let d=0;function f(e){e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:0,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++d},i.pushOperation(e.curOp)}function h(e){let t=e.curOp;t&&i.finishOperation(t,e=>{for(let t=0;t<e.ops.length;t++)e.ops[t].cm.curOp=null;!function(e){let t=e.ops;for(let e=0;e<t.length;e++)y(t[e]);for(let e=0;e<t.length;e++)l=t[e],l.updatedDisplay=l.mustUpdate&&c.updateDisplayIfNeeded(l.cm,l.update);var l;for(let e=0;e<t.length;e++)m(t[e]);for(let e=0;e<t.length;e++)g(t[e]);for(let e=0;e<t.length;e++)T(t[e])}(e)})}function y(e){let l=e.cm,o=l.display;c.maybeClipScrollbars(l),e.updateMaxLine&&t.findMaxLine(l),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<o.viewFrom||e.scrollToPos.to.line>=o.viewTo)||o.maxLineChanged&&l.options.lineWrapping,e.update=e.mustUpdate&&new c.DisplayUpdate(l,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}function m(e){let t=e.cm,o=t.display;e.updatedDisplay&&u.updateHeightsInViewport(t),e.barMeasure=s.measureForScrollbars(t),o.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=l.measureChar(t,o.maxLine,o.maxLine.text.length).left+3,t.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(o.scroller.clientWidth,o.sizer.offsetLeft+e.adjustWidthTo+l.scrollGap(t)+t.display.barWidth),e.maxScrollLeft=Math.max(0,o.sizer.offsetLeft+e.adjustWidthTo-l.displayWidth(t))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=o.input.prepareSelection())}function g(e){let t=e.cm;null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<t.doc.scrollLeft&&p.setScrollLeft(t,Math.min(t.display.scroller.scrollLeft,e.maxScrollLeft),!0),t.display.maxLineChanged=!1);let l=e.focus&&e.focus==r.activeElt();e.preparedSelection&&t.display.input.showSelection(e.preparedSelection,l),(e.updatedDisplay||e.startHeight!=t.doc.height)&&s.updateScrollbars(t,e.barMeasure),e.updatedDisplay&&c.setDocumentHeight(t,e.barMeasure),e.selectionChanged&&a.restartBlink(t),t.state.focused&&e.updateInput&&t.display.input.reset(e.typing),l&&n.ensureFocus(e.cm)}function T(t){let l=t.cm,r=l.display,i=l.doc;if(t.updatedDisplay&&c.postUpdateDisplay(l,t.update),null==r.wheelStartX||null==t.scrollTop&&null==t.scrollLeft&&!t.scrollToPos||(r.wheelStartX=r.wheelStartY=null),null!=t.scrollTop&&p.setScrollTop(l,t.scrollTop,t.forceScroll),null!=t.scrollLeft&&p.setScrollLeft(l,t.scrollLeft,!0,!0),t.scrollToPos){let o=p.scrollPosIntoView(l,e.clipPos(i,t.scrollToPos.from),e.clipPos(i,t.scrollToPos.to),t.scrollToPos.margin);p.maybeScrollWindow(l,o)}let n=t.maybeHiddenMarkers,s=t.maybeUnhiddenMarkers;if(n)for(let e=0;e<n.length;++e)n[e].lines.length||o.signal(n[e],"hide");if(s)for(let e=0;e<s.length;++e)s[e].lines.length&&o.signal(s[e],"unhide");r.wrapper.offsetHeight&&(i.scrollTop=l.display.scroller.scrollTop),t.changeObjs&&o.signal(l,"changes",l,t.changeObjs),t.update&&t.update.finish()}return{startOperation:f,endOperation:h,runInOp:function(e,t){if(e.curOp)return t();f(e);try{return t()}finally{h(e)}},operation:function(e,t){return function(){if(e.curOp)return t.apply(e,arguments);f(e);try{return t.apply(e,arguments)}finally{h(e)}}},methodOp:function(e){return function(){if(this.curOp)return e.apply(this,arguments);f(this);try{return e.apply(this,arguments)}finally{h(this)}}},docMethodOp:function(e){return function(){let t=this.cm;if(!t||t.curOp)return e.apply(this,arguments);f(t);try{return e.apply(this,arguments)}finally{h(t)}}}}});
//# sourceMappingURL=../sourcemaps/display/operations.js.map
