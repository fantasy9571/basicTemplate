<template>
  <div id="home" class="pd20">
    tinyMce的使用
    <tinymce ref="richText" v-model="content" @on-upload-complete="onEditorUploadComplete"></tinymce>
    <div class="mt20">
      <el-button type="primary" class="w100" @click="get">保存</el-button>
      <el-button type="primary" class="w100" @click="set">设置</el-button>
    </div>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce'
window.tinymce.baseURL = '/static/tinymce' //需要调用tinymce的组件中得加入这，不然会报错
//this.$refs.richText.setContent//getContent 两个方法 获取与设置
export default {
  name: 'Dashboard',
  components: {
    tinymce
  },
  data() {
    return {
      content: '欢迎来到首页'
    }
  },
  watch: {

  },
  computed: {
  },
  methods: {
    onEditorUploadComplete(res) {
      if (res.code == 0) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
    },
    set() {
      this.$refs.richText.setContent('设置内容')
    },
    get() {
      console.log(this.$refs.richText.getContent())
    },
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
</style>
