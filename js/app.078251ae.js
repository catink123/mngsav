(function(t){function e(e){for(var a,o,l=e[0],s=e[1],c=e[2],u=0,v=[];u<l.length;u++)o=l[u],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&v.push(n[o][0]),n[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);d&&d(e);while(v.length)v.shift()();return r.push.apply(r,c||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],a=!0,l=1;l<i.length;l++){var s=i[l];0!==n[s]&&(a=!1)}a&&(r.splice(e--,1),t=o(o.s=i[0]))}return t}var a={},n={app:0},r=[];function o(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=a,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(i,a,function(e){return t[e]}.bind(null,a));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/mngsav/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var d=s;r.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"56d7":function(t,e,i){"use strict";i.r(e);i("a434");var a=i("5530"),n=(i("e260"),i("e6cf"),i("cca6"),i("a79d"),i("2b0e")),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[i("v-toolbar-title",[t._v("Manga Saver")]),i("v-spacer"),i("v-tooltip",{attrs:{bottom:"","open-delay":500},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:""},on:{click:t.saveData}},"v-btn",n,!1),a),[i("v-icon",[t._v("mdi-download")])],1)]}}])},[i("span",[t._v("Save")])]),i("v-tooltip",{attrs:{bottom:"","open-delay":500},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:""},on:{click:t.loadData}},"v-btn",n,!1),a),[i("v-icon",[t._v("mdi-upload")])],1)]}}])},[i("span",[t._v("Load")])]),i("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",n,!1),a),[i("v-icon",[t._v("mdi-plus")])],1)]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[t.editing?i("v-card-title",[t._v("Edit an item")]):i("v-card-title",[t._v("Add an item")]),i("v-card-text",[i("v-container",{staticClass:"mt-2 pa-0"},[i("v-text-field",{attrs:{outlined:"",label:"Title",required:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),i("v-row",[i("v-text-field",{staticClass:"mx-3",attrs:{outlined:"",label:"Volume",type:"number",required:""},model:{value:t.volume,callback:function(e){t.volume=e},expression:"volume"}}),i("v-text-field",{staticClass:"mx-3",attrs:{outlined:"",label:"Chapter",type:"number",required:""},model:{value:t.chapter,callback:function(e){t.chapter=e},expression:"chapter"}})],1),i("v-text-field",{attrs:{outlined:"",label:"Link",required:""},model:{value:t.link,callback:function(e){t.link=e},expression:"link"}}),t.editing?i("v-checkbox",{attrs:{checked:"",label:"Change Image"},model:{value:t.editImage,callback:function(e){t.editImage=e},expression:"editImage"}}):t._e(),i("v-file-input",{attrs:{outlined:"",label:"Image",accept:"image/*","prepend-icon":"mdi-camera",disabled:!t.editImage},model:{value:t.imageInput,callback:function(e){t.imageInput=e},expression:"imageInput"}})],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{text:""},on:{click:t.okClick}},[t._v("OK")]),i("v-btn",{attrs:{text:""},on:{click:t.cancelClick}},[t._v("Cancel")])],1)],1)],1)],1),i("v-main",[i("v-container",{staticClass:"d-flex flex-wrap justify-center",attrs:{fluid:""}},[0===this.$store.state.cards.length?i("p",[t._v("You have no mangas added. Add one with the + button in the toolbar.")]):t._e(),t._l(this.$store.state.cards,(function(e){return i("v-card",{key:e.id,staticClass:"ma-2",attrs:{width:"300px"}},[i("v-img",{attrs:{gradient:"to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .1) 30%, rgba(0, 0, 0, 0)",src:e.image,height:"450px",cover:""}},[i("v-card-title",[t._v(t._s(e.title))]),i("v-card-text",[t._v("Position: "+t._s(e.volume)+" - "+t._s(e.chapter))])],1),i("v-card-actions",[i("v-btn",{attrs:{icon:""},on:{click:function(i){return t.changeByOne(e.id,!0,!1)}}},[i("v-icon",[t._v("mdi-plus")])],1),i("v-btn",{attrs:{icon:""},on:{click:function(i){return t.changeByOne(e.id,!1,!1)}}},[i("v-icon",[t._v("mdi-minus")])],1),i("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",n,!1),a),[i("v-icon",[t._v("mdi-dots-horizontal")])],1)]}}],null,!0)},[i("v-list",{attrs:{dense:""}},[i("v-list-item",{on:{click:function(i){return t.editCard(e.id)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-pencil")])],1),i("v-list-item-title",[t._v("Edit")])],1),i("v-list-item",{on:{click:function(i){return t.removeCard(e.id)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-delete")])],1),i("v-list-item-title",[t._v("Delete")])],1),i("v-list-item",{on:{click:function(i){return t.changeByOne(e.id,!0,!0)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-book-plus")])],1),i("v-list-item-title",[t._v("+1 to volume")])],1),i("v-list-item",{on:{click:function(i){return t.changeByOne(e.id,!1,!0)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-book-minus")])],1),i("v-list-item-title",[t._v("-1 from volume")])],1)],1)],1),i("v-spacer"),i("v-btn",{attrs:{href:e.link,text:""}},[t._v("Go")])],1)],1)}))],2)],1)],1)},o=[],l=(i("9911"),i("2432")),s=new l({targetSize:.2,maxWidth:500,maxHeight:800}),c={name:"App",data:function(){return{dialog:!1,editing:!1,editImage:!0,editingId:null,title:"",volume:null,chapter:null,link:"",imageInput:null}},methods:{okClick:function(){var t=this;this.dialog=!1;var e=new FileReader,i={};i=this.editing?Object(a["a"])(Object(a["a"])({},this.$store.state.cards[this.editingId]),{},{title:this.title,volume:parseInt(this.volume),chapter:parseInt(this.chapter),link:this.link}):{title:this.title,volume:parseInt(this.volume),chapter:parseInt(this.chapter),link:this.link},this.editImage?s.compress([this.imageInput]).then((function(a){e.onloadend=function(){i.image=e.result,t.editing?t.$store.commit("editCard",{id:t.editingId,newData:i}):t.$store.commit("addCard",i),t.editing=!1,t.editImage=!0,t.editingId=null,t.title="",t.volume=null,t.chapter=null,t.link="",t.imageInput=null},e.readAsDataURL(a[0].photo.data)})):(this.editing&&this.$store.commit("editCard",{id:this.editingId,newData:i}),this.editing=!1,this.editImage=!0,this.editingId=null,this.title="",this.volume=null,this.chapter=null,this.link="",this.imageInput=null)},cancelClick:function(){this.dialog=!1,this.editing=!1,this.editImage=!0,this.editingId=null,this.title="",this.volume=null,this.chapter=null,this.link="",this.imageInput=null},changeByOne:function(t,e,i){var a,n=-1;e&&(n=1),a=i?{volume:this.$store.state.cards[t].volume+n}:{chapter:this.$store.state.cards[t].chapter+n},this.$store.commit("editCard",{id:t,newData:a})},editCard:function(t){this.editingId=t,this.editImage=!1,this.editing=!0,this.title=this.$store.state.cards[t].title,this.volume=this.$store.state.cards[t].volume,this.chapter=this.$store.state.cards[t].chapter,this.link=this.$store.state.cards[t].link,this.dialog=!0},removeCard:function(t){this.$store.commit("removeCard",t)},saveData:function(){this.$store.commit("saveData")},loadData:function(){this.$store.commit("loadData")}}},d=c,u=i("2877"),v=i("6544"),m=i.n(v),p=i("7496"),h=i("40dc"),f=i("8336"),g=i("b0af"),b=i("99d9"),k=i("ac7c"),_=i("a523"),I=i("169a"),y=i("23a7"),x=i("132d"),C=i("adda"),w=i("8860"),O=i("da13"),V=i("34c3"),D=i("5d23"),S=i("f6c4"),$=i("e449"),j=i("0fd9"),F=i("2fa4"),B=i("8654"),T=i("2a7f"),A=i("3a2f"),L=Object(u["a"])(d,r,o,!1,null,null,null),P=L.exports;m()(L,{VApp:p["a"],VAppBar:h["a"],VBtn:f["a"],VCard:g["a"],VCardActions:b["a"],VCardText:b["b"],VCardTitle:b["c"],VCheckbox:k["a"],VContainer:_["a"],VDialog:I["a"],VFileInput:y["a"],VIcon:x["a"],VImg:C["a"],VList:w["a"],VListItem:O["a"],VListItemIcon:V["a"],VListItemTitle:D["a"],VMain:S["a"],VMenu:$["a"],VRow:j["a"],VSpacer:F["a"],VTextField:B["a"],VToolbarTitle:T["a"],VTooltip:A["a"]});var E=i("f309");n["a"].use(E["a"]);var M=new E["a"]({theme:{dark:!0,themes:{dark:{primary:"#5E35B1",accent:"#7E57C2",secondary:"#5E35B1",success:"#4CAF50",info:"#2196F3",warning:"#FB8C00",error:"#FF5252"},light:{primary:"#1976D2",accent:"#e91e63",secondary:"#30b1dc",success:"#4CAF50",info:"#2196F3",warning:"#FB8C00",error:"#FF5252"}}}}),q=i("2f62");n["a"].use(q["a"]);var J=new q["a"].Store({state:{cards:[]},mutations:{addCard:function(t,e){t.cards.push(Object(a["a"])({id:t.cards.length},e))},editCard:function(t,e){t.cards.splice(e.id,1,Object(a["a"])(Object(a["a"])({},t.cards[e.id]),e.newData))},removeCard:function(t,e){var i;for(i in t.cards.splice(e,1),t.cards)t.cards[i].id=i},saveData:function(t){localStorage.setItem("cards",JSON.stringify(t.cards))},loadData:function(t){var e=JSON.parse(localStorage.getItem("cards"));null!==e&&(t.cards=e)}}});n["a"].config.productionTip=!1,new n["a"]({vuetify:M,store:J,render:function(t){return t(P)},created:function(){J.commit("loadData"),window.addEventListener("beforeunload",(function(){J.commit("saveData")}))}}).$mount("#app")}});
//# sourceMappingURL=app.078251ae.js.map