import Vue from 'vue';
/*
 * element框架的封装js
 */
var elementTemp = {
  //弹窗封装
  windowDom : {
    data:function() {
      return {
        visible: this.show,
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      opt: {
        type: Object,
        required:true
      },
      beforeCloses:{
        type: Object
      }
    },
    watch: {
      show:function () {
        this.visible = this.show;
      },
    },
    methods:{
      handleClose:function(done){
        this.$emit('update:show', false);
        if(typeof this.beforeClose == "function"){
          this.beforeClose(done);
        }else{
          done();
        }
      },
      open:function(){
        this.$emit('open');
      },
      close:function(){
        this.$emit('close');
      }
    },
    created:function(){
      var s = this.opt;
      if(s.size){
        if(s.size === "large"){
          s.width = "100%";s.fullscreen = true;
        }else if(s.size === "small"){
          s.width = "50%";s.fullscreen = false;
        }else if(s.size === "middle"){
          s.width = "70%";s.fullscreen = false;
        }
      }
      var opt_ = {
        title:s.title?s.title:"提示",
        width:s.width?s.width:"50%",
        closeonclickmodal:false,
        closeonpressescape:false
      };
      Object.assign(this.opt, this.opt, opt_);
    },
    mounted:function(){
      var height = !this.opt.height?"50%":this.opt.height;
      if(this.opt.size && this.opt.size === "small"){
        height = "50%";
      }else if(this.opt.size && this.opt.size === "middle"){
        height = "70%";
      }else if(this.opt.size && this.opt.size === "large"){
        height = "100%";
      }
      var elDialog = this.$el.getElementsByClassName("el-dialog")[0];
      elDialog.style.height = height;
      if(typeof this.opt.header === "boolean" && !this.opt.header){
        elDialog.getElementsByClassName("el-dialog__header")[0].style.display = "none";
      }
      setTimeout(function(){
        var header = elDialog.getElementsByClassName("el-dialog__header")[0].clientHeight;
        var $f = elDialog.getElementsByClassName("el-dialog__header");
        var footer = $f.length == 0?0:$f[0].clientHeight;
        elDialog.getElementsByClassName("el-dialog__body")[0].style.height = "calc(100% - "+(header+footer+60)+"px)";
        elDialog.getElementsByClassName("el-dialog__body")[0].style.overflow = "auto";
      },300);
    },
    template:'<el-dialog ref="elWin" :title="opt.title" @open="open" @close="close" :close-on-click-modal="opt.closeonclickmodal" :close-on-press-escape="opt.closeonpressescape" :visible.sync="visible" :fullscreen="opt.fullscreen" :width="opt.width" :before-close="handleClose"><span slot="title" class="dialog-title"><slot name="title"></slot></span><slot></slot><span v-if="opt.footer" slot="footer" class="dialog-footer"><slot name="footer"></slot></span></el-dialog>',
  }	,
  //日期下拉选择框封装
  dateDom : {
    data:function(){
      return {
        mytime:this.value,
        rangeCuts: [{
          text: '最近一周',
          onClick:function(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick:function(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick:function(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }],
        pickerCuts: [{
          text: '今天',
          onClick:function(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick:function(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick:function(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    },
    props: {
      opt: {
        type: Object,
        required:true
      },
      value:{
        type: String,
        default:""
      }
    },
    watch:{
      value:function(){
        console.log("watch:"+this.value)
        this.mytime = this.value;
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    methods:{
      updateValue: function (value) {
        this.$emit('change',value);
      },
      focus: function (e) {
        this.$emit('focus',e);
      },
      blur: function (e) {
        this.$emit('blur',e);
      }
    },
    created:function(){
      this.opt.type = this.opt.type?this.opt.type:"date";
      this.opt.valueFormat = this.opt.valueFormat?this.opt.valueFormat:"yyyy-MM-dd";
      var shortcuts = (this.opt.type === "date" || this.opt.type === "datetime")?this.pickerCuts:(this.opt.type === "daterange" || this.opt.type === "datetimerange")?this.rangeCuts:[];
      if(!this.opt.pickerOptions){
        this.opt.pickerOptions={};
        this.opt.pickerOptions.shortcuts=shortcuts;
      }else if(typeof this.opt.pickerOptions === "object" && !this.opt.pickerOptions.shortcuts){
        this.opt.pickerOptions.shortcuts=shortcuts;
      }
    },
    mounted:function(){
      //将vue对象绑定在input里面
      $input.vueEl = this;
    },
    template:'<el-date-picker v-model="mytime" @blur="blur" @focus="focus" @change="updateValue" :readonly="opt.readonly" :disabled="opt.disabled" :editable="opt.editable" :type="opt.type" :placeholder="opt.prompt" :clearable="opt.clearable" :size="opt.size" :format="opt.format" :popper-class="opt.popperClass" :picker-options="opt.pickerOptions" :default-value="opt.defaultValue" :clear-icon="opt.clearIcon" :prefix-icon="opt.prefixIcon" :value-format="opt.valueFormat" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>'
  },
  //级联下拉选择框封装
  cascaderDom : {
    data:function(){
      return {
        myvalue:this.value,
        //定义url接口的返回数据参数名,data为空时，直接取返回对象,为next的时候，直接取树的下一级数据
        dataProp:this.opt.dataProp?this.opt.dataProp:{data:""},
      }
    },
    props: {
      opt: {
        type: Object,
        required:true
      },
      beforeFilter:{
        type: Function
      },
      value:{
        type: Array,
        default:[]
      }
    },
    watch:{
      value:function(){
        this.myvalue = this.value;
      }
    },
    methods:{
      change: function (value) {
        this.$emit('change',value);
      },
      focus: function (e) {
        this.$emit('focus',e);
      },
      blur: function (e) {
        this.$emit('blur',e);
      },
      activeItemChange:function(arr){
        this.$emit('active-item-change',arr);
      },
      reloadData:function(data){
        if(!this.opt.url){
          return false;
        }
        data = data || {};
        var vm = this;
        Vue.ajax({
          url:this.opt.url,
          method:this.opt.method?this.opt.method:"post",
          data:data,
          success:function(re){
            if(vm.dataProp.data == ""){
              Vue.set(vm.opt,"data",re[0].children);
            }
          }
        });
      }
    },
    created:function(){
      this.opt.props = typeof this.opt.props === "object"?this.opt.props:{value:"id",label:"text"};
      this.opt.data = this.opt.data?this.opt.data:[];
      //设置url后，data会失效
      this.reloadData();
    },
    template:'<el-cascader :options="opt.data" v-model="myvalue" :props="opt.props" :popper-class="opt.popperClass" :placeholder="opt.prompt" :disabled="opt.disabled" :clearable="opt.clearable" :expand-trigger="opt.expandTrigger" :show-all-levels="opt.showAllLevels" :filterable="opt.filterable" :change-on-select="opt.changeOnSelect" :size="opt.size" :before-filter="beforeFilter" @change="change" @active-item-change="activeItemChange" @blur="blur" @focus="focus"></el-cascader>'
  },
  //下拉选择框封装
  selectDom : {
    data:function(){
      return {
        //定义url接口的返回数据参数名,data为空时，直接取返回对象
        dataProp:this.opt.dataProp?this.opt.dataProp:{data:""},
        oldVal:"",
      }
    },
    props: {
      opt: {
        type: Object,
        required:true
      },
      localSearch:{
        type: Function
      },
      value:{
        type: String,
        default:""
      }
    },
    methods:{
      updateValue: function (value) {
        this.$emit('input',value);
      },
      change: function (value) {
        this.$emit('change',value);
      },
      focus: function (e) {
        this.$emit('focus',e);
      },
      blur: function (e) {
        this.$emit('blur',e);
      },
      clear: function () {
        this.$emit('clear');
      },
      visibleChange: function (bool) {
        this.$emit('visible-change',bool);
      },
      removeTag: function (value) {
        this.$emit('remove-tag',value);
      },
      remoteSearch:function(query){
        var vm = this;
        if(this.opt.remote && this.oldVal != query){
          var key = "searchKey";
          if(typeof this.searchKey === "string"){
            key = this.searchKey;
          }
          var data={};
          this.oldVal = query;
          data[key] = query;
          this.reloadData(data);
        }
      },
      reloadData:function(data){
        if(!this.opt.url){
          return false;
        }
        data = data || {};
        var vm = this;
        Vue.ajax({
          url:this.opt.url,
          method:this.opt.method?this.opt.method:"post",
          data:data,
          success:function(re){
            if(vm.dataProp.data == ""){
              Vue.set(vm.opt,"data",re);
            }else{
              Vue.set(vm.opt,"data",re[vm.dataProp.data]);
            }
          }
        });
      }
    },
    created:function(){
      var s = this.opt;
      if(typeof s.columns == "object"){
        this.opt.panelWidth = typeof this.opt.panelWidth == "string"?this.opt.panelWidth:typeof this.opt.panelWidth == "number"?this.opt.panelWidth+"px":"500px";
        var sum = 0;
        for(var i in s.columns){
          s.columns[i].width = s.columns[i].width?s.columns[i].width:10;
          sum += s.columns[i].width;
        }
        for(var i in this.opt.columns){
          this.opt.columns[i].width = s.columns[i].width/sum*100;
        }
      }
      var opt_ = {
        width:typeof s.width == "string"?s.width:typeof s.width == "number"?s.width+"px":200,
        filterable:typeof s.filterable != "undefined"?s.filterable:true,
      };
      Object.assign(this.opt, this.opt, opt_);
    },
    mounted:function(){
      var panel = this.$el.getElementsByClassName("el-popper")[0];
      panel.style.width = this.opt.panelWidth;
      //设置url后，data会失效
      this.reloadData();
      var $input = this.$el.getElementsByTagName("input")[0];
      //将vue对象绑定在input里面
      $input.vueEl = this;
    },
    template:'<el-select :disabled="opt.disabled" :style="{width : opt.width}" :name="opt.name" :remote="opt.remote" :clearable="opt.clearable" size="opt.size" :value="value" @change="change" @focus="focus" @blur="blur"  @visible-change="visibleChange" @remove-tag="removeTag" @clear="clear" @input="updateValue" :multiple="opt.multiple" popper-class="selectMain" :filterable="opt.filterable" :filter-method="localSearch" :remote-method="remoteSearch" :placeholder="opt.prompt"><el-option :disabled="true" value="0"><span v-for="val in opt.columns" :style="{ display: \'inline-block\',width: val.width + \'%\' }">{{val.name}}</span></el-option><el-option :disabled="item.disabled" v-for="item in opt.data" :label="item[opt.textField]" :value="item[opt.idField]"><span :style="{ display: \'inline-block\',width: val.width + \'%\' }" v-for="val in opt.columns">{{item[val.key]}}</span></el-option></el-select>',
  },
  //form封装
  formDom : {
    props: {
      opt: {
        type: Object,
        default:{}
      },
      model:{
        type: Object
      }
    },
    methods:{
      validate: function (prop, valid) {
        this.$emit('validate', prop, valid);
      }
    },
    created:function(){
      if(typeof this.opt === "object"){
        this.opt.labelPosition = this.opt.labelPosition?this.opt.labelPosition:"right";
        this.opt.labelWidth = this.opt.labelWidth?this.opt.labelWidth:"120px";
      }
    },
    template:'<el-form :model="model" :label-position="opt.labelPosition" :label-width="opt.labelWidth" :rules="opt.rules" :inline="opt.inline" :label-suffix="opt.labelSuffix" :show-message="opt.showMessage" :inline-message="opt.inlineMessage" :status-icon="opt.statusIcon" :size="opt.size" @validate="validate"><slot></slot></el-form>'
  },
  //formItem封装
  formItemDom : {
    props: {
      opt: {
        type: Object,
        default:{}
      },
      created:function(){
        if(typeof this.opt === "object"){
          this.opt.label = this.opt.label?this.opt.label:"";
        }
      }
    },
    template:'<el-form-item :label="opt.label" :prop="opt.prop" :label-width="opt.labelWidth" :required="opt.required" :rules="opt.rules" :error="opt.error" :show-message="opt.showMessage" :inline-message="opt.inlineMessage" :size="opt.size"><slot></slot></el-form-item>'
  },
  //table封装
  tableDom : {
    data:function(){
      return {
        mydata:this.data,
        //定义url接口的分页参数名
        pageProp:this.opt.page && this.page.pageProp?this.page.pageProp:{pageSize:"rows",currentPage:"page"},
        //定义url接口的返回数据参数名
        dataProp:this.opt.dataProp?this.opt.dataProp:{data:"rows",total:"total"},
      }
    },
    props: {
      opt: {
        type: Object,
        required:true
      },
      columns: {
        type: Array,
        required:true
      },
      page: {
        type: Object
      },
      data:{
        type: Array,
        default:[]
      }
    },
    methods:{
      currentChange: function (currentRow, oldCurrentRow) {
        this.$emit('current-change', currentRow, oldCurrentRow);
      },
      select:function(selection, row){
        this.$emit('select', selection, row);
      },
      selectAll:function(selection){
        this.$emit('select-all', selection);
      },
      selectionChange:function(selection){
        this.$emit('selection-change', selection);
      },
      cellMouseEnter:function(row, column, cell, event){
        this.$emit('cell-mouse-enter', row, column, cell, event);
      },
      cellMouseLeave:function(row, column, cell, event){
        this.$emit('cell-mouse-leave', row, column, cell, event);
      },
      cellClick:function(row, column, cell, event){
        this.$emit('cell-click', row, column, cell, event);
      },
      cellDblclick:function(row, column, cell, event){
        this.$emit('cell-dblclick', row, column, cell, event);
      },
      rowClick:function(row, event, column){
        this.$emit('row-click', row, event, column);
      },
      rowContextmenu:function(row, event){
        this.$emit('row-contextmenu', row, event);
      },
      rowDblclick:function(row, event){
        this.$emit('row-dblclick', row, event);
      },
      sortChange:function(opt){
        this.$emit('sort-change', opt);
      },
      headerDragend:function(newWidth, oldWidth, column, event){
        this.$emit('header-dragend', newWidth, oldWidth, column, event);
      },
      nextClick:function(page){
        this.$emit('next-click', page);
      },
      prevClick:function(page){
        this.$emit('prev-click', page);
      },
      sizeChange:function (pagesize) {
        Vue.set(this.page,"pageSize",pagesize);
        Vue.set(this.page,"currentPage",1);
        if(this.opt.url){
          var page_ = {};
          page_[this.pageProp.currentPage] = 1;
          page_[this.pageProp.pageSize] = pagesize;
          this.reloadGrid(page_);
        }
        this.$emit('size-change', pagesize);
      },
      pageChange:function (page) {
        Vue.set(this.page,"currentPage",page);
        if(this.opt.url){
          var page_ = {};
          page_[this.pageProp.currentPage] = page;
          page_[this.pageProp.pageSize] = this.page.pageSize;
          this.reloadGrid(page_);
        }
        this.$emit('page-change', page);
      },
      getSummaries:function(param) {
//	  	          const { columns, data } = param;
        const vm = this;
        const columns = param.columns,data = param.data;
        const sums = [];
        columns.forEach(function(column, index){
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
//	  	              const values = data.map(item => Number(item[column.property]));
          const values = data.map(function(item){
            return Number(item[column.property]);
          });
          if (!values.every(function(value){return isNaN(value)})) {
            sums[index] = values.reduce(function(prev, curr){
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(vm.columns[index].money && vm.columns[index].money===true){
              sums[index]=vm.formatMoney(sums[index]);
            }
            //状态特例
            if(column.property == "recordStatus"){
              sums[index] = "";
            }
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      refresh:function(){
        var page_ = {};
        page_[this.pageProp.currentPage] = this.page.currentPage;
        page_[this.pageProp.pageSize] = this.page.pageSize;
        this.reloadGrid(page_);
      },
      reloadGrid:function(data){
        if(!this.opt.url){
          return false;
        }
        data = data || {};
        var vm = this;
        Vue.ajax({
          url:this.opt.url,
          method:this.opt.method?this.opt.method:"post",
          data:data,
          success:function(re){
            vm.mydata = re[vm.dataProp.data];
            Vue.set(vm.page,"total",re[vm.dataProp.total]);
          }
        });
      },
      formatter:function(row, column, cellValue, index, i){
        if(this.columns[i].formatter && typeof this.columns[i].formatter === "function"){
          return this.columns[i].formatter(row, column, cellValue, index);
        }else if(this.columns[i].money){
          return this.formatMoney(cellValue);
        }else{
          return cellValue;
        }
      }
    },
    created:function(){
      if(typeof this.page == "object"){
        this.page.pageSize = typeof this.page.pageSize === "string" || typeof this.page.pageSize === "number"?this.page.pageSize:10;
        this.page.total = typeof this.page.total === "string" || typeof this.page.total === "number"?this.page.total:0;
        this.page.currentPage = typeof this.page.currentPage === "string" || typeof this.page.currentPage === "number"?this.page.currentPage:1;
        this.page.ref = typeof this.page.ref === "boolean"?this.page.ref:true;
        //若不设置url，则分页的刷新按钮不显示
        if(!this.opt.url){
          this.page.ref = false;
        }
      }
      if(typeof this.opt == "object"){
        this.opt.width = typeof this.opt.width === "string" || typeof this.opt.width === "number"?this.opt.width:"100%";
        this.opt.height = typeof this.opt.height === "string" || typeof this.opt.height === "number"?this.opt.height:"500px";
      }
    },
    mounted:function(){
      //设置url后，data会失效
      if(this.opt.url && typeof this.opt.url === "string"){
        this.reloadGrid();
      }
    },
    template:'<div><el-table ref="elTable" :sum-text="opt.sumText" tooltip-effect="dark" :cell-style="{overflow:\'hidden\'}" row-class-name="ops-table-row" cell-class-name="ops-table-cell" header-row-class-name="ops-table-header-row" header-cell-class-name="ops-table-header-cell" @select="select" @select-all="selectAll" @selection-change="selectionChange" @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" @cell-click="cellClick" @cell-dblclick="cellDblclick" @row-click="rowClick" @row-contextmenu="rowContextmenu" @row-dblclick="rowDblclick" @sort-change="sortChange" @header-dragend="headerDragend" :data="mydata" size="medium" show-summary :summary-method="getSummaries" :highlight-current-row="true" border stripe :height="opt.height" :style="{width: opt.width}" @current-change="currentChange" min-height="700"><el-table-column v-if="opt.multiple" type="selection" width="55"></el-table-column><el-table-column v-for="(col, i) of columns" :type="col.type" :index="col.index" :resizable="col.resizable" align="center" header-align="center" :show-overflow-tooltip="true" :selectable="col.selectable" :reserve-selection="col.reserveSelection" :sort-by="col.sortBy" :prop="col.prop" :label="col.label" :fixed="col.fixed" :sortable="col.sortable" :min-width="col.minWidth" :width="col.width" :formatter="function(row, column, cellValue, index){return formatter(row, column, cellValue, index, i)}"><template slot-scope="scope"><slot :name="col.prop" :row="scope.row" :column="scope.column" :$index="scope.$index">{{col.formatter?col.formatter(scope.row, scope.column, scope.row[col.prop]):scope.row[col.prop]}}</slot></template></el-table-column></el-table><el-pagination v-if="opt.page" background layout="total, sizes, prev, pager, next, jumper, slot" @size-change="sizeChange" :current-page="page.currentPage" ref="elPage" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" :total="page.total" @next-click="nextClick" @prev-click="prevClick" @current-change="pageChange"><div slot style="display:inline-block;"><el-button v-if="page.ref" type="primary" @click="refresh" plain icon="el-icon-d-arrow-right"></el-button></div></el-pagination></div>'
  },
  //tooltip封装
  tipsDom : {
    props: {
      value: {
        type: String,
        required:true
      },
      theme:{
        type: String,
        default:"dark"
      }
    },
    template:'<el-tooltip class="item" :effect="theme" :content="value" placement="top"><slot></slot></el-tooltip>',
  }
}
var fantVueElement = {};
fantVueElement.install = function (Vue, options) {
  //注入组件
  Vue.mixin({
    methods:{
      /**
       * 调用提示信息组件
       * @param s
       * title  -- 标题
       * msg -- 提示信息
       * buttonText -- 确认按钮文本
       * timeout -- 可设置自动消失的时间
       * fn -- 参数action，返回状态，回调函数
       * 其他属性继承element UI的MessageBox组件
       * @returns
       */
      alert:function(s){
        if(!s){
          return false;
        }
        s.dangerouslyUseHTMLString=true; //默认使用HTML片段
        var opt = {
          title:"提示",
          msg:"",
          confirmButtonText:s.buttonText?s.buttonText:'知道了',
          callback:function(action){
            typeof s.fn == "function"?eval(s.fn(action)):null;
            clearInterval(t1);
          }
        };

        Object.assign(opt,opt,s);
        if(typeof opt.timeout == "number"){
          var second = opt.timeout/1000;
          opt.msg = opt.msg+"<span class='opsTimeout' ref='opsTimeout'>"+second+"秒后关闭</span>";
          var t = second-1;
          var t1 =setInterval(function(){$(".opsTimeout")[0].innerHTML = (t--)+"秒后关闭";},1000);
          setTimeout(function(){
            clearInterval(t1);
            $(".el-message-box__wrapper")[0].getElementsByClassName('el-message-box__headerbtn')[0].click();
          },opt.timeout);
        }
        this.$alert(opt.msg, opt.title, opt);
      },
      /**
       * 调用确认提示信息组件
       * @param s
       * title  -- 标题
       * msg -- 提示信息
       * buttonText -- 确认按钮文本
       * cancelText -- 取消按钮文本
       * fn -- 参数action，返回状态，回调函数
       * 其他属性继承element UI的MessageBox组件
       * @returns
       */
      confirm:function(s){
        if(!s){
          return false;
        }
        s.dangerouslyUseHTMLString=true; //默认使用HTML片段
        var opt = {
          title:"提示",
          msg:"",
          confirmButtonText:s.buttonText?s.buttonText:'确认',
          cancelButtonText:s.cancelText?s.cancelText:'取消',
          callback:function(action){
            var a = action === "confirm"?1:0;
            typeof s.fn == "function"?eval(s.fn(a)):null;
          }
        };

        Object.assign(opt,opt,s);
        this.$confirm(opt.msg, opt.title, opt);
      },
      /**
       * 调用输入框提交提示信息组件
       * @param s
       * title  -- 标题
       * msg -- 提示信息
       * buttonText -- 确认按钮文本
       * cancelText -- 取消按钮文本
       * then -- 参数value，返回填写的数据，确认后的回调函数
       * cancel -- 参数 status,返回状态,取消后的回调函数
       * loadTime -- 毫秒，按确认后窗口关闭前显示loading图标等待关闭的时间
       * htmlUse -- boolean,msg是否使用html片段
       * 其他属性继承element UI的MessageBox组件
       * @returns
       */
      prompt:function(s){
        if(!s){
          return false;
        }
        var opt = {
          title:"提示",
          msg:"",
          confirmButtonText:s.buttonText?s.buttonText:'确认',
          dangerouslyUseHTMLString:typeof s.htmlUse == "boolean"?s.htmlUse:false,
          cancelButtonText:s.cancelText?s.cancelText:'取消',
          beforeClose: function(action, instance, done){
            if(typeof s.loadTime == "number"){
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(function(){
                  if(typeof s.beforeClose == "function"){
                    eval(s.beforeClose(action, instance, done))
                  }else{
                    done();
                  }
                  setTimeout(function(){
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, s.loadTime);
              }else {
                if(typeof s.beforeClose == "function"){
                  eval(s.beforeClose(action, instance, done))
                }else{
                  done();
                }
              }
            }else{
              if(typeof s.beforeClose == "function"){
                eval(s.beforeClose(action, instance, done))
              }else{
                done();
              }
            }
          }
        };
        if(s.beforeClose)delete s.beforeClose;
        Object.assign(opt,opt,s);
        this.$prompt(opt.msg, opt.title, opt).then(function(a){
          typeof s.then == "function"?eval(s.then(a.value)):null;
        }).catch(function(status){
          typeof s.cancel == "function"?eval(s.cancel(status)):null;
        });
      },
      /**
       * 调用自定义提示信息组件
       * @param s
       * title  -- 标题
       * msg -- 提示信息，可以是函数，返回显示内容，可以编写VNode,可以是html代码
       * buttonText -- 确认按钮文本
       * cancelText -- 取消按钮文本
       * then -- 参数status，返回状态，确认后的回调函数
       * cancel -- 参数 status,返回状态,取消后的回调函数
       * htmlUse -- boolean,msg是否使用html片段
       * loadTime -- 毫秒，按确认后窗口关闭前显示loading图标等待关闭的时间
       * 其他属性继承element UI的MessageBox组件
       * @returns
       */
      msgbox:function(s){
        if(!s){
          return false;
        }
        const h = this.$createElement; //引入vue的渲染组件
        var opt = {
          title:"消息",
          message:s.msg?typeof s.msg =="function"?eval(s.msg(h)):s.msg:'',
          confirmButtonText:s.buttonText?s.buttonText:'确认',
          showCancelButton: true,
          dangerouslyUseHTMLString:typeof s.htmlUse == "boolean"?s.htmlUse:false,
          cancelButtonText:s.cancelText?s.cancelText:'取消',
          beforeClose: function(action, instance, done){
            if(typeof s.loadTime == "number"){
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(function(){
                  if(typeof s.beforeClose == "function"){
                    eval(s.beforeClose(action, instance, done))
                  }else{
                    done();
                  }
                  setTimeout(function(){
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, s.loadTime);
              }else {
                if(typeof s.beforeClose == "function"){
                  eval(s.beforeClose(action, instance, done))
                }else{
                  done();
                }
              }
            }else{
              if(typeof s.beforeClose == "function"){
                eval(s.beforeClose(action, instance, done))
              }else{
                done();
              }
            }
          }
        };
        if(s.beforeClose)delete s.beforeClose;
        Object.assign(opt,opt,s);
        this.$msgbox(opt).then(function(a){
          typeof s.then == "function"?eval(s.then(a)):null;
        }).catch(function(status){
          typeof s.cancel == "function"?eval(s.cancel(status)):null;
        });
      },
      /**
       * 调用状态简略信息提示组件
       * @param s
       * msg -- 提示信息，可以是函数，返回显示内容，可以编写VNode,可以是html代码
       * timeout -- 毫秒，自动消失的时间，设置为0时不会消失
       * type -- 消息类型，success/warning/info/error
       * htmlUse -- boolean,msg是否使用html片段
       * close() -- 实例本身的方法，关闭提示框
       * 其他属性继承element UI的message组件
       * @returns
       */
      message:function(s){
        if(!s){
          return false;
        }
        if(typeof s == "string"){
          return this.$message(s);
        }else{
          const h = this.$createElement; //引入vue的渲染组件
          var opt = {
            message:s.msg?typeof s.msg =="function"?eval(s.msg(h)):s.msg:'',
            dangerouslyUseHTMLString:typeof s.htmlUse == "boolean"?s.htmlUse:false,
            duration:typeof s.timeout == "number"?s.timeout:3000,
          };
          Object.assign(opt,opt,s);
          return this.$message(opt);
        }
      }
    }
  })
  /**
   * 调用自定义组件
   */
  Vue.component("win",elementTemp.windowDom);
  Vue.component("datebox",elementTemp.dateDom);
  Vue.component("fSelect",elementTemp.selectDom);
  Vue.component("cascader",elementTemp.cascaderDom);
  Vue.component("tips",elementTemp.tipsDom);
  Vue.component("fTable",elementTemp.tableDom);
  Vue.component("fForm",elementTemp.formDom);
  Vue.component("fFormItem",elementTemp.formItemDom);

  /**
   * 调用全局信息提示组件
   * @param s
   * title -- 提示信息的标题
   * msg -- 提示信息，可以是函数，返回显示内容，可以编写VNode,可以是html代码
   * timeout -- 毫秒，自动消失的时间，设置为0时不会消失，默认为0
   * type -- 消息类型，success/warning/info/error，默认为空
   * htmlUse -- boolean,msg是否使用html片段
   * onClose() -- 实例本身的方法，关闭提示框
   * onClick() -- 实例本身的方法，点击 Notification 时的回调函数
   * 其他属性继承element UI的Notification组件
   * @returns
   */
  Vue.prototype.$gobalMsg=function(s){
    if(!s){
      return false;
    }
    const h = this.$createElement; //引入vue的渲染组件
    var opt = {
      title:s.title?s.title:"系统提示",
      message:s.msg?typeof s.msg =="function"?eval(s.msg(h)):s.msg:'',
      dangerouslyUseHTMLString:typeof s.htmlUse == "boolean"?s.htmlUse:false,
      duration:typeof s.timeout == "number"?s.timeout:0,
    };
    Object.assign(opt,opt,s);
    return this.$notify(opt);
  }
}
export default fantVueElement;