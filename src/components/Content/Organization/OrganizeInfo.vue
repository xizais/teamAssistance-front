<template>
  <div class="box">
    <div class="top">组织管理</div>
    <div class="detail">
      <div class="item">
        <div class="title">组织编码: </div>
        <input type="text">
      </div>
      <div class="item">
        <div class="title">组织名称: </div>
        <input type="text">
      </div>
      <div class="item">
        <div class="title">组织描述: input输入框</div>
        <input type="text">
      </div>
      <div class="item">
        <div class="title">组织性质: select选择器</div>
      </div>
      <div class="item">
        <div class="title">是否启用: redio单选框</div>
      </div>
      <div class="item">
        <div class="title">是否公用: redio单选框</div>
      </div>
      <div class="item">
        <div class="title">组织创建人: </div>
      </div>
      <div class="item">
        <div class="title">组织管理人: </div>
      </div>
      <div class="item-btn">
        <div class="btn">关闭</div>
        <div class="btn">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'organize-manage',
  data(){
    return {

    }
  },
  methods:{

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
}

.detail{
  margin-top: 10px;
  width: 100%;
  height: 550px;
  padding: 10px;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.item{
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.item .title{
  display: inline-block;
  width: 120px;
  text-align: left;
  margin-right: 10px;
}

.item-btn{
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;
}

.item-btn .btn{
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #000;
}
</style>