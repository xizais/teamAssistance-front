<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <el-button @click="goBack">
      <el-icon><ArrowLeftBold /></el-icon>
    </el-button>
    <span class="title">{{ title }}</span>
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
    <!-- 内容 -->
    <div
        v-for="(container) in containers"
        :key="container.id"
        class="container-box"
        :style="{
          width: container.width + 'px',
          height: container.height + 'px',
          border: container.showBorder ? parseInt(container.borderWidth) + 'px' + ' solid #000' : 'none',
          borderRadius: container.showRadius ? parseInt(container.borderRadius) + 'px' : '0px',
        }"
    >
      <div class="container-box-child"
           v-for="(child) in container.child"
           :key="child.id"
           :style="{
             width: child.width + 'px',
             height: child.height + 'px',
             marginTop: child.marginTop + 'px',
             marginBottom: child.marginBottom + 'px',
             marginLeft: child.marginLeft + 'px',
             marginRight: child.marginRight + 'px',
             border: child.showBorder ? parseInt(child.borderWidth) + 'px' + ' solid #000' : 'none',
             borderRadius: child.showRadius ? parseInt(child.borderRadius) + 'px' : '0px',
           }"
      >

        <!--input组件显示-->
        <template v-if="child.type === 'input'">
          <el-input
              type="text"
              :input-style="{
                fontSize: child.fontSize + 'px',
                color: child.textColor,
                fontWeight: child.fontWeight,
                fontFamily: child.fontFamily,
                textAlign: child.textAlign
              }"
              :style="{
                width: child.width + 'px',
                height: child.height + 'px',
              }"
              v-model="child.defaultText"
              :placeholder="child.placeholder"
              :maxlength=child.maxLength
          />
        </template>

        <!--text组件显示-->
        <template v-if="child.type === 'text'">
          <div :style="{textAlign: child.textAlign}">
            <el-text
                :type=child.textType
                :style="{
                fontSize:child.fontSize+'px',
                fontWeight: child.fontWeight,
                fontFamily: child.fontFamily,
                lineHeight: child.height + 'px',
          }"
            >{{ child.defaultText }}</el-text>
          </div>
        </template>

        <!--select组件显示-->
        <template v-if="child.type === 'select'">
          <el-select
              v-model="child.defaultText"
              placeholder="请选择"
              style="width: 100%;height: 100%"
          >
            <el-option
                v-for="option in child.options"
                :key="option.id"
                :label="option.content"
                :value="option.content"
            ></el-option>
          </el-select>
        </template>

        <!--textarea组件显示-->
        <template v-if="child.type === 'textarea'">
          <el-input
              v-model="child.defaultText"
              :input-style="{
                width: child.width + 'px',
                height:child.height + 'px',
                fontSize: child.fontSize + 'px',
                color: child.textColor,
                fontWeight: child.fontWeight,
                fontFamily: child.fontFamily,
                textAlign: child.textAlign
              }"
              show-word-limit
              type="textarea"
              :placeholder="child.placeholder"
              :maxlength=child.maxLength
          />
        </template>

        <!--radio组件显示-->
        <template v-if="child.type === 'radio'">
          <el-radio-group
              v-model="child.defaultText"
              v-for="(option) in child.options"
              :key="option.id"
          >
            <el-radio
                :label="option.content"
                value="option.content"
                :border="child.showInnerBorder"
            >{{option.content}}</el-radio>
          </el-radio-group>
        </template>

        <!--checkbox组件显示-->
        <template v-if="child.type === 'checkbox'">
          <el-checkbox-group
              v-model="child.defaultText.value"
              :min="child.minOption"
              :max="child.maxOption"
          >
            <el-checkbox
                v-for="option in child.options"
                :key="option.id"
                :label="option.content"
                :value="option.content"
                :border="child.showInnerBorder"
            >{{ option.content }}</el-checkbox
            >
          </el-checkbox-group>
        </template>

        <!--时间组件显示-->
        <template v-if="child.type === 'time'">
          <el-date-picker
              v-model="child.defaultTime"
              type="datetime"
              placeholder="请选择日期时间"
              :style="{
                width: child.width + 'px',
                height: child.height + 'px'
              }"
          />
        </template>

      </div>
    </div>
  </div>
  <template v-if="this.authority">
    <div class="config">
      <div class="config-title">
        表单配置信息
      </div>
      <div class="config-content">
        是否开始发布
        发布起始时间
        发布者身份
        发布对象
        发布组织
      </div>
    </div>
  </template>
  <template v-if="this.authority">
    <div class="config">
      <div class="config-title">
        表单数据信息
      </div>
      <div class="config-content">
        数据分类：按组织分类、不分类
        数据显示：分页，表格展示
      </div>
    </div>
  </template>
</template>

<script>
import {getCollectInfo} from "@/request";

export default {
  name: "CollectInfoShow",
  data() {
    return {
      iIFId: 0,
      state: null,
      isShowLeft: true,
      isShowRight: false,
      isContainer: true,
      title: '',
      infoForm: {},// 表单配置信息
      authority: false,// 用户是否有操作权限

      generateIndex: 0,
      childType: '',// 生成元素的类型（下拉选择）
      containers: [],
      selectedContainer: {}, // 临时容器对象
      selectedChild: {}, // 临时容器子元素对象

    };
  },
  // 页面初始化加载
  async mounted() {
    this.state = this.$route.query.state;
    this.iIFId = this.$route.query.iIFId;
    let request = {
      iIFId: this.iIFId
    };
    let result = await getCollectInfo(request);
    this.infoForm = result.data.infoForm;
    this.containers = result.data.containers;
    this.title = result.data.infoForm.ciftitle;
    this.authority = result.data.authority;
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

.nav-button {
  font-size: 14px;
}

.content {
  background-color: #fdfdf9;
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column; /* 将子元素垂直排列 */
  justify-content: center;
  align-items: center;
}

.container-box {
  padding: 0;
  border: 1px solid #000;
  margin-bottom: 1px;
}

.container-box-child {
  border: solid 1px;
  margin: 0;
  padding: 0;
  float: left;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 可根据需要调整容器高度 */
}

.config {
  /*text-align: center;*/
}

.config-title {
  margin-top: 10px;
  padding: 10px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #edffc7;
  border-radius: 6px;
}

.config-content {
  font-size: 14px;
  background-color: #f9fdf1;
  border-radius: 6px;
  /*margin-left: 20%;*/
  /*width: 60%;*/
  height: 400px;
}
</style>