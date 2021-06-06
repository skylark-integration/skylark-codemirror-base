/**
 * skylark-codemirror-base - A version of codemirror 5.45 core library that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror-base/
 * @license MIT
 */
define(["../util/operation_group","../display/scrolling","../line/pos","../line/utils_line","../util/event","../util/misc","./history","./selection"],function(e,n,i,l,t,c,r,s){"use strict";function o(e,n,l,t){if(t){let t=e.anchor;if(l){let e=i.cmp(n,t)<0;e!=i.cmp(l,t)<0?(t=n,n=l):e!=i.cmp(n,l)<0&&(n=l)}return new s.Range(t,n)}return new s.Range(l||n,n)}function a(e,n,i){u(e,n,i),r.addSelectionToHistory(e,e.sel,e.cm?e.cm.curOp.id:NaN,i)}function u(e,l,c){(t.hasHandler(e,"beforeSelectionChange")||e.cm&&t.hasHandler(e.cm,"beforeSelectionChange"))&&(l=function(e,n,l){let c={ranges:n.ranges,update:function(n){this.ranges=[];for(let l=0;l<n.length;l++)this.ranges[l]=new s.Range(i.clipPos(e,n[l].anchor),i.clipPos(e,n[l].head))},origin:l&&l.origin};return t.signal(e,"beforeSelectionChange",e,c),e.cm&&t.signal(e.cm,"beforeSelectionChange",e.cm,c),c.ranges!=n.ranges?s.normalizeSelection(e.cm,c.ranges,c.ranges.length-1):n}(e,l,c)),f(e,g(e,l,c&&c.bias||(i.cmp(l.primary().head,e.sel.primary().head)<0?-1:1),!0)),c&&!1===c.scroll||!e.cm||n.ensureCursorVisible(e.cm)}function f(n,i){i.equals(n.sel)||(n.sel=i,n.cm&&(n.cm.curOp.updateInput=1,n.cm.curOp.selectionChanged=!0,t.signalCursorActivity(n.cm)),e.signalLater(n,"cursorActivity",n))}function g(e,n,i,l){let t;for(let c=0;c<n.ranges.length;c++){let r=n.ranges[c],o=n.ranges.length==e.sel.ranges.length&&e.sel.ranges[c],a=h(e,r.anchor,o&&o.anchor,i,l),u=h(e,r.head,o&&o.head,i,l);(t||a!=r.anchor||u!=r.head)&&(t||(t=n.ranges.slice(0,c)),t[c]=new s.Range(a,u))}return t?s.normalizeSelection(e.cm,t,n.primIndex):n}function m(e,n,c,r,s){let o=l.getLine(e,n.line);if(o.markedSpans)for(let l=0;l<o.markedSpans.length;++l){let a=o.markedSpans[l],u=a.marker;if((null==a.from||(u.inclusiveLeft?a.from<=n.ch:a.from<n.ch))&&(null==a.to||(u.inclusiveRight?a.to>=n.ch:a.to>n.ch))){if(s&&(t.signal(u,"beforeCursorEnter"),u.explicitlyCleared)){if(o.markedSpans){--l;continue}break}if(!u.atomic)continue;if(c){let l,t=u.find(r<0?1:-1);if((r<0?u.inclusiveRight:u.inclusiveLeft)&&(t=d(e,t,-r,t&&t.line==n.line?o:null)),t&&t.line==n.line&&(l=i.cmp(t,c))&&(r<0?l<0:l>0))return m(e,t,n,r,s)}let a=u.find(r<0?-1:1);return(r<0?u.inclusiveLeft:u.inclusiveRight)&&(a=d(e,a,r,a.line==n.line?o:null)),a?m(e,a,n,r,s):null}}return n}function h(e,n,l,t,c){let r=t||1,s=m(e,n,l,r,c)||!c&&m(e,n,l,r,!0)||m(e,n,l,-r,c)||!c&&m(e,n,l,-r,!0);return s||(e.cantEdit=!0,i.Pos(e.first,0))}function d(e,n,t,c){return t<0&&0==n.ch?n.line>e.first?i.clipPos(e,i.Pos(n.line-1)):null:t>0&&n.ch==(c||l.getLine(e,n.line)).text.length?n.line<e.first+e.size-1?i.Pos(n.line+1,0):null:new i.Pos(n.line,n.ch+t)}return{extendRange:o,extendSelection:function(e,n,i,l,t){null==t&&(t=e.cm&&(e.cm.display.shift||e.extend)),a(e,new s.Selection([o(e.sel.primary(),n,i,t)],0),l)},extendSelections:function(e,n,i){let l=[],t=e.cm&&(e.cm.display.shift||e.extend);for(let i=0;i<e.sel.ranges.length;i++)l[i]=o(e.sel.ranges[i],n[i],null,t);a(e,s.normalizeSelection(e.cm,l,e.sel.primIndex),i)},replaceOneSelection:function(e,n,i,l){let t=e.sel.ranges.slice(0);t[n]=i,a(e,s.normalizeSelection(e.cm,t,e.sel.primIndex),l)},setSimpleSelection:function(e,n,i,l){a(e,s.simpleSelection(n,i),l)},setSelectionReplaceHistory:function(e,n,i){let l=e.history.done,t=c.lst(l);t&&t.ranges?(l[l.length-1]=n,u(e,n,i)):a(e,n,i)},setSelection:a,setSelectionNoUndo:u,reCheckSelection:function(e){f(e,g(e,e.sel,null,!1))},skipAtomic:h,selectAll:function(e){e.setSelection(i.Pos(e.firstLine(),0),i.Pos(e.lastLine()),c.sel_dontScroll)}}});
//# sourceMappingURL=../sourcemaps/model/selection_updates.js.map
