<template>
  <div class="outer-container">
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex;">
        <SearchPage/>
        <el-button class="collect-button" @click="goToDesignPage()">信息创建</el-button>
        <el-button class="collect-button" @click="goToEditPage(123)">信息模板</el-button>
      </div>
      <div class="container">
         另一个盒子的内容
      </div>
    </div>
  </div>
</template>

<script>
import SearchPage from "@/components/Content/Work/SearchPage";
export default {
  name: "CollectInfoHome",
  components: {SearchPage},
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
  border: solid 1px;
  padding: 6px;
}
</style>