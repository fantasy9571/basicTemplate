<template>
  <section id="layout">
    <side-item></side-item>
    <container></container>
  </section>
</template>

<script>
import sideItem from '@/components/SideItem'
import container from './container'
export default {
  name: 'layout',
  components: {
    sideItem, container
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
