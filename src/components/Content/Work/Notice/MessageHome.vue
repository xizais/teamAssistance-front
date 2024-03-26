<template>
  <div class="outer-container">
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex;">
        <div style="width: 500px;height: 40px;margin-left: 10px">
          <el-input style="width: 300px;" v-model="searchInput" placeholder="请输入筛选内容"></el-input>
          <el-button class="container-button" type="primary" style="margin-left: 4px" @click="this.searchInput=''">重置</el-button>
        </div>
        <el-button class="collect-button" @click="goToMsgPage()">通知创建</el-button>
      </div>
      <div class="wrapper">
       <template
          v-for="(data,index) in filteredArray"
          :key="data.iNMId"
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
               <span class="left-fontStyle">{{ data.cNMTitle }}</span>
             </div>
             <template v-if="data.cNMState === '发布'">
               <div class="left-time">
                 <span class="left-fontStyle">{{ data.dNMUpdateTime }}</span>
               </div>
             </template>
             <template v-else>
               <div class="left-time">
                 <span class="left-fontStyle">{{ data.dNMCreateTime }}</span>
               </div>
             </template>
             <div class="left-creator">
               <span class="left-fontStyle">{{ data.cNMPubName }}</span>
             </div>
             <div class="left-creator">
               <span class="left-fontStyle">{{ data.cNMState }}</span>
             </div>
           </div>
           <div class="right">
             <el-dropdown split-button >
               操作
               <template #dropdown>
                 <el-dropdown-menu>
                   <el-dropdown-item @click="goToShow(data.iNMId)">查看通知</el-dropdown-item>
                   <el-dropdown-item @click="editNotify(data.iNMId)" v-if="data.cNMState == '草稿'">修改通知</el-dropdown-item>
                   <el-dropdown-item @click="deleteNotify(data.iNMId)">删除通知</el-dropdown-item>
                   <el-dropdown-item @click="managerConfigShow(data.iNMId)">发布配置</el-dropdown-item>
                   <el-dropdown-item @click="pubNotifyInfo(data.iNMId)" v-if="data.cNMState == '草稿'">发布通知</el-dropdown-item>
                   <el-dropdown-item @click="(data.iNMId)" v-if="data.cNMState == '发布'">查看数据</el-dropdown-item>
                 </el-dropdown-menu>
               </template>
             </el-dropdown>

           </div>
         </div>
       </template>
      </div>

      <div v-show="show">
        <el-empty description="无数据" />
      </div>
    </div>
  </div>
</template>

<script>
import {deleteNotifyInfo, getNotifyInfoList, pubNotify} from "@/request";
import {ElMessage} from "element-plus";
export default {
  name: "NoticeHome",
  data() {
    return {
      searchInput: '',
      dataArray: [],
    };
  },

  // 页面初始化加载
  mounted() {
    this.initInfoData();// 初始话数据
  },
  computed:{
      show(){
        const show = this.dataArray?.length ? false : true;
        return show;
      },
      filteredArray() {
        // 使用筛选条件过滤数组对象
        return this.dataArray.filter(item => {
          return item?.cNMTitle?.includes(this.searchInput)
              || item?.dNMUpdateTime?.includes(this.searchInput)
              || item?.dNMCreateTime?.includes(this.searchInput)
              || item?.cNMPubName?.includes(this.searchInput)
              || item?.cNMState?.includes(this.searchInput)
              ;
        });
    }

  },
  methods: {
    async initInfoData() {
      let result = await getNotifyInfoList();
      this.dataArray = result.data?.infoList;
    },

    goToMsgPage() {
      this.$router.push({ path: "/noticeInfoDesign", query: { state: 'add' } });
    },
    goToShow(iNMId) {
      this.$router.push({ path: "/noticeInfoDesign", query: { state: 'view',iNMId: iNMId } });
    },
    editNotify(iNMId) {
      this.$router.push({ path: "/noticeInfoDesign", query: { state: 'edit',iNMId: iNMId } });
    },

    async deleteNotify(iNMId){
      const requestData = {
        iNMId: iNMId
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
      this.initInfoData()
    },

    managerConfigShow(iNMId) {
      this.$router.push({ path: "/PubConfig", query: { iTypeId: iNMId, cType: 'Notify' } });
    },

    async pubNotifyInfo(iNMId) {
      const requestData = {
        iTypeId: iNMId
      }
      const result = await pubNotify(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.initInfoData();
    },
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

.collect-button{
  margin-left: 630px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>