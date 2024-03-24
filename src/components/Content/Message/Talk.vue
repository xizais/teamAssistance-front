<template>
  <div class="index">
    <div class="left">
      <div :class="['wrapper', index == selectedItem ? 'selected' : '']" v-for="(item,index) in personList" :key="item.id" @click="goTalk(item)">
        <img :src="item.img" alt="" class="img">
        <div class="info">
          <div class="top">
            <div class="title">{{ item.name }}</div>
            <div class="time">{{ item.content[item.num-1].time }}</div>
          </div>
          <div class="bottom">{{ item.content[item.num-1].info }}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <Contact :msg="msg" @updataMsg="updataMsg"></Contact>
    </div>
  </div>
</template>

<script>
import Contact from '@/components/Content/Message/Contact'
export default {
  name: 'talk-index',
  components:{Contact},
  props: {
  },
  data(){
    return{
      msg:{},
      selectedItem:'', //是否选中
      personList:[]
    }
  },
  methods:{
    goTalk(item){
      this.msg = item;
      this.selectedItem = item.id;
    },
    //更新信息
    updataMsg(value){
      this.personList.filter((item)=>{
        if(item.id === value.id){
          item.num +=1;
        }
      })
      localStorage.setItem('personList',JSON.stringify(this.personList))
    }
  },
  watch:{
    msg(value){
      this.msg = value;
    }
  },
  mounted(){
    this.personList = JSON.parse(localStorage.getItem('personList')) || [
      {
        id:0,
        img:require('@/assets/彼岸花女.jpg'),
        name:'希仔',
        time:'11:23',
        content:[
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'},
          {id:1,name:'希仔',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
        ],
        num:3
      },
      {
        id:1,
        img:require('@/assets/彼岸花女.jpg'),
        name:'希仔2',
        time:'1:1',
        content:[
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'},
          {id:1,name:'热巴',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
          {id:0,name:'天乐',time:'18:57',info:'?'}
        ],
        num:3
      },
      {
        id:2,
        img:require('@/assets/彼岸花女.jpg'),
        name:'希仔3',
        time:'11:23',
        content:[
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'},
          {id:1,name:'热巴',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
        ],
        num:3
      },
      {
        id:3,
        img:require('@/assets/彼岸花女.jpg'),
        name:'希仔',
        time:'17:23',
        content:[
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'},
          {id:1,name:'热巴',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
        ],
        num:3
      },
      {
        id:4,
        img:require('@/assets/彼岸花女.jpg'),
        name:'希仔5',
        time:'8:23',
        content:[
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'},
          {id:1,name:'热巴',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
        ],
        num:3
      },
      {
        id:5,
        img:require('@/assets/彼岸花女.jpg'),
        name:'希仔6',
        time:'11:23',
        content:[
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'},
          {id:1,name:'热巴',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
        ],
        num:3
      },
      {
        id:6,
        img:require('@/assets/彼岸花女.jpg'),
        name:'希仔6',
        time:'11:23',
        content:[
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'},
          {id:1,name:'热巴',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
        ],
        num:3
      },
      {
        id:7,
        img:require('@/assets/彼岸花女.jpg'),
        name:'希仔6',
        time:'11:23',
        content:[
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'},
          {id:1,name:'热巴',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
        ],
        num:3
      },
      {
        id:8,
        img:require('@/assets/彼岸花女.jpg'),
        name:'希仔6',
        time:'11:23',
        content:[
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'},
          {id:1,name:'热巴',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
          {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
        ],
        num:3
      },
    ];
    this.msg = this.personList[0]
  }
}
</script>

<style scoped>
.index{
  width: 100%;
  height: 100%;
  display: flex;
}

.left{
  width: 33%;
  height: 650px;
  overflow: auto;
  box-sizing: border-box;
  background-color: #e5e4e4;
}

.wrapper{
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 13px 15px 13px 13px;
  box-sizing: border-box;
}

.wrapper:hover{
  background-color: #dedddc;
}

.wrapper .img{
  width: 48px;
  height: 48px;
  margin-right: 10px;
}

.wrapper .info{
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.wrapper .info .top{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrapper .info .top .title{
  font-size: 18px;
}

.wrapper .info .top .time{
  color: #b9b9b9;
}

.wrapper .info .bottom{
  font-size: 14px;
  color: #999999;
}

.right{
  width: 67%;
  height: 100%;
  background-color: #f5f5f5;
}

.selected{
  background-color: #c8c9ca;
}

.container-right{
  padding: 0 !important;
}

</style>
