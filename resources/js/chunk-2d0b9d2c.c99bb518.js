(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9d2c"],{"351e":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{row:"","justify-center":""}},[n("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[t._v("Chat")])]),n("v-card-text",[n("v-container",{attrs:{"grid-list-md":""}},[n("v-layout",{attrs:{wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{attrs:{label:"Topic",required:"",rules:[t.rules.prohibited]},model:{value:t.displayTopic,callback:function(e){t.displayTopic=e},expression:"displayTopic"}})],1),n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{attrs:{label:"Content"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.enterClicked.apply(null,arguments)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},nativeOn:{click:function(e){return t.subscribe.apply(null,arguments)}}},[t._v("Subscribe")]),n("v-btn",{attrs:{color:"blue darken-1",text:""},nativeOn:{click:function(e){return t.send.apply(null,arguments)}}},[t._v("Send")])],1)],1)],1)],1)},s=[],l={props:{visible:{type:Boolean,default:!1},topic:{default:""}},data:function(){return{content:"",displayTopic:this.topic,rules:{prohibited:function(t){return"data"!=t&&"user"!=t&&"note"!=t||"Cannot use the reserved topic"}}}},computed:{show:{get:function(){return this.visible},set:function(t){t||(this.display=[],this.childshow=!1,this.$emit("close"))}}},methods:{send:function(){this.$store.commit("setnewpublish",[this.displayTopic,this.content])},subscribe:function(){this.$store.commit("setnewsubscribe",this.displayTopic)},enterClicked:function(){this.send()}}},o=l,c=n("2877"),r=Object(c["a"])(o,i,s,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0b9d2c.c99bb518.js.map