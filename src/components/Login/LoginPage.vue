<template>
  <el-container style="height: 100vh; background: url('~@/assets/彼岸花女.jpg') no-repeat center center fixed;">
    <el-main style="display: flex; justify-content: center; align-items: center;">
      <el-card style="width: 400px; background-color: rgba(255, 255, 255, 0.8);">
        <el-form ref="form" :model="userLoginInfo" label-width="80px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="userLoginInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userLoginInfo.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登入</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
<!--  <div align="center">-->
<!--    <h1>Login Page</h1>-->
<!--    <button type="submit" @click="login">Login</button>-->

<!--  </div>-->
</template>

<script>
import {userLogin} from "@/request";
import {ElMessage} from "element-plus";
export default {
  data() {
    return {
      userLoginInfo: {
        username: '',
        password: '',
      }
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
      } else {
        ElMessage.warning(result.message);
      }

    }
  },
};
</script>