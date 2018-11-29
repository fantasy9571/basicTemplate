<template>
  <section id="container" :class="[isCollapse?'ml64':'ml200']">
    <navbar></navbar>
    <tags-view></tags-view>
    <section>
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </section>
  </section>
</template>

<script>
import navbar from './Navbar'
import tagsView from '@/components/TagsView'
import { mapGetters } from 'vuex'
export default {
  name: 'container',
  components: {
    navbar, tagsView
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['isCollapse', 'cachedViews']),

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
