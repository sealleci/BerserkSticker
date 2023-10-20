var Pe=Object.defineProperty;var Ae=(g,r,t)=>r in g?Pe(g,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):g[r]=t;var X=(g,r,t)=>(Ae(g,typeof r!="symbol"?r+"":r,t),t);import{K as P,F as Oe,c as De,Q as Ne,X as We,f as Ue}from"./graphic-68e59fbf.js";import{i as Fe,a as He,B as D,T as Be,b as Ve,d as qe,e as Ke,f as Ze,h as Ge,j as Ye,k as Xe,C as ce,l as je}from"./ui-b8bed2ee.js";import{J as Qe,d as K,c as Je,f as j,l as d,q as I,b as m,A as R,K as u,L as ee,M as T,N as ze,O as V,t as E,s,E as et,P as tt,H as L,I as A,v as at,y as te,F as ot,G as nt,w as ye,x as st,Q as Ce,R as ke,S as lt,U as it,V as rt}from"./vue-ac31de14.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const _ of i)if(_.type==="childList")for(const l of _.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const _={};return i.integrity&&(_.integrity=i.integrity),i.referrerPolicy&&(_.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?_.credentials="include":i.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function e(i){if(i.ep)return;i.ep=!0;const _=t(i);fetch(i.href,_)}})();const Se=Qe("konva_node",{state:()=>({avatar_node:"",background_node:"",shape_node:{type:"",color:""},is_trigger_add_shape_node:!1,is_trigger_save_image:!1,is_trigger_relocate:!1,is_trigger_change_z_index:!1,is_to_top:!1,is_trigger_change_color:!1,changed_color:""})});function Ie(g,r,t,e=""){const i="#393646";switch(g){case"star":return new P.Star({numPoints:5,outerRadius:t,innerRadius:t/2,fill:r,stroke:i,strokeWidth:2,draggable:!0,name:e,offsetX:-t,offsetY:-t});case"heart":return new P.Shape({width:t*2,height:t*2,fill:r,stroke:i,strokeWidth:2,draggable:!0,name:e,sceneFunc:(l,C)=>{const o=t/18;let f=0,y=0,b=0;l.beginPath(),l.translate(t,t/1.05),l.scale(1,-1);for(let k=0;k<20;k+=.25)f=k/Math.PI,y=o*(16*Math.sin(f)**3),b=o*(13*Math.cos(f)-5*Math.cos(2*f)-2*Math.cos(3*f)-Math.cos(4*f)),l.lineTo(y,b);l.closePath(),l.fillStrokeShape(C)}});case"seven":return new P.Text({text:"7",width:t*2,height:t*2,fontSize:t*2,fill:r,stroke:i,strokeWidth:2,draggable:!0,name:e,fontFamily:"sans-serif",align:"center",padding:t/4});case"fire":return new P.Shape({width:t*2,height:t*2,fill:r,stroke:i,strokeWidth:2,draggable:!0,name:e,sceneFunc:(l,C)=>{const o=t*2;l.beginPath(),l.moveTo(o/2,0),l.quadraticCurveTo(o*7/16,o/2,o*3/8,o/2),l.quadraticCurveTo(o*5/16,o/2,o/4,o/4),l.quadraticCurveTo(o/8,o*5/8,o/8,o*3/4),l.quadraticCurveTo(o/8,o*15/16,o/2,o),l.quadraticCurveTo(o*7/8,o*15/16,o*7/8,o*3/4),l.quadraticCurveTo(o*7/8,o*5/8,o*3/4,o/4),l.quadraticCurveTo(o*11/16,o/2,o*5/8,o/2),l.quadraticCurveTo(o*9/16,o/2,o/2,0),l.closePath(),l.fillStrokeShape(C)}});case"moon":return new P.Shape({width:t*2,height:t*2,fill:r,stroke:i,strokeWidth:2,draggable:!0,name:e,sceneFunc:(l,C)=>{const o=Math.sqrt(2)/2,f=t;l.beginPath();for(let y=Math.PI/4;y<=Math.PI*7/4;y+=.1)l.lineTo(f*(1+Math.cos(y)),f*(1-Math.sin(y)));for(let y=Math.PI*3/2;y>=Math.PI/2;y-=.1)l.lineTo((o+1+o*Math.cos(y))*f,f*(1-o*Math.sin(y)));l.closePath(),l.fillStrokeShape(C)}});case"halo":return new P.Ring({outerRadius:t,innerRadius:t/2,fill:r,stroke:i,strokeWidth:2,draggable:!0,name:e,offsetX:-t,offsetY:-t})}return null}const ct=K({__name:"CropperStencil",props:{image:{},coordinates:{},transitions:{},stencilCoordinates:{}},emits:["move","move-end","resize","resize-end"],setup(g,{emit:r}){const t=g,e=Fe(),i=Je(()=>{const{height:f,width:y,left:b,top:k}=t.stencilCoordinates,O={width:`${y}px`,height:`${f}px`,transform:`translate(${b}px, ${k}px)`,transition:"none"};return t.transitions&&t.transitions.enabled&&(O.transition=`${t.transitions.time}ms ${t.transitions.timingFunction}`),O});function _(f){r("move",f)}function l(){r("move-end")}function C(f){const b=f.shift().left;r("resize",new We({left:b,right:b,top:b,bottom:b},{preserveRatio:!0}))}function o(){r("resize-end")}return j(()=>{}),(f,y)=>(d(),I("div",{class:"circle_stencil",style:ee(i.value)},[m(u(Oe),{class:"circle_stencil__handler",onDrag:C,onDragEnd:o},{default:R(()=>[m(u(e))]),_:1}),m(u(Ne),{onMove:_,onMoveEnd:l,class:"circle_stencil__crop_area"},{default:R(()=>[m(u(De),{class:"circle_stencil__preview",image:f.image,coordinates:f.coordinates,width:f.stencilCoordinates.width,height:f.stencilCoordinates.height,transitions:f.transitions},null,8,["image","coordinates","width","height","transitions"])]),_:1})],4))}});const _t={class:"cropper_modal__row cropper_modal__row--first"},ut={class:"cropper_modal__row cropper_modal__row--last"},dt=K({__name:"CropperModal",props:{avatarDataUrl:{},isModalShow:{type:Boolean}},emits:["passAvatar","closeModal"],setup(g,{emit:r}){const t=g,e=He(),i=T(null),{isModalShow:_}=ze(t),l=T(!1);function C(){const o=i.value.getResult().canvas;o&&(r("passAvatar",o.toDataURL()),r("closeModal"))}return j(()=>{window.addEventListener("resize",()=>{var f;const o=document.body.clientWidth;(f=document.querySelector(".tiny-modal__box"))==null||f.style.setProperty("left",`calc(${o>=1008?30:o>=641?20:10}vw + .5rem)`)})}),V(_,o=>{l.value=o}),(o,f)=>(d(),E(u(Be),{class:"cropper_modal",modelValue:l.value,"onUpdate:modelValue":f[1]||(f[1]=y=>l.value=y),showHeader:!1},{default:R(()=>[s("div",_t,[s("div",{class:"cropper_modal__close_button",onClick:f[0]||(f[0]=y=>r("closeModal"))},[m(u(e))])]),m(u(Ue),{class:"cropper",ref_key:"cropper_instance",ref:i,src:o.avatarDataUrl,stencilProps:{aspectRatio:1/1},stencilComponent:ct},null,8,["src"]),s("div",ut,[m(u(D),{class:"crop_button",onClick:C,round:""},{default:R(()=>[et("Crop")]),_:1})])]),_:1},8,["modelValue"]))}});const Z=(g,r)=>{const t=g.__vccOpts||g;for(const[e,i]of r)t[e]=i;return t},pt=Z(dt,[["__scopeId","data-v-18737960"]]),ht={class:"my_tabs"},vt={class:"my_tabs__nav"},ft={class:"my_tabs__nav__scroll_bar"},gt=["onClick"],mt={class:"my_tabs__container"},yt=K({__name:"MyTabs",props:{modelValue:{}},emits:["click","update:modelValue"],setup(g,{emit:r}){const t=g,e=tt(),i=e.default?e.default().filter(o=>o.type.__name==="MyTabItem"):[],_=i.map(o=>o.props?o.props.name:""),l=i.map(o=>o.props?o.props.title:"");function C(o){r("click",o),r("update:modelValue",o)}return j(()=>{t.modelValue===""&&(r("click",_[0]),r("update:modelValue",_[0]))}),(o,f)=>(d(),I("div",ht,[s("div",vt,[s("div",ft,[(d(!0),I(L,null,A(u(l),(y,b)=>(d(),I("div",{key:b,class:at(o.modelValue===u(_)[b]?"my_tabs__nav__title my_tabs__nav__title--active":"my_tabs__nav__title"),onClick:k=>C(u(_)[b])},te(y),11,gt))),128))])]),s("div",mt,[(d(!0),I(L,null,A(u(i),(y,b)=>ot((d(),E(ye(y),{key:b},null,512)),[[nt,o.modelValue===u(_)[b]]])),128))])]))}});const bt=Z(yt,[["__scopeId","data-v-5705148a"]]),wt={class:"my_tab_item"},Ct=K({__name:"MyTabItem",props:{name:{},title:{}},setup(g){return(r,t)=>(d(),I("div",wt,[st(r.$slots,"default",{},void 0,!0)]))}});const _e=Z(Ct,[["__scopeId","data-v-a43d6799"]]),Re=""+new URL("b1-17081d0a.png",import.meta.url).href,Te=""+new URL("b2-a3fadbfe.png",import.meta.url).href,Ee=""+new URL("b3-c9265a32.png",import.meta.url).href,Me=""+new URL("r1-1779894b.png",import.meta.url).href,$e=""+new URL("s1-af5e0d63.jpg",import.meta.url).href,xe=""+new URL("s2-ec3d0360.jpg",import.meta.url).href,Le=""+new URL("s3-885f8f2a.jpg",import.meta.url).href,de=g=>(Ce("data-v-3dd92b3f"),g=g(),ke(),g),kt={class:"aside"},St={class:"aside__container"},It={class:"upload_button"},Rt={class:"general_list background_list"},Tt=["src"],Et=de(()=>s("span",null,"Meta",-1)),Mt={class:"upload_button"},$t={class:"general_list avatar_list"},xt=["src"],Lt=de(()=>s("span",null,"777",-1)),Pt={class:"general_list shape_color_list"},At={class:"shape_color_list__row"},Ot={class:"shape_color_list__row"},Dt={class:"general_list shape_list"},Nt=["src"],Wt={class:"upload_button"},Ut={class:"general_list background_list"},Ft=["src"],Ht=de(()=>s("span",null,"Meta",-1)),Bt={class:"upload_button"},Vt={class:"general_list avatar_list"},qt=["src"],Kt=de(()=>s("span",null,"777",-1)),Zt={class:"general_list shape_color_list"},Gt={class:"shape_color_list__row"},Yt={class:"shape_color_list__row"},Xt={class:"general_list shape_list"},jt=["src"],Qt={class:"general_list operation_list"},Jt=K({__name:"MyAside",setup(g){class r{constructor(h,a){X(this,"value");X(this,"index");this.index=h,this.value=a}}class t{constructor(h=[]){X(this,"data");X(this,"counter");this.data=[],this.counter=0,h.length>0&&(this.data=h.map(a=>(this.counter+=1,new r(this.counter,a))))}push(h){this.counter+=1,this.data.push(new r(this.counter,h))}access(h){return this.data[h].value}remove(h){for(let a=0;a<this.data.length;a+=1)if(this.data[a].index===h){this.data.splice(a,1);return}}}const e=Se(),i=Ve(),_=qe(),l=Ke(),C=Ze(),o=Ge(),f=Ye(),y=Xe();let b=!1;const k=T(!1),O=T(["templates"]),F=T("templates"),W=T(!1),Q=T(new t([Me])),G=T(""),U=["#DD5353","#FFD95A","#62CDFF","#03C988","#FFABAB","#9A208C","#20262E","#F0F0F0"],J=["star","heart","seven","fire","moon","halo"].map(p=>({type:p,image:T("")})),Y=T(U[0]),z=T(""),H=[{name:"Save",icon:f,handler:n},{name:"Relocate",icon:y,handler:w},{name:"Move to Top",icon:l,handler:()=>x(!0)},{name:"Move to Bottom",icon:C,handler:()=>x(!1)}],ae=[Re,Te,Ee,$e,xe,Le],B=T(new t(ae));function pe(){b?(document.querySelector(".aside").classList.remove("aside--collapsed"),document.querySelector(".collapse_button").classList.remove("collapse_button--reversed"),b=!1):(document.querySelector(".aside").classList.add("aside--collapsed"),document.querySelector(".collapse_button").classList.add("collapse_button--reversed"),b=!0)}function oe(p){p.length!==0&&(F.value=p[0])}function ne(p){O.value=[p]}function se(p){if(!p.target)return;const h=p.target;if(h.files&&h.files[0]){const a=new FileReader;a.onload=v=>{if(!v.target)return;const S=v.target.result;if(!S.startsWith("data:"))return;const N=new Image;N.onload=()=>{B.value.push(S),h.value=""},N.onerror=()=>{console.log("Background image error.")},N.src=S},a.readAsDataURL(h.files[0])}}function le(p){if(!p.target)return;const h=p.target;if(h.files&&h.files[0]){const a=new FileReader;a.onload=v=>{if(!v.target)return;const S=v.target.result;if(!S.startsWith("data:"))return;const N=new Image;N.onload=()=>{G.value=S,h.value="",W.value=!0},N.onerror=()=>{console.log("Avatar image error.")},N.src=S},a.readAsDataURL(h.files[0])}}function he(p){Q.value.push(p)}function ve(){W.value=!1,G.value=""}function ie(p){e.background_node=p}function re(p){e.avatar_node=p}function c(p){z.value=p,e.shape_node={type:z.value,color:Y.value},e.is_trigger_add_shape_node=!0}function n(){e.is_trigger_save_image=!0}function w(){e.is_trigger_relocate=!0}function x(p){e.is_to_top=p,e.is_trigger_change_z_index=!0}function M(){const h=new P.Circle({radius:24,fill:Y.value});for(const a of J){let v=Ie(a.type,Y.value,48);v?a.image.value=v.toDataURL():a.image.value=h.toDataURL()}}function $(p){Y.value=p,M(),e.changed_color=p,e.is_trigger_change_color=!0}return j(()=>{k.value=document.body.clientWidth<=640,window.addEventListener("resize",()=>{const h=document.body.clientWidth;k.value=h<=640}),M()}),(p,h)=>(d(),I("div",kt,[s("div",St,[k.value?(d(),E(bt,{key:1,modelValue:F.value,"onUpdate:modelValue":h[1]||(h[1]=a=>F.value=a),onClick:ne},{default:R(()=>[m(_e,{title:"Templates",name:"templates"},{default:R(()=>[s("label",Wt,[s("input",{type:"file",accept:"image/*",onChange:se},null,32),m(u(_))]),s("div",Ut,[(d(!0),I(L,null,A(B.value.data,(a,v)=>(d(),E(u(D),{key:v,class:"general_list__item background_list__item",onClick:S=>ie(a.value)},{default:R(()=>[s("img",{src:a.value},null,8,Ft),Ht]),_:2},1032,["onClick"]))),128))])]),_:1}),m(_e,{title:"Avatars",name:"avatars"},{default:R(()=>[s("label",Bt,[s("input",{type:"file",accept:"image/*",onChange:le},null,32),m(u(_))]),s("div",Vt,[(d(!0),I(L,null,A(Q.value.data,(a,v)=>(d(),E(u(D),{class:"general_list__item avatar_list__item",key:v,onClick:S=>re(a.value)},{default:R(()=>[s("img",{src:a.value},null,8,qt),Kt,m(u(o))]),_:2},1032,["onClick"]))),128))])]),_:1}),m(_e,{title:"Shapes",name:"shapes"},{default:R(()=>[s("div",Zt,[s("div",Gt,[(d(!0),I(L,null,A(U.slice(0,4),(a,v)=>(d(),E(u(D),{class:"general_list__item shape_color_list__item",circle:"",key:v,onClick:S=>$(a),style:ee({backgroundColor:a})},null,8,["onClick","style"]))),128))]),s("div",Yt,[(d(!0),I(L,null,A(U.slice(4),(a,v)=>(d(),E(u(D),{class:"general_list__item shape_color_list__item",circle:"",key:v,onClick:S=>$(a),style:ee({backgroundColor:a})},null,8,["onClick","style"]))),128))])]),s("div",Xt,[(d(!0),I(L,null,A(u(J),(a,v)=>(d(),E(u(D),{class:"general_list__item shape_list__item",key:v,onClick:S=>c(a.type)},{default:R(()=>[s("img",{src:a.image.value},null,8,jt),s("span",null,te(a.type.charAt(0).toUpperCase()+a.type.slice(1)),1),m(u(o))]),_:2},1032,["onClick"]))),128))])]),_:1}),m(_e,{title:"Operations",name:"operations"},{default:R(()=>[s("div",Qt,[(d(),I(L,null,A(H,(a,v)=>m(u(D),{class:"general_list__item operation_list__item operation_list__item--mobile",key:v,onClick:a.handler},{default:R(()=>[s("span",null,te(a.name),1),(d(),E(ye(a.icon)))]),_:2},1032,["onClick"])),64))])]),_:1})]),_:1},8,["modelValue"])):(d(),E(u(je),{key:0,modelValue:O.value,"onUpdate:modelValue":h[0]||(h[0]=a=>O.value=a),onChange:oe},{default:R(()=>[m(u(ce),{title:"Templates",name:"templates"},{default:R(()=>[s("label",It,[s("input",{type:"file",accept:"image/*",onChange:se},null,32),m(u(_))]),s("div",Rt,[(d(!0),I(L,null,A(B.value.data,(a,v)=>(d(),E(u(D),{class:"general_list__item background_list__item background_list__item--middle",key:v,onClick:S=>ie(a.value)},{default:R(()=>[s("img",{src:a.value},null,8,Tt),Et]),_:2},1032,["onClick"]))),128))])]),_:1}),m(u(ce),{title:"Avatars",name:"avatars"},{default:R(()=>[s("label",Mt,[s("input",{type:"file",accept:"image/*",onChange:le},null,32),m(u(_))]),s("div",$t,[(d(!0),I(L,null,A(Q.value.data,(a,v)=>(d(),E(u(D),{class:"general_list__item avatar_list__item avatar_list__item--middle",key:v,onClick:S=>re(a.value)},{default:R(()=>[s("img",{src:a.value},null,8,xt),Lt,m(u(o))]),_:2},1032,["onClick"]))),128))])]),_:1}),m(u(ce),{title:"Shapes",name:"shapes"},{default:R(()=>[s("div",Pt,[s("div",At,[(d(!0),I(L,null,A(U.slice(0,4),(a,v)=>(d(),E(u(D),{class:"general_list__item shape_color_list__item",circle:"",key:v,onClick:S=>$(a),style:ee({backgroundColor:a})},null,8,["onClick","style"]))),128))]),s("div",Ot,[(d(!0),I(L,null,A(U.slice(4),(a,v)=>(d(),E(u(D),{class:"general_list__item shape_color_list__item",circle:"",key:v,onClick:S=>$(a),style:ee({backgroundColor:a})},null,8,["onClick","style"]))),128))])]),s("div",Dt,[(d(!0),I(L,null,A(u(J),(a,v)=>(d(),E(u(D),{class:"general_list__item shape_list__item shape_list__item--middle",key:v,onClick:S=>c(a.type)},{default:R(()=>[s("img",{src:a.image.value},null,8,Nt),s("span",null,te(a.type.charAt(0).toUpperCase()+a.type.slice(1)),1),m(u(o))]),_:2},1032,["onClick"]))),128))])]),_:1}),m(u(ce),{title:"Operations",name:"operations"},{default:R(()=>[(d(),I(L,null,A(H,(a,v)=>m(u(D),{class:"general_list__item operation_list__item",key:v,onClick:a.handler},{default:R(()=>[s("span",null,te(a.name),1),(d(),E(ye(a.icon)))]),_:2},1032,["onClick"])),64))]),_:1})]),_:1},8,["modelValue"]))]),s("div",{class:"collapse_button",onClick:pe},[m(u(i))]),m(pt,{isModalShow:W.value,avatarDataUrl:G.value,onPassAvatar:he,onCloseModal:ve},null,8,["isModalShow","avatarDataUrl"])]))}});const zt=Z(Jt,[["__scopeId","data-v-3dd92b3f"]]),ea={id:"stage"},fe="background",ge=10,me=640,ue=40,ta=K({__name:"MyStage",setup(g){class r{constructor(){X(this,"id");this.id=0}get(){return this.id+=1,this.id-1}}const t=Se(),e=T(null),i=T(null),_=T(null),l=T(null),C=T(null),o=new r,f=new r,y=new r,b=new window.Image;let k="",O=null,F=0,W=!1;function Q(c,n){return Math.sqrt(Math.pow(n.x-c.x,2)+Math.pow(n.y-c.y,2))}function G(c,n){return{x:(c.x+n.x)/2,y:(c.y+n.y)/2}}function U(){l.value.x(_.value.width()),C.value.x(_.value.width()-ge)}function be(c){const w=e.value.getPointerPosition(),x={x:w.x-e.value.getAbsolutePosition().x,y:w.y-e.value.getAbsolutePosition().y};let M=!0;c.evt.deltaY<0?e.value.scale({x:e.value.scale().x*1.2,y:e.value.scale().y*1.2}):(e.value.scale({x:e.value.scale().x/1.2,y:e.value.scale().y/1.2}),M=!1),e.value.absolutePosition({x:e.value.getAbsolutePosition().x-x.x*((M?1.2:1/1.2)-1),y:e.value.getAbsolutePosition().y-x.y*((M?1.2:1/1.2)-1)}),U()}function J(c){if(W)return;const n=c.evt.touches[0],w=c.evt.touches[1];if(n&&w){e.value.isDragging()&&e.value.stopDrag();const x={x:n.clientX,y:n.clientY},M={x:w.clientX,y:w.clientY},$=G(x,M),p=Q(x,M);if(!O){O=G(x,M);return}F===0&&(F=p);const h=e.value.scale().x*(p/F),a=h/e.value.scale().x,v={x:$.x-e.value.getAbsolutePosition().x,y:$.y-e.value.getAbsolutePosition().y};e.value.scale({x:h,y:h});const S={x:$.x-O.x,y:$.y-O.y},N={x:e.value.absolutePosition().x-v.x*(a-1)+S.x,y:e.value.absolutePosition().y-v.y*(a-1)+S.y};e.value.absolutePosition(N),F=p,O=$,U()}}function Y(){F=0,O=null}function z(){e.value.width(document.body.offsetWidth),e.value.height(document.body.offsetHeight)}function H(){const c=_.value.getNode(),n=e.value.findOne(`.${k}`);_.value.moveToTop(),n!==c&&(n?_.value.nodes([n]):_.value.nodes([]),U())}function ae(c){if(c.target===e.value){k="",W=!1,H();return}if(c.target.parent&&c.target.parent.className==="Transformer"){W=!1;return}const n=c.target.name();n===fe?(k="",W=!1):k=n,H()}function B(){const c=e.value.findOne(`.${k}`);c&&(c.destroy(),_.value.nodes([]))}function pe(c){b.src=c,i.value.draw()}function oe(c){const n=c.evt.touches[0],w=c.evt.touches[1];n&&w&&(W=!0,e.value.isDragging()&&e.value.stopDrag())}function ne(){W=!1}function se(c){const n=new window.Image;n.src=c;const w=new P.Circle({x:(b.width-n.width)/2,y:(b.height-n.height)/2,radius:n.width/2,fillPatternImage:n,fillPatternRepeat:"no-repeat",fillPatternOffsetX:n.width/2,fillPatternOffsetY:n.height/2,draggable:!0,name:`avatar_${o.get()}`,offsetX:-n.width/2,offsetY:-n.height/2});w.on("touchmove",oe),w.on("touchend",ne),i.value.add(w),k=w.name(),H()}function le(){let n=Ie(t.shape_node.type,t.shape_node.color,100,`shape_${f.get()}`);n&&(n.position({x:b.width/2-100,y:b.height/2-100}),n.on("touchmove",oe),n.on("touchend",ne),i.value.add(n),k=n.name(),H())}function he(){const c=e.value.clone(),n=c.getLayers()[0],w=c.findOne("Transformer"),x=document.createElement("a");let M=0,$=0,p=0,h=0;c.scale({x:1,y:1}),w==null||w.destroy();for(let a=0;a<n.children.length;a+=1){const v=n.children[a].absolutePosition().x,S=n.children[a].absolutePosition().y,N=n.children[a].absolutePosition().x+n.children[a].width(),we=n.children[a].absolutePosition().y+n.children[a].height();a===0?(M=v,$=S,p=N,h=we):(M=Math.min(M,v),$=Math.min($,S),p=Math.max(p,N),h=Math.max(h,we))}x.download=`berserk${"7".repeat(y.get()+1)}meta.png`,x.href=c.toDataURL({x:M,y:$,width:p-M,height:h-$}),document.body.appendChild(x),x.click(),document.body.removeChild(x)}function ve(){var c;e.value.position({x:document.body.clientWidth>me?(((c=document.querySelector(".aside"))==null?void 0:c.offsetWidth)??0)+ue:0,y:document.body.clientWidth>me?ue:0}),e.value.scale({x:1,y:1})}function ie(c){if(k==="")return;const n=e.value.findOne(`.${k}`);if(n)if(c)n.moveToTop();else{const w=e.value.findOne(`.${fe}`);w&&(n.moveToBottom(),w.moveToBottom())}H()}function re(c){if(k===""||k.includes("avatar")||c==="")return;const n=e.value.findOne(`.${k}`);n&&n.setAttr("fill",c)}return j(()=>{var w;const n="#E76161";P.hitOnDragEnabled=!0,e.value=new P.Stage({container:"stage",width:document.body.offsetWidth,height:document.body.offsetHeight,draggable:!0}),i.value=new P.Layer,_.value=new P.Transformer({centeredScaling:!0,keepRatio:!0}),l.value=new P.Circle({y:-50,radius:ge,stroke:n,fill:"white",strokeWidth:1}),C.value=new P.Line({y:-50,points:[0,0,ge*2,0],stroke:n,strokeWidth:1+1}),document.body.offsetWidth>me&&(e.value.x((((w=document.querySelector(".aside"))==null?void 0:w.offsetWidth)??0)+ue),e.value.y(ue)),e.value.on("wheel",be),e.value.on("touchmove",J),e.value.on("touchend",Y),e.value.on("mousedown",ae),e.value.on("touchstart",ae),_.value.on("transform",()=>{U()}),l.value.on("mouseenter",()=>{e.value.container().style.cursor="pointer"}),l.value.on("mouseleave",()=>{e.value.container().style.cursor="default"}),l.value.on("click",B),l.value.on("touchend",B),C.value.on("mouseenter",()=>{e.value.container().style.cursor="pointer"}),C.value.on("mouseleave",()=>{e.value.container().style.cursor="default"}),C.value.on("click",B),C.value.on("touchend",B),_.value.add(l.value),_.value.add(C.value),i.value.add(new P.Image({image:b,name:fe})),i.value.add(_.value),e.value.add(i.value),window.addEventListener("resize",z)}),lt(()=>{window.removeEventListener("resize",z)}),V(()=>t.avatar_node,()=>{t.avatar_node&&t.avatar_node!==""&&(se(t.avatar_node),t.avatar_node="")}),V(()=>t.is_trigger_add_shape_node,()=>{t.is_trigger_add_shape_node&&(le(),t.is_trigger_add_shape_node=!1)}),V(()=>t.background_node,()=>{t.background_node&&t.background_node!==""&&(pe(t.background_node),t.background_node="")}),V(()=>t.is_trigger_save_image,()=>{t.is_trigger_save_image&&(he(),t.is_trigger_save_image=!1)}),V(()=>t.is_trigger_relocate,()=>{t.is_trigger_relocate&&(ve(),t.is_trigger_relocate=!1)}),V(()=>t.is_trigger_change_z_index,()=>{t.is_trigger_change_z_index&&(ie(t.is_to_top),t.is_trigger_change_z_index=!1)}),V(()=>t.is_trigger_change_color,()=>{t.is_trigger_change_color&&(re(t.changed_color),t.is_trigger_change_color=!1)}),(c,n)=>(d(),I("div",ea))}});const aa=Z(ta,[["__scopeId","data-v-54b3565e"]]);const oa={},q=g=>(Ce("data-v-0191fcff"),g=g(),ke(),g),na={className:"loading_spinner"},sa=q(()=>s("div",null,null,-1)),la=q(()=>s("div",null,null,-1)),ia=q(()=>s("div",null,null,-1)),ra=q(()=>s("div",null,null,-1)),ca=q(()=>s("div",null,null,-1)),_a=q(()=>s("div",null,null,-1)),ua=q(()=>s("div",null,null,-1)),da=q(()=>s("div",null,null,-1)),pa=[sa,la,ia,ra,ca,_a,ua,da];function ha(g,r){return d(),I("div",na,pa)}const va=Z(oa,[["render",ha],["__scopeId","data-v-0191fcff"]]),fa={class:"app__container"},ga=K({__name:"App",setup(g){const r=T(!0);async function t(e){const i=e.map(_=>new Promise((l,C)=>{const o=new Image;o.src=_,o.onload=l,o.onerror=C}));await Promise.all(i),r.value=!1}return j(()=>{document.documentElement.style.setProperty("--vh",`${window.innerHeight*.01}px`),window.addEventListener("resize",()=>{document.documentElement.style.setProperty("--vh",`${window.innerHeight*.01}px`)}),window.addEventListener("touchmove",e=>{const i=e.touches[0],_=e.touches[1];i&&_&&e.preventDefault()},{passive:!1}),t([Re,Te,Ee,Me,$e,xe,Le]).catch(console.error)}),(e,i)=>(d(),I("div",fa,[r.value?(d(),E(va,{key:0})):(d(),I(L,{key:1},[s("aside",null,[m(zt)]),s("main",null,[m(aa)])],64))]))}});const ma=Z(ga,[["__scopeId","data-v-0bdb6849"]]);const ya=it();rt(ma).use(ya).mount("#app");
