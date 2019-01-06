<template>

  <!-- container组件 -->
  <!-- 内容 -->
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header class="home-header">
      <el-row type="flex"
              class="row-bg"
              justify="center"
              align="middle">
        <el-col :span="6">
          <img src="@/assets/images/logo.png"
               alt="">
        </el-col>
        <el-col>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="6">
          <span>欢迎上海VIP管理员 <a href="javascript:;"
               @click="open"> 退出 </a></span>
        </el-col>
      </el-row>
    </el-header>
    <!-- 侧边栏 -->
    <el-container class="aside">
      <el-aside width="200px"
                class="home-aside">
        <el-row class="tac">

          <el-menu default-active="2"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   :router="true">

            <el-submenu index="1">
              <template slot="title">
                <!-- 菜单图标 -->
                <i class="el-icon-location"></i>
                <!-- 菜单名称 -->
                <span>用户管理</span>
              </template>
              <!-- 菜单选项 -->
              <!-- 此处没有添加“/”会有bug -->
              <el-menu-item index="/users">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>用户列表</span>
                </template></el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="2-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>角色列表</span>
                </template></el-menu-item>
              <el-menu-item index="2-2"><template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>权限列表</span>
                </template></el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1"><template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>商品列表</span>
                </template></el-menu-item>
              <el-menu-item index="3-2"><template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>分类参数</span>
                </template></el-menu-item>
              <el-menu-item index="3-2"><template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>商品分类</span>
                </template></el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1"><template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>订单列表</span>
                </template></el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="5-1"><template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>数据报表</span>
                </template></el-menu-item>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-aside>

      <!-- 主内容 -->
      <el-main>
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  methods: {
    // 退出功能
    async open () {
      try {
        await this.$confirm('是否确定退出 ? ', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 删除token，跳转登录页
        localStorage.removeItem('token')
        this.$router.push('/login')
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      }
    }
  }
}
</script>

<style>
.home-container {
  background: #eaeef1;
  height: 100%;
}
.home-header {
  background-color: #15a0f5;
  padding-left: 0;
}
.home-header img {
  width: 200px;
}
.home-header h1 {
  font-size: 28px;
  color: #fff;
  margin: 0;
  text-align: center;
  min-width: 500px;
}
.home-header span {
  min-width: 180px;
  color: #fff;
  display: block;
}
.home-header a {
  color: red;
}
.aside {
  height: 100%;
}
.home-aside {
  background-color: #545c64;
  line-height: 200px;
  height: 100%;
  color: #fff;
}
</style>
