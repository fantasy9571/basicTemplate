<template>
  <el-dialog class="dialog-form" width="600px" :visible.sync="dialogFormVisible" @close="$emit('update:show', false)">
    <div slot="title" class="tc title">
      {{title}}
    </div>
    <div class="content">
      <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="角色名称：" prop="name" :rules="{ required: true, validator:validate_name, trigger: 'blur'}">
          <el-input v-model="form.name" :disabled="isEdit" size="small" class="w400" placeholder="请输入角色名称">
          </el-input>
        </el-form-item>
        <el-form-item label="角色权限：" prop="privilege" :rules="{ required: true,validator:validator_privilege, trigger: 'blur'}">
          <el-tree ref="tree" :data="data" show-checkbox node-key="name" :default-checked-keys="defaultCheckedKeys" :props="defaultProps" @check-change="checkChange" @getCheckedKeys="getCheckedKeys">
          </el-tree>
        </el-form-item>
        <el-form-item label="备注：" prop="note">
          <el-input type="textarea" :rows="4" class="w400" v-model="form.note" placeholder="请输入备注信息">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="tc">
      <el-button type="primary" class="w100" @click="submitForm('form')">确定</el-button>
      <el-button class="w100" @click="dialogFormVisible =false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changeRole, getPrivilege, check } from '@/api/account'
import validate from '@/mixin/validate'
export default {
  name: 'editDialog',
  mixins: [validate],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  data() {
    return {
      dialogFormVisible: this.show,
      title: '编辑角色',
      data: [],
      defaultCheckedKeys: [],
      defaultProps: {
        children: 'list',
        label: 'name'
      }
    }
  },
  computed: {

  },
  watch: {
    show() {
      this.dialogFormVisible = this.show
      if (!this.show) {
        this.$refs.form.resetFields()
      }
    },
    form() {
      if (this.form.name) {
        this.title = '编辑角色'
        this.defaultCheckedKeys = this.form.privilege
      } else {
        this.title = '新增角色'
        this.defaultCheckedKeys = []
      }
    }
  },
  methods: {
    validator_privilege(rule, value, callback) {
      if (value === "" || value === null || value === undefined || value.length < 1) {
        callback(new Error('请选择权限'))
      } else {
        callback()
      }
    },
    validate_name(rule, value, callback) {
      var reg = /^[\u4e00-\u9fa5]{2,8}$/
      if (value == null || value == '') {
        callback(new Error('名称不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入2-8个中文字符'))
      } else {
        if (this.title === '编辑角色') {
          callback()
        } else {
          check({ name: value }).then(res => {
            if (res.data) {
              callback(new Error('角色名称已存在'))
            } else {
              callback()
            }
          })
        }

      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changeRole()
        } else {
          return false
        }
      })
    },
    checkChange() {
      this.getCheckedKeys()
    },
    getCheckedKeys() {
      let arr = this.$refs.tree.getCheckedNodes()
      let newArr = arr.filter((item, index, arr) => {
        return item && item.list.length < 1
      })
      this.form.privilege = newArr.map((item, index, arr) => {
        return item.name
      })
      this.$refs.form.validateField('privilege')
    },
    async changeRole() {
      try {
        let res = await changeRole({ ...this.form })
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.dialogFormVisible = false
        this.$emit('listen')
      } catch (err) {
        this.$message({
          type: 'error',
          message: err.msg
        })
      }
    },
    async getPrivilege() {
      let res = await getPrivilege()
      this.data = res.data
    },
   
  },
  created() {
    this.getPrivilege()
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
