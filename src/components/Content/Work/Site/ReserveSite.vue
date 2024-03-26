<template>
  <div class="box">
    <div class="top">预约信息</div>
    <div class="search">
      预约场地名称:
      <input type="text" v-model="searchInfo">
      <button @click="searchItem">搜索</button>
    </div>
    <div class="detail">
      <div class="td">
        <div class="site-item">预约场地名称</div>
        <div class="site-item">预约场地地点</div>
        <div class="site-item">场地负责人</div>
        <div class="site-item">场地联系方式</div>
        <div class="site-time">预约时间段</div>
        <div class="site-item">预约状态</div>
      </div>
      <div class="td" v-for="item in dataList" :key="item.id">
        <div class="site-item">{{ item.place }}</div>
        <div class="site-item">{{ item.detail }}</div>
        <div class="site-item">{{ item.name }}</div>
        <div class="site-item">{{ item.tel }}</div>
        <div class="site-time">{{ item.time }}</div>
        <div class="site-item">{{ item.status }}</div>
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
          detail:'1栋202',
          name:'张三',
          tel:'13812345678',
          time:'2024-3-20 10:00 -- 2024-3-20 12:00',
          status:'审批中'

        },
        {
          id:1,
          place:'教学楼2',
          detail:'1栋202',
          name:'张三',
          tel:'13812345678',
          time:'2024-3-20 10:00 -- 2024-3-20 12:00',
          status:'审批中'

        },
        {
          id:2,
          place:'教学楼3',
          detail:'1栋202',
          name:'张三',
          tel:'13812345678',
          time:'2024-3-20 10:00 -- 2024-3-20 12:00',
          status:'审批中'

        },
      ],
      showDialog:false,  //展示弹框
      searchInfo:'', //搜索场地名称
    }
  },
  methods:{
    //获取数据
    getDataList(){

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
}

.top{
  height: 50px;
  line-height: 50px;
  background-color: pink;
}

.search{
  text-align: left;
}

.detail{
  margin-top: 10px;
  width: 100%;
  height: 550px;
  background-color: pink;
  border: 1px solid #000;
}

.td{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #000;
  background-color: antiquewhite;
}

.td .site-item{
  float: left;
  width: 150px;
}

.td .site-time{
  float: left;
  width: 300px;
  font-size: 16px;
}

</style>