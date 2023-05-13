var Ce=Object.defineProperty;var Se=(y,i,e)=>i in y?Ce(y,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):y[i]=e;var q=(y,i,e)=>(Se(y,typeof i!="symbol"?i+"":i,e),e);import{i as be,a as ke,B as x,T as Re,b as Ee,d as Ie,e as Le,f as Te,h as Me,C as ne,j as Pe,k as oe,l as xe}from"./ui-a241b49c.js";import{F as Ae,c as Oe,Q as De,X as $e,f as Ne,K as L}from"./graphic-22b3ab0b.js";import{d as G,c as Ue,b as X,l as m,q as T,f as v,B as w,K as d,A as fe,L as R,M as We,N as K,t as A,s as p,F as Fe,O as He,I as D,J as $,y as se,w as ge,P as qe,Q as Ke,R as Be,S as Ve,U as Ye}from"./vue-d713a192.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))t(c);new MutationObserver(c=>{for(const f of c)if(f.type==="childList")for(const s of f.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function e(c){const f={};return c.integrity&&(f.integrity=c.integrity),c.referrerPolicy&&(f.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?f.credentials="include":c.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function t(c){if(c.ep)return;c.ep=!0;const f=e(c);fetch(c.href,f)}})();const Ze=""+new URL("b1-17081d0a.png",import.meta.url).href,Ge=""+new URL("b2-a3fadbfe.png",import.meta.url).href,Xe=""+new URL("b3-c9265a32.png",import.meta.url).href,je=""+new URL("r1-1779894b.png",import.meta.url).href,Qe=""+new URL("s1-af5e0d63.jpg",import.meta.url).href,Je=""+new URL("s2-ec3d0360.jpg",import.meta.url).href,ze=""+new URL("s3-885f8f2a.jpg",import.meta.url).href,et=G({__name:"CropperStencil",props:{image:{},coordinates:{},transitions:{},stencilCoordinates:{}},emits:["move","move-end","resize","resize-end"],setup(y,{emit:i}){const e=y,t=be(),c=Ue(()=>{const{height:h,width:g,left:C,top:k}=e.stencilCoordinates,M={width:`${g}px`,height:`${h}px`,transform:`translate(${C}px, ${k}px)`,transition:"none"};return e.transitions&&e.transitions.enabled&&(M.transition=`${e.transitions.time}ms ${e.transitions.timingFunction}`),M});function f(h){i("move",h)}function s(){i("move-end")}function b(h){const C=h.shift().left;i("resize",new $e({left:C,right:C,top:C,bottom:C},{preserveRatio:!0}))}function n(){i("resize-end")}return X(()=>{}),(h,g)=>(m(),T("div",{class:"circle_stencil",style:fe(c.value)},[v(d(Ae),{class:"circle_stencil__handler",onDrag:b,onDragEnd:n},{default:w(()=>[v(d(t))]),_:1}),v(d(De),{onMove:f,onMoveEnd:s,class:"circle_stencil__crop_area"},{default:w(()=>[v(d(Oe),{class:"circle_stencil__preview",image:h.image,coordinates:h.coordinates,width:h.stencilCoordinates.width,height:h.stencilCoordinates.height,transitions:h.transitions},null,8,["image","coordinates","width","height","transitions"])]),_:1})],4))}});const tt={class:"cropper_modal__row cropper_modal__row--first"},at={class:"cropper_modal__row cropper_modal__row--last"},nt=G({__name:"CropperModal",props:{avatarDataUrl:{},isModalShow:{type:Boolean}},emits:["passAvatar","closeModal"],setup(y,{emit:i}){const e=y,t=ke(),c=R(null),{isModalShow:f}=We(e),s=R(!1);function b(){const n=c.value.getResult().canvas;n&&(i("passAvatar",n.toDataURL()),i("closeModal"))}return X(()=>{window.addEventListener("resize",()=>{var h;const n=document.body.clientWidth;(h=document.querySelector(".tiny-modal__box"))==null||h.style.setProperty("left",`calc(${n>=1008?30:n>=641?20:10}vw + .5rem)`)})}),K(f,n=>{s.value=n}),(n,h)=>(m(),A(d(Re),{class:"cropper_modal",modelValue:s.value,"onUpdate:modelValue":h[1]||(h[1]=g=>s.value=g),showHeader:!1},{default:w(()=>[p("div",tt,[p("div",{class:"cropper_modal__close_button",onClick:h[0]||(h[0]=g=>i("closeModal"))},[v(d(t))])]),v(d(Ne),{class:"cropper",ref_key:"cropper_instance",ref:c,src:n.avatarDataUrl,stencilProps:{aspectRatio:1/1},stencilComponent:et},null,8,["src"]),p("div",at,[v(d(x),{class:"crop_button",onClick:b,round:""},{default:w(()=>[Fe("Crop")]),_:1})])]),_:1},8,["modelValue"]))}});const ie=(y,i)=>{const e=y.__vccOpts||y;for(const[t,c]of i)e[t]=c;return e},ot=ie(nt,[["__scopeId","data-v-a923cc70"]]),ye=He("konva_node",{state:()=>({avatar_node:"",background_node:"",shape_node:{type:"",color:""},is_trigger_add_shape_node:!1,is_trigger_save_image:!1,is_trigger_relocate:!1})});function we(y,i,e,t=""){const c="#393646";switch(y){case"star":return new L.Star({numPoints:5,outerRadius:e,innerRadius:e/2,fill:i,stroke:c,strokeWidth:2,draggable:!0,name:t,offsetX:-e,offsetY:-e});case"heart":return new L.Shape({width:e*2,height:e*2,fill:i,stroke:c,strokeWidth:2,draggable:!0,name:t,sceneFunc:(s,b)=>{const n=e/18;let h=0,g=0,C=0;s.beginPath(),s.translate(e,e/1.05),s.scale(1,-1);for(let k=0;k<20;k+=.25)h=k/Math.PI,g=n*(16*Math.sin(h)**3),C=n*(13*Math.cos(h)-5*Math.cos(2*h)-2*Math.cos(3*h)-Math.cos(4*h)),s.lineTo(g,C);s.closePath(),s.fillStrokeShape(b)}});case"seven":return new L.Text({text:"7",width:e*2,height:e*2,fontSize:e*2,fill:i,stroke:c,strokeWidth:2,draggable:!0,name:t,fontFamily:"sans-serif",align:"center",padding:e/4});case"fire":return new L.Shape({width:e*2,height:e*2,fill:i,stroke:c,strokeWidth:2,draggable:!0,name:t,sceneFunc:(s,b)=>{const n=e*2;s.beginPath(),s.moveTo(n/2,0),s.quadraticCurveTo(n*7/16,n/2,n*3/8,n/2),s.quadraticCurveTo(n*5/16,n/2,n/4,n/4),s.quadraticCurveTo(n/8,n*5/8,n/8,n*3/4),s.quadraticCurveTo(n/8,n*15/16,n/2,n),s.quadraticCurveTo(n*7/8,n*15/16,n*7/8,n*3/4),s.quadraticCurveTo(n*7/8,n*5/8,n*3/4,n/4),s.quadraticCurveTo(n*11/16,n/2,n*5/8,n/2),s.quadraticCurveTo(n*9/16,n/2,n/2,0),s.closePath(),s.fillStrokeShape(b)}});case"moon":return new L.Shape({width:e*2,height:e*2,fill:i,stroke:c,strokeWidth:2,draggable:!0,name:t,sceneFunc:(s,b)=>{const n=Math.sqrt(2)/2,h=e;s.beginPath();for(let g=Math.PI/4;g<=Math.PI*7/4;g+=.1)s.lineTo(h*(1+Math.cos(g)),h*(1-Math.sin(g)));for(let g=Math.PI*3/2;g>=Math.PI/2;g-=.1)s.lineTo((n+1+n*Math.cos(g))*h,h*(1-n*Math.sin(g)));s.closePath(),s.fillStrokeShape(b)}});case"halo":return new L.Ring({outerRadius:e,innerRadius:e/2,fill:i,stroke:c,strokeWidth:2,draggable:!0,name:t,offsetX:-e,offsetY:-e})}return null}const re=y=>(qe("data-v-1d0fe641"),y=y(),Ke(),y),st={class:"aside"},lt={class:"aside__container"},it={class:"upload_button"},rt={class:"general_list background_list"},ct=["src"],ut=re(()=>p("span",null,"Meta",-1)),dt={class:"upload_button"},_t={class:"general_list avatar_list"},pt=["src"],ht=re(()=>p("span",null,"777",-1)),ft={class:"general_list shape_color_list"},vt={class:"general_list shape_list"},gt=["src"],mt={class:"upload_button"},yt={class:"general_list background_list"},wt=["src"],Ct=re(()=>p("span",null,"Meta",-1)),St={class:"upload_button"},bt={class:"general_list avatar_list"},kt=["src"],Rt=re(()=>p("span",null,"777",-1)),Et={class:"general_list shape_color_list"},It={class:"general_list shape_list"},Lt=["src"],Tt={class:"general_list operation_list"},Mt=G({__name:"MyAside",setup(y){class i{constructor(_,a){q(this,"value");q(this,"index");this.index=_,this.value=a}}class e{constructor(_=[]){q(this,"data");q(this,"counter");this.data=[],this.counter=0,_.length>0&&(this.data=_.map(a=>(this.counter+=1,new i(this.counter,a))))}push(_){this.counter+=1,this.data.push(new i(this.counter,_))}access(_){return this.data[_].value}remove(_){for(let a=0;a<this.data.length;a+=1)if(this.data[a].index===_){this.data.splice(a,1);return}}}const t=ye(),c=Ee(),f=Ie(),s=Le(),b=Te(),n=Me();let h=!1;const g=R(!1),C=R(["templates"]),k=R("templates"),M=R(!1),N=R(new e([je])),O=R(""),B=["#DD5353","#FFD95A","#62CDFF","#03C988","#FFABAB","#9A208C","#20262E","#F0F0F0"],U=["star","heart","seven","fire","moon","halo"].map(u=>({type:u,image:R("")})),F=R(B[0]),j=R(""),Q=[{name:"Save",icon:b,handler:o},{name:"Relocate",icon:n,handler:S}],J=[Ze,Ge,Xe,Qe,Je,ze],W=R(new e(J));function z(){h?(document.querySelector(".aside").classList.remove("aside--collapsed"),document.querySelector(".collapse_button").classList.remove("collapse_button--reversed"),h=!1):(document.querySelector(".aside").classList.add("aside--collapsed"),document.querySelector(".collapse_button").classList.add("collapse_button--reversed"),h=!0)}function H(u){u.length!=0&&(k.value=u[0])}function ue(u){C.value=[u.name]}function V(u){if(!u.target)return;const _=u.target;if(_.files&&_.files[0]){const a=new FileReader;a.onload=r=>{r.target&&(W.value.push(r.target.result),_.value="")},a.readAsDataURL(_.files[0])}}function Y(u){if(!u.target)return;const _=u.target;if(_.files&&_.files[0]){const a=new FileReader;a.onload=r=>{r.target&&(O.value=r.target.result,_.value="",M.value=!0)},a.readAsDataURL(_.files[0])}}function de(u){N.value.push(u)}function _e(){M.value=!1,O.value=""}function ee(u){t.background_node=u}function te(u){t.avatar_node=u}function l(u){j.value=u,t.shape_node={type:j.value,color:F.value},t.is_trigger_add_shape_node=!0}function o(){t.is_trigger_save_image=!0}function S(){t.is_trigger_relocate=!0}function I(){const _=new L.Circle({radius:24,fill:F.value});for(const a of U){let r=we(a.type,F.value,48);r?a.image.value=r.toDataURL():a.image.value=_.toDataURL()}}function E(u){F.value=u,I()}return X(()=>{g.value=document.body.clientWidth<=640,window.addEventListener("resize",()=>{const _=document.body.clientWidth;g.value=_<=640}),I()}),(u,_)=>(m(),T("div",st,[p("div",lt,[g.value?(m(),A(d(xe),{key:1,modelValue:k.value,"onUpdate:modelValue":_[1]||(_[1]=a=>k.value=a),onClick:ue},{default:w(()=>[v(d(oe),{title:"Templates",name:"templates"},{default:w(()=>[p("label",mt,[p("input",{type:"file",accept:"image/*",onChange:V},null,32),v(d(f))]),p("div",yt,[(m(!0),T(D,null,$(W.value.data,(a,r)=>(m(),A(d(x),{class:"general_list__item background_list__item",key:r,onClick:P=>ee(a.value)},{default:w(()=>[p("img",{src:a.value},null,8,wt),Ct]),_:2},1032,["onClick"]))),128))])]),_:1}),v(d(oe),{title:"Avatars",name:"avatars"},{default:w(()=>[p("label",St,[p("input",{type:"file",accept:"image/*",onChange:Y},null,32),v(d(f))]),p("div",bt,[(m(!0),T(D,null,$(N.value.data,(a,r)=>(m(),A(d(x),{class:"general_list__item avatar_list__item",key:r,onClick:P=>te(a.value)},{default:w(()=>[p("img",{src:a.value},null,8,kt),Rt,v(d(s))]),_:2},1032,["onClick"]))),128))])]),_:1}),v(d(oe),{title:"Shapes",name:"shapes"},{default:w(()=>[p("div",Et,[(m(),T(D,null,$(B,(a,r)=>v(d(x),{class:"general_list__item shape_color_list__item",circle:"",key:r,onClick:P=>E(a),style:fe({backgroundColor:a})},null,8,["onClick","style"])),64))]),p("div",It,[(m(!0),T(D,null,$(d(U),(a,r)=>(m(),A(d(x),{class:"general_list__item shape_list__item",key:r,onClick:P=>l(a.type)},{default:w(()=>[p("img",{src:a.image.value},null,8,Lt),p("span",null,se(a.type.charAt(0).toUpperCase()+a.type.slice(1)),1),v(d(s))]),_:2},1032,["onClick"]))),128))])]),_:1}),v(d(oe),{title:"Operations",name:"operations"},{default:w(()=>[p("div",Tt,[(m(),T(D,null,$(Q,(a,r)=>v(d(x),{class:"general_list__item operation_list__item",key:r,onClick:a.handler},{default:w(()=>[p("span",null,se(a.name),1),(m(),A(ge(a.icon)))]),_:2},1032,["onClick"])),64))])]),_:1})]),_:1},8,["modelValue"])):(m(),A(d(Pe),{key:0,modelValue:C.value,"onUpdate:modelValue":_[0]||(_[0]=a=>C.value=a),onChange:H},{default:w(()=>[v(d(ne),{title:"Templates",name:"templates"},{default:w(()=>[p("label",it,[p("input",{type:"file",accept:"image/*",onChange:V},null,32),v(d(f))]),p("div",rt,[(m(!0),T(D,null,$(W.value.data,(a,r)=>(m(),A(d(x),{class:"general_list__item background_list__item background_list__item--middle",key:r,onClick:P=>ee(a.value)},{default:w(()=>[p("img",{src:a.value},null,8,ct),ut]),_:2},1032,["onClick"]))),128))])]),_:1}),v(d(ne),{title:"Avatars",name:"avatars"},{default:w(()=>[p("label",dt,[p("input",{type:"file",accept:"image/*",onChange:Y},null,32),v(d(f))]),p("div",_t,[(m(!0),T(D,null,$(N.value.data,(a,r)=>(m(),A(d(x),{class:"general_list__item avatar_list__item avatar_list__item--middle",key:r,onClick:P=>te(a.value)},{default:w(()=>[p("img",{src:a.value},null,8,pt),ht,v(d(s))]),_:2},1032,["onClick"]))),128))])]),_:1}),v(d(ne),{title:"Shapes",name:"shapes"},{default:w(()=>[p("div",ft,[(m(),T(D,null,$(B,(a,r)=>v(d(x),{class:"general_list__item shape_color_list__item",circle:"",key:r,onClick:P=>E(a),style:fe({backgroundColor:a})},null,8,["onClick","style"])),64))]),p("div",vt,[(m(!0),T(D,null,$(d(U),(a,r)=>(m(),A(d(x),{class:"general_list__item shape_list__item shape_list__item--middle",key:r,onClick:P=>l(a.type)},{default:w(()=>[p("img",{src:a.image.value},null,8,gt),p("span",null,se(a.type.charAt(0).toUpperCase()+a.type.slice(1)),1),v(d(s))]),_:2},1032,["onClick"]))),128))])]),_:1}),v(d(ne),{title:"Operations",name:"operations"},{default:w(()=>[(m(),T(D,null,$(Q,(a,r)=>v(d(x),{class:"general_list__item operation_list__item",key:r,onClick:a.handler},{default:w(()=>[p("span",null,se(a.name),1),(m(),A(ge(a.icon)))]),_:2},1032,["onClick"])),64))]),_:1})]),_:1},8,["modelValue"]))]),p("div",{class:"collapse_button",onClick:z},[v(d(c))]),v(ot,{isModalShow:M.value,avatarDataUrl:O.value,onPassAvatar:de,onCloseModal:_e},null,8,["isModalShow","avatarDataUrl"])]))}});const Pt=ie(Mt,[["__scopeId","data-v-1d0fe641"]]),xt={id:"stage"},me="background",pe=10,he=640,le=40,At=G({__name:"MyStage",setup(y){class i{constructor(){q(this,"id");this.id=0}get(){return this.id+=1,this.id-1}}const e=ye(),t=R(null),c=R(null),f=R(null),s=R(null),b=R(null),n=new i,h=new i,g=new i,C=new window.Image;let k="",M=null,N=0,O=!1;function B(l,o){return Math.sqrt(Math.pow(o.x-l.x,2)+Math.pow(o.y-l.y,2))}function ce(l,o){return{x:(l.x+o.x)/2,y:(l.y+o.y)/2}}function U(){s.value.x(f.value.width()),b.value.x(f.value.width()-pe)}function F(l){const S=t.value.getPointerPosition(),I={x:S.x-t.value.getAbsolutePosition().x,y:S.y-t.value.getAbsolutePosition().y};let E=!0;l.evt.deltaY<0?t.value.scale({x:t.value.scale().x*1.2,y:t.value.scale().y*1.2}):(t.value.scale({x:t.value.scale().x/1.2,y:t.value.scale().y/1.2}),E=!1),t.value.absolutePosition({x:t.value.getAbsolutePosition().x-I.x*((E?1.2:1/1.2)-1),y:t.value.getAbsolutePosition().y-I.y*((E?1.2:1/1.2)-1)}),U()}function j(l){if(O)return;const o=l.evt.touches[0],S=l.evt.touches[1];if(o&&S){t.value.isDragging()&&t.value.stopDrag();const I={x:o.clientX,y:o.clientY},E={x:S.clientX,y:S.clientY},u=ce(I,E),_=B(I,E);if(!M){M=ce(I,E);return}N===0&&(N=_);const a=t.value.scale().x*(_/N),r=a/t.value.scale().x,P={x:u.x-t.value.getAbsolutePosition().x,y:u.y-t.value.getAbsolutePosition().y};t.value.scale({x:a,y:a});const Z={x:u.x-M.x,y:u.y-M.y},ae={x:t.value.absolutePosition().x-P.x*(r-1)+Z.x,y:t.value.absolutePosition().y-P.y*(r-1)+Z.y};t.value.absolutePosition(ae),N=_,M=u,U()}}function Q(){N=0,M=null}function J(){t.value.width(document.body.offsetWidth),t.value.height(document.body.offsetHeight)}function W(){const l=f.value.getNode(),o=t.value.findOne(`.${k}`);f.value.moveToTop(),o!==l&&(o?f.value.nodes([o]):f.value.nodes([]),U())}function z(l){if(l.target===t.value){k="",O=!1,W();return}if(l.target.parent&&l.target.parent.className==="Transformer"){O=!1;return}const o=l.target.name();o===me?(k="",O=!1):k=o,W()}function H(){const l=t.value.findOne(`.${k}`);l&&(l.destroy(),f.value.nodes([]))}function ue(l){C.src=l,c.value.draw()}function V(l){const o=l.evt.touches[0],S=l.evt.touches[1];o&&S&&(O=!0,t.value.isDragging()&&t.value.stopDrag())}function Y(){O=!1}function de(l){const o=new window.Image;o.src=l;const S=new L.Circle({x:(C.width-o.width)/2,y:(C.height-o.height)/2,radius:o.width/2,fillPatternImage:o,fillPatternRepeat:"no-repeat",fillPatternOffsetX:o.width/2,fillPatternOffsetY:o.height/2,draggable:!0,name:`avatar_${n.get()}`,offsetX:-o.width/2,offsetY:-o.height/2});S.on("touchmove",V),S.on("touchend",Y),c.value.add(S),k=S.name(),W()}function _e(){let o=we(e.shape_node.type,e.shape_node.color,100,`shape_${h.get()}`);o&&(o.position({x:C.width/2-100,y:C.height/2-100}),o.on("touchmove",V),o.on("touchend",Y),c.value.add(o),k=o.name(),W())}function ee(){const l=t.value.clone(),o=l.getLayers()[0],S=l.findOne("Transformer"),I=document.createElement("a");let E=0,u=0,_=0,a=0;l.scale({x:1,y:1}),S.destroy();for(let r=0;r<o.children.length;r+=1){const P=o.children[r].absolutePosition().x,Z=o.children[r].absolutePosition().y,ae=o.children[r].absolutePosition().x+o.children[r].width(),ve=o.children[r].absolutePosition().y+o.children[r].height();r===0?(E=P,u=Z,_=ae,a=ve):(E=Math.min(E,P),u=Math.min(u,Z),_=Math.max(_,ae),a=Math.max(a,ve))}I.download=`berserk${"7".repeat(g.get()+1)}meta.png`,I.href=l.toDataURL({x:E,y:u,width:_-E,height:a-u}),document.body.appendChild(I),I.click(),document.body.removeChild(I)}function te(){var l;t.value.position({x:document.body.clientWidth>he?(((l=document.querySelector(".aside"))==null?void 0:l.offsetWidth)??0)+le:0,y:document.body.clientWidth>he?le:0}),t.value.scale({x:1,y:1})}return X(()=>{var S;const o="#E76161";L.hitOnDragEnabled=!0,t.value=new L.Stage({container:"stage",width:document.body.offsetWidth,height:document.body.offsetHeight,draggable:!0}),c.value=new L.Layer,f.value=new L.Transformer({centeredScaling:!0,keepRatio:!0}),s.value=new L.Circle({y:-50,radius:pe,stroke:o,fill:"white",strokeWidth:1}),b.value=new L.Line({y:-50,points:[0,0,pe*2,0],stroke:o,strokeWidth:1+1}),document.body.offsetWidth>he&&(t.value.x((((S=document.querySelector(".aside"))==null?void 0:S.offsetWidth)??0)+le),t.value.y(le)),t.value.on("wheel",F),t.value.on("touchmove",j),t.value.on("touchend",Q),t.value.on("mousedown",z),t.value.on("touchstart",z),f.value.on("transform",()=>{U()}),s.value.on("mouseenter",()=>{t.value.container().style.cursor="pointer"}),s.value.on("mouseleave",()=>{t.value.container().style.cursor="default"}),s.value.on("click",H),s.value.on("touchend",H),b.value.on("mouseenter",()=>{t.value.container().style.cursor="pointer"}),b.value.on("mouseleave",()=>{t.value.container().style.cursor="default"}),b.value.on("click",H),b.value.on("touchend",H),f.value.add(s.value),f.value.add(b.value),c.value.add(new L.Image({image:C,name:me})),c.value.add(f.value),t.value.add(c.value),window.addEventListener("resize",J)}),Be(()=>{window.removeEventListener("resize",J)}),K(()=>e.avatar_node,()=>{e.avatar_node&&e.avatar_node!=""&&(de(e.avatar_node),e.avatar_node="")}),K(()=>e.is_trigger_add_shape_node,()=>{e.is_trigger_add_shape_node&&(_e(),e.is_trigger_add_shape_node=!1)}),K(()=>e.background_node,()=>{e.background_node&&e.background_node!=""&&(ue(e.background_node),e.background_node="")}),K(()=>e.is_trigger_save_image,()=>{e.is_trigger_save_image&&(ee(),e.is_trigger_save_image=!1)}),K(()=>e.is_trigger_relocate,()=>{e.is_trigger_relocate&&(te(),e.is_trigger_relocate=!1)}),(l,o)=>(m(),T("div",xt))}});const Ot=ie(At,[["__scopeId","data-v-2e891812"]]),Dt={class:"app__container"},$t=G({__name:"App",setup(y){return X(()=>{document.documentElement.style.setProperty("--vh",`${window.innerHeight*.01}px`),window.addEventListener("resize",()=>{document.documentElement.style.setProperty("--vh",`${window.innerHeight*.01}px`)}),window.addEventListener("touchmove",i=>{const e=i.touches[0],t=i.touches[1];e&&t&&i.preventDefault()},{passive:!1})}),(i,e)=>(m(),T("div",Dt,[p("aside",null,[v(Pt)]),p("main",null,[v(Ot)])]))}});const Nt=ie($t,[["__scopeId","data-v-ea06f904"]]);const Ut=Ve();Ye(Nt).use(Ut).mount("#app");
