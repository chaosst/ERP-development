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
  .headerBtnBox{
    height:100%;
  }
  .headerBtn{
    color:#fff;
    font-size:26px;
    padding:0;
    margin-left:40px;
    float: right;
  }
  .mybadge{
    float: right;
    margin-top:10px;
  }
  .headPic{
    width:30px;
    height:30px;
    border-radius:10%;
    margin-top:10px;
  }
  .moreInfo{
    color:#fff;
    font-size:16px;
    height:100%;
    float: right;
  }
  .userPop li {
    text-align: center;
    list-style:none;
  }
  .dropdown-divider {
    height: 1px;
    margin: 8px 1px;
    background-color: #e1e4e8;
  }
  .userPop li a{
    width:100%;
    padding:5px 0;
    display: inline-block;
    cursor:pointer;
  }
  .userPop li a:hover{
    color:#fff;
    background-color:#0366d6;
  }
  .tabs{
    border-top:1px solid #ddd;
    height:35px;
    background:#fff;
  }
  .inIframe{
    width:calc(100% - 10px);height:calc(100% - 35px);overflow:auto;
    border:0;
    margin-left:10px;
  }
  .tabs >>>.el-tabs__item {
    padding: 0 20px 0 20px !important;
    height: 35px;
    line-height: 35px;
    border-right:1px solid #ddd;
  }
  .tabs >>> .el-tabs__active-bar{
    display:none;
  }
  .tabs >>> .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #ddd;
    z-index: 1;
  }
  .tabs >>> .el-tabs__item.is-active {
    border-bottom:2px solid #409EFF;
  }
  .tabs >>> #tab-action{
    padding:0 !important;
    background:#eee;
    height:34px;
    cursor:pointer;
  }
  .tabs >>> #tab-action:hover{
    opacity:0.8;
  }

</style>
<template>
  <div class="layout">
    <el-container style="height:100%;">
      <el-header style="text-align: right; font-size: 12px;background-color: #2b3643;height:50px;">
        <el-row style="height:100%;">
          <el-col :span="6" style="text-align:left;color:#fff;font-size:30px;height:100%;line-height:100%;">
            logo
          </el-col>
          <el-col :span="18" style="text-align:right;height:100%;">
            <div class="headerBtnBox">
              <div style="display:inline-block;height:100%;cursor:pointer;" v-popover:userInfo>
                <img src="~assets/images/pic.jpg" class="headPic" />
                <el-button type="text" icon="el-icon-fant-unfold" class="moreInfo" title="更多信息"></el-button>
              </div>
              <el-button type="text" class="headerBtn" style="margin-top:10px;" icon="el-icon-fant-offline" @click="signOut" title="退出系统"></el-button>
              <el-badge :value="102" :max="99" class="mybadge">
                <el-button type="text" class="headerBtn" icon="el-icon-fant-message" @click="linkToMsg" title="信息"></el-button>
              </el-badge>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="150px" style="background-color: #364150">
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
              <el-col :span="4.8">
                <label>期初</label>
                <ul>
                  <li @click="tabOpen" src="/main/qckc" name="期初库存">期初库存</li>
                </ul>
              </el-col>
              <el-col :span="4.8">
                <label>采购</label>
                <ul>
                  <li>采购询价</li>
                  <li>采购订单</li>
                  <li>采购入库</li>
                  <li>采购出库</li>
                  <li>采购退货</li>
                  <li>采购发票</li>
                  <li>采购返利单</li>
                  <li>付款单</li>
                </ul>
              </el-col>
              <el-col :span="4.8">
                <label>销售</label>
                <ul>
                  <li>销售订单</li>
                  <li>销售出货</li>
                  <li>销售退货</li>
                  <li>销售发票</li>
                  <li>销售返利单</li>
                  <li>收款单</li>
                  <li>费用单</li>
                </ul>
              </el-col>
              <el-col :span="4.8">
                <label>仓库</label>
                <ul>
                  <li>调仓单</li>
                  <li>盘点单</li>
                  <li>报损单</li>
                </ul>
              </el-col>
              <el-col :span="4.8">
                <label>生产</label>
                <ul>
                  <li>生产计划单</li>
                  <li>生产领料</li>
                  <li>生产退料</li>
                  <li>成品入库</li>
                  <li>成品退库</li>
                </ul>
              </el-col>
            </el-row>
          </el-popover>
          <el-popover
            ref="userInfo"
            placement="bottom"
            popper-class="userPop"
            trigger="click">
              <li>用户<strong>{{user.name}}</strong>登录中</li>
              <li class="dropdown-divider"></li>
              <li><a @click="userLink(1)">个人设置</a></li>
              <li><a @click="userLink(2)">修改密码</a></li>
              <li><a @click="userLink(3)">帮助文档</a></li>
              <li><a>切换账套</a></li>
          </el-popover>
        </el-aside>
        <el-main style="padding:0;overflow:hidden;">
          <el-tabs v-model="tabsValue" @tab-remove="removeTab" @tab-click="tabClick" class="tabs">
            <el-tab-pane
              :key="key"
              v-for="(item, key) in tabs"
              :label="item.title"
              :name="key"
              :closable="item.closable"
              :src="item.src"
            >
              <span slot="label" v-if="key==='index'"><i class="el-icon-fant-homepage"></i> 首页</span>
            </el-tab-pane>
            <el-tab-pane key="action" name="action" disabled style="padding:0;">
                <span slot="label">
                  <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                      <i class="el-icon-fant-unfold" style="padding:10px 6px;"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="1">关闭</el-dropdown-item>
                      <el-dropdown-item command="2">关闭其他</el-dropdown-item>
                      <el-dropdown-item command="3">关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
            </el-tab-pane>
          </el-tabs>
          <iframe name="inIframe" class="inIframe" src="/#/main"></iframe>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tabs:{
          index:{
            title: '首页',
            src:"/main/index"
          }
        },
        user:{
          name:"chao",
        },
        tabsValue:"index",
        tabHeight:0,
        a:[
          {src:"ss.jpg",top:"100px",left:"200px"},
          {src:"ss.jpg",top:"100px",left:"200px"}
        ],
        oldTabVal:"1",
      }
    },
    methods:{
      tabClick(tab, e){
        var $child = window.frames["inIframe"].$vueEl.$children[0];
        $child.$router.push(tab.$attrs.src);
      },
      removeTab(targetName) {
        var $child = window.frames["inIframe"].$vueEl.$children[0];
        var tabs = this.tabs;
        var vm = this;
        var activeName = this.tabsValue;
        if (activeName === targetName) {
          var tabsArr = Object.entries(tabs);
          tabsArr.forEach(function(tab, index){
            if (tab[0] === targetName) {
              var nextTab = tabsArr[index + 1] || tabsArr[index - 1];
              if (nextTab) {
                activeName = nextTab[0];
                $child.$router.push( nextTab[1].src);
              }
            }
          });
        }
        this.tabsValue = activeName;
        delete this.tabs[targetName];
        this.$arrayRemove($child.mytabs,targetName);
      },
      tabOpen:function(e){
        var src = e.target.attributes.src.nodeValue;
        var title = e.target.attributes.name.nodeValue;
        var vm = this;
        var $child = window.frames["inIframe"].$vueEl.$children[0];
        $child.$router.push(src,function(router){
          var name = router.matched[router.matched.length-1].components.default.name;
          $child.mytabs.push(name);
          vm.tabsValue = name;
          vm.tabs[name] = {
            title: title,
            closable:true,
            src:src
          };
        });
        var $pop = this.$getEl(".meanPop")
        for(var i=0; i<$pop.length; i++){
          $pop[i].style["display"] = "none";
        }
      },
      signOut(){
        //todo
      },
      linkToMsg(){
        var vm = this;
        var $child = window.frames["inIframe"].$vueEl.$children[0];
        $child.$router.push("/main/message",function(router){
          var name = router.matched[router.matched.length-1].components.default.name;
          $child.mytabs.push(name);
          vm.tabsValue = name;
          vm.tabs[name] = {
            title: '消息',
            closable:true,
            src:"/main/message"
          };
        });
      },
      userLink(tips){
        var vm = this;
        var $child = window.frames["inIframe"].$vueEl.$children[0];
        $child.$router.push({ path: '/main/userInfo', query: { tips: tips }},function(router){
          var name = router.matched[router.matched.length-1].components.default.name;
          $child.mytabs.push(name);
          vm.tabsValue = name;
          vm.tabs[name]={
            title: '个人信息',
            closable:true,
            src:"/main/userInfo"
          };
        });
      }
    },
    mounted:function(){
    }
  }
</script>

