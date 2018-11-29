export default {
  components: {},
  data() {
    return {
      queryParams: {},
      PAGINATION: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
    }
  },
  computed: {},
  methods: {
    getIndex(index) {
      var rowIndex =
        this.PAGINATION.pageSize * (this.PAGINATION.currentPage - 1) +
        index +
        1;
      return rowIndex < 10 ? `0${rowIndex}` : rowIndex
    },
    check() {
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage: 1
      }
      this.queryParams = this.getParams()
      this.useMethod()
    },
    handleSizeChange(pageSize) {
      this.PAGINATION = {
        ...this.PAGINATION,
        pageSize
      }
      this.queryParams = {
        ...this.queryParams,
        start: (this.PAGINATION.currentPage - 1) * this.PAGINATION.pageSize,
        range: this.PAGINATION.pageSize
      }
      this.useMethod()
    },
    handleCurrentChange(currentPage) {
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage
      }
      this.queryParams = {
        ...this.queryParams,
        start: (this.PAGINATION.currentPage - 1) * this.PAGINATION.pageSize
      }
      this.useMethod()
    },
    useMethod() {
      switch (this.method) {
        case 'getUserlist'://用户列表
          this.getUserlist()
          break
      }
    },
    back() {
      this.$router.back()
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 < 500
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500kb!');
      }
      if (!isJPG) {
        this.$message.error('上传图片暂支持 JPG/JPEG/PNG 格式!');
      }
      return isJPG && isLt2M;
    },
    beforeFileUpload(file) {
      const isJPG = file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/wps-writer' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传文件暂支持.doc .pdf .docx 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10mb!')
      }
      return isJPG && isLt2M;
    },
  }
}
