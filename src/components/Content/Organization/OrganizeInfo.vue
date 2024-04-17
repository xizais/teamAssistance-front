<template>
  <div class="box">
    <div class="top">
      <div class="navbar">
        <el-button @click="goBack">
          <el-icon><ArrowLeftBold /></el-icon>
        </el-button>
        <span class="title2">通知发布表单设计</span>
        <template v-if="!isView">
          <el-button class="nav-button" @click="resetForm" v-if="!isReadOnly">重置</el-button>
          <el-button class="nav-button" @click="saveForm" v-if="!isReadOnly">保存</el-button>
          <el-button class="nav-button" @click="editFrom" v-if="isReadOnly">修改</el-button>
          <el-button class="nav-button" style="background-color: #f6be76" @click="deleteFrom" v-if="isReadOnly">删除</el-button>
        </template>
      </div>
    </div>
    <div class="detail">
      <div class="item">
        <div class="title">组织编码: </div>
        <el-input
            v-model="orgInfo.cOIOrgCode"
            style="width: 400px;font-size: 18px;  padding-left: 18px;font-family: Kaiti, serif;"
            autosize
            type="textarea"
            :placeholder=text
            :readonly="isReadOnly"
            maxlength="20"
            show-word-limit
        />
      </div>
      <div class="item">
        <div class="title">组织名称: </div>
        <el-input
            v-model="orgInfo.cOIOrgName"
            style="width: 400px;font-size: 18px;  padding-left: 18px;font-family: Kaiti, serif;"
            autosize
            type="textarea"
            :placeholder=text
            :readonly="isReadOnly"
            maxlength="20"
            show-word-limit
        />
      </div>
      <div class="item" style="height: 110px">
        <div class="title">组织描述: </div>
        <el-input
            v-model="orgInfo.cOIOrgDescription"
            style="width: 400px;font-size: 18px;font-family: Kaiti, serif;  padding-left: 18px;"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            :placeholder= text
            :readonly="isReadOnly"
            maxlength="200"
            show-word-limit
        />
      </div>

      <div class="item">
        <div class="title">组织性质:</div>
        <el-select style="width: 200px;margin-left: 18px" v-model="orgInfo.cOIOrgType" placeholder="请选择">
          <el-option label="通用" value="通用"></el-option>
          <el-option label="校级" value="校级"></el-option>
          <el-option label="院级" value="院级"></el-option>
          <el-option label="班级" value="班级"></el-option>
          <el-option label="团级" value="团级"></el-option>
          <el-option label="通用" value="通用"></el-option>
        </el-select>
      </div>
      <div class="item">
        <div class="title">是否启用:</div>
        <el-switch v-model="orgInfo.bOIIsEnable" :disabled="isReadOnly" style="margin-left: 18px"></el-switch>
      </div>
      <div class="item">
        <div class="title">是否公用: </div>
        <el-switch v-model="orgInfo.bOIIsPublicVisible" :disabled="isReadOnly" style="margin-left: 18px"></el-switch>
      </div>
      <div class="item">
        <div class="title">组织创建人: </div>
        <el-text style="width: 400px;font-size: 18px;  padding-left: 18px;font-family: Kaiti, serif; text-align: left">{{orgInfo.curName}}</el-text>
      </div>
      <div class="item">
        <div class="title">组织人数: </div>
        <el-text style="width: 400px;font-size: 18px;  padding-left: 18px;font-family: Kaiti, serif;text-align: left">{{orgInfo.amount}}人</el-text>
      </div>
      <div class="item-btn">
        <el-button type="primary" @click="goBack()">关闭</el-button>
        <el-button type="primary" @click="saveOrgInfo()">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurPerInfo, saveOrgInfo} from "@/request";
import {ElMessage} from "element-plus";

export default {
  name:'organize-manage',
  data(){
    return {
      cOICode: null, // 组织编码
      parentOrgCode: null, // 父级组织编码
      state: null, // 表单状态

      isReadOnly: true,
      orgInfo: {
        cOIOrgCode: null,
        cOIOrgName: null,
        cOIOrgDescription: null,
        cOIOrgType: null,
        bOIIsEnable: true,
        bOIIsPublicVisible: false,
        curName: null,
        amount: 0,
      }
    }
  },
  // 页面初始化加载
  mounted() {
    this.initInfoData();// 初始话数据
  },
  methods:{
    async initInfoData(){
      this.cOICode = this.$route.query?.cOICode;
      this.state = this.$route.query.state;
      if (this.state == 'add') {
        this.cOICode = null;
        this.parentOrgCode = this.$route.query?.cOICode;
        this.isReadOnly = false;
        this.orgInfo.amount = 1;
        const result = await getCurPerInfo();
        this.orgInfo.curName = result.data.name;
      }
    },
    goBack(){
      this.$router.go(-1);
    },
    async saveOrgInfo(){
      this.orgInfo.cOICode = this.cOICode;
      this.orgInfo.parentOrgCode = this.parentOrgCode;
      const result = await saveOrgInfo(this.orgInfo);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.goBack();
    }
  }
}
</script>

<style scoped>
.box{
  width: 100%;
  text-align: center;
  font-size: 20px;
}

.top{
  height: 33px;
  line-height: 50px;
}

.detail{
  font-family: "楷体", "KaiTi", cursive;
  margin-top: 10px;
  width: 100%;
  height: 550px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f4faea;
}

.item{
  width: 600px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.item .title{
  display: inline-block;
  width: 110px;
  text-align: left;
}

.item-btn{
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;
}

.item-btn .btn{
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #000;
}

.navbar {
  background-color: #cbef8e;
  height: 48px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.title2 {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-left: 3%;
}

.nav-button {
  font-size: 14px;
  background-color: #e1faf6;
}
</style>