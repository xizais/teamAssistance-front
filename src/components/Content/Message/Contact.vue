<template>
  <div>
    <div class="chat_commento">
      <div class="chat_top">
        {{ sendName }}
      </div>
      <div class="line"></div>
      <!-- middle -->
      <div class="chat_middle" id="chat_middle_item" >
        <div v-for="(item,index) in msgInfo" :key="index">
          <!-- 左边 -->
          <div class="chat_left clearfix" v-if="item.id == 0">
            <div class="chat_left_item_1 ">{{ item.name }}</div>
            <div class="chat_left_item_2">
              <div class="chat_time">{{ item.time }}</div>
              <div class="chat_left_content">
                {{ item.info }}
              </div>
            </div>
          </div>
          <!--右边 -->
          <div class="chat_right" v-if="item.id == 1">
            <div class="chat_right_item_1 ">{{ item.name }}</div>
            <div class="chat_right_item_2 ">
              <div class="chat_right_time">{{item.time}}</div>
              <div class="chat_right_content">
                {{item.info}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <!-- foot -->
      <div class="chat_foot">
        <textarea class="chat_context" v-model="sendInfo" cols="30" rows="10" placeholder="请输入..."></textarea>
        <div class="chat_commit" id="button" @click="commit">发送</div>
        <div class="tip" v-show="showTip">不能发送空白信息</div>
      </div>

    </div>
  </div>
</template>

<script>
import {addMessageInfo} from "@/request";
import {ElMessage} from "element-plus";

export default {
  name:'contact-index',
  props:['msg'],
  data(){
    return{
      sendInfo:'', //发送的消息
      showTip:false, //提示信息
    }
  },
  computed:{
    //发送者
    sendName(){
      return this.msg.name;
    },
    //接收者
    acceptName(){
      return '希仔';
    },
    //消息
    msgInfo(){
      return this.msg?.content;
    }
  },
  methods:{
    async commit(){
      if(this.sendInfo){
        const requestData = {
          content: this.sendInfo,
          id: this.msg.id,
          otherCod: this.msg.cCCOtherCode,
          selfCode: this.msg.cCCSelfCode,
        }
        const result = await addMessageInfo(requestData);
        if (result != null && result.code != 0){
          ElMessage.error(result.message);
          return;
        }

        let data = {}; //存放新对象
        let time=new Date();
        let hour=time.getHours();
        let mm=time.getMinutes();
        let min = mm < 10 ? '0' + mm : mm;
        data.time = hour + ':' + min;
        data.name = this.acceptName;
        data.id = 1;
        data.info = this.sendInfo;
        this.msgInfo.push(data);
        this.sendInfo = '';
        //聊天的对象
        let person = {};
        person.id = this.msg.id;
        person.data = data;
        this.$emit('updataMsg', person)
      }else{
        this.showTip = true;
        setTimeout(()=>this.showTip = false,1500);
      }
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.chat_commento{
  height: 650px;
  margin: auto;
  border-radius: 10px;
  border: 2px solid #f4f5f7;
}
.clearfix::after{
  content: "";
  display: block;
  clear: both;
  width: 0;
  height: 0;
  line-height: 0;
  visibility: hidden;
}
/* top */
.chat_top{
  width: 100%;
  height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-left: 20px;
  font-size: 20px;
  line-height: 50px;
  box-sizing: border-box;
  font-weight: 550;
  border-bottom: 2px solid #e9e9e9;
}
/* middle */
/* 左边 */
.chat_middle{
  height: 455px;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  border-width: 0px;
  padding: 15px 5px;
}
.chat_left{
  width: 100%;
  height: 110px;
}
.chat_left_item_1{
  width: 50px;
  height: 50px;
  background-color: #4459AB;
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 25px;
}
.chat_left_item_2{
  width: 55%;
  height: 100px;
  float: left;
  margin-top: 10px;
}
.chat_left_item_2 .chat_left_chat{
  float: left;
}
.chat_left_item_2 .chat_left_content{
  padding: 15px;
  margin-top: 10px;
  background-color: #fff;
  display: inline-block;
  border-radius: 10px;
  border-top-left-radius: 0px;
}
/* 右边 */
.chat_right{
  width: 100%;
  height: 110px;
}
.chat_right_item_1{
  width: 50px;
  height: 50px;
  background-color: #4459AB;
  float: right;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 25px;
}
.chat_right_item_2{
  width: 55%;
  height: 100px;
  float: right;
  margin-top: 10px;
}
.chat_right_time{
  width: 100%;
  text-align: right;
}
.chat_right_content{
  float: right;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  border-top-right-radius: 0px;
  background-color: #4F7cff;
  color: white;
}
/* foot */
.chat_foot{
  position: relative;
  height: 130px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
}
.chat_context{
  width: 100%;
  height: 100%;
  font-size: 17px;
  box-sizing: border-box;
  outline: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-width: 0px;
  padding: 16px;
}
.chat_commit{
  width: 80px;
  height: 30px;
  color: white;
  background-color: #4F7cff;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  bottom: 20px;
  margin-right: 10px;
}
.chat_context{
  border-top: 2px solid #e9e9e9;
  resize: none;
  background-color: #f5f5f5;
}
.chat_context::placeholder{
  color: black;
  font-weight: 500k;
}
.line{
  width: 100%;
  border-top: 1px;
  border-color: #f4f5f7;
  border-style: solid;
}
.tip{
  position: absolute;
  right: 10px;
  bottom: 60px;
  width: 130px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #fff;
  color: #000;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  animation: hide 1.5s ease-in-out;
}

.tip::after{
  content: '';
  position: absolute;
  right: 27px;
  bottom: -17px;
  border: 10px solid transparent;
  border-top: 10px solid #fff;
}
</style>
<style>
@keyframes hide{
  0%{
    opacity: 1;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
</style>