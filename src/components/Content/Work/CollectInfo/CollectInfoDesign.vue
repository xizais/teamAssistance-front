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
        <el-input class="from-button" v-model="title" placeholder="输入标题"/>
        <el-button class="from-button" @click="addContainer()">生成容器</el-button>
        <el-select class="from-button" v-model="childType" placeholder="请选择">
          <el-option label="文本框" value="text"></el-option>
          <el-option label="输入框" value="input"></el-option>
          <el-option label="下拉框" value="select"></el-option>
          <el-option label="文本域" value="textarea"></el-option>
          <el-option label="单选框" value="radio"></el-option>
          <el-option label="多选框" value="checkbox"></el-option>
          <el-option label="时间器" value="time"></el-option>
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
      <el-button v-if="isContainer" type="primary" @click="isContainer = false" style="margin-bottom: 10px">切换元素</el-button>
      <el-button v-if="!isContainer" type="primary" @click="isContainer = true" style="margin-bottom: 10px">切换容器</el-button>
      <el-button type="primary" @click="isShowRight = false" style="margin-bottom: 10px">收回</el-button>
      <template v-if="isContainer&&selectedContainer.type==='container'">
        <el-row>
          <el-col :span="9" class="text-right">
            <el-text class="align-right">容器宽度:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedContainer.width" placeholder="输入宽度(%)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">容器高度:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedContainer.height" placeholder="输入高度(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">边框:</el-text>
          </el-col>
          <el-col :span="15">
            <el-switch v-model="selectedContainer.showBorder" class="right-switch" />
          </el-col>

          <template v-if="selectedContainer.showBorder">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">边框粗度:</el-text>
            </el-col>
            <el-col :span="15">
              <el-input type="number" class="input-right" v-model="selectedContainer.borderWidth" placeholder="输入边框粗度(px)"></el-input>
            </el-col>
          </template>

          <template v-if="selectedContainer.showBorder">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">圆角展示:</el-text>
            </el-col>
            <el-col :span="15">
              <el-switch v-model="selectedContainer.showRadius" class="right-switch" />
            </el-col>
          </template>

          <template v-if="selectedContainer.showBorder&&selectedContainer.showRadius">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">圆角程度:</el-text>
            </el-col>
            <el-col :span="15">
              <el-input type="number" class="input-right" v-model="selectedContainer.borderRadius" placeholder="输入圆角程度(px)"></el-input>
            </el-col>
          </template>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">元素顶距:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedContainer.marginTop" placeholder="输入距离(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">元素底距:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedContainer.marginBottom" placeholder="输入距离(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">元素左距:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedContainer.marginLeft" placeholder="输入距离(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">元素右距:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedContainer.marginRight" placeholder="输入距离(px)"></el-input>
          </el-col>

          <el-button class="reset-button" type="primary" @click="resetMeta('container')">重置</el-button>
        </el-row>
      </template>

      <!--input\textarea组件配置-->
      <template v-if="!isContainer&&(selectedChild.type==='input' || selectedChild.type==='textarea')">
        <el-row>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">字体大小:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.fontSize" placeholder="输入大小(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">字体颜色:</el-text>
          </el-col>
          <el-col :span="15">
            <el-select class="input-right" v-model="selectedChild.textColor" placeholder="请选择">
              <el-option label="黑色" value="black"></el-option>
              <el-option label="红色" value="red"></el-option>
              <el-option label="蓝色" value="blue"></el-option>
              <el-option label="橙色" value="orange"></el-option>
              <el-option label="绿色" value="green"></el-option>
            </el-select>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">字体粗细:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.fontWeight" placeholder=""></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">字体类型:</el-text>
          </el-col>
          <el-col :span="15">
            <el-select class="input-right" v-model="selectedChild.fontFamily" placeholder="请选择">
              <el-option label="微软雅黑" value="Microsoft YaHei"></el-option>
              <el-option label="宋体" value="Songti"></el-option>
              <el-option label="仿宋" value="Fangsong"></el-option>
              <el-option label="楷体" value="Kaiti"></el-option>
              <el-option label="幼圆" value="Youyuan"></el-option>
            </el-select>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">文本位置:</el-text>
          </el-col>
          <el-col :span="15">
            <el-select class="input-right" v-model="selectedChild.textAlign" placeholder="请选择">
              <el-option label="居左" value="left"></el-option>
              <el-option label="居中" value="center"></el-option>
              <el-option label="居右" value="right"></el-option>
            </el-select>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">默认文本:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input class="input-right" v-model="selectedChild.defaultText" placeholder="输入文本"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">默认提示:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input class="input-right" v-model="selectedChild.placeholder" placeholder="输入提示"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">最大字数:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.maxLength" placeholder="输入个数"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">是否必填:</el-text>
          </el-col>
          <el-col :span="15">
            <el-switch v-model="selectedChild.isNeed" class="right-switch" />
          </el-col>
        </el-row>
      </template>

      <!--text组件配置-->
      <template v-if="!isContainer&&selectedChild.type==='text'">
        <el-row>
          <el-col :span="9" class="text-right">
            <el-text class="align-right">默认文本:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input class="input-right" v-model="selectedChild.defaultText" placeholder="输入文本"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">文本位置:</el-text>
          </el-col>
          <el-col :span="15">
            <el-select class="input-right" v-model="selectedChild.textAlign" placeholder="请选择">
              <el-option label="居左" value="left"></el-option>
              <el-option label="居中" value="center"></el-option>
              <el-option label="居右" value="right"></el-option>
            </el-select>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">文本类型:</el-text>
          </el-col>
          <el-col :span="15">
            <el-select class="input-right" v-model="selectedChild.textType" placeholder="请选择">
              <el-option label="none" value="none"></el-option>
              <el-option label="primary" value="primary"></el-option>
              <el-option label="success" value="success"></el-option>
              <el-option label="warning" value="warning"></el-option>
              <el-option label="danger" value="danger"></el-option>
              <el-option label="info" value="info"></el-option>
            </el-select>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">字体大小:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.fontSize" placeholder="输入大小"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">字体粗细:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.fontWeight" placeholder="输入程度"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">字体类型:</el-text>
          </el-col>
          <el-col :span="15">
            <el-select class="input-right" v-model="selectedChild.fontFamily" placeholder="请选择">
              <el-option label="微软雅黑" value="Microsoft YaHei"></el-option>
              <el-option label="宋体" value="Songti"></el-option>
              <el-option label="仿宋" value="Fangsong"></el-option>
              <el-option label="楷体" value="Kaiti"></el-option>
              <el-option label="幼圆" value="Youyuan"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </template>

      <!--select\radio\checkbox组件配置-->
      <template v-if="!isContainer&&(selectedChild.type==='select' || selectedChild.type==='radio' || selectedChild.type==='checkbox')">
        <el-button type="primary" @click="addOption(selectedContainer.id,selectedChild.id)" style="margin-bottom: 10px">增加选项</el-button>
        <el-row>
         <template
          v-for="(option,optionIndex) in selectedChild.options"
          :key="option.id"
         >
           <el-col :span="2" class="text-right">
             <el-icon class="hoverable" size="12" @click="deleteOption(selectedContainer.id,selectedChild.id,optionIndex)"><Delete /></el-icon>
           </el-col>
           <el-col :span="7" class="text-right">
             <el-text class="align-right">选项{{optionIndex+1}}:</el-text>
           </el-col>
           <el-col :span="15">
             <el-input class="input-right" v-model="option.content" placeholder="输入选项值" maxlength="20"></el-input>
           </el-col>
         </template>

          <template v-if="selectedChild.type==='radio' || selectedChild.type==='checkbox'">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">内边框:</el-text>
            </el-col>
            <el-col :span="15">
              <el-switch v-model="selectedChild.showInnerBorder" class="right-switch" />
            </el-col>
          </template>

          <template v-if="selectedChild.type==='checkbox'">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">最小可选:</el-text>
            </el-col>
            <el-col :span="15">
              <el-input type="number" class="input-right" v-model="selectedChild.minOption" placeholder="输入个数"></el-input>
            </el-col>

            <el-col :span="9" class="text-right">
              <el-text class="align-right">最大可选:</el-text>
            </el-col>
            <el-col :span="15">
              <el-input type="number" class="input-right" v-model="selectedChild.maxOption" placeholder="输入个数"></el-input>
            </el-col>
          </template>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">是否必填:</el-text>
          </el-col>
          <el-col :span="15">
            <el-switch v-model="selectedChild.isNeed" class="right-switch" />
          </el-col>
        </el-row>
      </template>

      <!--time组件配置-->
      <template v-if="!isContainer&&selectedChild.type==='time'">
        <el-row>
          <el-col :span="9" class="text-right">
            <el-text class="align-right">默认时间:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input class="input-right" v-model="selectedChild.defaultTime" placeholder="输入默认时间"></el-input>
          </el-col>
        </el-row>
      </template>

      <!--      元素外部盒子动态样式配置设置-->
      <template v-if="!isContainer&&selectedChild.id!==undefined">
        <el-row>
          <el-col :span="9" class="text-right">
            <el-text class="align-right">宽度:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.width" placeholder="输入宽度(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">高度:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.height" placeholder="输入高度(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">顶部距离:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.marginTop" placeholder="输入距离(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">底部距离:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.marginBottom" placeholder="输入距离(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">左边距离:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.marginLeft" placeholder="输入距离(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">右边距离:</el-text>
          </el-col>
          <el-col :span="15">
            <el-input type="number" class="input-right" v-model="selectedChild.marginRight" placeholder="输入距离(px)"></el-input>
          </el-col>

          <el-col :span="9" class="text-right">
            <el-text class="align-right">边框:</el-text>
          </el-col>
          <el-col :span="15">
            <el-switch v-model="selectedChild.showBorder" class="right-switch" />
          </el-col>

          <template v-if="selectedChild.showBorder">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">边框大小:</el-text>
            </el-col>
            <el-col :span="15">
              <el-input type="number" class="input-right" v-model="selectedChild.borderWidth" placeholder="输入大小(px)"></el-input>
            </el-col>
          </template>

          <template v-if="selectedChild.showBorder">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">圆角展示:</el-text>
            </el-col>
            <el-col :span="15">
              <el-switch v-model="selectedChild.showRadius" class="right-switch" />
            </el-col>
          </template>

          <template v-if="selectedChild.showBorder&&selectedChild.showRadius">
            <el-col :span="9" class="text-right">
              <el-text class="align-right">圆角程度:</el-text>
            </el-col>
            <el-col :span="15">
              <el-input type="number" class="input-right" v-model="selectedChild.borderRadius" placeholder="输入大小(px)"></el-input>
            </el-col>
          </template>

          <el-button class="reset-button" type="primary" @click="resetMeta(selectedChild.type)" style="margin-bottom: 100px">重置</el-button>
        </el-row>
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
             height: child.height + 'px',
             marginTop: child.marginTop + 'px',
             marginBottom: child.marginBottom + 'px',
             marginLeft: child.marginLeft + 'px',
             marginRight: child.marginRight + 'px',
             border: child.showBorder ? parseInt(child.borderWidth) + 'px' + ' solid #000' : 'none',
             borderRadius: child.showRadius ? parseInt(child.borderRadius) + 'px' : '0px',
           }"
           @click="selectChild(container.id, child.id)"
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
              @click="selectChild(container.id, child.id)"
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
              @focus="selectChild(container.id, child.id)"
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
</template>

<script>
import {ElMessage} from "element-plus";
import { ref } from 'vue';
import {getCollectInfo, reqSearchInfo} from "@/request";

export default {
  name: "CollectInfoDesign",
  data() {
    return {
      iIFId: 0,
      state: null,
      isShowLeft: true,
      isShowRight: false,
      isContainer: true,
      title: '',

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
    if (this.state === 'edit') {
      this.iIFId = this.$route.query.iIFId;
      let request = {
        iIFId: this.iIFId
      };
      let result = await getCollectInfo(request);
      this.containers = result.data.containers;
      this.title = result.data.infoForm.ciftitle;
      this.generateIndex = result.data.maxMetaId + 1;
    }
  },

  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },

    // 重置容器或元素
    resetMeta(type) {
      if (type === 'container') {
        const containerId = this.selectedContainer.id;
        this.selectedContainer = {
          id: containerId,
          width: 60,// 百分比显示
          height: 500,// px显示
          showBorder: true,// 显示边框
          borderWidth: 1,// 边框粗度
          showRadius: true,// 显示圆角
          borderRadius: 1,// 圆角度数
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          type: type,
          child: []
        };
        const containerIndex = this.getTargetIndex(this.containers,containerId);
        this.containers[containerIndex] = this.selectedContainer;
      }

      if (type === 'text') {
        const containerId = this.selectedContainer.id;
        const childId = this.selectedChild.id;
        const containerIndex = this.getTargetIndex(this.containers,containerId);
        this.selectedChild = {
          id: childId,
          width: parseInt(100),
          height: parseInt(30),
          marginTop: this.containers[containerIndex].marginTop,
          marginBottom: this.containers[containerIndex].marginBottom,
          marginLeft: this.containers[containerIndex].marginLeft,
          marginRight: this.containers[containerIndex].marginRight,
          borderRadius: 1,
          showBorder: false,
          borderWidth: 1,
          showRadius: true,
          textType: 'none',
          fontSize: 14,
          fontWeight: 400, // 字体粗细
          fontFamily: 'Microsoft YaHei', // 字体样式
          defaultText: '这是一个文本',// 默认文本
          textAlign: 'left',// 文字位置
          type: type,
        };
        const childIndex = this.getTargetIndex(this.containers[containerIndex].child,childId);
        this.containers[containerIndex].child[childIndex] = this.selectedChild;
      }

      if (type === 'input') {
        const containerId = this.selectedContainer.id;
        const childId = this.selectedChild.id;
        const containerIndex = this.getTargetIndex(this.containers,containerId);
        this.selectedChild = {
          id: childId,
          width: parseInt(200),
          height: parseInt(30),
          marginTop: this.containers[containerIndex].marginTop,
          marginBottom: this.containers[containerIndex].marginBottom,
          marginLeft: this.containers[containerIndex].marginLeft,
          marginRight: this.containers[containerIndex].marginRight,
          showBorder: false,
          borderWidth: 1,
          showRadius: true,
          borderRadius: 1,
          fontSize: 14,
          textColor: 'black', // 文字颜色
          fontWeight: 400, // 字体粗细
          fontFamily: 'Microsoft YaHei', // 字体样式
          defaultText: '',// 默认文本
          textAlign: 'left',// 文字位置
          placeholder: '请输入内容',
          maxLength: 10,
          isNeed: false,// 是否必填
          type: type,
        };
        const childIndex = this.getTargetIndex(this.containers[containerIndex].child,childId);
        this.containers[containerIndex].child[childIndex] = this.selectedChild;
      }

      if (type === 'select') {
        const containerId = this.selectedContainer.id;
        const childId = this.selectedChild.id;
        const containerIndex = this.getTargetIndex(this.containers,containerId);
        this.selectedChild = {
          id: childId,
          width: parseInt(100),
          height: parseInt(30),
          marginTop: this.containers[containerIndex].marginTop,
          marginBottom: this.containers[containerIndex].marginBottom,
          marginLeft: this.containers[containerIndex].marginLeft,
          marginRight: this.containers[containerIndex].marginRight,
          borderRadius: 1,
          showBorder: false,
          borderWidth: 1,
          showRadius: true,
          defaultText: '选项一',// 默认文本
          isNeed: false,// 是否必填
          options: [
            {
              id: 0,
              content: '选项一'
            }
          ],
          type: type,
        };
        const childIndex = this.getTargetIndex(this.containers[containerIndex].child,childId);
        this.containers[containerIndex].child[childIndex] = this.selectedChild;
      }

      if (type === 'textarea') {
        const containerId = this.selectedContainer.id;
        const childId = this.selectedChild.id;
        const containerIndex = this.getTargetIndex(this.containers,containerId);
        this.selectedChild = {
          id: childId,
          width: parseInt(300),
          height: parseInt(100),
          marginTop: this.containers[containerIndex].marginTop,
          marginBottom: this.containers[containerIndex].marginBottom,
          marginLeft: this.containers[containerIndex].marginLeft,
          marginRight: this.containers[containerIndex].marginRight,
          showBorder: false,
          borderWidth: 1,
          showRadius: true,
          borderRadius: 1,
          fontSize: 14,
          textColor: 'black', // 文字颜色
          fontWeight: 400, // 字体粗细
          fontFamily: 'Microsoft YaHei', // 字体样式
          defaultText: '',// 默认文本
          textAlign: 'left',// 文字位置
          placeholder: '请输入内容',
          maxLength: 100,
          isNeed: false,// 是否必填
          type: type,
        };
        const childIndex = this.getTargetIndex(this.containers[containerIndex].child,childId);
        this.containers[containerIndex].child[childIndex] = this.selectedChild;
      }

      if (type === 'radio') {
        const containerId = this.selectedContainer.id;
        const childId = this.selectedChild.id;
        const containerIndex = this.getTargetIndex(this.containers,containerId);
        this.selectedChild = {
          id: childId,
          width: parseInt(200),
          height: parseInt(30),
          marginTop: this.containers[containerIndex].marginTop,
          marginBottom: this.containers[containerIndex].marginBottom,
          marginLeft: this.containers[containerIndex].marginLeft,
          marginRight: this.containers[containerIndex].marginRight,
          borderRadius: 1,
          showBorder: false,
          showInnerBorder: true,// 内边框
          borderWidth: 1,
          showRadius: true,
          defaultText: '选项一',// 默认文本
          isNeed: false,// 是否必填
          options: [
            {
              id: 0,
              content: '选项一'
            }
          ],
          type: type,
        };
        const childIndex = this.getTargetIndex(this.containers[containerIndex].child,childId);
        this.containers[containerIndex].child[childIndex] = this.selectedChild;
      }

      if (type === 'checkbox') {
        const containerId = this.selectedContainer.id;
        const childId = this.selectedChild.id;
        const containerIndex = this.getTargetIndex(this.containers,containerId);
        this.selectedChild = {
          id: childId,
          width: parseInt(200),
          height: parseInt(30),
          marginTop: this.containers[containerIndex].marginTop,
          marginBottom: this.containers[containerIndex].marginBottom,
          marginLeft: this.containers[containerIndex].marginLeft,
          marginRight: this.containers[containerIndex].marginRight,
          borderRadius: 1,
          showBorder: false,
          showInnerBorder: true,// 内边框
          borderWidth: 1,
          showRadius: true,
          minOption: 1,
          maxOption: 1,
          defaultText: ref([]),// 默认文本
          isNeed: false,// 是否必填
          options: [
            {
              id: 0,
              content: '选项一'
            }
          ],
          type: type,
        };
        const childIndex = this.getTargetIndex(this.containers[containerIndex].child,childId);
        this.containers[containerIndex].child[childIndex] = this.selectedChild;
      }

      if (type === 'time') {
        const containerId = this.selectedContainer.id;
        const childId = this.selectedChild.id;
        const containerIndex = this.getTargetIndex(this.containers,containerId);
        this.selectedChild = {
          id: childId,
          width: parseInt(200),
          height: parseInt(30),
          marginTop: this.containers[containerIndex].marginTop,
          marginBottom: this.containers[containerIndex].marginBottom,
          marginLeft: this.containers[containerIndex].marginLeft,
          marginRight: this.containers[containerIndex].marginRight,
          borderRadius: 1,
          showBorder: false,
          borderWidth: 1,
          showRadius: true,
          defaultTime: '',// 默认时间
          isNeed: false,// 是否必填
          type: type,
        };
        const childIndex = this.getTargetIndex(this.containers[containerIndex].child,childId);
        this.containers[containerIndex].child[childIndex] = this.selectedChild;
      }

    },

    // 重置表单逻辑
    resetForm() {
      this.selectedContainer = {};
      this.selectedChild = {};
      this.containers = [];
    },


    // 保存表单逻辑
    async saveForm() {
      let requestDta = {
        container: this.containers,
        state: this.state,
        iIFId: this.iIFId,
        title: this.title
      }
      let result = await reqSearchInfo(requestDta);
      if (result.code != '0') {
        ElMessage.warning(result.message);
      } else {
        ElMessage.success("保存成功！")
        setTimeout(() => {
          this.goBack();
        }, 1500);
      }
    },

    // 生成容器
    addContainer() {
      const newContainer = {
        id: this.generateIndex,
        width: 60,// 百分比显示
        height: 500,// px显示
        showBorder: true,// 显示边框
        borderWidth: 1,// 边框粗度
        showRadius: true,// 显示圆角
        borderRadius: 1,// 圆角度数
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        child: [],
        type: 'container'
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
        const containIndex = this.getTargetIndex(this.containers,containId);

        let newChild = {};
        // 根据生成元素类型生成相应默认子元素
        if (type === 'input') {
          newChild = {
            id: this.generateIndex,
            width: parseInt(200),
            height: parseInt(30),
            marginTop: this.containers[containIndex].marginTop,
            marginBottom: this.containers[containIndex].marginBottom,
            marginLeft: this.containers[containIndex].marginLeft,
            marginRight: this.containers[containIndex].marginRight,
            showBorder: false,
            borderWidth: 1,
            showRadius: true,
            borderRadius: 1,
            fontSize: 14,
            textColor: 'black', // 文字颜色
            fontWeight: 400, // 字体粗细
            fontFamily: 'Microsoft YaHei', // 字体样式
            defaultText: '',// 默认文本
            textAlign: 'left',// 文字位置
            placeholder: '请输入内容',
            maxLength: 10,
            isNeed: false,// 是否必填
            type: type,
          };
        }
        if (type === 'text') {
          newChild = {
              id: this.generateIndex,
              width: parseInt(100),
              height: parseInt(30),
              marginTop: this.containers[containIndex].marginTop,
              marginBottom: this.containers[containIndex].marginBottom,
              marginLeft: this.containers[containIndex].marginLeft,
              marginRight: this.containers[containIndex].marginRight,
              borderRadius: 1,
              showBorder: false,
              borderWidth: 1,
              showRadius: true,
              textType: 'none',
              fontSize: 14,
              fontWeight: 400, // 字体粗细
              fontFamily: 'Microsoft YaHei', // 字体样式
              defaultText: '这是一个文本',// 默认文本
              textAlign: 'left',// 文字位置
              type: type,
          };
        }
        if (type === 'select') {
          newChild = {
            id: this.generateIndex,
            width: parseInt(100),
            height: parseInt(30),
            marginTop: this.containers[containIndex].marginTop,
            marginBottom: this.containers[containIndex].marginBottom,
            marginLeft: this.containers[containIndex].marginLeft,
            marginRight: this.containers[containIndex].marginRight,
            borderRadius: 1,
            showBorder: false,
            borderWidth: 1,
            showRadius: true,
            defaultText: '选项一',// 默认文本
            isNeed: false,// 是否必填
            options: [
              {
                id: 0,
                content: '选项一'
              }
            ],
            type: type,
          };
        }
        if (type === 'textarea') {
          newChild = {
            id: this.generateIndex,
            width: parseInt(300),
            height: parseInt(100),
            marginTop: this.containers[containIndex].marginTop,
            marginBottom: this.containers[containIndex].marginBottom,
            marginLeft: this.containers[containIndex].marginLeft,
            marginRight: this.containers[containIndex].marginRight,
            showBorder: false,
            borderWidth: 1,
            showRadius: true,
            borderRadius: 1,
            fontSize: 14,
            textColor: 'black', // 文字颜色
            fontWeight: 400, // 字体粗细
            fontFamily: 'Microsoft YaHei', // 字体样式
            defaultText: '',// 默认文本
            textAlign: 'left',// 文字位置
            placeholder: '请输入内容',
            maxLength: 100,
            isNeed: false,// 是否必填
            type: type,
          };
        }
        if (type === 'radio') {
          newChild = {
            id: this.generateIndex,
            width: parseInt(200),
            height: parseInt(30),
            marginTop: this.containers[containIndex].marginTop,
            marginBottom: this.containers[containIndex].marginBottom,
            marginLeft: this.containers[containIndex].marginLeft,
            marginRight: this.containers[containIndex].marginRight,
            borderRadius: 1,
            showBorder: false,
            showInnerBorder: true,// 内边框
            borderWidth: 1,
            showRadius: true,
            defaultText: '选项一',// 默认文本
            isNeed: false,// 是否必填
            options: [
              {
                id: 0,
                content: '选项一'
              }
            ],
            type: type,
          };
        }
        if (type === 'checkbox') {
          newChild = {
            id: this.generateIndex,
            width: parseInt(200),
            height: parseInt(30),
            marginTop: this.containers[containIndex].marginTop,
            marginBottom: this.containers[containIndex].marginBottom,
            marginLeft: this.containers[containIndex].marginLeft,
            marginRight: this.containers[containIndex].marginRight,
            borderRadius: 1,
            showBorder: false,
            showInnerBorder: true,// 内边框
            borderWidth: 1,
            showRadius: true,
            minOption: 1,
            maxOption: 1,
            defaultText: ref([]),// 默认文本
            isNeed: false,// 是否必填
            options: [
              {
                id: 0,
                content: '选项一'
              }
            ],
            type: type,
          };
        }
        if (type === 'time') {
          newChild = {
            id: this.generateIndex,
            width: parseInt(200),
            height: parseInt(30),
            marginTop: this.containers[containIndex].marginTop,
            marginBottom: this.containers[containIndex].marginBottom,
            marginLeft: this.containers[containIndex].marginLeft,
            marginRight: this.containers[containIndex].marginRight,
            borderRadius: 1,
            showBorder: false,
            borderWidth: 1,
            showRadius: true,
            defaultTime: '',// 默认时间
            isNeed: false,// 是否必填
            type: type,
          };
        }

        // 存入子元素
        this.containers[containIndex].child.push(newChild);
        this.generateIndex++;
      }
    },

    // 生成选项
    addOption(containId,childId) {
      const newContainer = {
        id: this.generateIndex,
        content: ''
      };
      this.generateIndex++;
      const containerIndex = this.getTargetIndex(this.containers,containId);
      const childIndex = this.getTargetIndex(this.containers[containerIndex].child,childId);
      this.containers[containerIndex].child[childIndex].options.push(newContainer);
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

    // 删除下拉选项
    deleteOption(containerId,childId,optionIndex) {
      const containerIndex = this.getTargetIndex(this.containers,containerId);
      const childIndex = this.getTargetIndex(this.containers[containerIndex].child,childId);
      if (optionIndex !== -1) {
        this.containers[containerIndex].child[childIndex].options.splice(optionIndex, 1);
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
  background-color: #cbef8e;
  height: 48px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-radius: 8px;
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
  border-radius: 4px;
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
  width: 205px;
  overflow: auto;
  border-radius: 4px;
}

.content {
  margin-top: 48px;
  background-color: #c5fad0;
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

.from-button {
  margin: 0;
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
  margin: 0;
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

.reset-button {
  margin-top: 20px;
  margin-left: 70px;
}

.hoverable:hover {
  background-color: lightyellow;
  border-radius: 10px;
}

.right-switch {
  margin-right: 80px
}
</style>