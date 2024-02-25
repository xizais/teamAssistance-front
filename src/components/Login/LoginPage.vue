<template>
  <div align="center">
    <h1>Login Page</h1>
    <!-- 登录表单 -->
    <form @submit="login">
<!--      <input type="text" v-model="username" placeholder="Username" />-->
<!--      <input type="password" v-model="password" placeholder="Password" />-->
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // 处理登录逻辑
      // 可以在这里进行验证等操作

      // 登录成功后跳转到首页
      this.$router.push('/home');
    }
  }
};
</script>