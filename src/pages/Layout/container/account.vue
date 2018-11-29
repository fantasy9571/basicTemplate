<template>
  <section class="fr">
    <el-popover class="userName" placement="bottom" width="200" trigger="click">
      <ul>
        <li>
          <el-button type="text" @click="openDialog">修改密码</el-button>
        </li>
        <li>
          <el-button type="text" @click="logout">退出</el-button>
        </li>
      </ul>
      <template slot="reference">
        <span class="mr10 pointer">{{this.$store.getters.userInfo.admin.name}}
          <i class="el-icon-arrow-down pointer"></i>
        </span>
      </template>
    </el-popover>
    <edit-dialog :show.sync="show" @listen="listen" :form="form"></edit-dialog>
  </section>
</template>

<script>
import { logout } from '@/api/account'
import editDialog from './editDialog'
export default {
  name: 'account',
  components: {
    editDialog
  },
  data() {
    return {
      show: false,
      form: {},
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    openDialog() {
      this.form = {}
      this.show = true
    },
    listen() {
      let res = logout()
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ path: '/login' })
      })
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    },
    async logout() {
      let res = await logout()
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ path: '/login' })
      })
      this.$message({
        type: 'warning',
        message: '退出成功'
      })
    },
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
