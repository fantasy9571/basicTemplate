<template>
  <section v-else class="pd20">
    <el-button type="primary" size="mini" class="w80" icon="el-icon-edit" @click="add">新增</el-button>
    <el-table :data="tableData" v-loading="loading" class="mt15" border style="width: 100%">
      <el-table-column prop="name" label="角色名称" align="center">
      </el-table-column>
      <el-table-column prop="num" label="账号数量" align="center">
      </el-table-column>
      <el-table-column prop="privilege" label="权限描述" align="center">
        <template slot-scope="scope">
          {{scope.row.privilege.toString()}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button type='danger' size="mini" @click="dele(scope.row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog :show.sync="show" @listen="listen" :isEdit="isEdit" :form="form"></edit-dialog>
  </section>
</template>
<script>
import { getRole, deleteRole } from '@/api/account'
import editDialog from './editDialog'
export default {
  name: 'category',
  components: {
    editDialog
  },
  data() {
    return {
      loading: false,
      tableData: [],
      name: '',
      show: false,
      isEdit: false,
      form: {}
    }
  },
  watch: {
  },
  methods: {
    async getRole() {
      this.loading = true
      let res = await getRole()
      this.tableData = res.data
      this.loading = false
    },
    dele(name) {
      this.name = name
      this.$confirm("是否删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRole()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    async deleteRole() {
      try {
        let res = await deleteRole({ name: this.name })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getRole()
      } catch (err) {
        this.$message({
          type: 'error',
          message: err.msg
        })
      }
    },
    add() {
      this.isEdit = false
      this.form = {
        name: '',
        privilege: []
      }
      this.show = true
    },
    edit(row) {
      this.isEdit = true
      this.form = { ...row }
      this.show = true
    },
    listen() {
      this.getRole()
    }
  },
  created() {
    this.getRole()
  },
  mounted() {

  }
}
</script>
<style lang='less'>
</style>
