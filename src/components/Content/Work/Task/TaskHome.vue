<template>
    <div class="outer-container">
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex;">
          <SearchPage :type="'collectInfo'" @searchInfo="searchInfo"/>
          <el-button class="collect-button" @click="goToMsgPage()">任务创建</el-button>
<!--          <el-button class="collect-button" @click="goToEditPage(4)">任务模板</el-button>-->
        </div>
        <div class="wrapper">
         <template
            v-for="(data,index) in dataArray"
            :key="data.iIFId"
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
                   <span class="left-fontStyle">创建者|发布者</span>
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
                 <span class="left-fontStyle">{{ data.cIFTitle }}</span>
               </div>
               <template v-if="data.cIFState === '发布'">
                 <div class="left-time">
                   <span class="left-fontStyle">{{ data.standerPubTime }}</span>
                 </div>
               </template>
               <template v-else>
                 <div class="left-time">
                   <span class="left-fontStyle">{{ data.standerCreateTime }}</span>
                 </div>
               </template>
               <div class="left-creator">
                 <span class="left-fontStyle">{{ data.cIFPuber }}</span>
               </div>
               <div class="left-creator">
                 <span class="left-fontStyle">{{ data.cIFState }}</span>
               </div>
             </div>
             <div class="right">
  <!--             <button>结束任务</button>-->
  <!--             <button @click="goToEditPage(data.iIFId)" v-if="data.cIFState !== '发布'">表单修改</button>-->
  <!--             <button v-if="data.cIFState === '发布'">任务修改</button>-->
  <!--             <button @click="goToShow(data.iIFId)">查看</button>-->
  
               <el-dropdown split-button >
                 操作
                 <template #dropdown>
                   <el-dropdown-menu>
                     <el-dropdown-item @click="goToShow(data.iIFId)">查看表单</el-dropdown-item>
                     <el-dropdown-item @click="(data.iIFId)" v-if="data.authority">查看配置</el-dropdown-item>
                     <el-dropdown-item @click="seeData" v-if="data.authority && (data.cIFState === '发布' || data.cIFState === '停止')">查看数据</el-dropdown-item>
                     <el-dropdown-item @click="editPage(data.iIFId)" v-if="data.authority && data.cIFState !== '发布'">发布任务</el-dropdown-item>
                     <el-dropdown-item @click="editPage(data.iIFId)" v-if="data.authority && data.cIFState === '发布'">结束任务</el-dropdown-item>
                     <el-dropdown-item @click="goToEditPage(data.iIFId)" v-if="data.authority && data.cIFState !== '发布'">表单处理</el-dropdown-item>
                     <el-dropdown-item @click="publishForm(data.iIFId)" v-if="data.authority && data.cIFState !== '发布'">配置处理</el-dropdown-item>
                     <el-dropdown-item @click="deleteForm(data)" v-if="data.authority && data.cIFState !== '发布'">删除表单</el-dropdown-item>
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
  import {deleteCollectInfo, getCollectInfoList} from "@/request";
  import {ElMessage} from "element-plus";
  export default {
    name: "NoticeHome",
    components: {SearchPage},
    data() {
      return {
        selectPage: {
          currentPage: 1,
          pageSize: 10,
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
        let result = await getCollectInfoList(searchData);
        this.dataArray = result.data?.infoList;
        this.selectPage.total = this.dataArray?.length;
      },
      async initCollectData() {
        let requestData = {
          selectPage: this.selectPage
        };
        let result = await getCollectInfoList(requestData);
        this.dataArray = result.data?.infoList;
        this.selectPage.total = this.dataArray?.length;
      },
      goToMsgPage() {
        this.$router.push({ path: "/taskInfoDesign", query: { state: 'add' } });
      },
      goToEditPage(iIFId) {
        this.$router.push({ path: "/collectInfoDesign", query: { state: 'edit',iIFId: iIFId } });
      },
      goToShow(iIFId) {
        this.$router.push({ path: "/CollectInfoShow", query: { state: 'show',iIFId: iIFId } });
      },
      editPage(iIFId) {
        // 在这里处理"修改页面"选项的事件
        if (this.infoForm.cifstate === '发布') {
          ElMessage.warning("发布中不允许修改！");
          return;
        }
        if (this.infoForm.cifstate === '停止') {
          ElMessage.warning("已停止，不允许修改！");
          return;
        }
        this.$router.push({ path: "/collectInfoDesign", query: { state: 'edit',iIFId: iIFId } });
      },
      editConfig(iIFId) {
        // 在这里处理"修改配置"选项的事件
        if (this.infoForm.cifstate === '草稿') {
          ElMessage.warning("不存在表单配置！");
          return;
        }
  
        console.log(iIFId)
  
      },
      publishForm(iIFId) {
        // 在这里处理"发布表单"选项的事件
        if (this.infoForm.cifstate === '草稿') {
          ElMessage.warning("不存在表单配置,不允许发布！");
          return;
        }
        if (this.infoForm.cifstate === '发布') {
          ElMessage.warning("不允许重复发布！");
          return;
        }
  
        console.log(iIFId)
  
  
      },
      saveTemplate(iIFId) {
        // 保存表单模板
        ElMessage.info("saveTemplate");
        console.log(iIFId)
      },
      closePublish(iIFId) {
        // 在这里处理"关闭发布"选项的事件
        if (this.infoForm.cifstate === '草稿') {
          ElMessage.warning("不存在表单配置,不允许停止！");
          return;
        }
        if (this.infoForm.cifstate === '停止') {
          ElMessage.warning("不允许重复停止！");
          return;
        }
  
        console.log(iIFId)
  
      },
      async deleteForm(data) {
        // 在这里处理"删除表单"选项的事件
        if (data.cIFState === '发布') {
          ElMessage.warning("发布中，不允许删除！");
          return;
        }
        const confirmed = confirm('确认删除吗？');
        if (confirmed) {
          const requestData = {
            iIFId: data.iIFId
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