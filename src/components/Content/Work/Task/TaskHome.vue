<template>
    <div class="outer-container">
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex;">
          <SearchPage :type="'collectInfo'" @searchInfo="searchInfo"/>
          <el-button class="collect-button" @click="goToMsgPage()">任务创建</el-button>
        </div>
        <div class="wrapper">
         <template
            v-for="(data,index) in dataArray"
            :key="data.iTMId"
         >
           <template v-if="index===0">
             <div class="container" style="font-weight: bolder; font-size: 18px">
               <div class="left">
                 <div class="left-title">
                   <span class="left-fontStyle">标题</span>
                 </div>
                 <div class="left-time">
                   <span class="left-fontStyle">创建时间|发布时间</span>
                 </div>
                 <div class="left-creator">
                   <span class="left-fontStyle">发布者</span>
                 </div>
                 <div class="left-creator">
                   <span class="left-fontStyle">状态</span>
                 </div>
               </div>
               <div class="right">
                 <div class="left-creator" style="text-align: right;padding-right: 10%">
                   <span class="left-fontStyle">操作</span>
                 </div>
               </div>
             </div>
           </template>
           <div class="container">
             <div class="left">
               <div class="left-title">
                 <span class="left-fontStyle">{{ data.cTMTitle }}</span>
               </div>
               <template v-if="data.cTMState === '发布'">
                 <div class="left-time">
                   <span class="left-fontStyle">{{ data.dTMUpdateTime }}</span>
                 </div>
               </template>
               <template v-else>
                 <div class="left-time">
                   <span class="left-fontStyle">{{ data.dTMCreateTime }}</span>
                 </div>
               </template>
               <div class="left-creator">
                 <span class="left-fontStyle">{{ data.cTMPubName }}</span>
               </div>
               <div class="left-creator">
                 <span class="left-fontStyle">{{ data.cTMState }}</span>
               </div>
             </div>
             <div class="right">

               <el-dropdown split-button >
                 操作
                 <template #dropdown>
                   <el-dropdown-menu>
                     <el-dropdown-item @click="goToShow(data.iTMId)">查看任务</el-dropdown-item>
                     <el-dropdown-item @click="managerConfigShow(data.iTMId)">发布配置</el-dropdown-item>
                     <el-dropdown-item @click="goToDataShow(data.iTMId,data.cIFTitle,data.cTMState)" v-if="(data.cTMState == '发布' || data.cTMState == '停止')">查看数据</el-dropdown-item>
                     <el-dropdown-item @click="publishForm(data.iTMId)" v-if="data.cTMState != '发布'">发布任务</el-dropdown-item>
                     <el-dropdown-item @click="editPage(data.iTMId)" v-if="data.cTMState == '发布'">结束任务</el-dropdown-item>
                     <el-dropdown-item @click="goToEditPage(data.iTMId)" v-if="data.cTMState != '发布'">编辑任务</el-dropdown-item>
                     <el-dropdown-item @click="deleteTask(data.iTMId)" v-if="data.cTMState != '发布'">删除任务</el-dropdown-item>
                     <el-dropdown-item @click="downTaskZipFile(data.cTMTitle,data.iTMId)" v-if="data.cTMState != '草稿'">下载压缩文件</el-dropdown-item>
                   </el-dropdown-menu>
                 </template>
               </el-dropdown>
  
             </div>
           </div>
         </template>
        </div>
        <div class="container-selectPage" v-show="!show">
          <div class="demo-pagination-block">
            <el-pagination
                v-model:current-page="selectPage.currentPage"
                v-model:page-size="selectPage.pageSize"
                small="small"
                layout="total, prev, pager, next, jumper"
                :total="selectPage.total"
                @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <div v-show="show">
          <el-empty description="无数据" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SearchPage from "@/components/Content/Work/SearchPage";
  import {deleteCollectInfo, deleteTask, getTaskInfoList, pubTask} from "@/request";
  import {ElMessage} from "element-plus";
  export default {
    name: "NoticeHome",
    components: {SearchPage},
    data() {
      return {
        searchData: {},
        selectPage: {
          currentPage: 1,
          pageSize: 10,
          offset: 0,
          total: 0,
        },
        dataArray: [],
      };
    },
  
    // 页面初始化加载
    mounted() {
      this.initCollectData();// 初始话数据
    },
    computed:{
      show(){
        const show = this.dataArray?.length ? false : true;
        return show;
      }
    },
    methods: {
      async searchInfo(searchData){
        this.searchData = searchData;
        const requestData = {
          searchData: searchData,
          pageData: this.selectPage
        };
        let result = await getTaskInfoList(requestData);
        this.dataArray = result.data?.infoList;
        this.selectPage.total = result.data?.amount;
      },
      async initCollectData() {
        let requestData = {
          searchData: this.searchData,
          pageData: this.selectPage
        };
        const result = await getTaskInfoList(requestData);
        if (result != null && result.code != 0) {
          ElMessage.error(result.message);
          return;
        }
        this.dataArray = result.data?.infoList;
        this.selectPage.total = result.data?.amount;
      },

      async handleCurrentChange(newPage) {
        // 处理当前页码改变事件
        this.selectPage.currentPage = newPage;
        // 重新加载数据
        this.selectPage.offset = (this.selectPage.currentPage-1) * this.selectPage.pageSize;
        let requestData = {
          searchData: this.searchData,
          pageData: this.selectPage
        };
        let result = await getTaskInfoList(requestData);
        this.dataArray = result.data?.infoList;
        this.selectPage.total = result.data?.amount;
      },

      goToShow(iTMId) {
        this.$router.push({ path: "/taskInfoDesign", query: { state: 'view',iTMId: iTMId } });
      },
      goToMsgPage() {
        this.$router.push({ path: "/taskInfoDesign", query: { state: 'add' } });
      },
      managerConfigShow(iTMId) {
        this.$router.push({ path: "/PubConfig", query: { iTypeId: iTMId, cType: 'Task' } });
      },
      goToDataShow(iTMId) {
        this.$router.push({ path: "/taskDataShow", query: { iTMId: iTMId } });
      },
      goToEditPage(iTMId) {
        this.$router.push({ path: "/taskInfoDesign", query: { iTMId:iTMId, state: 'edit' } });
      },

      async deleteTask(iTMId) {
        const requestData = {
          iTMId: iTMId
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
        this.initCollectData();
      },

      async publishForm(iTMId) {
        const requestData = {
          iTypeId: iTMId
        }
        const result = await pubTask(requestData);
        if (result == null || result == undefined) {
          ElMessage.error("操作失败！");
          return;
        }
        if (result.code != 0) {
          ElMessage.error(result.message);
          return;
        }
        ElMessage.success(result.data.message);
        this.initCollectData();
      },

      // 下载任务压缩文件
      async downTaskZipFile(cTMTitle,iTMId) {
        const formData = new FormData();
        formData.append('iTMId', iTMId);

        // 发起下载请求
        const response = await fetch('/api/File/downTaskZipFile', {
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
        link.download = cTMTitle + '任务完成文件.zip' // 设置文件名
        link.click();

        // 清理资源
        URL.revokeObjectURL(downloadUrl);
      },



      editPage(iTMId) {
        // 在这里处理"修改页面"选项的事件
        if (this.infoForm.cTMState === '发布') {
          ElMessage.warning("发布中不允许修改！");
          return;
        }
        if (this.infoForm.cTMState === '停止') {
          ElMessage.warning("已停止，不允许修改！");
          return;
        }
        this.$router.push({ path: "/collectInfoDesign", query: { state: 'edit',iTMId: iTMId } });
      },
      editConfig(iTMId) {
        // 在这里处理"修改配置"选项的事件
        if (this.infoForm.cTMState === '草稿') {
          ElMessage.warning("不存在表单配置！");
          return;
        }
  
        console.log(iTMId)
  
      },
      saveTemplate(iTMId) {
        // 保存表单模板
        ElMessage.info("saveTemplate");
        console.log(iTMId)
      },
      closePublish(iTMId) {
        // 在这里处理"关闭发布"选项的事件
        if (this.infoForm.cTMState === '草稿') {
          ElMessage.warning("不存在表单配置,不允许停止！");
          return;
        }
        if (this.infoForm.cTMState === '停止') {
          ElMessage.warning("不允许重复停止！");
          return;
        }
  
        console.log(iTMId)
  
      },
      async deleteForm(data) {
        // 在这里处理"删除表单"选项的事件
        if (data.cTMState === '发布') {
          ElMessage.warning("发布中，不允许删除！");
          return;
        }
        const confirmed = confirm('确认删除吗？');
        if (confirmed) {
          const requestData = {
            iTMId: data.iTMId
          };
          let result = await deleteCollectInfo(requestData);
          if (result.code == '0') {
            ElMessage.success(result.data);
            this.initData();
          } else {
            ElMessage.error(result.message);
          }
        }
      },
      // 查看数据
      seeData(){
        this.$router.push()
      }
    }
  }
  </script>
  
  <style scoped>
  .outer-container {
    display: flex;
    width: 100%;
  }
  
  .outer-container > div {
    flex-grow: 1;
  }
  
  .collect-button {
    margin: 6px;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    border: 1px solid #000000;
    margin: 0 6px;
    border-bottom: 0px;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
    /* 默认颜色 */
    background-color: #faf7f1;
  }
  
  .container:hover {
    /* 鼠标悬停时的颜色 */
    background-color: #eaeaea;
  }
  
  .container:first-child{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  
  .container:last-child{
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom: 1px solid #000000;
  }
  
  .container .left{
    display: flex;
    justify-content: flex-start;
    width: 70%;
  }
  
  .container .left div{
    margin: 0 20px;
  }
  
  .container .right button{
    margin: 0 6px;
    height: 32px;
    background-color: #fff;
    border-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    color: #606266;
  }
  
  .container .right button:hover{
    color: #409eff;
    border: 1px solid #409eff;
    background-color: #ecf5ff;
  }
  
  .container-selectPage {
    padding-top: 10px;
    width: 100%;
    height: 50px;
    margin-left: 6px;
    display: flex;
    justify-content: flex-end;
  }
  
  .right {
    display: flex;
    justify-content: flex-end;
    width: 20%;
    margin-right: 10px;
  }
  
  .left-title {
    flex: 1;
  }
  
  .left-time {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .left-creator {
    flex: 1;
  }
  
  .left-fontStyle {
    font-size: 16px;
    font-family: 'Kaiti'
  }
  
  .wrapper {
    text-align: center;
  }
  </style>