<template>
  <div align="center">
    <h1>Login Page</h1>
    <button type="submit" @click="login">Login</button>

  </div>
</template>

<script>
import {userLogin} from "@/request";

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
     async login() {
      // 处理登录逻辑
      const requestData = {
        curCode: '201549221',
        curPassword: '123456'
      };
      let result =  await userLogin(requestData);
      if (result.code === 0) {
        // 登录成功后跳转到首页
        this.$router.push('/home');
      }

    }
  },
};
</script>