"use strict";(self["webpackChunksacc_recruit_new"]=self["webpackChunksacc_recruit_new"]||[]).push([[124],{5124:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"AnswerPage"},[t("router-view"),t("div",{staticClass:"answer-content"},[t("div",{staticClass:"content-body"},[t("div",{staticClass:"top-head"},[t("p",{staticClass:"body-title"},[e._v(e._s(e.unit_name))]),t("el-link",{staticClass:"backBtn",attrs:{type:"primary",underline:!1},on:{click:e.back}},[e._v("返回")])],1),t("div",{staticClass:"description",domProps:{innerHTML:e._s(e.description)}}),t("div",{staticClass:"title-body"},e._l(e.problem_list,(function(a,s){return t("div",{key:a.id,staticClass:"user-title"},[t("div",{staticClass:"title-head"},[t("div",[e._v(e._s(s+1)+".")]),t("el-tag",{staticClass:"tag"},[e._v(e._s(a.problem_type))]),t("div",{domProps:{innerHTML:e._s(a.problem_description)}})],1),a.picture_url?t("div",{staticClass:"img"},e._l(a.picture_url,(function(e,a){return t("div",{key:a},[t("img",{staticStyle:{height:"35vh","object-fit":"fill","text-align":"left"},attrs:{src:e,alt:"图片"}})])})),0):e._e(),t("div",{staticClass:"title-content"},["单选"===a.problem_type?t("div",{staticClass:"radioBox"},[t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:a.value,expression:"item.value"}],attrs:{type:"radio",name:a.id,value:"A"},domProps:{checked:e._q(a.value,"A")},on:{change:function(t){return e.$set(a,"value","A")}}}),e._v(" "+e._s(a.A))]),t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:a.value,expression:"item.value"}],attrs:{type:"radio",name:a.id,value:"B"},domProps:{checked:e._q(a.value,"B")},on:{change:function(t){return e.$set(a,"value","B")}}}),e._v(" "+e._s(a.B))]),t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:a.value,expression:"item.value"}],attrs:{type:"radio",name:a.id,value:"C"},domProps:{checked:e._q(a.value,"C")},on:{change:function(t){return e.$set(a,"value","C")}}}),e._v(" "+e._s(a.C))]),t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:a.value,expression:"item.value"}],attrs:{type:"radio",name:a.id,value:"D"},domProps:{checked:e._q(a.value,"D")},on:{change:function(t){return e.$set(a,"value","D")}}}),e._v(" "+e._s(a.D))])]):"多选"===a.problem_type?t("div",{staticClass:"checkBox"},[t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:a.value,expression:"item.value"}],attrs:{type:"checkbox",name:a.id,value:"A"},domProps:{checked:Array.isArray(a.value)?e._i(a.value,"A")>-1:a.value},on:{change:function(t){var s=a.value,r=t.target,l=!!r.checked;if(Array.isArray(s)){var i="A",n=e._i(s,i);r.checked?n<0&&e.$set(a,"value",s.concat([i])):n>-1&&e.$set(a,"value",s.slice(0,n).concat(s.slice(n+1)))}else e.$set(a,"value",l)}}}),e._v(" "+e._s(a.A))]),t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:a.value,expression:"item.value"}],attrs:{type:"checkbox",value:"B"},domProps:{checked:Array.isArray(a.value)?e._i(a.value,"B")>-1:a.value},on:{change:function(t){var s=a.value,r=t.target,l=!!r.checked;if(Array.isArray(s)){var i="B",n=e._i(s,i);r.checked?n<0&&e.$set(a,"value",s.concat([i])):n>-1&&e.$set(a,"value",s.slice(0,n).concat(s.slice(n+1)))}else e.$set(a,"value",l)}}}),e._v(" "+e._s(a.B))]),t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:a.value,expression:"item.value"}],attrs:{type:"checkbox",value:"C"},domProps:{checked:Array.isArray(a.value)?e._i(a.value,"C")>-1:a.value},on:{change:function(t){var s=a.value,r=t.target,l=!!r.checked;if(Array.isArray(s)){var i="C",n=e._i(s,i);r.checked?n<0&&e.$set(a,"value",s.concat([i])):n>-1&&e.$set(a,"value",s.slice(0,n).concat(s.slice(n+1)))}else e.$set(a,"value",l)}}}),e._v(" "+e._s(a.C))]),t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:a.value,expression:"item.value"}],attrs:{type:"checkbox",value:"D"},domProps:{checked:Array.isArray(a.value)?e._i(a.value,"D")>-1:a.value},on:{change:function(t){var s=a.value,r=t.target,l=!!r.checked;if(Array.isArray(s)){var i="D",n=e._i(s,i);r.checked?n<0&&e.$set(a,"value",s.concat([i])):n>-1&&e.$set(a,"value",s.slice(0,n).concat(s.slice(n+1)))}else e.$set(a,"value",l)}}}),e._v(" "+e._s(a.D))])]):"简答"===a.problem_type?t("div",{staticClass:"inputBox"},[t("el-input",{staticClass:"input",attrs:{type:"textarea",rows:4,placeholder:"在此输入你的答案"},model:{value:a.value,callback:function(t){e.$set(a,"value",t)},expression:"item.value"}})],1):e._e()])])})),0),t("el-button",{staticClass:"saveBtn",attrs:{type:"primary","cursor:pointer":""},on:{click:e.uploadAnswer}},[e._v(" 保存 ")]),t("div",{staticClass:"title-footer"},[t("el-button",{staticClass:"btn",attrs:{type:"primary","cursor:pointer":""},on:{click:e.submitAnswer}},[e._v("提交")])],1)],1)])],1)},r=[],l=a(2900),i={name:"user-answer",data(){return{unit_name:"",description:"",problem_list:[],answer:[]}},methods:{submitAnswer(){this.answer=[];for(let e of this.problem_list){if(console.log(e),"多选"===e.problem_type){let t="";for(let a of e.value)t+=a;console.log(t),e.answer=t}else e.answer=e.value;this.answer.push({problemId:e.problem_id,content:e.content})}(0,l.E)(this.answer,this.$router.currentRoute.params.unit_id).then((()=>{this.$message({message:"提交成功",type:"success"}),this.$router.push("/userhome/success")}))},uploadAnswer(){this.answer=[];for(let e of this.listObj){if("多选"===e.type){let t="";for(let a of e.value)t+=a;e.content=t}else e.content=e.value;""!==e.content&&this.answer.push({id:e.id,content:e.content})}(0,l.E)(this.answer,this.$router.currentRoute.params.unit).then((()=>{this.$message({message:"保存成功",type:"success"})})).catch((()=>{this.$message({message:"保存失败,请重试",type:"warning"})}))},back(){this.$router.push("/userhome"),location.reload()}},mounted(){"0"===localStorage.getItem("role")?(0,l._)(this.$router.currentRoute.params.unit_id).then((e=>{const t=e.data.data.problem_list;console.log(e.data.data),t.forEach((e=>{if(null!==e.picture_url&&(e.picture_url=e.picture_url.split("|")),0===e.problem_type)e.problem_type="单选",e.value=e.answer;else if(1===e.problem_type){e.problem_type="多选",e.value=[];let t=e.answer.split("");for(let a in t)e.value.push(t[a])}else e.type="简答",e.value=e.answer})),this.unit_name=e.data.data.unit_name,this.description=e.data.data.unit_description,this.problem_list=t})):this.$router.back()}},n=i,o=a(1001),c=(0,o.Z)(n,s,r,!1,null,"7adc1ad6",null),u=c.exports},2900:function(e,t,a){a.d(t,{E:function(){return l},_:function(){return r}});var s=a(4051);const r=e=>(e=Number(e),(0,s.J5)({method:"get",url:"/normal/getList?unitId="+e,data:{}})),l=(e,t)=>(0,s.J5)({method:"post",url:"/normal/commitAnswer",data:e,params:{unitId:t}})}}]);
//# sourceMappingURL=124.4cca1fac.js.map