<script>
import { mapGetters } from 'vuex'
import login from '@/pages/login'
export default {
  name: 'App',
  components: { login },
  computed: {
    ...mapGetters(['isLogin']),
  },
  mounted() {
  },
  render(h) {
    if (this.isLogin) {
      return h('router-view')
    } else {
      return h(login)
    }
  },
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
