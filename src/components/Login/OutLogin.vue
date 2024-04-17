<script>
import {logout} from "@/request";

export default {
  mounted() {
    this.outPerLogin();// 登出
  },
  methods: {
    async outPerLogin(){
      await logout();
      this.$router.push({ path: "/" });
    }
  },
}
</script>

<template>
  <div style="text-align: center"><h5>登出</h5></div>
</template>

<style scoped>

</style>