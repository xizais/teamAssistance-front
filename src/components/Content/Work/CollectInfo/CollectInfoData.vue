<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <el-button @click="goBack">
      <el-icon><ArrowLeftBold /></el-icon>
    </el-button>
    <span class="title">{{cIFTitle}}数据展示</span>
    <el-dropdown split-button >
      操作
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="OneClickNotify()">一键提醒</el-dropdown-item>
          <el-dropdown-item @click="ImportInfo()">信息导入</el-dropdown-item>
          <el-dropdown-item @click="StopPublish()">停止发布</el-dropdown-item>
          <el-dropdown-item @click="ResumePublish()">继续发布</el-dropdown-item>
          <el-dropdown-item @click="DownTemplate()">模板下载</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div class="content">
    <div style="height: 40px;">
      <div class="text-container">
        <span class="text-item">总数：{{dataCount.allMount}}</span>
        <span class="text-item">待完成：{{dataCount.toDoMount}}</span>
        <span class="text-item">待审批：{{dataCount.toDoApprovalMount}}</span>
        <span class="text-item">已完成：{{dataCount.DoneMount}}</span>
      </div>
    </div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="学号" prop="code" />
      <el-table-column label="姓名" prop="name" :cell-dblclick="chat()"/>
      <el-table-column label="所属" prop="org" />
      <el-table-column label="状态" prop="state" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" @input="handleSearch" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >查看</el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "CollectInfoData",
  data() {
    return {
      iIFId: 0,
      cIFTitle: '',
      state: null,

      dataCount: {
        allMount: 7,
        toDoMount: 2,
        toDoApprovalMount: 2,
        DoneMount: 3
      },

      search: '', // 搜索关键字
      tableData: [
        {
          code: '201549221',
          name: '黄晓斌',
          org: '20软工二班',
          state: '未完成',
        },
        {
          code: '201549122',
          name: '谢玄',
          org: '20软工一班',
          state: '未完成',
        },
        {
          code: '201549223',
          name: '莉亚',
          org: '20软工二班',
          state: '待审批',
        },
        {
          code: '201549224',
          name: '赵恒',
          org: '20软工二班',
          state: '待审批',
        },
        {
          code: '201549225',
          name: '王五',
          org: '20软工二班',
          state: '已完成',
        },
        {
          code: '201549126',
          name: '李四',
          org: '20软工一班',
          state: '已完成',
        },
        {
          code: '201549127',
          name: '张三',
          org: '20软工一班',
          state: '已完成',
        },
      ],

    };
  },
  computed: {
    filterTableData() {
      return this.tableData.filter((data) => {
        return !this.search
            || data.name?.toLowerCase().includes(this.search.toLowerCase())
            || data.code?.toLowerCase().includes(this.search.toLowerCase())
            || data.org?.toLowerCase().includes(this.search.toLowerCase())
            || data.state?.toLowerCase().includes(this.search.toLowerCase())
            ;
      });
    },
  },
  async mounted() {
    this.iIFId = this.$route.query.iIFId;
    this.cIFTitle = this.$route.query.cIFTitle;

    // let request = {
    //   iIFId: this.iIFId
    // };
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    OneClickNotify() {

    },
    ImportInfo() {

    },
    StopPublish() {

    },
    ResumePublish() {

    },
    DownTemplate() {

    },
    chat() {
      ElMessage.success("ok");
    },
    handleEdit() {

    },
    handleDelete() {

    },
  },
}

</script>

<style scoped>

.navbar {
  margin: 0;
  display: flex;
  background-color: #dde9fc;
  padding: 10px;
  border-radius: 6px;
}

.title {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.content {
  border-radius: 4px;
  border: 1px solid #cacbb9;
  width: 100%;
  height: 1000px;
  background-color: #fdfdf9;
}

.text-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 0 20%;
  box-sizing: border-box;
}

.text-item {
  font-family: "楷体", "KaiTi", cursive;
  font-size: 16px;
}
</style>