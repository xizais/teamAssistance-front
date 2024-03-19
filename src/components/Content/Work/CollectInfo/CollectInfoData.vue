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
          <el-dropdown-item @click="saveData()">暂存</el-dropdown-item>
          <el-dropdown-item @click="submit()">提交</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div class="content">
    123
  </div>
</template>

<script>

export default {
  name: "CollectInfoData",
  data() {
    return {
      iIFId: 0,
      cIFTitle: '',
      state: null,
    };
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
</style>