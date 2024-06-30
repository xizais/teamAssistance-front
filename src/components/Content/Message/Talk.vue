<template>
  <div class="index">
    <div class="left">
      <div :class="['wrapper', index == selectedItem ? 'selected' : '']" v-for="(item,index) in personList" :key="item.id" @click="goTalk(item)">
        <img src="@/assets/彼岸花女.jpg" alt="" class="img">
        <div class="info">
<!--          <template v-for="(contentInfo) in item.content" :key="contentInfo.cCIId">-->
            <div class="top">
              <div class="title">{{ item.name }}</div>
              <div class="time">{{ item.time }}</div>
            </div>
            <div class="bottom">{{ item?.content[item?.content?.length-1]?.info }}</div>
<!--          </template>-->
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
import {ElMessage} from "element-plus";
import {getMessageList} from "@/request";
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
    async initMessageList() {
      const result = await getMessageList();
      if (result.code != 0){
        ElMessage.error(result.message);
        return;
      }
      this.personList = result.data.messageList;
      if (this.personList != null && this.personList.length != 0) {
        this.msg = this.personList[0]
      }
    },

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
    this.initMessageList();
    // this.personList = JSON.parse(localStorage.getItem('personList')) || [
    //   {
    //     id:0,
    //     img:require('@/assets/彼岸花女.jpg'),
    //     name:'希仔',
    //     time:'11:23',
    //     content:[
    //       {id:0,name:'天乐',time:'18:57',info:'信息收集表单完成了吗？?'},
    //       {id:1,name:'希仔',time:'18:59',info:'最近事情有点多，还没设计完喔~'},
    //       {id:0,name:'天乐',time:'18:57',info:'侯，抓紧时间呐~'}
    //     ],
    //     num:3
    //   },
    //   {
    //     id:1,
    //     img:require('@/assets/彼岸花女.jpg'),
    //     name:'张三',
    //     time:'1:1',
    //     content:[
    //       {id:0,name:'张三',time:'18:57',info:'通知管理可以直接发布吗?'},
    //       {id:1,name:'希仔',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
    //       {id:0,name:'张三',time:'18:57',info:'任务通知什么时候发版？'}
    //     ],
    //     num:3
    //   },
    //   {
    //     id:2,
    //     img:require('@/assets/彼岸花女.jpg'),
    //     name:'何意',
    //     time:'11:23',
    //     content:[
    //       {id:0,name:'天乐',time:'18:57',info:'如何修改数据呢？我想添加用户去完成任务。'},
    //       {id:1,name:'李想',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
    //       {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
    //     ],
    //     num:3
    //   },
    //   {
    //     id:3,
    //     img:require('@/assets/彼岸花女.jpg'),
    //     name:'王武',
    //     time:'17:23',
    //     content:[
    //       {id:0,name:'天乐',time:'18:57',info:'组织管理我没有权限呐~?'},
    //       {id:1,name:'李想',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
    //       {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
    //     ],
    //     num:3
    //   },
    //   {
    //     id:4,
    //     img:require('@/assets/彼岸花女.jpg'),
    //     name:'李达',
    //     time:'8:23',
    //     content:[
    //       {id:0,name:'天乐',time:'18:57',info:'可以帮我预约一个审批吗?'},
    //       {id:1,name:'李想',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
    //       {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
    //     ],
    //     num:3
    //   },
    //   {
    //     id:5,
    //     img:require('@/assets/彼岸花女.jpg'),
    //     name:'李彦宏',
    //     time:'11:23',
    //     content:[
    //       {id:0,name:'天乐',time:'18:57',info:'有什么需要帮忙处理的吗?'},
    //       {id:1,name:'李想',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
    //       {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
    //     ],
    //     num:3
    //   },
    //   {
    //     id:6,
    //     img:require('@/assets/彼岸花女.jpg'),
    //     name:'杨杰',
    //     time:'11:23',
    //     content:[
    //       {id:0,name:'天乐',time:'18:57',info:'可以帮我审批一下数据吗?'},
    //       {id:1,name:'希仔',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
    //       {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
    //     ],
    //     num:3
    //   },
    //   {
    //     id:7,
    //     img:require('@/assets/彼岸花女.jpg'),
    //     name:'诸葛亮',
    //     time:'11:23',
    //     content:[
    //       {id:0,name:'天乐',time:'18:57',info:'怎么处理信息数据?'},
    //       {id:1,name:'希仔',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
    //       {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
    //     ],
    //     num:3
    //   },
    //   {
    //     id:8,
    //     img:require('@/assets/彼岸花女.jpg'),
    //     name:'李华',
    //     time:'11:23',
    //     content:[
    //       {id:0,name:'天乐',time:'18:57',info:'多久上线？'},
    //       {id:1,name:'希仔',time:'18:59',info:'最近八合里周年庆店，咱们去薅羊毛呀'},
    //       {id:0,name:'天乐',time:'18:57',info:'今天吃点啥?'}
    //     ],
    //     num:3
    //   },
    // ];
    // this.msg = this.personList[0]
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
