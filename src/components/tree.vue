<style scoped>
</style>
<template>
  <div :class="opt.class">
    <el-input class="elInput" v-model="filterText" :style="{width:opt.width}" :size="opt.inputSize" :disabled="opt.inputDisabled" :prefix-icon="opt.inputPrefixIcon" :suffix-icon="opt.inputSuffixIcon" :readonly="opt.inputReadonly" :clearable="opt.inputClearable" :placeholder="opt.inputPlaceholder"></el-input>
    <el-tree class="elTree" ref="elTree" :style="{width:opt.width,height:opt.height}" :data="data" :empty-text="opt.emptyText" :node-key="opt.nodeKey" :props="opt.props" :load="opt.load" :highlight-current="true" :default-expand-all="opt.defaultExpandAll" :default-expanded-keys="opt.defaultExpandedKeys" :default-checked-keys="opt.defaultCheckedKeys" :filter-node-method="filterNode" :accordion="opt.accordion" :indent="opt.indent" :render-content="opt.renderContent" @check-change="checkChange" @node-contextmenu="nodeContextmenu" @check="check" @current-change="currentChange" @node-collapse="nodeCollapse" @node-expand="nodeExpand" @node-click="nodeClick"></el-tree>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        filterText: '',
      }
    },
    watch: {
      filterText(val) {
        this.$refs.elTree.filter(val);
      }
    },
    props:{
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
      }
    },
    created(){
      this.opt.inputSize = this.opt.inputSize?this.opt.inputSize:"mini";
      this.opt.inputPrefixIcon = this.opt.inputPrefixIcon?this.opt.inputPrefixIcon:"el-icon-search";
      this.opt.inputClearable = typeof this.opt.inputClearable === "boolean"?this.opt.inputClearable:true;
      this.opt.inputPlaceholder = this.opt.inputPlaceholder?this.opt.inputPlaceholder:"请输入进行过滤";
      this.opt.emptyText = this.opt.emptyText?this.opt.emptyText:"没有数据";
      this.opt.props = this.opt.props?this.opt.props:{children: 'children', label: 'label'};
      this.opt.nodeKey = this.opt.nodeKey?this.opt.nodeKey:"id";
      this.opt.defaultExpandAll = typeof this.opt.defaultExpandAll === "boolean"?this.opt.defaultExpandAll:true;

      this.opt.width = typeof this.opt.width === "string"?this.opt.width:typeof this.opt.width === "number"?this.opt.width+"px":"200px";
      this.opt.height = typeof this.opt.height === "string"?this.opt.height:typeof this.opt.height === "number"?this.opt.height+"px":null;
    },
    mounted(){
      this.$refs.elTree.setCurrentKey(1)
    }
  }
</script>
