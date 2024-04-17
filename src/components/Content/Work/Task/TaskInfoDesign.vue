<template>
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <el-button @click="goBack">
        <el-icon><ArrowLeftBold /></el-icon>
      </el-button>
      <span class="title">任务发布表单设计</span>
      <template v-if="!isView">
        <el-button class="nav-button" @click="resetForm" v-if="!isSave&&!isEdit">重置</el-button>
        <el-button class="nav-button" @click="saveForm" v-if="!isSave">保存</el-button>
        <el-button class="nav-button" @click="goBack" v-if="isSave&&isEdit">关闭</el-button>
        <el-button class="nav-button" style="background-color: #f8b78d" @click="deleteTask" v-if="isEdit">删除</el-button>
      </template>
    </div>
    <div class="detail">
      <div class="detail-item">
        <div>任务名称:</div>
        <el-input
        v-model="taskTitle"
        style="width: 60%;font-size: 18px;  padding-left: 18px;"
        autosize
        type="textarea"
        :placeholder=text
        :readonly="isSave"
        :maxlength="20"
        show-word-limit
      />
      </div>
      <div class="detail-item">
        <div>任务内容:</div>
        <el-input
        v-model="taskContent"
        style="width: 60%;font-size: 18px;  padding-left: 18px;"
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        :placeholder= text
        :readonly="isSave"
        :maxlength="200"
        show-word-limit
      />
      </div>
      <div class="detail-item">
        <div>任务要求:</div>
        <el-input
        v-model="taskRequire"
        style="width: 60%;font-size: 18px;  padding-left: 18px;"
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        :placeholder= text
        :readonly="isSave"
        :maxlength="200"
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

      <!-- 个人任务处理     -->
      <template v-if="isDoTask || isApproval || isApprovalView || isDoTaskView">
        <div style="margin-left: 14%; width: 73%;border-radius: 6px; margin-top: 25px">
          <hr style="border: #50a80c 3px solid"/>
          <h4>任务处理</h4>
          <label for="fileInputDo" class="custom-file-input" v-if="isDoTask && !isDoTaskView">
            请选择上传文件
            <input id="fileInputDo" type="file" ref="fileInputDo" @change="handleFileChangeDo" />
          </label>
          <template v-if="this.fileListDo != null && this.fileListDo?.length != 0">
            <el-table :data="fileListDo" style="width: 100%">
              <el-table-column prop="fileName" label="文件名" width="540px"></el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button type="success" @click="downFile(row)">下载</el-button>
                  <el-button type="danger" @click="deleteFileDo(row)" v-if="isDoTask">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>

          <!-- 个人审批处理     -->
          <template v-if="isApproval || isApprovalView">
            <div style="margin-top: 25px">
              <hr style="border: #c77312 3px solid"/>
              <h4>审批处理</h4>
              <div class="approval-description">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="审批描述：" style="width: 600px">
                      <el-input
                          type="textarea"
                          :rows="3"
                          v-model="approvalDescription"
                          placeholder="请输入审批描述"
                          show-word-limit
                          :maxlength="100"
                          :readonly="isApprovalView"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </template>

          <div style="margin-top: 30px; margin-left: 36%">
            <el-button type="success" @click="doneTask()" v-if="!isDoTaskView && isDoTask">确认完成</el-button>
            <el-button type="success" @click="approvalTask(true)" v-if="isApproval">通过</el-button>
            <el-button type="error" @click="approvalTask(false)" v-if="isApproval">不通过</el-button>
          </div>
        </div>
      </template>

    </div>

  </template>

  <script>
  import {ElMessage} from "element-plus";
  import {approvalTask, deleteFile, deleteTask, doneTask, getTaskInfo, saveTask, uploadFile} from "@/request";

  export default {
  name:'MessageInfoDesign',
  data(){
      return{
        iTMId: 0,
        workTaskId: 0,
        taskTitle:null,
        taskContent:null,
        taskRequire:null,
        approvalDescription: '',
        fileList:[],
        fileListDo:[],
        isSave: true,  //是否已经保存
        isView: true,
        isEdit: false,
        isDoTask: false,
        isApproval: false,
        isDoTaskView: true,
        isApprovalView: true,
      }
  },
    mounted() {
      this.state = this.$route.query.state;
      this.iTMId = this.$route.query.iTMId;
      this.workTaskId = this.$route.query.workTaskId;

      if (this.state == 'view') {
        this.isView = true;
        this.isSave = true;
        this.isApproval = false;
        this.isApprovalView = false;
        this.isDoTaskView = false;
        this.isDoTask = false;
      }
      if (this.state == 'doTaskView') {
        this.isView = true;
        this.isSave = true;
        this.isDoTaskView = true;
        this.isDoTask = false;
        this.isApproval = false;
        this.isApprovalView = false;
      }
      if (this.state == 'approvalView') {
        this.isView = true;
        this.isSave = true;
        this.isDoTaskView = false;
        this.isDoTask = false;
        this.isApproval = false;
        this.isApprovalView = true;
      }
      if (this.state == 'edit') {
        this.isView = false;
        this.isSave = false;
        this.isEdit = true;
        this.isApproval = false;
        this.isApprovalView = false;
        this.isDoTaskView = false;
        this.isDoTask = false;
      }
      if (this.state == 'add') {
        this.isView = false;
        this.isSave = false;
        this.isApproval = false;
        this.isApprovalView = false;
        this.isDoTaskView = false;
        this.isDoTask = false;
      }
      if (this.state == 'doTask') {
        this.isView = true;
        this.isSave = true;
        this.isDoTaskView = false;
        this.isApproval = false;
        this.isApprovalView = false;
        this.isDoTask = true;
      }
      if (this.state == 'approval') {
        this.isView = true;
        this.isSave = true;
        this.isApproval = true;
        this.isApprovalView = false;
        this.isDoTaskView = true;
        this.isDoTask = false;
      }

      if (this.iTMId != 0 && this.state != 'add') {
        // 初始化数据
        this.initInfoData();
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
          // this.$router.push('/taskHome');
        this.$router.go(-1);
      },

      // 保存表单
      async saveForm(){
        // 文件ID
        const fileIds = this.fileList.map(item => item.fileId).join(',');
        const requestData = {
          taskTitle: this.taskTitle,
          taskContent: this.taskContent,
          taskRequire: this.taskRequire,
          fileIds: fileIds
        };
        const result = await saveTask(requestData);
        if (result == null || result == undefined){
          ElMessage.error("操作失败！");
          return;
        }
        if (result.code != 0) {
          ElMessage.error(result.message);
          return;
        }
        ElMessage.success(result.data.message);
        this.isSave = true;
      },

      // 获取表单数据
      async initInfoData(){
        if (this.iTMId == 0) {
          return;
        }
        const requestData = {
          iTMId: this.iTMId,
          workTaskId: this.workTaskId,
          state: this.state
        };
        const result = await getTaskInfo(requestData);
        if (result == null || result == undefined) {
          ElMessage.error("操作失败！")
          return;
        }
        if (result.code != 0) {
          ElMessage.error(result.message);
          return;
        }
        this.taskTitle = result.data.cTMTitle;
        this.taskContent = result.data.cTMContent;
        this.taskRequire = result.data.cTMRequest;
        this.fileList = result.data.fileList;
        this.fileListDo = result.data.fileListDo;
        this.approvalDescription = result.data?.approvalDescription;
      },
    async deleteTask(){
      const requestData = {
        iTMId: this.iTMId
      }
      const result = await deleteTask(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error("操作失败！");
        return;
      }
      ElMessage.success(result.data.message);
      this.goBack();
    },

    // 清空表单
    resetForm(){
      this.taskContent = null;
      this.taskTitle = null;
      this.taskRequire = null;
    },

    // 完成任务
    async doneTask(){
      const fileDoIds = this.fileListDo.map(item => item.fileId).join(',');
      const requestData = {
        iTMId: this.iTMId,
        workTaskId: this.workTaskId,
        fileDoIds: fileDoIds,
      };
      const result = await doneTask(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data?.message);
      this.isDoTaskView = true;
      this.isDoTask = false;
    },

    // 审批任务
    async approvalTask(isPass){
      const requestData = {
        isPass: isPass,
        approvalDescription: this.approvalDescription,
        iTMId: this.iTMId,
        workTaskId: this.workTaskId
      };
      const result = await approvalTask(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0){
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.goBack();
    },
    //--------------文件处理-------------
    // 选择文件时处理
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.uploadFile();
    },

    // 上传文件时处理
    async uploadFile() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('type', "task");
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

    // ------个人任务处理时文件上传--------------
    handleFileChangeDo(event) {
      this.selectedFileDo = event.target.files[0];
      this.uploadFileDo();
    },

    // 上传文件时处理
    async uploadFileDo() {
      const formData = new FormData();
      formData.append('file', this.selectedFileDo);
      formData.append('type', "doTask");
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
      this.fileListDo.push({
        fileId: result.data.fileId,
        fileName: result.data.fileName
      });

      this.selectedFileDo = null;// 重置
    },

    // 删除文件时处理
    async deleteFileDo(file) {
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
      const tarIndex = this.findIndexByFileIdDo(file.fileId);
      if (tarIndex == -1) {
        ElMessage.error("文件已删除！");
        return;
      }
      this.fileListDo.splice(tarIndex,1);
      ElMessage.success(result.data.message);

      // 防止相同资源选择后不能再选择，即处理浏览器的安全策略
      if (this.fileListDo.length == tarIndex) {
        const fileInputDo = document.getElementById('fileInputDo');
        fileInputDo.value = ''; // 清空文件输入框的值
      }
    },

    // 查询文件所在位置
    findIndexByFileIdDo(fileId) {
      for (let i = 0; i < this.fileListDo.length; i++) {
        if (this.fileListDo[i].fileId === fileId) {
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
  }

  .detail,
  .save{
    width:70%;
    padding: 100px 0;
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

  .approval-description {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .text-count {
    text-align: right;
    font-size: 12px;
    color: #909399;
  }
  </style>