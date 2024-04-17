<template>
  <div class="box">
    <div class="top">
      <div class="navbar">
        <el-button @click="goBack">
          <el-icon><ArrowLeftBold /></el-icon>
        </el-button>
        <span class="title2">系统组织人员管理</span>
        <template v-if="!isView">
          <el-button class="nav-button" @click="getPerExportFile()" >导入模板</el-button>
          <el-button class="nav-button" @click="perExport()" >人员导入</el-button>
        </template>
      </div>
    </div>
  </div>

  <div class="content-perInfo" v-if="perList != null ">
    <el-input
        v-model="filterPerKey"
        placeholder="请输入关键字进行筛选"
        style="margin-right: 10px;margin-top: 12px ; margin-left:10px;width: 300px"
    ></el-input>
    <el-table :data="filteredArray" stripe style="width: 100%">
      <el-table-column prop="cPIName" label="姓名" width="150" />
      <el-table-column prop="cPIGender" label="性别" width="100" />
      <el-table-column prop="cPIHometown" label="户籍地" width="300" />
      <el-table-column prop="cPIContactNumber" label="联系电话" width="250" />
      <el-table-column prop="cPIEmail" label="邮箱" width="250"/>
      <el-table-column prop="bPIIsEnabled" label="是否启用" width="150" />
      <el-table-column label="操作" width="300">
        <template v-slot="{ row }">
          <el-button  @click="deletePer(row.cPICode)">删除</el-button>
          <el-button  @click="viewPer(row.cPICode)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div>
    <el-dialog
        class="dialog-style"
        title="组织人员导入"
        v-model="fileExport"
        @close="fileExport = false"
        :draggable="true"
        width="200px"
        :close-on-click-modal="false"
        :center="true"
    >
      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <label for="fileInput" class="custom-file-input">请选择导入文件</label>
        <input id="fileInput" type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />
      </div>
    </el-dialog>
  </div>
  <div v-if="perList == null">
    <el-empty description="无数据" />
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {deletePerInfo,  exportFile, getAllPerInfo} from "@/request";

export default {
  name:'organize-manage',
  data(){
    return {
      cOICode: null, // 组织编码
      parentOrgCode: null, // 父级组织编码
      state: null, // 表单状态
      fileExport: false,
      perList: [],
      filterPerKey: '',
    }
  },
  // 页面初始化加载
  mounted() {
    this.initInfoData();// 初始话数据
  },
  computed: {
    show() {
      const show = this.dataArray?.length ? false : true;
      return show;
    },
    filteredArray() {
      // 使用筛选条件过滤数组对象
      return this.perList?.filter(item => {
        return item?.cPIName?.includes(this.filterPerKey)
            || item?.cPIGender?.includes(this.filterPerKey)
            || item?.cPIHometown?.includes(this.filterPerKey)
            || item?.cPIContactNumber?.includes(this.filterPerKey)
            || item?.cPIEmail?.includes(this.filterPerKey)
            || item?.bPIIsEnabled?.includes(this.filterPerKey)
            ;
      });
    },
  },
  methods:{
    async initInfoData(){
      const result = await getAllPerInfo();
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      this.perList = result.data?.perList;
    },
    goBack(){
      this.$router.go(-1);
    },
    async deletePer(perCode){
      const requestData = {
        perCode: perCode
      }
      const result = await deletePerInfo(requestData);
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.initInfoData();
    },

    // 人员导入
    perExport(){
      this.fileExport = true;
    },

    // 模板下载
    async getPerExportFile() {
      const fileName = '系统人员信息导入.xlsx'
      const formData = new FormData();
      formData.append('fileName', fileName);

      // 发起下载请求
      const response = await fetch('/api/File/downTemplateFile', {
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
      link.download = fileName; // 设置文件名
      link.click();

      // 清理资源
      URL.revokeObjectURL(downloadUrl);
    },

    // 选择文件时处理
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.uploadFile();
    },

    viewPer(perCode){
      console.log(perCode);
    },

    // 上传文件时处理
    async uploadFile() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result = await exportFile(formData);

      this.selectedFile = null;// 重置
      const fileInput = document.getElementById('fileInput');
      fileInput.value = ''; // 清空文件输入框的值

      if (result == null || result == undefined) {
        ElMessage.error("上传失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.fileExport = false;
      this.initInfoData();
    },
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

.content-perInfo {
  margin-top: 8px;
}

.dialog-style {
  border-radius: 6px;
  width: 200px;
  margin-top: 20px;
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