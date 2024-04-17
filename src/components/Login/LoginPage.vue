<template>
  <el-container style="height: 100vh; background: url('/backImg.jpg') no-repeat center center / cover fixed;">
    <el-main style="display: flex; justify-content: center; align-items: center; font-family: '楷体', serif; font-size: 30px; margin-bottom: 100px;">
      <el-card style="width: 400px; background-color: rgba(255, 255, 255, 0.8);">
        <div style="margin-bottom: 10px;display: flex; justify-content: center; align-items: center; width: 100%; font-weight: bold;">
          <el-text size="large">团班助管系统</el-text>
        </div>
        <el-form ref="form" :model="userLoginInfo" label-width="80px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="userLoginInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userLoginInfo.password"></el-input>
          </el-form-item>
          <el-form-item style="display: flex; justify-content: center; margin-left: 80px">
            <el-button type="primary" @click="login">登入</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { userLogin } from "@/request";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      userLoginInfo: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      // 处理登录逻辑
      const requestData = {
        curCode: this.userLoginInfo.username,
        curPassword: this.userLoginInfo.password,
      };
      let result = await userLogin(requestData);
      if (result.code === 0) {
        // 登录成功后跳转到首页
        this.$router.push('/home');
      } else {
        ElMessage.warning(result.message);
      }
    },
  },
};
</script>

<style>
 * {
   margin: 0;
   padding: 0;
 }
</style>