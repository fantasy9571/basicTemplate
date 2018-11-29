<template>
  <div class="login">
    <div class="login-panel">
      <h2 class="login-title tc">管理员登录</h2>
      <el-form :model="form" ref="form" class="mt20">
        <el-form-item prop="username" :rules="{validator:validator_userName,trigger:'blur'}">
          <el-input v-model="form.username" @keyup.enter.native="submit('form')" placeholder="用户名">
            <template slot="prepend">
              <img :src="require('@/assets/images/user.png')" width="15" height="15">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="{validator:validator_pass,trigger:'blur'}">
          <el-input type="password" v-model="form.password" @keyup.enter.native="submit('form')" placeholder="密码">
            <template slot="prepend">
              <img :src="require('@/assets/images/pass.png')" width="15" height="15">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submit('form')" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login, my } from '@/api/account'
export default {
  name: 'login',
  components: {
  },
  data() {

    return {
      loading: false,
      rememberPass: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    validator_userName(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入账号'));
      } else {
        callback()
      }
    },
    validator_pass(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入密码'));
      } else {
        callback()
      }
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false;
        }
      })
    },
    async my() {
      try {
        this.loading = true
        let res = await my()
        this.$message({
          type: "success",
          message: '登录成功'
        })
        this.$store.dispatch('setUserInfo', res.data)
        this.$store.dispatch('delAllViews')
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        this.$message({
          type: "error",
          message: err.msg
        })
      }

    },
    async  login() {
      try {
        let res = await login({ ...this.form })
        this.my()
      } catch (err) {
        this.$message({
          type: "error",
          message: err.msg
        })
      }
    }
  },
  created() {

  },
  mounted() {

  }
}
</script>
<style lang='less'>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #2d3a4b;
}

.login-panel {
  position: absolute;
  left: 0;
  right: 0;
  width: 520px;
  padding: 35px 35px 15px 35px;
  margin: 120px auto;
}

.login-title {
  font-size: 26px;
  font-weight: 400;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
</style>
