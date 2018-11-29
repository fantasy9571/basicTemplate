<template>
  <el-tooltip effect="dark" content="全屏" placement="bottom">
    <img @click="screen" class="pointer" :src="require('@/assets/images/screenful.png')" :width="width" :height="height">
  </el-tooltip>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'screenful',
  components: {

  },
  props: {
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    screen() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  },
  created() {

  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
