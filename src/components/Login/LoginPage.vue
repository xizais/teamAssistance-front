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
import {userLogin} from "@/request";

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
      const requestData = {
        curCode: '201549221',
        curPassword: '123456'
      };
      let result = userLogin(requestData);
      console.log(result)
      // 登录成功后跳转到首页
      this.$router.push('/home');
    }
  }
};
</script>