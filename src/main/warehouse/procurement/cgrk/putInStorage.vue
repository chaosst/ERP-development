<style scoped>
  #erpBox{
    width:100%;
    height:100%;
    min-width:800px;
    background:#fff;
  }
  .actionHeader{
    /*background:#e9edef;*/
    margin:10 px 10px  0 10px;
  }
  .actionBtn{
    margin-left:10px;
    font-size:12px;
  }
  .actionBtn >>> i:before{
    font-size:14px;
  }
  .searchBar{
    float:right;
    line-height: 40px;
    margin-right: 10px;
    cursor:pointer;
  }
  .searchBar i{
    font-size:18px;
    margin-right:10px;
  }
  .el-table__header{
    background:#ddd;
  }

  /* warehouse单据公用css */
  .el-dialog__wrapper >>> .el-dialog{
    background: #F4F6F8;
  }
  .el-dialog__wrapper >>> .el-dialog__body{
    padding:0px 10px 10px 5px;
    height:calc(100% - 10px);
  }
</style>
<template>
  <div id="erpBox">
    <el-row class="actionHeader">
      <el-col :span="16" class="actionBox">
        <el-button type="primary"size="small" icon="el-icon-plus" @click="addBox">新增</el-button>
        <span class="mytoolbox">
          <span class="mytoolbox-action">
            <el-button type="text" class="actionBtn" icon="el-icon-delete" @click="delRow" :disabled="!disBtn.del">删除</el-button>
            <el-button type="text" class="actionBtn" icon="el-icon-document" @click="delRow" :disabled="!disBtn.copy">复制</el-button>
            <el-button type="text" class="actionBtn" icon="el-icon-check" @click="auditRow" :disabled="!disBtn.audit">审核</el-button>
            <el-button type="text" class="actionBtn" icon="el-icon-close" @click="cancelRow" :disabled="!disBtn.cancel">作废</el-button>
          </span>
    	  </span>
      </el-col>
      <el-col :span="8">
	  	<span class="searchBar"  v-popover:popover1>
	    	<i class="el-icon-fant-unfold"></i><span>筛选条件</span>
    	</span>
      </el-col>
    </el-row>
    <el-row style="height:calc(100% - 40px);">
      <el-col :span="24" style="height:100%;">
        <f-table
          ref="aaa"
          :data="mydata"
          :opt="tableOpt"
          :page="pageOpt"
          :columns="columns"
          @current-change="tbSelect"
        >
          <template slot="code" slot-scope="scope">
            <a style="color:#66b1ff;cursor:pointer;" @click="editRow(scope.row)">{{scope.row.code}}</a>
          </template>
        </f-table>
      </el-col>
    </el-row>
    <el-popover
      ref="popover1"
      placement="top-start"
      width="300"
      trigger="click">
      <f-form ref="loginForm" :model="formData" :opt="formOpt" v-enter>
        <f-form-item class="inputItem" :opt="{label:'单号：',prop:'code'}">
          <el-input v-model="formData.code" placeholder="请输入单号" id="validateCode" name="validateCode" style="width:200px;">
          </el-input>
        </f-form-item>
        <f-form-item class="inputItem" :opt="{label:'单据日期：',prop:'billDate'}">
          <tips value="选择日期">
            <datebox
              v-model="formData.billDate"
              :opt="dateOpt"
              @change="myclose"
              style="width:200px;">
            </datebox>
          </tips>
        </f-form-item>
        <f-form-item class="inputItem" :opt="{label:'采购员：',prop:'inMemberId'}">
          <f-select :opt="selectOpt" :data="adata" v-model="formData.inMemberId" @visible-change="myclose"></f-select>
        </f-form-item>
        <div>
          <el-button type="primary" size="mini" style="width:90%;margin: 5px 5%;" @click="searchTable">查询</el-button>
          <el-button size="mini" style="width:90%;margin: 5px 5%;" @click="clearForm('loginForm')">清空</el-button>
        </div>
      </f-form>
    </el-popover>
    <win :show.sync="winShow" :opt="winOpt">
      <keep-alive>
        <router-view style="width:100%;height:100%;"></router-view>
      </keep-alive>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </win>
  </div>
</template>

<script>
  import valid from '../../../../lib/validate';
  var adata = [{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:59:30","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060015","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:59:14","creatorName":"杨兆明","csvId":"402881835fa060e201602626e46b5a30","csvName":"乌兰矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fc09c41f0135","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835fa060e20160262743675a32","inWareHouseName":"乌兰矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"62","supplierContact":"","supplierId":"402881835fa060e201602626e46b5a30","supplierName":"乌兰矿","supplierPhone":"","totalAmount":"76345.8","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":76345.80000000,"updateTime":"2018-03-06 23:59:22","voucherCode":"","warehouseBillSerialDetail":[]},{"auditTime":"2018-03-06 23:40:21","auditorId":"402881255a12894d015a12af35410009","auditorName":"杨兆明","billDate":"2018-03-06 00:00:00","billType":11,"billextendDetailList":[],"bindingAmount":0E-8,"cancelTime":"","code":"CGRK201803060014","createId":"402881255a12894d015a12af35410009","createTime":"2018-03-06 23:38:25","creatorName":"杨兆明","csvId":"402881835f6bd14d015f7082f44d0e93","csvName":"霍洛湾煤矿","csvType":2,"deptId":"402881255a12894d015a12adfacd0005","deptName":"采购部","describe":"","detailList":[],"detal":"1","endDate":"2018-03-08 00:00:00","expenseAmount":"0","fid":"2c92e07e61fb09620161fbf6b49d0108","freeAmount":"0","inMemberId":"402881835d05dff2015d30777ff53e5f","inMemberName":"杨兆明","inWareHouseId":"402881835f6bd14d015f707a8fa40d1d","inWareHouseName":"霍洛湾煤矿","ischeck":0,"otherCharges":"0","productionStatus":0,"recordStatus":1,"stockPeriodDetail":"201803","stockPeriodId":"5e5d857c60c6969a0160ddc8bfec2528","supplierAddress":"","supplierCode":"57","supplierContact":"","supplierId":"402881835f6bd14d015f7082f44d0e93","supplierName":"霍洛湾煤矿","supplierPhone":"","totalAmount":"254865","totalPayAmount":"0","transportBilldetailList":[],"unCheckAmount":254865.00000000,"updateTime":"2018-03-06 23:39:50","voucherCode":"","warehouseBillSerialDetail":[]}];
  export default {
    name:"putInStorage",
    data () {
      var vm = this;
      return {
        adata:adata,
        formOpt:{
          labelPosition:"right",
          labelWidth:"100px",
          rules:{
            code: [
              { required: true, message: '请输入单号', trigger: 'change' }
            ],
            billDate: [
              { required: true, message: '请选择日期', trigger: 'change' }
            ],
            inMemberId: [
              { required: true, message: '请选择人员', trigger: 'change' }
            ]
          }

        },
        dateOpt:{
          prompt:"请选择日期"
        },
        selectFid:"",
        mydata:adata,
        formData:{
          code:"",
          inMemberId:"",
          billDate:""
        },
        tableOpt:{
          height:"100%",
          size:"small",
          border:false,
          page:true,
          showSummary:true
        },
        pageOpt:{
          pageSize:10,
          total:0
        },
        columns:[
          {prop:"code",label:"单号",minWidth:"150"},
          {prop:"billDate",label:"单据日期",minWidth:"150",formatter:function(row, column, cellValue){
            return vm.formatDate(row, column, cellValue);
          }},
          {prop:"supplierName",label:"供应商",minWidth:"100"},
          {prop:"inMemberName",label:"采购员",minWidth:"80"},
          {prop:"totalAmount",label:"金额",minWidth:"100",money:true},
          {prop:"totalPayAmount",label:"付款金额",minWidth:"100",money:true},
          {prop:"freeAmount",label:"优惠金额",minWidth:"100",money:true},
          {prop:"creatorName",label:"制单人",minWidth:"100"},
          {prop:"recordStatus",label:"状态",minWidth:"80",formatter:function(row, column, cellValue){
            return vm.recordFormat(row, column, cellValue);
          }}
        ],
        selectOpt:{
          width:200,
          textField:"username",
          idField:"fid",
          prompt:"请选择采购员",
          url:"member/vagueSearch",
          columns:[
            {name:"人员",width:20,key:"username"},
            {name:"编号",width:20,key:"userCode"},
          ],
          remote:true,
          filterable:true
        },
        oldData:[],
        pageSize:10,
        dataCount:0,
        disBtn:{
          del:0,cancel:0,audit:0,copy:0
        },
        fid:"",
        selectFid:"123",
        winOpt:{
          title:"弹窗标题",
          size:"large",
          modalAppendToBody:false,
          header:false,
        },
        winShow:false,
      }
    },
    methods:{
      myclose:function(a){
        //window.parent.vm
        console.log(a)
      },

      changepage(index){
        this.$http.post("warehouse/cgrk/list",{page:index}).then(function(re){
          if(re.body.rows){
            this.mydata = re.body.rows;
            this.dataCount = re.body.total;
          }
        });
      },
      editRow(row){
        this.selectFid = row.fid;
        this.winShow = true;
      },
      delRow(){
        var vm = this;
        this.$http.post("warehouse/cgrk/delete",{id:this.fid}).then(function(re){
          if(re.body.returnCode == 0){
            vm.alert({msg:"删除成功！"});
            vm.$http.get("warehouse/cgrk/list").then(function(re){
              if(re.body.rows){
                vm.mydata = re.body.rows;
                vm.dataCount = re.body.total;
              }
            });
          }
        });
      },
      auditRow:function(){
        var vm = this;
        this.$http.post("warehouse/cgrk/passAudit",{id:this.fid}).then(function(re){
          if(re.body.returnCode == 0){
            vm.alert({msg:"审核成功！"});
            vm.$http.get("warehouse/cgrk/list").then(function(re){
              if(re.body.rows){
                vm.mydata = re.body.rows;
                vm.dataCount = re.body.total;
              }
            });
          }else{
            this.alert({msg:"审核失败！"});
          }
        });
      },
      cancelRow:function(){
        var vm = this;
        this.$http.post("warehouse/cgrk/cancel",{id:this.fid}).then(function(re){
          if(re.body.returnCode == 0){
            this.alert({msg:"作废成功！"});
            vm.$http.get("warehouse/cgrk/list").then(function(re){
              if(re.body.rows){
                vm.mydata = re.body.rows;
                vm.dataCount = re.body.total;
              }
            });
          }else{
            this.alert({msg:"作废失败！"});
          }
        });
      },
      clearForm:function(){
        this.$refs["loginForm"].$children[0].resetFields();
      },
      searchTable:function(){
        var vm = this;
        this.$refs["loginForm"].$children[0].validate(function(valid){
          if (valid) {
            vm.$refs["aaa"].reloadGrid(vm.formData);
          } else {
            return false;
          }
        });

      },
      tbSelect:function(row, oldrow){
        var a = {};
        if(row.recordStatus == 0){
          a = {del:1,cancel:1,audit:1,copy:1};
        }else if(row.recordStatus == 1){
          a = {del:0,cancel:1,audit:0,copy:1};
        }else if(row.recordStatus == 2){
          a = {del:0,cancel:0,audit:0,copy:1};
        }
        this.$set(this.disBtn,"del",a.del);
        this.$set(this.disBtn,"cancel",a.cancel);
        this.$set(this.disBtn,"copy",a.copy);
        this.$set(this.disBtn,"audit",a.audit);
        this.fid = row.fid;
      },
      recordFormat(row, column, cellValue){
        if(row.recordStatus == 0){
          return "未审核";
        }else if(row.recordStatus == 1){
          return "已审核";
        }else{
          return "已作废";
        }
      },
      addBox:function(){
        this.selectFid = "";
        this.$router.push("/main/putInStorage/edit");
        this.winShow = true;
      }
    },
    mounted:function(){
      window.$vueParentEl = this;
      this.$http.post("warehouse/cgrk/list",{page:1}).then(function(re){
        if(re.body.rows){
          this.mydata = re.body.rows;
          this.dataCount = re.body.total;
        }
      });
    },
    updated(){

    }
  }
</script>
