<template>
  <div class="outer-container">
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex;">
        <SearchPage :type="'collectInfo'" @searchInfo="searchInfo" :show-status="false"/>
        <el-button class="collect-button" @click="goSiteInfo">管理场地信息</el-button>
        <el-button class="collect-button" @click="goToReservePage">查看预约信息</el-button>
      </div>
      <div class="wrapper" v-show="show">
        <template
            v-for="(data,index) in dataList"
            :key="data.id"
        >
          <template v-if="index===0">
            <div class="container" style="font-weight: bolder; font-size: 18px">
              <div class="left">
                <div class="left-title">
                  <span class="left-fontStyle">场地名称</span>
                </div>
                <div class="left-time">
                  <span class="left-fontStyle">场地位置</span>
                </div>
                <div class="left-creator">
                  <span class="left-fontStyle">场地负责人</span>
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
                <span class="left-fontStyle">{{ data.cAIName }}</span>
              </div>
                <div class="left-time">
                  <span class="left-fontStyle">{{ data.cAIContent }}</span>
                </div>
                <div class="left-time">
                  <span class="left-fontStyle">{{ data.cAIManagerName }}</span>
                </div>
            </div>
            <div class="right">
              <el-button class="collect-button" @click="goReserve(data.iAIId)">预约</el-button>
            </div>
          </div>
        </template>
      </div>
      <div class="container-selectPage" v-show="show">
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
      <div v-show="!show">
        <el-empty description="无数据" />
      </div>
    </div>
    <div class="mask" v-show="showDialog"></div>
    <!-- 弹框 -->
    <div class="dialog" v-show="showDialog">
      <div class="dia-top">预约场地时间</div>
      <div class="dia-body">
        <div class="dia-item">
          <div class="block">
            <span class="demonstration">时间选择:</span>
            <el-date-picker
                v-model="time"
                type="datetimerange"
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
            />
          </div>
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
import SearchPage from "@/components/Content/Work/SearchPage";
import {ElMessage} from "element-plus";
import {addAreaBook, getAreaList} from "@/request";
export default {
  name: "CollectInfoHome",
  components: {SearchPage},
  data() {
    return {
      selectPage: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        offset: 0,
      },
      searchData: {
        'searchInfo': {}
      },
      showDialog:false,
      dataArray:[],
      time:[],
      targetItem:'',
    };
  },

  // 页面初始化加载
  mounted() {
    this.getdataList();
  },
  computed:{
    show(){
      return this.dataList.length? true : false;
    },
    dataList(){
      return this.dataArray.filter(item=>{
        return item.bAIIsEnable == true;
      })
    }
  },
  methods: {
    goSiteInfo() {
      this.$router.push({ path: "/manageSite"});
    },
    goToReservePage() {
      this.$router.push({ path: "/reserveSite" });
    },
    async getdataList(){
      let result = await getAreaList({});
      if(result && result.code == 0){
        this.dataArray = result.data.infoList;
      }
    },
    goReserve(value){
      this.showDialog = true;
      this.targetItem = value;
    },
    //取消弹框
    cancel(){
      this.showDialog = false;
    },
    //保存
    async save(){
      let data = {
        iAIId: this.targetItem,
        dABBookStartTime:this.formatDate(this.time[0]),
        dABBookEndTime:this.formatDate(this.time[1])
      };
      let result = await addAreaBook(data);
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
    },

    formatDate(date) {
      console.log(date)
      if (date == null) {
        return null;
      }
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }

  }
}
</script>

<style scoped>
.outer-container {
  display: flex;
  width: 100%;
  font-family: Kaiti;
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

.dialog{
  position: absolute;
  width: 850px;
  height: 300px;
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

.block {
  padding: 10px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
  font-family: Kaiti;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: #000;
  font-size: 18px;
  margin-bottom: 20px;
}
</style>