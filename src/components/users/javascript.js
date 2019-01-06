export default {
  // 一进页面，发送请求，获取数据
  created () {
    // 直接调用封装的方法
    this.getUserList()
  },
  data () {
    // const value = this.users.mg_state
    // console.log(value)
    return {
      // 用户列表数据
      userList: [],
      total: 0,
      pagenum: 1,
      pagesize: 3,
      // 输入框的双向数据绑定
      searchText: '',

      dialogFormVisible: false,
      // 添加用户数据
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''

      },

      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 12,
          message: '用户名长度为5到12个字符',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 12,
          message: '密码长度为6到12个字符',
          trigger: 'blur'
        }
        ],
        email: [
          // 通过pattern 来指定一个正则表达式来进行表单验证
          {
            pattern: /^(([^()[\]\\.,;:\s@"]+(\.[^()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [{
          pattern: /^1[3|4|5|8][0-9]\d{8}$/,
          message: '请输入正确的手机号',
          trigger: 'blur'
        }]

      }
    }
  },
  methods: {
    // 分页获取数据
    async getUserList (pagenum = 1, query = '') {
      // 可以注释掉,直接用'/users' 即可
      // const url = 'http://localhost:8888/api/private/v1/users'
      const option = {
        params: {
          // 查询条件
          query,
          // 当前页
          pagenum,
          // 每页数量
          pagesize: 3
        }

        // 通过请求头，传递token
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      }
      // 使用await等待Promise的结果
      const res = await this.$http.get('/users', option)

      console.log('用户列表数据：', res)

      if (res.data.meta.status === 200) {
        // 获取数据成功
        this.userList = res.data.data.users
        // 获取总条数
        this.total = res.data.data.total
        // 设置当前页
        this.pagenum = res.data.data.pagenum
      } else {
        // 失败，token失效
        // 调回登录页，清除token
        this.$router.push('/login')
        localStorage.removeItem('token')
      }
    },

    // 切换分页，获取当前数据
    changePage (curPage) {
      // console.log(curPage)
      // 因为现在有了查询功能，分页的时候，应该按照当前查询条件来查询数据
      this.getUserList(curPage, this.searchText)
    },

    // 切换用户状态
    async changeUserState (user) {
      // 成功
      try {
        // 手动抛出异常(用做测试设置失败时)
        // throw new Error('报错了')

        const res = await this.$http.put(`/users/${user.id}/state/${user.mg_state}`, null, {})
        if (res.data.meta.status === 200) {
          // 获取响应成功，设置用户状态成功，
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
        } else {
          // 响应失败
          this.$message({
            type: 'warning',
            message: res.data.meta.msg
          })
        }
      } catch (err) {
        // 失败
        this.$message({
          type: 'error',
          message: '设置状态失败'
        })
      }
    },
    // 搜索数据
    search () {
      this.getUserList(1, this.searchText)
    },

    // 编辑功能
    async handleEdit (row) {
      // console.log(row.id)

    },

    // 删除功能
    async handleDelete (row) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 发送请求，删除数据
        const res = await this.$http.delete(`/users/${row.id}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // 刷新列表数据
          this.getUserList(1, this.searchText)
        } else {
          // 删除失败，
          this.$message({
            type: 'warning',
            message: res.data.meta.msg
          })
        }
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },

    // 添加用户,展示用户添加对话框
    showUserAddDialog () {
      this.dialogFormVisible = true
    },

    // 添加用户
    async addUser () {
      try {
        // 进行表单验证
        await this.$refs.userAddFormRef.validate()

        // console.log(this.userAddForm)
        // 发送axios请求，post方式，(路径，数据)
        const res = await this.$http.post('/users', this.userAddForm)
        // console.log(res)
        if (res.data.meta.status === 201) {
          // 关闭对话框
          this.dialogFormVisible = false
          // 提示用户添加成功
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // 重新获取列表数据
          this.getUserList(1, this.searchText)
        }
      } catch (err) {
        // 表单验证失败
      }
    },
    // 隐藏用户添加对话框
    hideUserAddDialog () {
      // 重置表单
      // resetField(对该表单项进行重置 ，将其值重置为初始值并移除校验结果 )
      console.log(1)
      // this.$refs.userAddFormRef.resetFields()
      this.$refs.userAddFormRef.resetFields()
    }
  }

}
