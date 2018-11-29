<template>
  <router-view v-if="childrenHidden" />
  <section v-else class="pd20">
    <span class="ml10">
      关键字：
      <el-input clearable size="mini" placeholder="请输入名称/手机号进行查询" class="w200" v-model="text" @keyup.enter.native="check"></el-input>
    </span>
    <span class="ml10">
      用户身份：
      <el-select v-model="userType" placeholder="请选择" size="mini" class="w200">
        <el-option v-for="item in userTypeList" :key="item.label" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </span>
    <span class="ml10">
      用户状态：
      <el-select v-model="status" placeholder="请选择" size="mini" class="w200">
        <el-option v-for="item in statusList" :key="item.label" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </span>
    <el-button type="primary" size="mini" class="w80" icon="el-icon-search" @click="check">查询</el-button>
    <el-table :data="tableData" v-loading="loading" class="mt15" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{getIndex(scope.$index)}}
        </template>
      </el-table-column>
      <el-table-column prop="user.info.real_name" label="名称" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.user.info.real_name">{{scope.row.user.info.real_name}}</span>
          <span v-if="scope.row.user.info.company_name">{{scope.row.user.info.company_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user.user_type" label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.user.user_type ==='PERSONAL'">个人</span>
          <span v-if="scope.row.user.user_type ==='COMPANY'">企业</span>
        </template>
      </el-table-column>
      <el-table-column prop="account.phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="user.info.email" label="电子邮箱" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.user.info.email">{{scope.row.user.info.email}}</span>
          <span v-else>/</span>
        </template>
      </el-table-column>
      <el-table-column prop="account.create_time" label="注册时间" align="center">
        <template slot-scope="scope">
          {{scope.row.account.create_time|getFormateTime}}
        </template>
      </el-table-column>
      <el-table-column prop="user.status" label="账号状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.user.status == 'enable'">正常</span>
          <span v-if="scope.row.user.status == 'disable'">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">详情</el-button>
          <el-button type='danger' size="mini" v-if="scope.row.user.status == 'enable'" @click="changeState(scope.row)">禁用</el-button>
          <el-button type='danger' size="mini" v-if="scope.row.user.status == 'disable'" @click="changeState(scope.row)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="PAGINATION.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="PAGINATION.total">
    </el-pagination>
  </section>
</template>
<script>
const userTypeList = [
  { value: '', label: '全部' },
  { value: 'PERSONAL', label: '个人' },
  { value: 'COMPANY', label: '企业' },
]
const statusList = [
  { value: '', label: '全部' },
  { value: 'enable', label: '正常' },
  { value: 'disable', label: '禁用' }
]
import { getUserlist, changeStatus } from '@/api/account'
export default {
  name: 'list',
  components: {
  },
  data() {
    return {
      loading: false,
      method: 'getUserlist',
      tableData: [],
      text: '',
      userType: '',
      userTypeList: userTypeList,
      status: '',
      statusList: statusList,
      userState: {},
      childrenHidden: this.$route.meta.childrenHidden || false,
      phone: '',
    }
  },
  watch: {
    '$route'() {
      this.childrenHidden = this.$route.meta.childrenHidden
    }
  },
  methods: {
    getParams() {
      return {
        userType: this.userType,
        text: this.text,
        status: this.status,
        start: (this.PAGINATION.currentPage - 1) * this.PAGINATION.pageSize,
        range: this.PAGINATION.pageSize,
      }
    },
    async getUserlist() {
      this.loading = true
      let res = await getUserlist(this.queryParams)
      this.tableData = res.data.list
      this.PAGINATION.total = res.data.count
      this.loading = false
    },
    changeState(row) {
      this.userState.user_id = row.user.id
      if (row.user.status === 'enable') {
        this.userState.status = 'disable'
        this.$confirm("是否要禁用该用户", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.changeStatus()
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            })
          })
      } else {
        this.userState.status = 'enable'
        this.$confirm("是否要恢复该用户?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.changeStatus()
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            })
          })
      }
    },
    async changeStatus() {
      let res = await changeStatus({ ...this.userState })
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.getUserlist()
    },
    view(row) {
      this.$store.dispatch('setUserInfoDetail', row)
      this.$router.push('/account/user/detail')
      this.show = true
    },
  },
  created() {
    this.check()
  },
  mounted() {

  }
}
</script>
<style lang='less'>
</style>
