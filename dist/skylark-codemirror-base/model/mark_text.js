/**
 * skylark-codemirror-base - A version of codemirror 5.45 core library that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror-base/
 * @license MIT
 */
define(["../util/dom","../util/event","../display/operations","../line/pos","../line/utils_line","../measurement/position_measurement","../line/saw_special_spans","../line/spans","../util/misc","../util/operation_group","../measurement/widgets","../display/view_tracking","./document_data","./history","./selection_updates"],function(e,i,t,n,l,r,s,a,o,d,h,c,p,u,m){"use strict";let g=0;class f{constructor(e,i){this.lines=[],this.type=i,this.doc=e,this.id=++g}clear(){if(this.explicitlyCleared)return;let e=this.doc.cm,n=e&&!e.curOp;if(n&&t.startOperation(e),i.hasHandler(this,"clear")){let e=this.find();e&&d.signalLater(this,"clear",e.from,e.to)}let s=null,o=null;for(let i=0;i<this.lines.length;++i){let t=this.lines[i],n=a.getMarkedSpanFor(t.markedSpans,this);e&&!this.collapsed?c.regLineChange(e,l.lineNo(t),"text"):e&&(null!=n.to&&(o=l.lineNo(t)),null!=n.from&&(s=l.lineNo(t))),t.markedSpans=a.removeMarkedSpan(t.markedSpans,n),null==n.from&&this.collapsed&&!a.lineIsHidden(this.doc,t)&&e&&l.updateLineHeight(t,r.textHeight(e.display))}if(e&&this.collapsed&&!e.options.lineWrapping)for(let i=0;i<this.lines.length;++i){let t=a.visualLine(this.lines[i]),n=a.lineLength(t);n>e.display.maxLineLength&&(e.display.maxLine=t,e.display.maxLineLength=n,e.display.maxLineChanged=!0)}null!=s&&e&&this.collapsed&&c.regChange(e,s,o+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,e&&m.reCheckSelection(e.doc)),e&&d.signalLater(e,"markerCleared",e,this,s,o),n&&t.endOperation(e),this.parent&&this.parent.clear()}find(e,i){let t,r;null==e&&"bookmark"==this.type&&(e=1);for(let s=0;s<this.lines.length;++s){let o=this.lines[s],d=a.getMarkedSpanFor(o.markedSpans,this);if(null!=d.from&&(t=n.Pos(i?o:l.lineNo(o),d.from),-1==e))return t;if(null!=d.to&&(r=n.Pos(i?o:l.lineNo(o),d.to),1==e))return r}return t&&{from:t,to:r}}changed(){let e=this.find(-1,!0),i=this,n=this.doc.cm;e&&n&&t.runInOp(n,()=>{let t=e.line,s=l.lineNo(e.line),o=r.findViewForLine(n,s);if(o&&(r.clearLineMeasurementCacheFor(o),n.curOp.selectionChanged=n.curOp.forceUpdate=!0),n.curOp.updateMaxLine=!0,!a.lineIsHidden(i.doc,t)&&null!=i.height){let e=i.height;i.height=null;let n=h.widgetHeight(i)-e;n&&l.updateLineHeight(t,t.height+n)}d.signalLater(n,"markerChanged",n,this)})}attachLine(e){if(!this.lines.length&&this.doc.cm){let e=this.doc.cm.curOp;e.maybeHiddenMarkers&&-1!=o.indexOf(e.maybeHiddenMarkers,this)||(e.maybeUnhiddenMarkers||(e.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)}detachLine(e){if(this.lines.splice(o.indexOf(this.lines,e),1),!this.lines.length&&this.doc.cm){let e=this.doc.cm.curOp;(e.maybeHiddenMarkers||(e.maybeHiddenMarkers=[])).push(this)}}}function k(r,h,L,x,M){if(x&&x.shared)return function(e,i,t,l,r){(l=o.copyObj(l)).shared=!1;let s=[k(e,i,t,l,r)],a=s[0],d=l.widgetNode;return p.linkedDocs(e,e=>{d&&(l.widgetNode=d.cloneNode(!0)),s.push(k(e,n.clipPos(e,i),n.clipPos(e,t),l,r));for(let i=0;i<e.linked.length;++i)if(e.linked[i].isParent)return;a=o.lst(s)}),new y(s,a)}(r,h,L,x,M);if(r.cm&&!r.cm.curOp)return t.operation(r.cm,k)(r,h,L,x,M);let C=new f(r,M),O=n.cmp(h,L);if(x&&o.copyObj(x,C,!1),O>0||0==O&&!1!==C.clearWhenEmpty)return C;if(C.replacedWith&&(C.collapsed=!0,C.widgetNode=e.eltP("span",[C.replacedWith],"CodeMirror-widget"),x.handleMouseEvents||C.widgetNode.setAttribute("cm-ignore-events","true"),x.insertLeft&&(C.widgetNode.insertLeft=!0)),C.collapsed){if(a.conflictingCollapsedRange(r,h.line,h,L,C)||h.line!=L.line&&a.conflictingCollapsedRange(r,L.line,h,L,C))throw new Error("Inserting collapsed marker partially overlapping an existing one");s.seeCollapsedSpans()}C.addToHistory&&u.addChangeToHistory(r,{from:h,to:L,origin:"markText"},r.sel,NaN);let S,H=h.line,w=r.cm;if(r.iter(H,L.line+1,e=>{w&&C.collapsed&&!w.options.lineWrapping&&a.visualLine(e)==w.display.maxLine&&(S=!0),C.collapsed&&H!=h.line&&l.updateLineHeight(e,0),a.addMarkedSpan(e,new a.MarkedSpan(C,H==h.line?h.ch:null,H==L.line?L.ch:null)),++H}),C.collapsed&&r.iter(h.line,L.line+1,e=>{a.lineIsHidden(r,e)&&l.updateLineHeight(e,0)}),C.clearOnEnter&&i.on(C,"beforeCursorEnter",()=>C.clear()),C.readOnly&&(s.seeReadOnlySpans(),(r.history.done.length||r.history.undone.length)&&r.clearHistory()),C.collapsed&&(C.id=++g,C.atomic=!0),w){if(S&&(w.curOp.updateMaxLine=!0),C.collapsed)c.regChange(w,h.line,L.line+1);else if(C.className||C.startStyle||C.endStyle||C.css||C.attributes||C.title)for(let e=h.line;e<=L.line;e++)c.regLineChange(w,e,"text");C.atomic&&m.reCheckSelection(w.doc),d.signalLater(w,"markerAdded",w,C)}return C}i.eventMixin(f);class y{constructor(e,i){this.markers=e,this.primary=i;for(let i=0;i<e.length;++i)e[i].parent=this}clear(){if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(let e=0;e<this.markers.length;++e)this.markers[e].clear();d.signalLater(this,"clear")}}find(e,i){return this.primary.find(e,i)}}return i.eventMixin(y),{TextMarker:f,markText:k,SharedTextMarker:y,findSharedMarkers:function(e){return e.findMarks(n.Pos(e.first,0),e.clipPos(n.Pos(e.lastLine())),e=>e.parent)},copySharedMarkers:function(e,i){for(let t=0;t<i.length;t++){let l=i[t],r=l.find(),s=e.clipPos(r.from),a=e.clipPos(r.to);if(n.cmp(s,a)){let i=k(e,s,a,l.primary,l.primary.type);l.markers.push(i),i.parent=l}}},detachSharedMarkers:function(e){for(let i=0;i<e.length;i++){let t=e[i],n=[t.primary.doc];p.linkedDocs(t.primary.doc,e=>n.push(e));for(let e=0;e<t.markers.length;e++){let i=t.markers[e];-1==o.indexOf(n,i.doc)&&(i.parent=null,t.markers.splice(e--,1))}}}}});
//# sourceMappingURL=../sourcemaps/model/mark_text.js.map
