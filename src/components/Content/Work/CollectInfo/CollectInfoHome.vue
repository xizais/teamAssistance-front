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
          v-for="(data,index) in dataArray"
          :key="index"
       >
         <div class="container">
           <div class="left">
             <div>{{ data.title }}</div>
             <div>{{ data.time }}</div>
             <div>{{ data.creator }}</div>
           </div>
           <div class="right">
             <button>结束任务</button>
             <button>任务修改</button>
             <button>查看</button>
           </div>
         </div>
       </template>
      </div>

      <div class="container-selectPage">
        <div class="demo-pagination-block">
          <el-pagination
              v-model:current-page="selectPage.currentPage"
              v-model:page-size="selectPage.pageSize"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="total, prev, pager, next, jumper"
              :total="selectPage.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPage from "@/components/Content/Work/SearchPage";
export default {
  name: "CollectInfoHome",
  components: {SearchPage},
  data() {
    return {
      selectPage: {
        currentPage: 2,
        pageSize: 10,
        total: 79,
      },
      dataArray: [
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },
        {
          title: '标题',
          time: '时间',
          creator: '创建者'
        },

      ],
    };
  },
  methods: {
    goToDesignPage() {
      this.$router.push({ path: "/collectInfoDesign", query: { state: 'add' } });
    },
    goToEditPage(iIFId) {
      this.$router.push({ path: "/collectInfoDesign", query: { state: 'edit',iIFId: iIFId } });
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
</style>