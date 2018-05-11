<style scoped>
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    width:100%;
    height:100%;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .menuList{

  }
  .meanList ul{
    list-style:none;
    padding:0;
  }
  .meanList ul li{
    height:50px;
    padding:0 20px;
    color:#fff;
    line-height:50px;
  }
  .meanList ul li:hover{
    background:#fff;
    color:#010e1f;
  }
  .meanPop label{
    font-weight:bolder;
    padding:20px 0;
    width:100%;
    float:left;
    text-align:center;
  }
  .meanPop ul{
    list-style:none;
    padding:0;
    text-align:center;
  }
  .meanPop ul li{
    width:80px;
    padding:10px 10px;
    cursor:pointer;
  }
  .meanPop ul li:hover{
    color:#010e1f;
  }
</style>
<template>
  <div class="layout">
    <el-container style="height:100%;">
      <el-header style="text-align: right; font-size: 12px;background-color: #010e1f">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="18">
            <div class="headerBtnBox">
              <el-button type="text" icon=""></el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="150px" style="background-color: #010e1f">
          <div class="meanList">
            <ul>
              <li v-popover:popover1><i class="el-icon-fant-order">进销存</i></li>
              <li><i class="el-icon-fant-setup">设置</i></li>
            </ul>
          </div>
          <el-popover
            ref="popover1"
            placement="right-start"
            popper-class="meanPop"
            trigger="hover">
              <el-row>
                <el-col :span="8">
                  <label>采购</label>
                  <ul>
                    <li @click="tabOpen">采购入库</li>
                    <li>采购订单</li>
                    <li>采购出库</li>
                    <li>采购退货</li>
                  </ul>
                </el-col>
                <el-col :span="8">
                  <label>销售</label>
                  <ul>
                    <li>销售报价</li>
                    <li>销售订单</li>
                    <li>销售出货</li>
                    <li>销售退货</li>
                  </ul>
                </el-col>
                <el-col :span="8">
                  <label>仓库</label>
                  <ul>
                    <li>调仓单</li>
                    <li>盘点单</li>
                    <li>报损单</li>
                  </ul>
                </el-col>
              </el-row>
          </el-popover>
        </el-aside>
        <el-main style="padding:0 10px;">
          <el-tabs v-model="tabsValue" type="card" @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in tabs"
              :label="item.title"
              :name="item.name"
              :closable="item.closable"
              ref="tabPane"
              :src="item.src"
            >
            </el-tab-pane>
          </el-tabs>
          <keep-alive :include="mytabs">
            <router-view style="width:100%;height:calc(100% - 56px);overflow:auto;"></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import Vue from 'vue';
  export default {
    data () {
      return {
        tabs:[{
          title: '首页',
          name: '1',
          src:"/main/index"
        }],
        tabsValue:"1",
        tabIndex:1,
        tabHeight:0,
        a:[
          {src:"ss.jpg",top:"100px",left:"200px"},
          {src:"ss.jpg",top:"100px",left:"200px"}
        ],
        oldTabVal:"1",
        mytabs:["1"]
      }
    },
    methods:{
      tabClick(tab, e){
        console.log(this.$router)
        this.$router.push(tab.$attrs.src);
      },
      removeTab(targetName) {
        var tabs = this.tabs;
        var vm = this;
        var activeName = this.tabsValue;
        if (activeName === targetName) {
          tabs.forEach(function(tab, index){
            if (tab.name === targetName) {
              var nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                vm.$router.push( nextTab.src);
              }
            }
          });
        }
        this.tabsValue = activeName;
        this.tabs = tabs.filter(tab => tab.name !== targetName);
        this.mytabs.remove(targetName);
      },
      tabOpen:function(){
        var newTabName = ++this.tabIndex + '';
        this.tabs.push({
          title: '示例',
          name: newTabName,
          closable:true,
          src:"/main/cmp2"
        });
        this.tabsValue = newTabName;
        this.tabIndex = Number(newTabName);
        this.$router.push("/main/cmp2");
        this.mytabs.push(newTabName);
        var $pop = Vue.getEl(".meanPop")
        for(var i=0; i<$pop.length; i++){
          $pop[i].style["display"] = "none";
        }
      },
    },
    mounted:function(){
      if(this.tabs.length == 1){
        this.$router.push("/main/index");
      }
    }
  }
</script>

