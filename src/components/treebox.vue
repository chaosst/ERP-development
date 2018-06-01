<style scoped>
</style>
<template>
  <div :class="opt.class">
      <el-popover
        placement="bottom"
        @show="show"
        @hide="hide"
        :width="opt.panelWidth"
        trigger="click">
        <el-tree ref="elTree" :style="{width:'100%',height:opt.panelHeight}" :data="data" :empty-text="opt.emptyText" :node-key="opt.nodeKey" :props="opt.props" :load="opt.load" :highlight-current="opt.highlightCurrent" :default-expand-all="opt.defaultExpandAll" :default-expanded-keys="opt.defaultExpandedKeys" :default-checked-keys="opt.defaultCheckedKeys" :filter-node-method="filterNode" :accordion="opt.accordion" :indent="opt.indent" :render-content="opt.renderContent" @check-change="checkChange" @node-contextmenu="nodeContextmenu" @check="check" @current-change="currentChange" @node-collapse="nodeCollapse" @node-expand="nodeExpand" @node-click="nodeClick"></el-tree>
        <el-input slot="reference" @change="change" @blur="blur" @focus="focus" @clear="clear" ref="elInput" v-model="myvalue" :style="{width:opt.width}" :size="opt.size" :disabled="opt.disabled" :prefix-icon="opt.prefixIcon" :suffix-icon="opt.suffixIcon" :readonly="opt.readonly" :clearable="opt.clearable" :placeholder="opt.placeholder"></el-input>
      </el-popover>
  </div>
</template>

<script>
  import Vue from "vue";
  export default {
    data () {
      return {
        myvalue: this.value,
      }
    },
    watch:{
      value:function(){
        this.myvalue = this.value;
      },
      myvalue(val) {
        this.$refs.elTree.filter(val);
      }
    },
    props:{
      value:{
          type: String,
        default:""
      },
      opt:{
        type:Object,
        default:function(){
          return {};
        }
      },
      data:{
        type:Array,
        default:function(){
          return [];
        }
      }
    },
    methods:{
      show(){
        var treePanel = this.$refs.elTree.$el;
        var options = treePanel.getElementsByClassName("el-tree-node__content");
        if(options.length>0){
          options[0].addClass("treebox-selected");
        }
        this.$emit('show');
      },
      hide(){
        this.$emit('hide');
      },
      change(value) {
        this.$emit('change',value);
      },
      focus(e) {
        this.$emit('focus',e);
      },
      blur(e) {
        this.$emit('blur',e);
      },
      clear() {
        this.$emit('clear');
      },
      nodeClick(value,node,component){
        this.$emit('node-click',value,node,component);
      },
      nodeContextmenu(e,value,node,component){
        this.$emit('node-contextmenu',e,value,node,component);
      },
      checkChange(value,selected,subSelected){
        this.$emit('check-change',value,selected,subSelected);
      },
      check(value,selectedStatus){
        this.$emit('check',value,selectedStatus);
      },
      currentChange(value,node){
        this.$emit('current-change',value,node);
      },
      nodeExpand(value,node,component){
        this.$emit('node-expand',value,node,component);
      },
      nodeCollapse(value,node,component){
        this.$emit('node-collapse',value,node,component);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data[this.opt.props.label].indexOf(value) !== -1;
      },
      findIndex(arr,obj){
        for(var i in arr){
          if(arr[i] === obj){
            return parseInt(i);
          }
        }
      }
    },
    created(){
      this.opt.size = this.opt.size?this.opt.size:"mini";
      this.opt.clearable = typeof this.opt.clearable === "boolean"?this.opt.clearable:true;
      this.opt.emptyText = this.opt.emptyText?this.opt.emptyText:"没有数据";
      this.opt.props = this.opt.props?this.opt.props:{children: 'children', label: 'label'};
      this.opt.nodeKey = this.opt.nodeKey?this.opt.nodeKey:"id";
      this.opt.defaultExpandAll = typeof this.opt.defaultExpandAll === "boolean"?this.opt.defaultExpandAll:true;

      this.opt.width = typeof this.opt.width === "string"?this.opt.width:typeof this.opt.width === "number"?this.opt.width+"px":"200px";
      this.opt.panelWidth = typeof this.opt.panelWidth === "string"?this.opt.panelWidth:typeof this.opt.panelWidth === "number"?this.opt.panelWidth+"px":null;
      this.opt.panelHeight = typeof this.opt.panelHeight === "string"?this.opt.panelHeight:typeof this.opt.panelHeight === "number"?this.opt.panelHeight+"px":null;
      this.opt.highlightCurrent = true;
      if(typeof this.opt.multiple === "boolean" && this.opt.multiple){
        this.opt.highlightCurrent = false;
        this.opt.showCheckbox = true;
      }
    },
    mounted(){
      var vm = this;
      var $input = this.$refs.elInput.$el;
      var treePanel = this.$refs.elTree.$el;
      var options = treePanel.getElementsByClassName("el-tree-node__content");
      var arr = Vue.fromArray(options);
      $input.addEventListener("keydown",function(e){
        var $current = treePanel.getElementsByClassName("treebox-selected")[0];
        var index = vm.findIndex(arr,$current);
        console.log(index)
        if(e.keyCode == 38){
          if(index > 0){
            arr[index-1].addClass("treebox-selected");
            $current.removeClass("treebox-selected");
          }
        }else if(e.keyCode == 40){
          if(index < (options.length-1)){
            arr[index+1].addClass("treebox-selected");
            $current.removeClass("treebox-selected");
          }
        }
      });
    }
  }
</script>
