<template>
  <div class="box">
    <div class="top">
      <div class="navbar">
        <el-button @click="goBack">
          <el-icon><ArrowLeftBold /></el-icon>
        </el-button>
        <span class="title2">通知发布表单设计</span>
        <template v-if="!isView">
          <el-button class="nav-button" @click="resetForm" v-if="!isSave">重置</el-button>
          <el-button class="nav-button" @click="saveForm" v-if="!isSave">保存</el-button>
          <el-button class="nav-button" @click="editFrom" v-if="isSave">修改</el-button>
          <el-button class="nav-button" style="background-color: #f6be76" @click="deleteFrom" v-if="isSave">删除</el-button>
        </template>
      </div>
    </div>
    <div class="detail">
      <div class="item">
        <div class="title">组织编码: </div>
        <el-input
            v-model="noticeTitle"
            style="width: 400px;font-size: 18px;  padding-left: 18px;font-family: Kaiti, serif;"
            autosize
            type="textarea"
            :placeholder=text
            :readonly="isSave"
            maxlength="20"
            show-word-limit
        />
      </div>
      <div class="item">
        <div class="title">组织名称: </div>
        <el-input
            v-model="noticeTitle"
            style="width: 400px;font-size: 18px;  padding-left: 18px;font-family: Kaiti, serif;"
            autosize
            type="textarea"
            :placeholder=text
            :readonly="isSave"
            maxlength="20"
            show-word-limit
        />
      </div>
      <div class="item" style="height: 110px">
        <div class="title">组织描述: </div>
        <el-input
            v-model="noticeContent"
            style="width: 400px;font-size: 18px;font-family: Kaiti, serif;  padding-left: 18px;"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            :placeholder= text
            :readonly="isSave"
            maxlength="200"
            show-word-limit
        />
      </div>
      <div class="item">
        <div class="title">组织性质:</div>
        <el-select style="width: 200px;margin-left: 18px" v-model="childType" placeholder="请选择">
          <el-option label="文本框" value="text"></el-option>
          <el-option label="输入框" value="input"></el-option>
          <el-option label="下拉框" value="select"></el-option>
          <el-option label="文本域" value="textarea"></el-option>
          <el-option label="单选框" value="radio"></el-option>
          <el-option label="多选框" value="checkbox"></el-option>
          <el-option label="时间器" value="time"></el-option>
        </el-select>
      </div>
      <div class="item">
        <div class="title">是否启用:</div>
        <el-switch v-model="isEnable" :disabled="isReadOnly" style="margin-left: 18px"></el-switch>
      </div>
      <div class="item">
        <div class="title">是否公用: </div>
        <el-switch v-model="isPublic" :disabled="isReadOnly" style="margin-left: 18px"></el-switch>
      </div>
      <div class="item">
        <div class="title">组织创建人: </div>
        <el-input
            v-model="noticeTitle"
            style="width: 400px;font-size: 18px;  padding-left: 18px;font-family: Kaiti, serif;"
            autosize
            type="textarea"
            :placeholder=text
            :readonly="isSave"
            maxlength="20"
            show-word-limit
        />
      </div>
      <div class="item">
        <div class="title">组织管理人: </div>
        <el-input
            v-model="noticeTitle"
            style="width: 400px;font-size: 18px;  padding-left: 18px;font-family: Kaiti, serif;"
            autosize
            type="textarea"
            :placeholder=text
            :readonly="isSave"
            maxlength="20"
            show-word-limit
        />
      </div>
      <div class="item-btn">
        <el-button type="primary" @click="close">关闭</el-button>
        <el-button type="primary" @click="close">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'organize-manage',
  data(){
    return {
      isEnable: true,
      isPublic: true,
    }
  },
  methods:{

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