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
      <div style="display: flex; flex-direction: column;">
        <el-button class="from-button" @click="addContainer()">生成容器</el-button>
        <el-select class="from-button" v-model="childType" placeholder="请选择">
          <el-option label="文本框" value="text"></el-option>
          <el-option label="输入框" value="input"></el-option>
          <el-option label="下拉框" value="select"></el-option>
          <el-option label="文本域" value="textarea"></el-option>
          <el-option label="单选框" value="radio"></el-option>
          <el-option label="多选框" value="checkbox"></el-option>
        </el-select>
        <el-button class="from-button" @click="addChild(this.selectedContainer.id,this.childType)">生成元素</el-button>
        <el-button class="from-button" @click="deleteGenerate(true,selectedContainer.id)">删除选定容器</el-button>
        <el-button class="from-button" @click="deleteGenerate(false,selectedChild.id)">删除选定元素</el-button>
      </div>
    </div>
    <div class="sidebar-left-hidden" v-if="!isShowLeft">
      <el-button type="primary" @click="isShowLeft = true" v-if="!isShowLeft">展开</el-button>
    </div>
  </div>

  <!-- 右侧半透明盒子 -->
  <div>
    <div class="sidebar-right-show" v-if="isShowRight"  style="text-align: right;">
      <el-button type="primary" @click="isShowRight = false" style="margin-bottom: 10px">收回</el-button>
      <template v-if="this.selectedContainer.isContainer">
        <el-row>
          <el-col :span="9" class="text-right">
            <el-text class="align-right">容器宽度:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input class="input-right" v-model="selectedContainer.width" placeholder="输入宽度(%)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">容器高度:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input class="input-right" v-model="selectedContainer.height" placeholder="输入高度(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">边框展示:</el-text>
          </el-col>
          <el-radio-group v-model="selectedContainer.showBorder">
            <el-col :span="10">
              <el-radio :label="true" style="font-weight: bold;">显示</el-radio>
            </el-col>
            <el-col :span="14">
              <el-radio :label="false" style="font-weight: bold;">隐藏</el-radio>
            </el-col>
          </el-radio-group>

          <template v-if="selectedContainer.showBorder">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">边框粗度:</el-text>
            </el-col>
            <el-col :span="15">
              <el-input class="input-right" v-model="selectedContainer.borderWidth" placeholder="输入边框粗度(px)"></el-input>
            </el-col>
          </template>

          <template v-if="selectedContainer.showBorder">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">圆角展示:</el-text>
            </el-col>
            <el-radio-group v-model="selectedContainer.showRadius">
              <el-col :span="10">
                <el-radio :label="true" style="font-weight: bold;">显示</el-radio>
              </el-col>
              <el-col :span="14">
                <el-radio :label="false" style="font-weight: bold;">隐藏</el-radio>
              </el-col>
            </el-radio-group>
          </template>

          <template v-if="selectedContainer.showBorder&&selectedContainer.showRadius">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">圆角程度:</el-text>
            </el-col>
            <el-col :span="15">
              <el-input class="input-right" v-model="selectedContainer.borderRadius" placeholder="输入圆角程度(px)"></el-input>
            </el-col>
          </template>

        </el-row>
      </template>

      <template>

      </template>
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
        :style="{
          width: container.width + '%',
          height: container.height + 'px',
          border: container.showBorder ? parseInt(container.borderWidth) + 'px' + ' solid #000' : 'none',
          borderRadius: container.showRadius ? parseInt(container.borderRadius) + 'px' : '0px',
        }"
        @click="selectContainer(container.id)"
    >
      <div class="container-box-child"
          v-for="(child) in container.child"
           :key="child.id"
           :style="{
             width: child.width + 'px',
             height: child.height + 'px'
           }"
           @click="selectChild(container.id,child.id)"
      >
        <template v-if="child.type === 0">
          <el-input
              :style="{
                 width: child.width + 'px',
                 height: child.height + 'px'
              }"
              v-model="child.width" />
        </template>
        <template v-else>
          <!-- 其他类型的子元素渲染 -->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "CollectInfoDesign",
  data() {
    return {
      isShowLeft: true,
      isShowRight: true,

      generateIndex: 0,
      childType: '',// 生成元素的类型（下拉选择）
      containers: [],
      selectedContainer: {}, // 临时容器对象
      selectedChild: {}, // 临时容器子元素对象
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },

    // 重置表单逻辑
    resetForm() {
      this.selectedContainer = {};
      this.selectedChild = {};
      this.containers = [];
    },

    // 保存表单逻辑
    saveForm() {

    },

    // 生成容器
    addContainer() {
      const newContainer = {
        id: this.generateIndex,
        isContainer: true,
        width: 60,// 百分比显示
        height: 500,// px显示
        showBorder: true,// 显示边框
        borderWidth: 1,// 边框粗度
        showRadius: true,// 显示圆角
        borderRadius: 1,// 圆角度数
        child: []
      };
      this.generateIndex++;
      this.containers.push(newContainer);
    },

    // 生成容器子元素
    addChild(containId,type) {
      if (containId === null || containId === '' || containId === undefined) {
          ElMessage.warning('请选择容器！');
      } else if (type === null || type === '' || type === undefined){
        ElMessage.warning('请选择生成元素类型！');
      } else {

        let newChild = {};
        // 根据生成元素类型生成相应默认子元素
        if (type === 'text') {
          newChild = {
            id: this.generateIndex,
            isContainer: false,
            width: parseInt(200),
            height: parseInt(30),
            type: 0,
          };
        }
        if (type === 'input') {
          ElMessage.warning('input！');
          newChild = {
            id: this.generateIndex,
            isContainer: false,
            width: parseInt(200),
            height: parseInt(200),
            type: 0,
          };
        }
        if (type === 'select') {
          ElMessage.warning('请选择容器！');
        }
        if (type === 'textarea') {
          ElMessage.warning('textarea！');
        }
        if (type === 'radio') {
          ElMessage.warning('radio！');
        }
        if (type === 'checkbox') {
          ElMessage.warning('checkbox！');
        }

        // 存入子元素
        const containIndex = this.getTargetIndex(this.containers,containId);
        this.containers[containIndex].child.push(newChild);
        this.generateIndex++;
      }
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
      // 更新容器临时对象
      const containIndex = this.getTargetIndex(this.containers,containerId);
      this.selectedContainer = this.containers[containIndex];
      // 更新元素临时对象
      const childIndex = this.getTargetIndex(this.containers[containIndex].child,childId);
      this.selectedChild = this.containers[containIndex].child[childIndex];
    },

    // 删除容器/元素 type:container-true  child-false
    deleteGenerate(type,generateId) {
      if (generateId === null || generateId === '' || generateId === undefined) {
        ElMessage.warning(type?'请选择删除容器！':'请选择删除元素！');
        return;
      }
      let deleteObj = {};
      if (type) {
        deleteObj = this.containers;
        this.selectedContainer = {};// 清空临时变量
        this.selectedChild = {};// 清空临时变量
      } else {
        deleteObj = this.containers[this.getTargetIndex(this.containers,this.selectedContainer.id)].child;
        this.selectedChild = {};// 清空临时变量
      }
      // 删除选定元素
      const index = this.getTargetIndex(deleteObj,generateId);
      if (index !== -1) {
        deleteObj.splice(index, 1);
      }
    },

    // 获取对象数组中目标的下标
    getTargetIndex(targetObject,targetId) {
      return targetObject.findIndex(obj => obj.id === targetId);
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
  width: 200px;
}

.content {
  margin-top: 48px;
  background-color: aquamarine;
  position: relative;
  z-index: 0;
  /*padding: 4px;*/
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

.from-button {
  margin: 0px;
  margin-top: 10px;
  width: 110px;
}

.container-box-child {
  border: solid 1px;
  margin: 0;
  padding: 0;
  float: left;
}

.input-right {
  margin: 0px;
  margin-top: 4px;
  width: 120px;

}

.text-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.align-right {
  margin-right: 10px;
}
</style>