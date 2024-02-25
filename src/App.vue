<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    goToHomePage() {
      this.$router.push('/home');
    }
  }
};
</script>