(function(t){function e(e){for(var a,c,s=e[0],r=e[1],l=e[2],u=0,v=[];u<s.length;u++)c=s[u],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&v.push(n[c][0]),n[c]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);d&&d(e);while(v.length)v.shift()();return o.push.apply(o,l||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],a=!0,s=1;s<i.length;s++){var r=i[s];0!==n[r]&&(a=!1)}a&&(o.splice(e--,1),t=c(c.s=i[0]))}return t}var a={},n={app:0},o=[];function c(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,c),i.l=!0,i.exports}c.m=t,c.c=a,c.d=function(t,e,i){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(c.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(i,a,function(e){return t[e]}.bind(null,a));return i},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/mngsav/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],r=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var d=r;o.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"56d7":function(t,e,i){"use strict";i.r(e);i("a434"),i("b0c0");var a=i("5530"),n=(i("e260"),i("e6cf"),i("cca6"),i("a79d"),i("2b0e")),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[i("v-toolbar-title",[t._v("Manga Saver")]),i("v-spacer"),i("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",n,!1),a),[i("v-icon",[t._v("mdi-plus")])],1)]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[t.editing?i("v-card-title",[t._v("Edit an item")]):i("v-card-title",[t._v("Add an item")]),i("v-card-text",[i("v-container",{staticClass:"mt-2 pa-0"},[i("v-text-field",{attrs:{outlined:"",label:"Title",required:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),i("v-row",[i("v-text-field",{staticClass:"mx-3",attrs:{outlined:"",label:"Volume",type:"number",required:""},model:{value:t.volume,callback:function(e){t.volume=e},expression:"volume"}}),i("v-text-field",{staticClass:"mx-3",attrs:{outlined:"",label:"Chapter",type:"number",required:""},model:{value:t.chapter,callback:function(e){t.chapter=e},expression:"chapter"}})],1),i("v-text-field",{attrs:{outlined:"",label:"Link",required:""},model:{value:t.link,callback:function(e){t.link=e},expression:"link"}}),t.editing?i("v-checkbox",{attrs:{checked:"",label:"Change Image"},model:{value:t.editImage,callback:function(e){t.editImage=e},expression:"editImage"}}):t._e(),i("v-file-input",{attrs:{outlined:"",label:"Image",accept:"image/*","prepend-icon":"mdi-image",disabled:!t.editImage},model:{value:t.imageInput,callback:function(e){t.imageInput=e},expression:"imageInput"}}),t.editing?i("v-checkbox",{attrs:{checked:"",label:"Change Section"},model:{value:t.isEditingSection,callback:function(e){t.isEditingSection=e},expression:"isEditingSection"}}):t._e(),i("v-select",{staticClass:"ma-0",attrs:{label:"Section",items:t.sectionList,outlined:"",disabled:!t.isEditingSection},model:{value:t.section,callback:function(e){t.section=e},expression:"section"}})],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{text:""},on:{click:t.okClick}},[t._v("OK")]),i("v-btn",{attrs:{text:""},on:{click:t.cancelClick}},[t._v("Cancel")])],1)],1)],1),i("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:t.sectionDialog,callback:function(e){t.sectionDialog=e},expression:"sectionDialog"}},[i("v-card",[t.editing?i("v-card-title",[t._v("Edit a Section")]):i("v-card-title",[t._v("Add a Section")]),i("v-card-text",[i("v-container",[i("v-text-field",{attrs:{label:"Name",outlined:""},model:{value:t.sectionName,callback:function(e){t.sectionName=e},expression:"sectionName"}})],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{text:""},on:{click:t.sectionOkClick}},[t._v("OK")]),i("v-btn",{attrs:{text:""},on:{click:t.cancelClick}},[t._v("Cancel")])],1)],1)],1),i("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",n,!1),a),[i("v-icon",[t._v("mdi-dots-vertical")])],1)]}}])},[i("v-list",{attrs:{dense:""}},[i("v-list-item",{on:{click:function(e){t.sectionDialog=!0}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-plus")])],1),i("v-list-item-title",[t._v("Add a Section")])],1),i("v-list-item",{on:{click:function(e){return t.editSection(t.currentSection)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-pencil")])],1),i("v-list-item-title",[t._v("Edit active Section")])],1),i("v-list-item",{on:{click:function(e){return t.removeSection(t.currentSection)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-delete")])],1),i("v-list-item-title",[t._v("Remove active Section")])],1),i("v-list-item",{on:{click:t.saveData}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-download")])],1),i("v-list-item-title",[t._v("Save data")])],1),i("v-list-item",{on:{click:t.loadData}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-upload")])],1),i("v-list-item-title",[t._v("Load data")])],1),i("v-list-item",{on:{click:t.saveDataToFile}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-file-download")])],1),i("v-list-item-title",[t._v("Save data to file")])],1),i("v-list-item",{on:{click:t.loadDataFromFile}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-file-upload")])],1),i("v-list-item-title",[t._v("Load data from file")])],1),i("v-list-item",{on:{click:t.debugClick}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-bug")])],1),i("v-list-item-title",[t._v("Fix IDs (if something broke)")])],1)],1)],1)],1),i("v-main",[i("v-tabs",{attrs:{color:"amber darken-4",centered:""},model:{value:t.currentSection,callback:function(e){t.currentSection=e},expression:"currentSection"}},[t._l(this.$store.state.data,(function(e){return i("v-tab",{key:e.id},[t._v(t._s(e.name))])})),i("v-tabs-items",{model:{value:t.currentSection,callback:function(e){t.currentSection=e},expression:"currentSection"}},t._l(this.$store.state.data,(function(e){return i("v-tab-item",{key:e.id},[i("v-container",{staticClass:"d-flex flex-wrap justify-center ma-0 pa-0",attrs:{fluid:""}},[0===e.cards.length?i("p",{staticClass:"mt-4"},[t._v("You have no mangas added. Add one with the + button in the toolbar.")]):t._e(),t._l(e.cards,(function(a){return i("v-card",{key:a.id,staticClass:"ma-2 gradient",attrs:{width:t.cardWidth,href:a.link,img:a.image}},[i("v-img",{attrs:{gradient:t.cardGradient,height:t.cardHeight,cover:""}},[i("v-card-title",[t._v(t._s(a.title))]),i("v-card-text",[t._v("Position: "+t._s(a.volume)+" - "+t._s(a.chapter))])],1),i("v-card-actions",{staticClass:"cardActionsGrad"},[i("v-btn",{attrs:{icon:""},on:{click:function(i){return i.preventDefault(),t.changeByOne(e.id,a.id,!0,!1)},mousedown:function(t){t.stopPropagation()},touchstart:function(t){t.stopPropagation()}}},[i("v-icon",[t._v("mdi-plus")])],1),i("v-btn",{attrs:{icon:""},on:{click:function(i){return i.preventDefault(),t.changeByOne(e.id,a.id,!1,!1)},mousedown:function(t){t.stopPropagation()},touchstart:function(t){t.stopPropagation()}}},[i("v-icon",[t._v("mdi-minus")])],1),i("v-spacer"),i("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({staticClass:"ml-2",attrs:{icon:""},on:{click:function(t){t.preventDefault()},mousedown:function(t){t.stopPropagation()},touchstart:function(t){t.stopPropagation()}}},"v-btn",n,!1),a),[i("v-icon",[t._v("mdi-dots-horizontal")])],1)]}}],null,!0)},[i("v-list",{attrs:{dense:""}},[i("v-list-item",{on:{click:function(i){return t.editCard(e.id,a.id)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-pencil")])],1),i("v-list-item-title",[t._v("Edit")])],1),i("v-list-item",{on:{click:function(i){return t.removeCard(e.id,a.id)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-delete")])],1),i("v-list-item-title",[t._v("Delete")])],1),i("v-list-item",{on:{click:function(i){return t.changeByOne(e.id,a.id,!0,!0)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-book-plus")])],1),i("v-list-item-title",[t._v("+1 to volume")])],1),i("v-list-item",{on:{click:function(i){return t.changeByOne(e.id,a.id,!1,!0)}}},[i("v-list-item-icon",[i("v-icon",[t._v("mdi-book-minus")])],1),i("v-list-item-title",[t._v("-1 from volume")])],1)],1)],1)],1)],1)}))],2)],1)})),1)],2)],1)],1)},c=[],s=(i("9911"),i("2f62")),r=i("36d5"),l=i("21a6"),d=i("2432"),u=new d({targetSize:.2,maxWidth:500,maxHeight:800}),v={name:"App",data:function(){return{dialog:!1,editing:!1,editImage:!0,editingId:null,title:"",volume:null,chapter:null,link:"",imageInput:null,section:null,currentSection:0,isEditingSection:!0,sectionDialog:!1,sectionName:null}},computed:Object(a["a"])(Object(a["a"])({},Object(s["b"])(["sectionList"])),{},{cardWidth:function(){switch(this.$vuetify.breakpoint.name){case"xs":return"195px";default:return"300px"}},cardHeight:function(){switch(this.$vuetify.breakpoint.name){case"xs":return"250px";default:return"450px"}},cardGradient:function(){switch(this.$vuetify.breakpoint.name){case"xs":return"to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .1) 40%, rgba(0, 0, 0, 0)";default:return"to bottom, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .1) 30%, rgba(0, 0, 0, 0)"}}}),methods:{okClick:function(){var t=this;this.dialog=!1;var e=new FileReader,i={},n={};i=this.editing?Object(a["a"])(Object(a["a"])({},this.$store.state.cards[this.editingId]),{},{title:this.title,volume:parseInt(this.volume),chapter:parseInt(this.chapter),link:this.link}):{title:this.title,volume:parseInt(this.volume),chapter:parseInt(this.chapter),link:this.link},this.editImage?u.compress([this.imageInput]).then((function(a){e.onloadend=function(){i.image=e.result,n.data=i,n.section=t.section,t.editing?t.$store.commit("editCard",{id:t.editingId,newData:i,section:t.section,changeSection:t.isEditingSection}):(t.$store.commit("addCard",n),console.log(n)),t.setDefaults()},e.readAsDataURL(a[0].photo.data)})):(this.editing&&this.$store.commit("editCard",{id:this.editingId,newData:i,section:this.section,currentSection:this.currentSection,changeSection:this.isEditingSection}),this.setDefaults())},setDefaults:function(){this.dialog=!1,this.editing=!1,this.editImage=!0,this.editingId=null,this.title="",this.volume=null,this.chapter=null,this.link="",this.imageInput=null,this.section=this.sectionList[0],this.isEditingSection=!0,this.sectionDialog=!1,this.sectionName=null},cancelClick:function(){this.setDefaults()},sectionOkClick:function(){this.sectionDialog=!1,this.editing?this.$store.commit("editSection",{id:this.editingId,newName:this.sectionName}):this.$store.commit("addSection",this.sectionName),this.setDefaults()},changeByOne:function(t,e,i,a){var n,o=-1;i&&(o=1),n=a?{volume:this.$store.state.data[t].cards[e].volume+o}:{chapter:this.$store.state.data[t].cards[e].chapter+o},this.$store.commit("editCard",{id:e,newData:n,section:t})},editCard:function(t,e){this.editingId=e,this.editImage=!1,this.editing=!0;var i=this.$store.state.data[t].cards[e];this.title=i.title,this.volume=i.volume,this.chapter=i.chapter,this.link=i.link,this.isEditingSection=!1,this.section=t,this.dialog=!0},editSection:function(t){this.editingId=t,this.editing=!0,this.sectionName=this.$store.state.data[t].name,this.sectionDialog=!0},removeSection:function(t){this.$store.commit("removeSection",t)},removeCard:function(t,e){this.$store.commit("removeCard",{id:e,section:t})},saveData:function(){this.$store.commit("saveData")},loadData:function(){this.$store.commit("loadData")},saveDataToFile:function(){var t=new File([JSON.stringify(this.$store.state.data)],"MangaSaver_DataFile.json",{type:"text/plain;charset=utf-8"});l.saveAs(t)},loadDataFromFile:function(){var t=this;r().then((function(e){e[0].text().then((function(e){t.$store.commit("loadDataFromObject",JSON.parse(e))}))}))},debugClick:function(){this.$store.commit("fixIDs")}}},m=v,f=(i("be6f"),i("2877")),h=i("6544"),p=i.n(h),g=i("7496"),b=i("40dc"),k=i("8336"),_=i("b0af"),S=i("99d9"),x=i("ac7c"),D=i("a523"),C=i("169a"),I=i("23a7"),w=i("132d"),y=i("adda"),O=i("8860"),V=i("da13"),j=i("34c3"),$=i("5d23"),F=i("f6c4"),E=i("e449"),N=i("0fd9"),T=i("b974"),P=i("2fa4"),A=i("71a3"),L=i("c671"),B=i("fe57"),M=i("aac8"),J=i("8654"),q=i("2a7f"),R=Object(f["a"])(m,o,c,!1,null,"2d0ad95a",null),G=R.exports;p()(R,{VApp:g["a"],VAppBar:b["a"],VBtn:k["a"],VCard:_["a"],VCardActions:S["a"],VCardText:S["b"],VCardTitle:S["c"],VCheckbox:x["a"],VContainer:D["a"],VDialog:C["a"],VFileInput:I["a"],VIcon:w["a"],VImg:y["a"],VList:O["a"],VListItem:V["a"],VListItemIcon:j["a"],VListItemTitle:$["b"],VMain:F["a"],VMenu:E["a"],VRow:N["a"],VSelect:T["a"],VSpacer:P["a"],VTab:A["a"],VTabItem:L["a"],VTabs:B["a"],VTabsItems:M["a"],VTextField:J["a"],VToolbarTitle:q["a"]});var H=i("f309");n["a"].use(H["a"]);var W=new H["a"]({theme:{dark:!0,themes:{dark:{primary:"#7854C1",accent:"#5E35B1",secondary:"#A477FF",success:"#4CAF50",info:"#2196F3",warning:"#FB8C00",error:"#FF5252"}}}});n["a"].use(s["a"]);var z=new s["a"].Store({state:{cards:[],data:[{id:0,name:"Default",cards:[]}]},getters:{sectionList:function(t){for(var e=[],i=0;i<t.data.length;i++)e.push({text:t.data[i].name,value:i});return e}},mutations:{addCard:function(t,e){t.data[e.section].cards.push(Object(a["a"])({id:t.data[e.section].cards.length},e.data))},editCard:function(t,e){for(var i in e.changeSection?(t.data[e.section].cards.push(Object(a["a"])(Object(a["a"])({},t.data[e.currentSection].cards[e.id]),{},{id:t.data[e.section].cards.length},e.newData)),t.data[e.currentSection].cards.splice(e.id,1)):t.data[e.section].cards.splice(e.id,1,Object(a["a"])(Object(a["a"])({},t.data[e.section].cards[e.id]),e.newData)),t.data)for(var n in t.data[i].id=i,t.data[i].cards)t.data[i].cards[n].id=n},removeCard:function(t,e){var i;for(i in t.data[e.section].cards.splice(e.id,1),t.data[e.section].cards)t.data[e.section].cards[i].id=i},addSection:function(t,e){t.data.push({id:t.data.length,name:e,cards:[]})},editSection:function(t,e){var i;for(i in t.data.splice(e.id,1,Object(a["a"])(Object(a["a"])({},t.data[e.id]),{},{name:e.newName})),t.data)t.data[i].id=i},removeSection:function(t,e){var i;for(i in t.data.splice(e,1),t.data)t.data[i].id=i},saveData:function(t){localStorage.setItem("data",JSON.stringify(t.data))},loadData:function(t){var e=JSON.parse(localStorage.getItem("cards")),i=JSON.parse(localStorage.getItem("data"));null!==e&&null===i&&(t.data=[{id:0,name:"Default",cards:e}],localStorage.removeItem("cards")),null!==i&&(t.data=i)},loadDataFromObject:function(t,e){t.data=e},fixIDs:function(t){for(var e in t.data)for(var i in t.data[e].id=e,t.data[e].cards)t.data[e].cards[i].id=i}}});n["a"].config.productionTip=!1,new n["a"]({vuetify:W,store:z,render:function(t){return t(G)},created:function(){z.commit("loadData"),window.addEventListener("beforeunload",(function(){z.commit("saveData")}))}}).$mount("#app")},"7ed6":function(t,e,i){},be6f:function(t,e,i){"use strict";var a=i("7ed6"),n=i.n(a);n.a}});
//# sourceMappingURL=app.a71e8d87.js.map