export default {
  methods: {
    validator_phone(rule, value, callback) {
      let reg = /^((1[3,5,7,8,9][0-9])|(14[5,7])|)\d{8}$/
      if (value === "" || value === null || value === undefined) {
        callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    },
    validator_price(rule, value, callback) {
      let reg = /^[0-9]*$/
      if (value === "" || value === null || value === undefined) {
        callback(new Error('请填写价格'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入整数'))
      } else {
        callback()
      }
    },
    validator_rate(rule, value, callback) {
      let reg = /^([0-9]*)+(.[0-9]{1,2})?$/
      if (value === "" || value === null || value === undefined) {
        callback(new Error('请填写比例'))
      } else if (!reg.test(value)) {
        callback(new Error('数据不符合规范，（保留两位小数）'))
      } else {
        callback()
      }
    },
    validator_number(rule, value, callback) {
      let reg = /^\d{3}$/
      if (value === "" || value === null || value === undefined) {
        callback(new Error('请填写编号'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入三位数字'))
      } else {
        callback()
      }
    },
    validator_bankCard(rule, value, callback) {
      let reg = /^([1-9]{1})(\d{15}|\d{18})$/
      if (value === "" || value === null || value === undefined) {
        callback(new Error('请填写银行账号'))
      } else if (!reg.test(value)) {
        callback(new Error('银行账号16或19位，且首位不能为0'))
      } else {
        callback()
      }
    },
    validator_time(rule, value, callback) {
      if (value === "" || value === null || value === undefined) {
        callback(new Error('请选择时间'))
      } else {
        callback()
      }
    },
    validator_imgUrl(rule, value, callback) {
      if (value === "" || value === null || value === undefined) {
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    },
    validator_fileUrl(rule, value, callback) {
      console.log(value)
      if (value === "" || value === null || value === undefined) {
        callback(new Error('请上传文件'))
      } else {
        callback()
      }
    },
  }
}