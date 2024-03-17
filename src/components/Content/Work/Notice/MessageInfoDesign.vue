<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <el-button @click="goBack">
      <el-icon><ArrowLeftBold /></el-icon>
    </el-button>
    <span class="title">通知发布表单设计</span>
    <el-button class="nav-button" @click="resetForm" :disabled="isSave">重置</el-button>
    <el-button class="nav-button" @click="saveForm" :disabled="isSave">保存</el-button>
  </div>
  <div class="detail">
    <div class="detail-item">
      <div>通知名称:</div>
      <el-input
      v-model="noticeTitle"
      style="width: 60%;font-size: 18px;  padding-left: 18px;font-family: Kaiti, serif;"
      autosize
      type="textarea"
      :placeholder=text
      :readonly="isSave"
    />
    </div>
    <div class="detail-item">
      <div>通知内容:</div>
      <el-input
      v-model="noticeContent"
      style="width: 60%;font-size: 18px;font-family: Kaiti, serif;  padding-left: 18px;"
      :autosize="{ minRows: 3, maxRows: 6 }"
      type="textarea"
      :placeholder= text
      :readonly="isSave"
    />
    </div>
    <!-- 上传文件 -->
    <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-change="handleChange"
  >
    <el-button type="primary" style="font-size: 18px; padding: 15px; font-family: Kaiti, serif;;" v-show="!isSave">请上传附件</el-button>
    <template #tip>
      <div class="el-upload__tip" :style="{'font-size': isSave ? '20px' : '16px','font-family': 'Kaiti, serif'}">
      {{ isSave ? '已上传列表:' : '注意：jpg/png 文件需要不超过500kb'}}
      </div>
    </template>
  </el-upload>
  </div>
  
</template>

<script>
export default {
name:'MessageInfoDesign',
data(){
    return{
      noticeTitle:'',
      noticeContent:'',
      taskRequire:'',
      fileList:[
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      ],
      isSave:false,  //是否保存
    }
},
computed:{
  text(){
    const text = this.isSave ? '' : '请输入内容'
    return text;
  }
},
methods:{
    goBack(){
        this.$router.push('/noticeHome');
    },
    // 保存表单
    saveForm(){
      this.isSave = true;
    },
    // 清空表单
    resetForm(){
      this.noticeContent = '';
      this.noticeTitle = '';
      this.taskRequire = '';
    }
}
}
</script>

<style scoped>
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

.title {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-left: 3%;
}

.nav-button {
  font-size: 14px;
}

.detail,
.save{
  width:70%;
  padding: 48px 0;
  font-size: 18px;
  margin: 0 auto;
}

.detail-item{
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;
  font-family: Kaiti, serif;
}

.save-item{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
  font-family: '宋体';
}

.save-item .save-title{
  width: 10%;
  overflow: hidden;
  white-space: normal;
  word-break: break-all;
}
.save-item .save-content{
  width: 88%;
  margin-left: 15px;
  overflow: hidden;
  white-space: normal;
  word-break: break-all;
}

.detail-item div{
  width: 10%;
}

.upload-demo{
  width: 70%;
  margin-left: 16%;
}

</style>