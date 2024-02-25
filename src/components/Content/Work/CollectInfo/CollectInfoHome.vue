<template>
  <div>
    <div>CollectInfoHome</div>
    <el-button @click="goToDesignPage">创建表单</el-button>
  </div>
</template>

<script>
export default {
  name: "CollectInfoHome",
  methods: {
    goToDesignPage() {
      this.$router.push("/collectInfoDesign");
    }
  }
}
</script>

<style scoped>

</style>