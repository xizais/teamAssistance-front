<template>
  <div class="outer-container">
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex;">
        <SearchPage/>
        <el-button class="collect-button" @click="goToDesignPage()">信息创建</el-button>
        <el-button class="collect-button" @click="goToEditPage(4)">信息模板</el-button>
      </div>
      <div class="wrapper">
       <template
          v-for="(data) in dataArray"
          :key="data.iIFId"
       >
         <div class="container">
           <div class="left">
             <div class="left-title">
               <span class="left-fontStyle">标题：{{ data.cIFTitle }}</span>
             </div>
             <template v-if="data.cIFState === '发布'">
               <div class="left-time">
                 <span class="left-fontStyle">发布时间：{{ data.standerPubTime }}</span>
               </div>
             </template>
             <template v-else>
               <div class="left-time">
                 <span class="left-fontStyle">创建时间：{{ data.standerCreateTime }}</span>
               </div>
             </template>
             <div class="left-creator">
               <span class="left-fontStyle">创建者：{{ data.cIFPuber }}</span>
             </div>
           </div>
           <div class="right">
             <button>结束任务</button>
             <button @click="goToEditPage(data.iIFId)" v-if="data.cIFState !== '发布'">表单修改</button>
             <button v-if="data.cIFState === '发布'">任务修改</button>
             <button @click="goToShow(data.iIFId)">查看</button>
           </div>
         </div>
       </template>
      </div>

      <template v-if="this.dataArray.length !== 0">
        <div class="container-selectPage">
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
      </template>
      <template v-else>
        <div>
          <el-empty description="无数据" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import SearchPage from "@/components/Content/Work/SearchPage";
import {getCollectInfoList} from "@/request";
export default {
  name: "CollectInfoHome",
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
  async mounted() {
    let requestData = {
      selectPage: this.selectPage
    };
    let result = await getCollectInfoList(requestData);
    this.dataArray = result.data.infoList;
    this.selectPage.total = this.dataArray.length;
  },

  methods: {
    goToDesignPage() {
      this.$router.push({ path: "/collectInfoDesign", query: { state: 'add' } });
    },
    goToEditPage(iIFId) {
      this.$router.push({ path: "/collectInfoDesign", query: { state: 'edit',iIFId: iIFId } });
    },
    goToShow(iIFId) {
      this.$router.push({ path: "/CollectInfoShow", query: { state: 'show',iIFId: iIFId } });
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
  width: 30%;
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
</style>