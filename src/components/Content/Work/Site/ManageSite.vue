<template>
  <div class="box">
    <div class="navbar">
      <el-button @click="goBack">
        <el-icon><ArrowLeftBold /></el-icon>
      </el-button>
      <span class="title">场地管理信息</span>
    </div>
    <div class="search">
      <span>预约场地名称:</span>
      <div class="search-container">
        <el-input v-model="searchInfo" placeholder="请输入搜索内容"></el-input>
        <el-button class="container-button" type="primary" @click="searchItem()">搜索</el-button>
      </div>
    </div>
    <div class="detail">
      <div class="td">
        <div class="site-name">场地名称</div>
        <div class="site-detail">场地地点</div>
        <div class="operate">操作</div>
      </div>
      <div class="td" v-for="item in dataList" :key="item.id">
        <div class="site-name">{{ item.place }}</div>
        <div class="site-detail">{{ item.detail }}</div>
        <div class="operate">
          <el-button class="edit" @click="edit(item)">编辑</el-button>
          <el-button class="delete" @click="deleteItem(item)">删除</el-button>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="dialog" v-show="showDialog">
      <div class="dia-top">场地信息编辑</div>
      <div class="dia-body">
        <div class="dia-item">
          <div class="dia-title">场地名称：</div>
          <el-input v-model="sitePlace" placeholder="请输入搜索内容"></el-input>
        </div>
        <div class="dia-item">
          <div class="dia-title">场地地点: </div>
          <el-input v-model="siteInfo" placeholder="请输入搜索内容"></el-input>
        </div>
        <div class="dia-item">
          <div class="dia-title">场地负责人: </div>
          <el-input v-model="sitePerson" placeholder="请输入搜索内容"></el-input>
        </div>
        <div class="dia-item">
          <div class="dia-title">联系方式: </div>
          <el-input v-model="siteTel" placeholder="请输入搜索内容"></el-input>
        </div>
        <div>
          <div class="dia-title">是否开放场地: </div>
          <el-radio-group v-model="siteOpen">
            <el-radio :value="3">是</el-radio>
            <el-radio :value="6">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="dia-btn">
        <el-button class="cancel" @click="cancel">取消</el-button>
        <el-button class="save" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'manage-site',
  data(){
    return {
      dataList:[
        {
          id:0,
          place:'教学楼1',
          detail:'1栋202'
        },
        {
          id:1,
          place:'教学楼2',
          detail:'1栋202'
        },
        {
          id:2,
          place:'教学楼3',
          detail:'1栋202'
        }
      ],
      showDialog:false,  //展示弹框
      searchInfo:'', //搜索场地名称
      currentItem:{}, //存放当前对象
      sitePlace:'',//场地名称
      siteInfo:'',//场地地点
      sitePerson:'',//场地负责人
      siteTel:'',//联系方式
      siteOpen:3 //是否开放
    }
  },
  methods:{
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    //获取数据
    getDataList(){

    },
    //编辑
    edit(value){
      this.showDialog = true;
      this.currentItem = value;
    },
    //删除
    deleteItem(value){
      console.log(value,'value');
    },
    //取消弹框
    cancel(){
      this.showDialog = false;
    },
    //保存
    save(){
      this.showDialog = false;
      console.log(this.currentItem,'balue');
    },
    //查询数据
    searchItem(){
      let data = [];
      this.dataList.forEach((item)=>{
        if(item.place.includes(this.searchInfo)){
          data.push(item);
        }
      });
      this.dataList = data;
      console.log(data,'data');
    }
  }
}
</script>

<style scoped>
.box{
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-family: 'Kaiti'
}

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

.search{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 48px;
  text-align: left;
  font-size: 18px;
}

.search-container {
  padding: 20px 6px;
  width: 400px;
  height: 33px;
  display: flex;
  gap: 4px;
}


.detail{
  /*margin-top: 10px;*/
  width: 100%;
  height: 510px;
  /*background-color: pink;*/
  border-radius: 10px;
  overflow: auto;
  border: 1px solid #000;
}

.td{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #000;
  background-color: #faf7f1;
}

.td .site-name{
  float: left;
  width: 180px;
}

.td .site-detail{
  float: left;
  width: 250px;
}

.td .operate{
  float: right;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 150px;
  height: 50px;
}

.edit,
.delete{
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.dialog{
  position: absolute;
  width: 650px;
  height: 380px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
  border: 1px solid #000;
  overflow: auto;
}

.dialog .dia-top{
  width: 100%;
  height: 60px;
  font-size: 24px;
  text-align: center;
  line-height: 60px;
  border-bottom: 2px solid #e9e9e9;
}

.dialog .dia-body{
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  padding: 10px 20px;
}

.dialog .dia-item{
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}

.dialog .dia-body .dia-title{
  display: inline-block;
  width: 135px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  margin: 5px 0;
}

.dialog .dia-btn{
  width:100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog .dia-btn .cancel,
.dialog .dia-btn .save{
  width: 50px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.dialog .dia-btn .cancel{
  margin-right: 60px;
}

.container-button {
  margin: 0;
  margin-left: 4px;
}
</style>