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
    }
  }
</script>

