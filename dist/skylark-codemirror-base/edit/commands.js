/**
 * skylark-codemirror-base - A version of codemirror 5.45 core library that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-codemirror-base/
 * @license MIT
 */
define(["./deleteNearSelection","../display/operations","../display/scrolling","../input/movement","../line/pos","../line/spans","../line/utils_line","../model/selection","../model/selection_updates","../util/misc","../util/bidi"],function(e,t,o,n,i,l,r,d,c,s,a){"use strict";function h(e,t){let o=r.getLine(e.doc,t),i=l.visualLine(o);return i!=o&&(t=r.lineNo(i)),n.endOfLine(!0,e,i,t,1)}function g(e,t){let o=h(e,t.line),n=r.getLine(e.doc,o.line),l=a.getOrder(n,e.doc.direction);if(!l||0==l[0].level){let e=Math.max(0,n.text.search(/\S/)),l=t.line==o.line&&t.ch<=e&&t.ch;return i.Pos(o.line,l?0:e,o.sticky)}return o}return{commands:{selectAll:c.selectAll,singleSelection:e=>e.setSelection(e.getCursor("anchor"),e.getCursor("head"),s.sel_dontScroll),killLine:t=>e.deleteNearSelection(t,e=>{if(e.empty()){let o=r.getLine(t.doc,e.head.line).text.length;return e.head.ch==o&&e.head.line<t.lastLine()?{from:e.head,to:i.Pos(e.head.line+1,0)}:{from:e.head,to:i.Pos(e.head.line,o)}}return{from:e.from(),to:e.to()}}),deleteLine:t=>e.deleteNearSelection(t,e=>({from:i.Pos(e.from().line,0),to:i.clipPos(t.doc,i.Pos(e.to().line+1,0))})),delLineLeft:t=>e.deleteNearSelection(t,e=>({from:i.Pos(e.from().line,0),to:e.from()})),delWrappedLineLeft:t=>e.deleteNearSelection(t,e=>{let o=t.charCoords(e.head,"div").top+5;return{from:t.coordsChar({left:0,top:o},"div"),to:e.from()}}),delWrappedLineRight:t=>e.deleteNearSelection(t,e=>{let o=t.charCoords(e.head,"div").top+5,n=t.coordsChar({left:t.display.lineDiv.offsetWidth+100,top:o},"div");return{from:e.from(),to:n}}),undo:e=>e.undo(),redo:e=>e.redo(),undoSelection:e=>e.undoSelection(),redoSelection:e=>e.redoSelection(),goDocStart:e=>e.extendSelection(i.Pos(e.firstLine(),0)),goDocEnd:e=>e.extendSelection(i.Pos(e.lastLine())),goLineStart:e=>e.extendSelectionsBy(t=>h(e,t.head.line),{origin:"+move",bias:1}),goLineStartSmart:e=>e.extendSelectionsBy(t=>g(e,t.head),{origin:"+move",bias:1}),goLineEnd:e=>e.extendSelectionsBy(t=>(function(e,t){let o=r.getLine(e.doc,t),i=l.visualLineEnd(o);i!=o&&(t=r.lineNo(i));return n.endOfLine(!0,e,o,t,-1)})(e,t.head.line),{origin:"+move",bias:-1}),goLineRight:e=>e.extendSelectionsBy(t=>{let o=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:o},"div")},s.sel_move),goLineLeft:e=>e.extendSelectionsBy(t=>{let o=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:0,top:o},"div")},s.sel_move),goLineLeftSmart:e=>e.extendSelectionsBy(t=>{let o=e.cursorCoords(t.head,"div").top+5,n=e.coordsChar({left:0,top:o},"div");return n.ch<e.getLine(n.line).search(/\S/)?g(e,t.head):n},s.sel_move),goLineUp:e=>e.moveV(-1,"line"),goLineDown:e=>e.moveV(1,"line"),goPageUp:e=>e.moveV(-1,"page"),goPageDown:e=>e.moveV(1,"page"),goCharLeft:e=>e.moveH(-1,"char"),goCharRight:e=>e.moveH(1,"char"),goColumnLeft:e=>e.moveH(-1,"column"),goColumnRight:e=>e.moveH(1,"column"),goWordLeft:e=>e.moveH(-1,"word"),goGroupRight:e=>e.moveH(1,"group"),goGroupLeft:e=>e.moveH(-1,"group"),goWordRight:e=>e.moveH(1,"word"),delCharBefore:e=>e.deleteH(-1,"char"),delCharAfter:e=>e.deleteH(1,"char"),delWordBefore:e=>e.deleteH(-1,"word"),delWordAfter:e=>e.deleteH(1,"word"),delGroupBefore:e=>e.deleteH(-1,"group"),delGroupAfter:e=>e.deleteH(1,"group"),indentAuto:e=>e.indentSelection("smart"),indentMore:e=>e.indentSelection("add"),indentLess:e=>e.indentSelection("subtract"),insertTab:e=>e.replaceSelection("\t"),insertSoftTab:e=>{let t=[],o=e.listSelections(),n=e.options.tabSize;for(let i=0;i<o.length;i++){let l=o[i].from(),r=s.countColumn(e.getLine(l.line),l.ch,n);t.push(s.spaceStr(n-r%n))}e.replaceSelections(t)},defaultTab:e=>{e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:e=>t.runInOp(e,()=>{let t=e.listSelections(),o=[];for(let n=0;n<t.length;n++){if(!t[n].empty())continue;let l=t[n].head,c=r.getLine(e.doc,l.line).text;if(c)if(l.ch==c.length&&(l=new i.Pos(l.line,l.ch-1)),l.ch>0)l=new i.Pos(l.line,l.ch+1),e.replaceRange(c.charAt(l.ch-1)+c.charAt(l.ch-2),i.Pos(l.line,l.ch-2),l,"+transpose");else if(l.line>e.doc.first){let t=r.getLine(e.doc,l.line-1).text;t&&(l=new i.Pos(l.line,1),e.replaceRange(c.charAt(0)+e.doc.lineSeparator()+t.charAt(t.length-1),i.Pos(l.line-1,t.length-1),l,"+transpose"))}o.push(new d.Range(l,l))}e.setSelections(o)}),newlineAndIndent:e=>t.runInOp(e,()=>{let t=e.listSelections();for(let o=t.length-1;o>=0;o--)e.replaceRange(e.doc.lineSeparator(),t[o].anchor,t[o].head,"+input");t=e.listSelections();for(let o=0;o<t.length;o++)e.indentLine(t[o].from().line,null,!0);o.ensureCursorVisible(e)}),openLine:e=>e.replaceSelection("\n","start"),toggleOverwrite:e=>e.toggleOverwrite()}}});
//# sourceMappingURL=../sourcemaps/edit/commands.js.map
