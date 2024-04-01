<template>
  <div class="box">
    <div class="navbar">
      <el-button @click="goBack">
        <el-icon><ArrowLeftBold /></el-icon>
      </el-button>
      <span class="title">预约信息</span>
    </div>
    <div class="search">
      <span>预约场地名称:</span>
      <div class="search-container">
        <el-input v-model="searchInfo" placeholder="请输入搜索内容"></el-input>
      </div>
    </div>
    <div class="detail" v-show="show">
      <div class="td">
        <div class="site-item">预约场地名称</div>
        <div class="site-item">预约场地地点</div>
        <div class="site-item">场地负责人</div>
        <div class="site-item">场地联系方式</div>
        <div class="site-time">预约时间段</div>
        <div class="site-item">预约状态</div>
        <div class="site-btn">操作</div>
      </div>
      <div class="td" v-for="item in dataInfo" :key="item.id">
        <div class="site-item">{{ item.cAIName }}</div>
        <div class="site-item">{{ item.cAIContent }}</div>
        <div class="site-item">{{ item.cAIManagerName }}</div>
        <div class="site-item" style="font-size: 18px">{{ item.cAIManagerPhone }}</div>
        <div class="site-time" style="font-size: 14px">{{ item.dABBookStartTime + '-'+item.dABBookEndTime
          }}</div>
        <div class="site-item">{{ item.cABState }}</div>
        <div class="site-btn">
          <el-button class="delete" @click="deleteItem(item.iABId)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteAreaBook, getAreaBookList} from "@/request";
import {ElMessage} from "element-plus";
export default {
  name:'manage-site',
  data(){
    return {
      dataList:[],
      showDialog:false,  //展示弹框
      searchInfo:'', //搜索场地名称
    }
  },
  mounted() {
    this.getDataList();
  },
  computed:{
    show(){
      return this.dataList.length? true : false;
    },
    dataInfo(){
      return this.dataList.filter(item => {
        return item.cAIName.includes(this.searchInfo)
            || item.cAIContent.includes(this.searchInfo)
            || item.cAIManagerName.includes(this.searchInfo);
      });
    }
  },
  methods:{
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    //获取数据
    async getDataList(){
      let result = await getAreaBookList({});
      if(result && result.code == 0){
        this.dataList = result.data.infoList;
      }
    },
    //删除数据
    async deleteItem(value){
      let result = await deleteAreaBook({iABId:value});
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.getDataList();
    },
  }
}
</script>

<style scoped>
.box{
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-family: Kaiti;
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

.title {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-left: 3%;
}

.search{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 48px;
  text-align: left;
  font-size: 20px;
}

.search-container {
  padding: 20px 6px;
  width: 400px;
  height: 33px;
  display: flex;
  gap: 4px;
}

.detail{
  /*margin-top: 10px;*/
  width: 100%;
  height: 510px;
  /*background-color: pink;*/
  border-radius: 10px;
  overflow: auto;
  border: 1px solid #000;
}

.td{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #000;
  background-color: #faf7f1;
  font-size: 18px;
}

.td .site-item{
  float: left;
  width: 145px;
}

.td .site-btn{
  float: left;
  width: 100px;
}

.td .site-time{
  float: left;
  width: 300px;
}

</style>