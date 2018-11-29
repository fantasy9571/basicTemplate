<template>
  <section>
    list
  </section>
</template>

<script>
import { getCategory } from '@/api/goods'
export default {
  name: 'list',
  components: {

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
    async getCategory() {
      let res = await getCategory()
    }
  },
  created() {
    this.getCategory()
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
