<template>
  <div class="navbar">
<!--    el-menu属性：
                  default-active: 默认激活菜单index；
                  background-color: 菜单背景颜色；
                  text-color： 菜单文字默认颜色；
                  active-text-color：菜单选中时文字颜色；
                  unique-opened：只保持一个菜单的展开；
                  router: 使用 vue-router 的模式
                  -->
    <el-menu
        :default-active="dataList[1]?.child[4]?.id"
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
    >
      <el-sub-menu :index="item.id" v-for="item in dataList" :key="item.id">
        <template #title>
          <i class="el-icon-message"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item :index="i.id" v-for="i in item?.child" :key="i.id" @click="open(i.path)">{{ i.name }}</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="container-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList:[
        {
          id:1,
          name:'消息',
          child:[
            {
              id:'1-1',
              name:'工作信息',
              path:'/collectInfo'
            },
            {
              id:'1-2',
              name:'通知信息',
              path:'/collectInfo'
            },
            {
              id:'1-3',
              name:'组织信息',
              path:'/collectInfo'
            }
          ]},
        {
          id:2,
          name:'工作',
          child:[
            {
              id:'2-1',
              name:'待完成工作',
              path:'/collectInfo'
            },
            {
              id:'2-2',
              name:'已完成工作',
              path:'/collectInfo'
            },
            {
              id:'2-3',
              name:'任务发布',
              path:'/collectInfo'
            },
            {
              id:'2-4',
              name:'通知发布',
              path:'/collectInfo'
            },
            {
              id:'2-5',
              name:'信息收集',
              path:'/collectInfoHome'
            }
          ]},
        {
          id:3,
          name:'组织',
          child:[
            {
              id:'3-1',
              name:'我的组织信息',
              path:'/collectInfo'
            },
            {
              id: '3-2',
              name: '权限分配',
              path: '/collectInfo'
            }
          ]},
      ]
    };
  },
  methods:{
    // 默认加载第一个页面



    // 加载页面
    open(val){
      this.$router.push(val);
    }
  }

};
</script>

<style scoped>
.navbar {
  display: flex;
  background-color: #f5f7fa;
  padding: 16px;
}

.menu {
  width: 13%;
  min-height: 100vh;
  border-radius: 6px;
}

.container-right {
  display: flex;
  flex-grow: 1;
  padding: 1%;
}
</style>