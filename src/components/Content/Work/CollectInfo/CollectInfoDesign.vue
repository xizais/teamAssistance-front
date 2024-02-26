非常抱歉，以下是完整的Vue代码：

```html
<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <el-button @click="goBack">
      <el-icon><ArrowLeftBold /></el-icon>
    </el-button>
    <span class="title">信息收集表单设计</span>
    <el-button class="nav-button" @click="resetForm">重置</el-button>
    <el-button class="nav-button" @click="saveForm">保存</el-button>
  </div>

  <!-- 左侧半透明盒子 -->
  <div>
    <div class="sidebar-left-show" v-if="isShowLeft">
      <el-button type="primary" @click="isShowLeft = false">收回</el-button>
      <el-input v-model="width" placeholder="输入宽度"></el-input>
      <el-input v-model="height" placeholder="输入高度"></el-input>
      <el-button @click="addContainer">生成容器</el-button>

      <el-button @click="addChild">生成子元素</el-button>
    </div>
    <div class="sidebar-left-hidden" v-if="!isShowLeft">
      <el-button type="primary" @click="isShowLeft = true" v-if="!isShowLeft">展开</el-button>
    </div>
  </div>

  <!-- 右侧半透明盒子 -->
  <div>
    <div class="sidebar-right-show" v-if="isShowRight">
      <el-button type="primary" @click="isShowRight = false">收回</el-button>
      <el-input v-model="selectedContainer.width" placeholder="输入宽度"></el-input>
      <el-input v-model="selectedContainer.height" placeholder="输入高度"></el-input>
      <el-button @click="resizeContainer">调整大小</el-button>
      <el-button class="delete-button" @click="deleteContainer(selectedContainer.id)">删除</el-button>
    </div>
    <div class="sidebar-right-hidden" v-if="!isShowRight">
      <el-button type="primary" @click="isShowRight = true" v-if="!isShowRight">展开</el-button>
    </div>
  </div>

  <!-- 整个屏幕不透明盒子 -->
  <div class="content">
    <!-- 内容 -->
    <div
        v-for="(container) in containers"
        :key="container.id"
        class="container-box"
        :style="{ width: container.width + 'px', height: container.height + 'px' }"
        @click="selectContainer(container.id)"
    >
      <div class="container-box-child"
          v-for="(child) in container.child"
           :key="child.id"
           @click="selectChild(container.id,child.id)"
      >1</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectInfoDesign",
  data() {
    return {
      isShowLeft: true,
      isShowRight: true,

      generateIndex: 0,
      width: 400,
      height: 500,
      containers: [],
      selectedContainer: {}, // 临时容器对象
      selectedChild: {}, // 临时容器子元素对象
    };
  },
  methods: {
    goBack() {
      // 返回上一页
      this.$router.go(-1);
    },
    resetForm() {
      // 重置表单逻辑
    },
    saveForm() {
      // 保存表单逻辑
    },

    // 生成容器
    addContainer() {
      const newContainer = {
        id: this.generateIndex,
        isContainer: true,
        width: parseInt(this.width),
        height: parseInt(this.height),
        child: {}
      };
      this.generateIndex++;
      this.containers.push(newContainer);
    },

    // 生成容器子元素
    addChild(containId) {

      // 请选中容器！



      const newChild = {
        id: this.generateIndex,
        isContainer: false,
        width: parseInt(100),
        height: parseInt(200),
      };

      // 查找容器index
      const containIndex = this.getMetaIndex(this.containers,containId);


      this.generateIndex++;
      this.containers[containIndex].push(newChild);
    },
    getMetaIndex(obj) {
      return obj;
    },

    // 选择容器时
    selectContainer(id) {
      const index = this.containers.findIndex(function (obj) {
        return obj.id === id;
      });
      this.selectedContainer = this.containers[index];
    },

    // 选择容器内的子元素时
    selectChild(containerId,childId) {
      const containIndex = this.containers.findIndex(function (obj) {
        return obj.id === containerId;
      });
      const childIndex = this.containers[containIndex].findIndex(function (obj) {
        return obj.id === childId;
      });
      this.selectedChild = this.containers[containIndex][childIndex];
    },

    resizeContainer() {
      // 调整容器大小逻辑
    },
    deleteContainer(id) {
      const index = this.containers.findIndex(container => container.id === id);
      if (index !== -1) {
        this.containers.splice(index, 1);
      }
    },
  },
};
</script>
<style scoped>
.navbar {
  background-color: #eaec9c;
  height: 48px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.title {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-left: 3%;
}

.nav-button {
  font-size: 14px;
}

.sidebar-left-hidden,.sidebar-left-show {
  z-index: 1;
  position: fixed;
  left: 0;
  top: 48px;
  padding: 20px;
}

.sidebar-left-show {
  background-color: rgba(79, 115, 231, 0.5);
  height: 100%;
  width: 120px;
}

.sidebar-right-hidden,.sidebar-right-show {
  position: fixed;
  right: 0;
  top: 48px;
  z-index: 1;
  padding: 20px;
}

.sidebar-right-show {
  background-color: rgba(79, 115, 231, 0.5);
  height: 100%;
  width: 120px;
}

.content {
  margin-top: 48px;
  border: solid 4px;
  background-color: aquamarine;
  position: relative;
  z-index: 0;
  padding: 4px;
  display: flex;
  flex-direction: column; /* 将子元素垂直排列 */
  justify-content: center;
  align-items: center;
}

.container-box {
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  padding: 0;
  border: 1px solid #000;
  margin-bottom: 1px;
}

.delete-button {
  margin-top: 10px;
}

.container-box-child {
  border: solid 1px;
  margin: 0;
  padding: 0;
  width: 20px;
  height: 30px;
  float: left;
}
</style>