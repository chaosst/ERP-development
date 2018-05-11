<style scoped>
  #helloworld {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .mylist{
    list-style:none;
  }
</style>
<template>
  <div id="helloworld">
    <button @click="changeVal">App组件修改a值</button>
    <p>a的值：{{ a }}</p>
    <p>属性计算后的a值：{{ reversedA }}</p>
    <br><br>
    <span v-html="myhtml"></span>
    <br><br>
    v-model双向绑定inputVal：<input v-model="inputVal" />
    <p>{{inputVal}}</p>
    <p>inputVal的输入状态：{{inputMsg}}</p>
    <br><br>
    <p>数组列表循环：</p>
    <ul class="mylist">
      <li v-for="data in mydata">{{data.name}}-{{data.age}}</li>
    </ul>
    <p>对象列表循环：</p>
    <ul class="mylist">
      <li v-for="value in myobj">{{value}}</li>
    </ul>
    <p>数字循环：</p>
    <ul class="mylist">
      <span v-for="value of 10">{{value}}</span>
    </ul>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  export default {
    name:"index",
    data () {
      return {
        a: '修改前',
        myhtml:"<span style='color:red;'>红色字体</span>",
        inputVal:"val1",
        mydata:[
          {name:"AA", age:23, sex:"男"},
          {name:"BB", age:27, sex:"女"},
          {name:"CC", age:23, sex:"男"},
          {name:"DD", age:24, sex:"女"},
          {name:"EE", age:21, sex:"男"},
        ],
        myobj:{name:"AA", age:23, sex:"男"},
        inputMsg:"待输入"
      }
    },
    methods:{
      changeVal(e){
        this.a = "已修改";
      }
    },
    computed: {
      // 计算属性的 getter
      reversedA: function () {
        return this.a.split('').reverse().join('')
      }
    },
    watch:{
      inputVal: function (newval, oldval) {
        this.inputMsg = '正在输入...';
        setTimeout(() => {
          this.inputMsg = '待输入';
        }, 500);
      }
    }
  }
</script>
