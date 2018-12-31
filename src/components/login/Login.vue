<template>
  <div class="login">
    <!--
      表单组件：

      el-form 表单组件
        :model="loginForm" 表单数据对象
        :rules="rules" 表单验证规则
        label-width="100px" 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值
        class="demo-loginForm" 样式，带有 demo 样式，一般都不起作用
        label-position="top" 设置表单域标签的位置，设置为 顶部

        ref="loginForm"

      el-form-item 表单中的每一行组件
        label="活动名称" 标签文本（表单中每一个表单项的描述文字）
        prop="name" 表单域 model 字段，在使用 validate（表单校验）、resetFields（重置表单） 方法的情况下，该属性是必填的

      el-input 文本框组件
        v-model="loginForm.name" 实现双向数据绑定
      el-button 按钮组件
        type="primary" 设置按钮的样式类型
    -->
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <button ref="myBtn">按钮</button> -->
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'

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
          // required 表示必填项
          // message 表示验证失败时要展示的错误信息
          // trigger 表示触发表单验证的时机
          { required: true, message: '请输入密码', trigger: 'blur' },
          // min 和 max 配合类设置长度
          { min: 6, max: 12, message: '密码长度为6到12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单提交的代码逻辑
    submitForm (formName) {
      // this.$refs[formName] 就是在访问对象 $refs 中的属性
      // this.$refs.loginForm 通过 .语法来访问对象属性，与上面通过 [] 访问对象属性是相同的
      // $refs 是Vue提供的一个对象，作用：用来获取页面中所有带有 ref 属性的元素（DOM或组件）
      // 为什么要获取到DOM对象或组件对象？？？
      //  因为在 Vue 中有些情况下，需要手动操作DOM，此时，可以通过 ref 来获取到DOM对象，然后，再进行DOM操作
      //  如果给组件添加了 ref 属性，那么，可以通过 ref 来获取到组件对象
      // 在当前案例中，就是通过 $refs.loginForm 来获取到表单组件，调用组件中的 validate 方法，来进行表单验证
      // console.log(this.$refs)
      // this.$refs.myBtn.style.color = 'red'

      // 通过 $refs 获取到组件对象，并且调用组件的 validate 方法，进行表单验证
      this.$refs[formName].validate(valid => {
        // valid 形参表示：表单验证是否成功
        if (!valid) {
          // 验证失败的时候，代码中不需要任何处理，因为，错误信息都已经在页面中展示给用户了
          return false
        }

        // 表单验证成功
        // console.log('成功')
        // 1 获取到用户名和密码
        // console.log(this.loginForm)
        // 2 调用 登录接口 完成登录
        //  登录接口地址：http://localhost:8888/api/private/v1/login
        axios
          .post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              // 将 token 存储到localStorage中
              // 注意：先存储token，再跳转路由
              localStorage.setItem('token', res.data.data.token)

              // 登录成功
              // 3 成功后，才跳转到首页
              // this.$router.push('/home')
              this.$router.push({ name: 'home' })
            } else {
              // 4 登录失败，提示用户错误信息
              // alert(res.data.meta.msg)
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
</style>
