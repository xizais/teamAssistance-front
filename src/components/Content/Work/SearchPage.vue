<template>
  <div class="outer-container">
    <div class="search-container">
      <el-input v-model="searchInput" placeholder="请输入搜索内容"></el-input>
      <el-button class="container-button" type="primary" @click="searchData()">搜索</el-button>
      <el-button class="container-button" type="primary" @click="showOther = !showOther">筛选</el-button>
    </div>
    <div class="search-other" v-show="showOther">
      <el-date-picker v-model="this.startDate" type="date" placeholder="开始日期" />
      <el-date-picker v-model="this.endDate" type="date" placeholder="结束日期" />
      <el-select v-model="optionValue" placeholder="数据状态" size="large" style="width: 140px">
        <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPage",
  data() {
    return {
      searchInput: '',
      showOther: false,
      startDate: null,
      endDate: null,
      optionValue: null,
      options: [
        {
          value: '我的草稿',
          lable: 0
        },
        {
          value: '我的发布',
          lable: 1
        },
        {
          value: '我的管理',
          lable: 2
        },
        {
          value: '未完成填写',
          lable: 3
        },
        {
          value: '已完成填写',
          lable: 4
        }
      ]
    };
  },
  methods: {
    searchData() {
      let requestData = {};
      if (this.$props.type === 'collectInfo') {
        requestData = {
          searchInput: this.searchInput,
          showOther: this.showOther,// 是否增加其他条件
          optionValue: this.optionValue,
          startDate: this.formatDate(this.startDate),
          endDate: this.formatDate(this.endDate),
        };
      }
      this.$emit('searchInfo',requestData)
    },
    formatDate(date) {
      if (date === null) {
        return null;
      }
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
}

.search-container {
  padding: 6px;
  width: 400px;
  height: 33px;
  display: flex;
  gap: 4px;
  margin-bottom: 6px;
}

.search-other {
  width: 256px;
  padding: 4px;
  border: 1px solid #c2b8b8;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 6px;
  margin-bottom: 6px;
}

.container-button {
  margin: 0;
  margin-left: 4px;
}
</style>