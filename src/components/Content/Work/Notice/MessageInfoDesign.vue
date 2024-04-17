<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <el-button @click="goBack">
      <el-icon><ArrowLeftBold /></el-icon>
    </el-button>
    <span class="title">通知发布表单设计</span>
    <template v-if="!isView">
      <el-button class="nav-button" @click="resetForm" v-if="!isSave">重置</el-button>
      <el-button class="nav-button" @click="saveForm" v-if="!isSave">保存</el-button>
      <el-button class="nav-button" @click="editFrom" v-if="isSave">修改</el-button>
      <el-button class="nav-button" style="background-color: #f6be76" @click="deleteFrom" v-if="isSave">删除</el-button>
    </template>
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
          maxlength="20"
          show-word-limit
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
      maxlength="200"
      show-word-limit
    />
    </div>
    <!-- 上传文件 -->

    <div style="margin-left: 14%; width: 73%;border-radius: 6px">
      <label for="fileInput" class="custom-file-input" v-if="!isSave">
        请选择上传文件
        <input id="fileInput" type="file" ref="fileInput" @change="handleFileChange" />
      </label>
      <template v-if="this.fileList != null && this.fileList?.length != 0">
        <el-table :data="fileList" style="width: 100%">
          <el-table-column prop="fileName" label="文件名" width="540px"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="success" @click="downFile(row)">下载</el-button>
              <el-button type="danger" @click="deleteFile(row)" v-if="!isSave">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>


    <div style="width: 200px; height: 70px; margin-top: 70px;margin-left: 40%">
      <el-button class="nav-button" @click="goBack" v-if="isCommit">关闭</el-button>
      <el-button class="nav-button" @click="commitInfo" v-if="isCommit">确认通知</el-button>
    </div>
  </div>

</template>

<script>
import {saveNoticeManager, deleteNotifyInfo, handleWorkTask, getNotifyInfo, uploadFile, deleteFile} from "@/request";
import {ElMessage} from "element-plus";

export default {
name:'MessageInfoDesign',
data(){
    return{
      iNMId: 0,
      workTaskId: 0,
      noticeTitle:'',
      noticeContent:'',
      taskRequire:'',
      fileList:[
      ],
      selectedFile: null,

      isSave:false,  //是否保存
      isCommit:false,  //是否确认通知
      isView:false,  //是否浏览
    }
},
  mounted() {
    this.state = this.$route.query.state;

    if (this.state == 'edit') {
      this.iNMId = this.$route.query.iNMId;
    }
    if (this.state == 'commit') {
      this.workTaskId = this.$route.query.workTaskId;
      this.iNMId = this.$route.query.iNMId;
      this.isCommit = true;
      this.isSave = true;
      this.isView = true;
    }
    if (this.state == 'view') {
      this.iNMId = this.$route.query.iNMId;
      this.isView = true;
      this.isSave = true;
    }
    this.getNotifyInfo();// 初始化数据
  },

  computed:{
  text(){
    const text = this.isSave ? '' : '请输入内容'
    return text;
  }
},
methods:{
  async getNotifyInfo(){
    if (this.iNMId == 0) {
      return;
    }
    const requestData = {
      iNMId: this.iNMId,
    }
    const result = await getNotifyInfo(requestData);
    if (result == null || result == undefined) {
      ElMessage.error("操作失败！");
      return;
    }
    if (result.code != 0) {
      ElMessage.error(result.message);
      return;
    }
    this.noticeTitle = result.data.info.cnmtitle;
    this.noticeContent = result.data.info.cnmcontent;
    this.fileList = result.data.fileList
  },

  goBack(){
    this.$router.go(-1);
  },
  // 保存表单
  async saveForm(){
    // 文件ID
    const fileIds = this.fileList.map(item => item.fileId).join(',');

    // 请求封装
    const requestData = {
      iNMId: this.iNMId,
      title: this.noticeTitle,
      content: this.noticeContent,
      fileIds: fileIds
    }
    const result = await saveNoticeManager(requestData);
    if (result == null || result == undefined) {
      ElMessage.error("操作失败！");
      return;
    }
    if (result.code != 0) {
      ElMessage.error(result.message);
      return;
    }
    ElMessage.success(result.data.message);
    this.isSave = true;
    this.iNMId = result.data.iNMId
  },
  // 清空表单
  resetForm(){
    this.noticeContent = '';
    this.noticeTitle = '';
    this.taskRequire = '';
  },
  editFrom(){
    this.isSave = false;
  },
  async deleteFrom(){
    const requestData = {
      iNMId: this.iNMId
    }
    const result = await deleteNotifyInfo(requestData);
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
  },

  // 确认通知
  async commitInfo(){
    const requestData = {
      workTaskId: this.workTaskId,
      type: 'Notify',
      title: '通知确认',
    }
    const result = await handleWorkTask(requestData);
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
  },

  // 文件处理
  // 选择文件时处理
  handleFileChange(event) {
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  },

  // 上传文件时处理
  async uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('type', "notify");
    const result = await uploadFile(formData);
    if (result == null || result == undefined) {
      ElMessage.error("上传失败！");
      return;
    }
    if (result.code != 0) {
      ElMessage.error(result.message);
      return;
    }
    ElMessage.success("上传成功！");
    this.fileList.push({
      fileId: result.data.fileId,
      fileName: result.data.fileName
    });

    this.selectedFile = null;// 重置
  },

  // 下载文件时处理
  async downFile(file) {
    const formData = new FormData();
    formData.append('fileId', file.fileId);

    // 发起下载请求
    const response = await fetch('/api/File/downFile', {
      method: 'POST',
      body: formData
    });

    // 将响应转换为 blob 对象
    const blob = await response.blob();

    // 创建下载链接
    const downloadUrl = URL.createObjectURL(blob);

    // 创建 <a> 元素并模拟点击
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.fileName; // 设置文件名
    link.click();

    // 清理资源
    URL.revokeObjectURL(downloadUrl);
  },

  // 删除文件时处理
  async deleteFile(file) {
    // 处理文件删除
    const formData = new FormData();
    formData.append('fileId', file.fileId);
    const result = await deleteFile(formData);
    if (result == null || result == undefined) {
      ElMessage.error("操作失败！")
      return;
    }
    if (result.code != 0) {
      ElMessage.error(result.message);
      return;
    }
    const tarIndex = this.findIndexByFileId(file.fileId);
    if (tarIndex == -1) {
      ElMessage.error("文件已删除！");
      return;
    }
    this.fileList.splice(tarIndex,1);
    ElMessage.success(result.data.message);

    // 防止相同资源选择后不能再选择，即处理浏览器的安全策略
    if (this.fileList.length == tarIndex) {
      const fileInput = document.getElementById('fileInput');
      fileInput.value = ''; // 清空文件输入框的值
    }
  },

  // 查询文件所在位置
  findIndexByFileId(fileId) {
    for (let i = 0; i < this.fileList.length; i++) {
      if (this.fileList[i].fileId === fileId) {
        return i;
      }
    }
    return -1; // 如果未找到匹配的元素
  },
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
  background-color: #e1faf6;
}

.detail,
.save{
  width:65%;
  padding: 60px 0;
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

/* 文件选择输入框样式 */
input[type="file"] {
  display: none; /* 隐藏原始的文件选择输入框 */
}

.custom-file-input {
  /* 自定义文件选择按钮样式 */
  display: inline-block;
  padding: 8px 12px;
  background-color: rgba(0, 123, 255, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-family: Kaiti, serif;
}

.custom-file-input:hover {
  background-color: rgba(0, 123, 255, 0.9); /* 鼠标悬浮时的背景颜色 */
}

</style>