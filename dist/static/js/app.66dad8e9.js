(()=>{var e={3722:(e,r,t)=>{"use strict";t.d(r,{Zl:()=>n,cS:()=>l,jt:()=>i});var o=t(6537);const a=new o.A({baseURL:"/gw/",timeout:18e4}),n=e=>a.post("feishuapi/bitable/confirm/create",e),i=e=>a.post("feishuapi/bitable/confirm/preview",e),l=e=>a.post("feishuapi/bitable/confirm/update",e)},996:(e,r,t)=>{"use strict";t.d(r,{A:()=>C});var o=t(1070),a=t(8190),n=t(7958),i=(t(3722),t(3759));const l={Text:1,Number:2,SingleSelect:3,MultiSelect:4,DateTime:5,Checkbox:7,User:11,Phone:13,Url:15,Attachment:17,SingleLink:18,Lookup:19,Formula:20,DuplexLink:21,Location:22,GroupChat:23,CreatedTime:1001,ModifiedTime:1002,CreatedUser:1003,ModifiedUser:1004,AutoNumber:1005,Barcode:99001,Progress:99002,Currency:99003,Rating:99004,Email:99005},c=(0,o.KR)(!1),s=(0,o.KR)(null),d=(0,o.KR)([]),u=(0,o.KR)(""),g=(0,o.KR)([]),p=(0,o.KR)([]),m=(0,o.KR)(""),v=(0,o.KR)(""),b=(0,o.KR)([]),f=(0,o.KR)(null),h=n.UV.base,y=(n.UV.ui,n.UV.bridge,e=>h.getTable(e)),F=async e=>{e.tableId||(e.tableId=e.id),s.value=e;const r=await y(e.tableId);A(e.tableId),w(e.tableId),S(e.tableId),B(e.tableId),T(),E(),r.onFieldAdd((r=>{console.log("table:",r),S(e.tableId),B(e.tableId)})),r.onFieldDelete((r=>{console.log("table:",r),S(e.tableId),B(e.tableId)})),n.UV.base.onSelectionChange((r=>{console.log("event:",r),(0,a.dY)((()=>{b.value=[],A(e.tableId),w(e.tableId),S(e.tableId),B(e.tableId)}))}))},w=async e=>{const r=await h.getTableMetaList();r.map((e=>(e.label=e.name,e.value=e.id,e))),d.value=r},A=async e=>{const r=await y(e),t=await r.getName();console.log(t),u.value=t},S=async e=>{const r=await y(e),t=await r.getFieldMetaList();g.value=t.map((e=>(e.label=e.name,e.value=e.id,e)))},B=async e=>{if(c.value)return;c.value=!0;const r=await h.getActiveTable();let t={pageSize:5e3};f.value&&(t.pageToken=f.value);const o=await r.getRecords(t);console.log(o),c.value=!1,o.pageToken?(f.value=o.pageToken,setTimeout((()=>{B(e)}),1e3)):f.value=null,b.value=b.value.concat(o.records)},T=async()=>{const e=await n.UV.bridge.getTenantKey();m.value=e},E=async()=>{const e=await n.UV.bridge.getUserId();v.value=e},I=async(e,r)=>{const t=[],o=await y(e),a=await o.addField({type:l.Url}),n=await o.getField(a),i=await o.getRecordIdList();return i.forEach((e=>{t.push({recordId:e,fields:{[n.id]:`${r}?recordId=${e}`}})})),await o.setRecords(t),Promise.resolve({viewFieldId:a})},x=async(e,r)=>{const t=await(0,i.urltoBlob)("https://dev.yygongzi.com/gw/feishuapi/bitable/confirm/qrcode/1840294913194229762"),o=(new File([t],"imgage.png",{type:t.type}),[]),a=await n.UV.base.getActiveTable(),c=await a.addField({type:l.Attachment}),s=await a.getField(c),d=await a.getRecordIdList();return d.forEach((e=>{o.push({recordId:e,fields:{[s.id]:{url:"https://dev.yygongzi.com/gw/feishuapi/bitable/confirm/qrcode/1840294913194229762"}}})})),Promise.resolve({qrFieldId:c})};function C(){return{userId:v,tableInfo:s,tableName:u,sheetList:d,fieldList:g,recordList:p,tenantKey:m,tableData:b,getTableSheetList:w,setTableInfo:F,addField:I,addImgField:x}}},2351:(e,r,t)=>{"use strict";var o=t(4299),a=t(8190),n=t(1070),i=t(4772);i.A.Pagination.jump_to="跳转到";const l={token:{fontFamily:'"Helvetica Neue",Helvetica,Arial,"PingFang SC","microsoft yahei","微软雅黑","Arial","sans-serif","黑体"',borderRadius:6,boxShadow:"0px 2px 10px 0 rgba(0,0,0,0.14)",boxShadowSecondary:"0px 2px 10px 0 rgba(0,0,0,0.14)",colorPrimary:"#3a75ff",colorPrimaryActive:"#3A75FF",colorPrimaryTextHover:"#6191FF",colorPrimaryHover:"#6191FF",colorPrimaryBorderHover:"#3A75FF",colorPrimaryBorder:"#3A75FF",colorSuccess:"#11c215",colorSuccessBg:"#F0FBF0",colorSuccessBgHover:"#F0FBF0",colorSuccessBorder:"#34C724",colorSuccessBorderHover:"#34C724",colorSuccessActive:"#11C215",colorSuccessTextHover:"#11C215",colorSuccessText:"#11C215",colorSuccessTextActive:"#11C215",colorError:"#FD3B3A",colorErrorBg:"#FEEBEB",colorErrorBgHover:"#FEEBEB",colorErrorBorder:"#FD3B3A",colorErrorBorderHover:"#FD3B3A",colorErrorHover:"#FD3B3A",colorErrorActive:"#FD3B3A",colorErrorTextHover:"#FD3B3A",colorErrorText:"#FD3B3A",colorErrorTextActive:"#FD3B3A",colorInfo:"#3a75ff",colorTextBase:"#333333",colorBgMask:"rgba(0, 0, 0, 0.5)",colorTextHeading:"#333333",colorText:"#333333",marginXXS:2,marginXS:4,marginSM:6,margin:8,marginMD:12,marginLG:16,marginXL:20,marginXXL:24,paddingXXS:12,paddingXS:12,padding:12,paddingMD:12,paddingLG:12,paddingXL:12,wireframe:!1,colorBorder:"#D6DAE4",controlHeight:32,colorBgSpotlight:"rgba(51,51,51,0.9)",colorWarning:"#FB952A",fontWeightStrong:500},components:{Modal:{}}},c={locale:i.A,theme:l};var s=t(7226),d=t(3716),u=t(7958),g=t(996);t(3759);const p={__name:"App",setup(e){const{setTableInfo:r}=(0,g.A)(),t=async()=>{const e=await u.UV.base.getSelection();r(e)};return t(),(e,r)=>{const t=(0,a.g2)("a-style-provider"),o=(0,a.g2)("a-config-provider");return(0,a.uX)(),(0,a.Wv)(o,{theme:(0,n.R1)(c).theme,locale:(0,n.R1)(c).locale},{default:(0,a.k6)((()=>[(0,a.bF)(t,{"hash-priority":"high",transformers:[(0,n.R1)(s.A)]},{default:(0,a.k6)((()=>[(0,a.bF)((0,n.R1)(d.Tp))])),_:1},8,["transformers"])])),_:1},8,["theme","locale"])}}},m=p,v=m;var b=t(5686);const f={title:"title"},h={title:"标题"},y=(0,b.hU)({locale:"en",allowComposition:!0,messages:{en:f,zh:h}});u.UV.bridge.getLanguage().then((e=>{y.global.locale=e}));const F=(0,d.aE)({history:(0,d.Bt)("/"),routes:[{path:"/",name:"home",component:()=>t.e(460).then(t.bind(t,6460))},{path:"/success",name:"success",component:()=>t.e(943).then(t.bind(t,943))}]}),w=F;var A=t(2713);t(757);(0,o.Ef)(v).use(A.Ay).use(w).use(y).mount("#app")},3936:()=>{}},r={};function t(o){var a=r[o];if(void 0!==a)return a.exports;var n=r[o]={exports:{}};return e[o].call(n.exports,n,n.exports,t),n.exports}t.m=e,(()=>{var e=[];t.O=(r,o,a,n)=>{if(!o){var i=1/0;for(d=0;d<e.length;d++){for(var[o,a,n]=e[d],l=!0,c=0;c<o.length;c++)(!1&n||i>=n)&&Object.keys(t.O).every((e=>t.O[e](o[c])))?o.splice(c--,1):(l=!1,n<i&&(i=n));if(l){e.splice(d--,1);var s=a();void 0!==s&&(r=s)}}return r}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[o,a,n]}})(),(()=>{t.n=e=>{var r=e&&e.__esModule?()=>e["default"]:()=>e;return t.d(r,{a:r}),r}})(),(()=>{t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})}})(),(()=>{t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((r,o)=>(t.f[o](e,r),r)),[]))})(),(()=>{t.u=e=>"static/js/"+e+"."+{344:"72e848a9",460:"85eb8fdb",943:"0e0dc52d"}[e]+".js"})(),(()=>{t.miniCssF=e=>"static/css/"+e+"."+{460:"8872e30e",943:"496c5861"}[e]+".css"})(),(()=>{t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r)})(),(()=>{var e={},r="plugins:";t.l=(o,a,n,i)=>{if(e[o])e[o].push(a);else{var l,c;if(void 0!==n)for(var s=document.getElementsByTagName("script"),d=0;d<s.length;d++){var u=s[d];if(u.getAttribute("src")==o||u.getAttribute("data-webpack")==r+n){l=u;break}}l||(c=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,t.nc&&l.setAttribute("nonce",t.nc),l.setAttribute("data-webpack",r+n),l.src=o),e[o]=[a];var g=(r,t)=>{l.onerror=l.onload=null,clearTimeout(p);var a=e[o];if(delete e[o],l.parentNode&&l.parentNode.removeChild(l),a&&a.forEach((e=>e(t))),r)return r(t)},p=setTimeout(g.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=g.bind(null,l.onerror),l.onload=g.bind(null,l.onload),c&&document.head.appendChild(l)}}})(),(()=>{t.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{t.p=""})(),(()=>{if("undefined"!==typeof document){var e=(e,r,o,a,n)=>{var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",t.nc&&(i.nonce=t.nc);var l=t=>{if(i.onerror=i.onload=null,"load"===t.type)a();else{var o=t&&t.type,l=t&&t.target&&t.target.href||r,c=new Error("Loading CSS chunk "+e+" failed.\n("+o+": "+l+")");c.name="ChunkLoadError",c.code="CSS_CHUNK_LOAD_FAILED",c.type=o,c.request=l,i.parentNode&&i.parentNode.removeChild(i),n(c)}};return i.onerror=i.onload=l,i.href=r,o?o.parentNode.insertBefore(i,o.nextSibling):document.head.appendChild(i),i},r=(e,r)=>{for(var t=document.getElementsByTagName("link"),o=0;o<t.length;o++){var a=t[o],n=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(n===e||n===r))return a}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){a=i[o],n=a.getAttribute("data-href");if(n===e||n===r)return a}},o=o=>new Promise(((a,n)=>{var i=t.miniCssF(o),l=t.p+i;if(r(i,l))return a();e(o,l,null,a,n)})),a={524:0};t.f.miniCss=(e,r)=>{var t={460:1,943:1};a[e]?r.push(a[e]):0!==a[e]&&t[e]&&r.push(a[e]=o(e).then((()=>{a[e]=0}),(r=>{throw delete a[e],r})))}}})(),(()=>{var e={524:0};t.f.j=(r,o)=>{var a=t.o(e,r)?e[r]:void 0;if(0!==a)if(a)o.push(a[2]);else{var n=new Promise(((t,o)=>a=e[r]=[t,o]));o.push(a[2]=n);var i=t.p+t.u(r),l=new Error,c=o=>{if(t.o(e,r)&&(a=e[r],0!==a&&(e[r]=void 0),a)){var n=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;l.message="Loading chunk "+r+" failed.\n("+n+": "+i+")",l.name="ChunkLoadError",l.type=n,l.request=i,a[1](l)}};t.l(i,c,"chunk-"+r,r)}},t.O.j=r=>0===e[r];var r=(r,o)=>{var a,n,[i,l,c]=o,s=0;if(i.some((r=>0!==e[r]))){for(a in l)t.o(l,a)&&(t.m[a]=l[a]);if(c)var d=c(t)}for(r&&r(o);s<i.length;s++)n=i[s],t.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return t.O(d)},o=self["webpackChunkplugins"]=self["webpackChunkplugins"]||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})(),(()=>{t.nc=void 0})();var o=t.O(void 0,[504],(()=>t(2351)));o=t.O(o)})();
//# sourceMappingURL=app.66dad8e9.js.map