<template>
  <header class="bot-line">
    <img :class="['toggle',{'isActive':isCollapse}]" @click="toggle" :src="require('@/assets/images/switch.png')">
    <breadcrumb></breadcrumb>
    <screenfull class="ml64" :width="20" :height="20"></screenfull>
    <account></account>
  </header>
</template>

<script>
import breadcrumb from '@/components/Breadcrumb'
import screenfull from '@/components/ScreenFull'
import account from './account'
export default {
  name: 'navbar',
  components: {
    breadcrumb, screenfull, account
  },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse
      this.$store.commit('setIsCollapse', this.isCollapse)
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
