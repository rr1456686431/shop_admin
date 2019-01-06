<template>
  <div class="login">
    <!--表单组件：-->
    <el-row type="flex"
            class="row-bg"
            justify="center"
            align="middle">
      <!-- 响应式布局 -->
      <el-col :xs="14"
              :sm="12"
              :md="10"
              :lg="8"
              :xl="6"
              class="log">
        <el-form :model="loginForm"
                 :rules="rules"
                 ref="loginForm"
                 label-width="100px"
                 class="demo-loginForm"
                 label-position="top">
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <!-- 添加type为password，可以将密码变为小点点 -->
            <el-input v-model="loginForm.password"
                      type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- <button ref="myBtn">按钮</button> -->
  </div>
</template>

<script>
// 导入axios
// import axios from 'axios'

export default {
  data () {
    return {
      // 表单数据对象
      loginForm: {
        // 用户名
        username: 'admin',
        // 密码
        password: '123456'
      },
      // 表单验证规则
      rules: {
        // name 就是要校验的数据
        username: [
          // required 表示必填项
          // message 表示验证失败时要展示的错误信息
          // trigger 表示触发表单验证的时机
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // min 和 max 配合类设置长度
          {
            min: 5,
            max: 12,
            message: '用户名长度为5到12个字符',
            trigger: 'blur'
          }
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // min 和 max 配合类设置长度
          { min: 6, max: 12, message: '密码长度为6到12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单提交的代码逻辑
    /*
      对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      Function(callback: Function(boolean, object))
    */
    async submitForm (formName) {
      try {
        await this.$refs[formName].validate()
        // 表单验证成功后，发送请求，完成登录功能
        const res = await this.$http
          .post('/login', this.loginForm)
        console.log(res)
        if (res.data.meta.status === 200) {
          localStorage.setItem('token', res.data.data.token)
          this.$router.push({ name: 'home' })
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: 'error',
            duration: 1000
          })
        }
      } catch (e) { }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.login {
  height: 100%;
  background-color: #333;
}
.login .el-row {
  height: 100%;
}
.log {
  padding: 30px 20px;
  min-width: 300px;
  background-color: #fff;
  border-radius: 15px;
}
</style>
