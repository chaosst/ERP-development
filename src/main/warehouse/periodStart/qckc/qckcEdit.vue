<style>
  .el-form-item__error{
    float:left;
    position:fixed;
    display:block;
    z-index:10000;
  }
</style>
<style scoped>
  .warehouseBox{
    height:calc(100% - 10px) !important;
  }
  .warehouseMain{
    width:100%;
    height:calc(100% - 50px) !important;
    min-width:800px;
    background:#fff;
    border:1px solid #c5c5c5;
    border-radius:6px;
    margin-top:10px;
  }
  .warehouseBox .editHeader{
    border-bottom:1px solid #ddd;
    height:40px;
    line-height: 40px;
  }
  .miniBtn{
    padding:4px;
    vertical-align: text-top;
  }
  .warehouseBox .titleBar{
    padding:0 10px;
    color:#409EFF;
    font-size:16px;
    font-weight:bold;
  }
  .warehouseBox .title{
    display: inline-block;
  }
  .warehouseBox .editBase{
    padding:0 20px;
  }
  .warehouseBox .editBase span{
    float:right;
  }
  .warehouseBox .mainBox{
    margin: 10px 0;
  }
  .warehouseBox .mainBox .el-col{
    height: 32px;
    margin-top: 10px;
  }
  .tableBtn{
    padding:1px;
  }
  .hideBtn{
    position:absolute;
    right: 10px;
    margin-top: 10px;
  }
  .warehouseBox .warehouseFooter{
    padding:10px;
    float:right;
  }
  .fTable >>> .el-form-item{
    margin-bottom:0;
  }
  .fTable >>> .td{
    padding:0;
  }
  .el-table >>> .el-form-item{
    margin-bottom:0;
  }
</style>
<template>
  <div class="warehouseBox">
  <div class="warehouseMain">
    <el-row class="editHeader">
      <el-col :span="6" class="titleBar">
        <el-button circle icon="el-icon-fant-return" class="miniBtn" type="primary" size="mini" @click="close"></el-button>
        <div class="title">期初库存单据</div>
      </el-col>
      <el-col :span="18" class="editBase">
        <span>单号：{{editData.code}}</span>
      </el-col>
    </el-row>
    <el-form ref="eidtForm" :model="editData" class="editForm" v-enter label-position="right" label-width="120px" size="small">
      <div class="mainBox">
        <el-row>
          <el-col :span="8">
            <el-form-item class="inputItem" label="原始单号：" prop="voucherCode">
              <el-input v-model="editData.voucherCode" placeHolder="原始单号" style="width:100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="inputItem"  label="仓库：" prop="inWareHouseId">
              <treebox
                :opt="casOpt"
                v-model="editData.inWareHouseId">
              </treebox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item class="inputItem" label="备注：" prop="describe">
              <el-input v-model="editData.describe" placeHolder="备注" style="width:calc(100%);"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="info" size="mini" circle :class="infoBtnClass" @click="showDetail"></el-button>
        </el-row>
      </div>
      <el-collapse-transition>
        <div class="mainBox" v-show="boxHide" style="margin-top:10px;">
          <el-row>
            <el-col :span="8">
              <el-form-item class="inputItem" label="制单人：">
                {{editData.creatorName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="inputItem" label="制单时间：">
                {{editData.createTime}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="inputItem" label="审核人：">
                {{editData.auditorName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item class="inputItem" label="审核时间：">
                {{editData.auditTime}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="inputItem" label="作废人：">
                {{editData.cancelorName}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="inputItem" label="作废时间：">
                {{editData.cancelTime}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </el-form>
    <el-row>
      <el-col :span="24">
        <f-table
          ref="editTable"
          :data="mydata"
          :opt="tableOpt"
          :columns="columns"
        >
          <template slot="goodsCode" slot-scope="scope">
            <table-form :scope="scope" prop="goodsId">
              <div v-if="!scope.row.editKey['goodsId']" @click="e=>editCell(e,'goodsId',scope.$index)">{{scope.row.goodsCode || '&nbsp;'}}</div>
              <f-select v-if="scope.row.editKey['goodsId']" placeholder="选择货品" :data="[]" :opt="rowOpt.goodsCode" @blur="saveCell('goodsId',scope.$index)" v-model="scope.row.goodsId"></f-select>
            </table-form>
          </template>
          <template slot="inWareHouseName" slot-scope="scope">
            <table-form :scope="scope" prop="inWareHouseId">
              <div v-if="!scope.row.editKey['inWareHouseId']" @click="e=>editCell(e,'inWareHouseId',scope.$index)">{{scope.row.inWareHouseName || '&nbsp;'}}</div>
              <treebox v-if="scope.row.editKey['inWareHouseId']" :opt="rowOpt.warehouse" @blur="saveCell('inWareHouseId',scope.$index)" v-model="scope.row.inWareHouseId"></treebox>
            </table-form>
          </template>
          <template slot="goodsSpecName" slot-scope="scope">
            <table-form :scope="scope" prop="goodsSpecId">
              <div v-if="!scope.row.editKey['goodsSpecId']" @click="e=>editCell(e,'goodsSpecId',scope.$index)">{{scope.row.goodsSpecName || '&nbsp;'}}</div>
              <f-select v-if="scope.row.editKey['goodsSpecId']" placeholder="选择属性" :data="[]" @blur="saveCell('goodsSpecId',scope.$index)" :opt="rowOpt.spec" v-model="scope.row.goodsSpecId"></f-select>
            </table-form>
          </template>
          <template slot="unitName" slot-scope="scope">
            <table-form :scope="scope" prop="unitId">
              <div v-if="!scope.row.editKey['unitId']" @click="e=>editCell(e,'unitId',scope.$index)">{{scope.row.unitName || '&nbsp;'}}</div>
              <f-select v-if="scope.row.editKey['unitId']" placeholder="选择单位" :data="[]" @blur="saveCell('unitId',scope.$index)" :opt="rowOpt.unit" v-model="scope.row.unitId"></f-select>
            </table-form>
          </template>
          <template slot="quentity" slot-scope="scope">
            <table-form :scope="scope" prop="quentity">
              <div v-if="!scope.row.editKey['quentity']" @click="e=>editCell(e,'quentity',scope.$index)">{{scope.row.quentity || '&nbsp;'}}</div>
              <el-input-number v-if="scope.row.editKey['quentity']" @focus="e=>calcType(e,scope.$index,'quentity')" @blur="saveCell('quentity',scope.$index)" size="mini" :controls="false" v-model="scope.row.quentity" style="width:80%;"></el-input-number>
            </table-form>
          </template>
          <template slot="unitPrice" slot-scope="scope">
            <table-form :scope="scope" prop="unitPrice">
              <div v-if="!scope.row.editKey['unitPrice']" @click="e=>editCell(e,'unitPrice',scope.$index)">{{scope.row.unitPrice || '&nbsp;'}}</div>
              <el-input-number v-if="scope.row.editKey['unitPrice']" @focus="e=>calcType(e,scope.$index,'unitPrice')" size="mini" @blur="saveCell('unitPrice',scope.$index)" :controls="false" v-model="scope.row.unitPrice" style="width:80%;"></el-input-number>
            </table-form>
          </template>
          <template slot="type" slot-scope="scope">
            <table-form :scope="scope" prop="type">
              <div v-if="!scope.row.editKey['type']" @click="e=>editCell(e,'type',scope.$index)">{{scope.row.type || '&nbsp;'}}</div>
              <div v-if="scope.row.editKey['type']"><el-input-number size="mini" @focus="e=>calcType(e,scope.$index,'type')" @blur="saveCell('type',scope.$index)" :controls="false" v-model="scope.row.type" style="width:80%;"></el-input-number></div>
            </table-form>
          </template>
          <template slot="describe" slot-scope="scope">
              <div v-if="!scope.row.editKey['describe']" @click="e=>editCell(e,'describe',scope.$index)">{{scope.row.describe || '&nbsp;'}}</div>
              <div v-if="scope.row.editKey['describe']"><el-input size="mini" @blur="saveCell('describe',scope.$index)" placeholder="输入备注" v-model="scope.row.describe"></el-input></div>
          </template>
          <div slot="append" style="padding:0 20px;border-bottom:1px solid #ddd;">
            <el-button type="text" icon="el-icon-fant-add" @click="addRow"></el-button>
          </div>
        </f-table>
      </el-col>
    </el-row>
  </div>
    <div class="warehouseFooter">
        <el-button type="primary" size="small" @click="save" >保存</el-button>
        <el-button type="primary" size="small" >付款</el-button>
        <el-button type="info" size="small" >费用详情</el-button>
        <el-button type="warning" size="small" >复制</el-button>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import valid from '@/lib/validate';
  var adata = [{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]}];
  export default {
    name:"putInStorageEdit",
//    props:{
//      fid:{type:String,default:""},
//      show:{type:Boolean,default:false}
//    },
    watch:{
      show:function(){
        this.editShow = this.show;
      }
    },
    data(){
      return{
        rowRules:{
          goodsId: [
            { required: true, message: '请选择货品', trigger: 'change' }
          ],
          inWareHouseId: [
            { required: true, message: '请选择仓库', trigger: 'change' }
          ]
        },
        rowOpt:{
          goodsCode:{
          },
          warehouse:{
            url:"",
            placeholder:"请选择仓库"
          },
          spec:{
          },
          unit:{
          }
        },
        inputHeight:"30px",
        editShow:this.show,
        mydata:[],
        editData:{
          billDate:"",
          inMemberId:"",
          inWareHouseId:[]
        },
        tableOpt:{
          height:300,
          showSummary:true
        },
        casOpt:{
          url:"",
          width:"100%"
        },
        columns:[
          {prop:"goodsCode",label:"编号",minWidth:"100",rules:[
            { required: true, message: '请选择货品', trigger: 'change' }
          ]},
          {prop:"goodsName",label:"货品名称",minWidth:"150"},
          {prop:"inWareHouseName",label:"仓库",minWidth:"100",rules:[
            { required: true, message: '请选择仓库', trigger: 'change' }
          ]},
          {prop:"goodsSpecName",label:"属性",minWidth:"100"},
          {prop:"unitName",label:"单位",minWidth:"100"},
          {prop:"quentity",label:"数量",minWidth:"100"},
          {prop:"unitPrice",label:"单价",minWidth:"100",money:true},
          {prop:"type",label:"金额",minWidth:"100",money:true},
          {prop:"describe",label:"备注",minWidth:"120"}
        ],
        editDateOpt:{
          prompt:"单据日期"
        },
        endDateOpt:{
          prompt:"计划入仓日期"
        },
        infoBtnClass:"el-icon-fant-unfold rotate-current hideBtn miniBtn",
        boxHide:0,
        supOpt:{
          width:"90%",
          textField:"name",
          idField:"fid",
          prompt:"供应商",
//          url:"supplier/vagueSearch?showDisable=0&searchSize=8",
          columns:[
            {name:"编号",width:20,key:"code"},
            {name:"供应商",width:20,key:"name"},
          ],
          remote:true,
          filterable:true
        },
        memOpt:{
          width:"90%",
          textField:"username",
          idField:"fid",
          prompt:"采购员",
//          url:"member/vagueSearch",
          columns:[
            {name:"人员",width:20,key:"username"},
            {name:"编号",width:20,key:"userCode"},
          ],
          remote:true,
          filterable:true
        },
        wareData:[]
      }
    },
    mounted:function(){
      var vm = this;
//      this.$http.get("storehouses/getTreeOfEnable").then(function(re){
//        vm.wareData = re.body.length>0?re.body[0].children:[];
//      });
    },
    updated:function(){
      console.log("传入的FID："+this.fid);
    },
    methods:{
      calcType(e,index,name){
        e.target.addEventListener("input",()=>{
          var value = e.target.value;
          if(name === "quentity"){
            if(value===""){
              this.$set(this.mydata[index],"type","");
              return false;
            }
            var unitPrice = this.mydata[index].unitPrice?this.mydata[index].unitPrice:0;
            this.$set(this.mydata[index],"type",unitPrice*value);
          }else if(name === "unitPrice"){
            if(value===""){
              this.$set(this.mydata[index],"type","");
              return false;
            }
            var quentity = this.mydata[index].quentity?this.mydata[index].quentity:0;
            this.$set(this.mydata[index],"type",quentity*value);
          }else if(name === "type"){
            if(value===""){
              this.$set(this.mydata[index],"unitPrice","");
              return false;
            }
            if(this.mydata[index].quentity){
              var quentity = this.mydata[index].quentity;
              this.$set(this.mydata[index],"unitPrice",value/quentity);
            }
          }
        });
      },
      myclose:function(val){
        console.log(val);
      },
      close:function(){
        window.$vueParentEl.winShow=false;
        this.$router.push("/main/qckc");
      },
      showDetail:function(){
        if(!this.boxHide){
          this.boxHide = 1;
          this.infoBtnClass = "el-icon-fant-unfold rotate hideBtn miniBtn";
        }else{
          this.boxHide = 0;
          this.infoBtnClass = "el-icon-fant-unfold rotate-current hideBtn miniBtn";
        }
      },
      addRow(){
        this.mydata.push({action:"",goodsId:"",goodsCode:"",inWarehouseId:"",editKey:{}});
      },
      editCell(e,name,index){
        Vue.set(this.mydata[index].editKey,name,true);
        var parent = e.target.parentNode;
        this.$nextTick(()=>{
          Vue.keyHandler(parent);
          if(Vue.getEl(".row"+index+"-"+name).length > 0) {
            Vue.getEl(".row" + index + "-" + name)[0].getElementsByTagName("input")[0].focus();
          }else{
            parent.getElementsByTagName("input")[0].focus();
          }
        });
      },
      delRow(){

      },
      cancelRow(){

      },
      saveCell(name,index){
        var vm = this;
        if(Vue.getEl(".row"+index+"-"+name).length == 0){
          Vue.set(vm.mydata[index].editKey,name,false);
          return false;
        }
        var el = Vue.getEl(".row"+index+"-"+name)[0].$vueEl;
        el.$children[0].validate(function(valid) {
          console.log(valid)
          if (valid) {
            Vue.set(vm.mydata[index].editKey,name,false);
          } else {
            return false;
          }
        });
      },
      save(){
        var a = Vue.fromArray(Vue.getEl(".fant-table-form"));
        a.map(function(i){
          var el = i.$vueEl;
          el.$children[0].validate(function(valid) {
            if (valid) {
              //todo
            } else {
              var content = i.getElementsByClassName("el-form-item__content");
              if(content.length !=0 && content[0].getElementsByTagName("input").length === 0){
                content[0].childNodes[0].click();
              }
              return false;
            }
          });
        });

      }
    }
  }
</script>
