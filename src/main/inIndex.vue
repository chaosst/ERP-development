<style scoped>
  .inIndexBox{
    width:100%;
    height:100%;
  }
  .window{
    width:100%;height:100%;
    background:#000;
    opacity: 0.5;
    position:absolute;
    top: 0;
  }
</style>
<template>
  <div class="inIndexBox" v-cloak>
    <keep-alive :include="mytabs">
      <router-view style="width:100%;height:100%;"></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import Vue from "vue";
  export default {
    data () {
      return {
        mytabs:["index"],
      }
    },
    watch:{
      mytabs:function(){
        console.log(this.mytabs);
      }
    },
    methods:{
    },
    updated(){
      //如果iframe的url改变，则对父窗口的tab页参数url进行修改，修复页面弹窗后url改变，切换tab页再回到原来页空白的问题
      var $parent = window.parent.document;
      var path = window.location.hash.replace("#","");
      if(window.parent) {
        var $root = window.parent.$vueEl.$children[0];
        var name = $root.tabsValue;
        $root.tabs[name].src = path;
      }
      //修复切换tab页的时候，下拉框不消失的问题
      Vue.fromArray(Vue.getEl(".el-picker-panel")).forEach(function(item){
        if(!item.isHidden())item.hide();
      });
      Vue.fromArray(Vue.getEl(".el-cascader-menus")).forEach(function(item){
        console.log(122)
        if(!item.isHidden())item.hide();
      });
    }
  }
</script>

