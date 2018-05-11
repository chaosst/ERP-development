<template>
  <div class="hello">
    <h1>路由组件3</h1>
    <el-button type="text" @click="dialogVisible = true">弹窗模式跳转到组件2</el-button>
    <router-link to="/A">链接模式跳转到组件2</router-link>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span><edit></edit></span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import edit from '@/components/cmp2';
export default {
  name: 'cmp3',
  data () {
    return {
      dialogVisible: false
    }
  },
  components:{
    edit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
