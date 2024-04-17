<template>
  <div class="box">
    <div class="navbar">
      <el-button @click="goBack">
        <el-icon><ArrowLeftBold /></el-icon>
      </el-button>
      <span class="title">场地管理信息</span>
    </div>
    <div class="search">
      <span>预约场地名称:</span>
      <div class="search-container">
        <el-input v-model="searchInfo" placeholder="请输入搜索内容"></el-input>
      </div>
      <el-button class="addBtn" type="primary" @click="addItem()">新增</el-button>
    </div>
<!--    <el-tooltip placement="top">-->
<!--      <template #content> multiple lines<br />second line </template>-->
<!--      <div>Top center</div>-->
<!--    </el-tooltip>-->
    <div class="detail">
      <div class="td">
        <div class="site-name">场地名称</div>
        <div class="site-detail">场地地点</div>
        <div class="site-name">场地负责人</div>
        <div class="site-detail">联系方式</div>
        <div class="operate">操作</div>
      </div>
      <div class="td" v-for="item in dataInfo" :key="item.iAIId">
        <div class="site-name">{{ item.cAIName }}
        </div>
        <div class="site-detail">{{ item.cAIContent }}</div>
        <div class="site-name">{{ item.cAIManagerName }}</div>
        <div class="site-detail">{{ item.cAIManagerPhone }}</div>
        <div class="operate">
          <el-button class="edit" @click="edit(item.iAIId)">编辑</el-button>
          <el-button class="delete" @click="deleteItem(item.iAIId)">删除</el-button>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showDialog"></div>
    <!-- 弹框 -->
    <div class="dialog" v-show="showDialog">
      <div class="dia-top">场地信息编辑</div>
      <div class="dia-body">
        <div class="dia-item">
          <div class="dia-title">场地名称：</div>
          <el-input v-model="sitePlace" placeholder="请输入内容"></el-input>
        </div>
        <div class="dia-item">
          <div class="dia-title">场地地点: </div>
          <el-input v-model="siteInfo" placeholder="请输入内容"></el-input>
        </div>
        <div class="dia-item">
          <div class="dia-title">场地负责人: </div>
          <el-input v-model="sitePerson" placeholder="请输入内容"></el-input>
        </div>
        <div class="dia-item">
          <div class="dia-title">联系方式: </div>
          <el-input v-model="siteTel" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <div class="dia-title">是否开放场地: </div>
          <el-switch v-model="siteOpen" />
          <div class="dia-title" style="margin-left: 250px">是否需要审批: </div>
          <el-switch v-model="siteApprove" />
        </div>
      </div>
      <div class="dia-btn">
        <el-button class="cancel" @click="cancel">取消</el-button>
        <el-button class="save" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { addArea, deleteArea, getAreaList, editArea } from "@/request";
export default {
  name:'manage-site',
  data(){
    return {
      dataList:[],
      showDialog:false,  //展示弹框
      searchInfo:'', //搜索场地名称
      currentItem:null, //存放当前对象
      sitePlace:null,//场地名称
      siteInfo:null,//场地地点
      sitePerson:null,//场地负责人
      siteTel:null,//联系方式
      siteOpen:true, //是否开放
      siteApprove:false, //是否需要审批
    }
  },
  mounted() {
    //获取列表
    this.getDataList();
  },
  methods:{
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    //获取数据
    async getDataList(){
      let result = await getAreaList({});
      this.dataList = result?.data.infoList;
    },
    //编辑
    async edit(value){
      this.showDialog = true;
      let result = await editArea({iAIId:value});
      if(result && result.code == 0){
        this.sitePlace = result.data.cAIName;
        this.siteInfo = result.data.cAIContent;
        this.sitePerson = result.data.cAIManagerName;
        this.siteTel = result.data.cAIManagerPhone;
        this.siteOpen = result.data.bAIIsEnable;
        this.siteApprove = result.data.bAIIsApprove;
      }
      this.currentItem = value;
    },
    //删除
    async deleteItem(value){
      let result = await deleteArea({iAIId:value});
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.showDialog = false;
      this.getDataList();
    },
    //新增
    addItem(){
      this.itePlace=null;
      this.siteInfo=null;
      this.sitePerson=null;
      this.siteTel=null;
      this.siteOpen=true;
      this.siteApprove=false;
      this.showDialog = true;
    },
    //取消弹框
    cancel(){
      this.showDialog = false;
    },
    //保存
    async save(){
      let data = {
        cAIName:this.sitePlace,
        cAIContent:this.siteInfo,
        bAIIsEnable:this.siteOpen,
        bAIIsApprove:this.siteApprove,
        cAIManagerName:this.siteTel,
        cAIManagerPhone:this.siteTel,
        iAIId:this.currentItem
      };
      let result = await addArea(data);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.showDialog = false;
      this.getDataList();
    }
  },
  computed:{
    dataInfo(){
      return this.dataList.filter(item => {
        return item.cAIName.includes(this.searchInfo)
            || item.cAIContent.includes(this.searchInfo)
            || item.cAIManagerName.includes(this.searchInfo);
      });
    }

  }
}
</script>

<style scoped>
.box{
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-family: 'Kaiti'
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
  font-size: 18px;
}

.addBtn{
  margin-left: 550px;
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
  height: 610px;
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
}

.td .site-name{
  float: left;
  width: 180px;
}

.td .site-detail{
  float: left;
  width: 250px;
}

.td .operate{
  float: right;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 150px;
  height: 50px;
}

.edit,
.delete{
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.dialog{
  position: absolute;
  width: 850px;
  height: 480px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 10px;
  /*border: 1px solid #000;*/
  overflow: auto;
  z-index:10;
}

.dialog .dia-top{
  width: 100%;
  height: 60px;
  font-size: 24px;
  text-align: center;
  line-height: 60px;
  border-bottom: 2px solid #e9e9e9;
}

.dialog .dia-body{
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  padding: 20px;
}

.dialog .dia-item{
  width: 100%;
  display: flex;
  margin-bottom: 15px;
}

.dialog .dia-body .dia-title{
  display: inline-block;
  width: 135px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  margin: 5px 0;
}

.dialog .dia-btn{
  width:100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog .dia-btn .cancel,
.dialog .dia-btn .save{
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.dialog .dia-btn .cancel{
  margin-right: 60px;
}

.container-button {
  margin: 0;
  margin-left: 4px;
}

.mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index:2;
  background-color: rgba(0,0,0,0.5);
}
</style>