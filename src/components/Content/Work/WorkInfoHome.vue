<template>
  <div class="outer-container">
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex;">
        <div style="width: 500px;height: 40px;margin-left: 10px">
          <el-input style="width: 300px;" v-model="searchInput" placeholder="请输入筛选内容"></el-input>
          <el-button class="container-button" type="primary" style="margin-left: 4px" @click="this.searchInput=''">重置</el-button>
        </div>
      </div>
      <div class="wrapper">
        <template
            v-for="(data,index) in filteredArray"
            :key="data.id"
        >
          <template v-if="index===0">
            <div class="container" style="font-weight: bolder; font-size: 18px">
              <div class="left">
                <div class="left-title">
                  <span class="left-fontStyle">工作类型</span>
                </div>
                <div class="left-title">
                  <span class="left-fontStyle">名称</span>
                </div>
                <div class="left-title">
                  <span class="left-fontStyle">发布者</span>
                </div>
                <div class="left-creator">
                  <span class="left-fontStyle">创建时间</span>
                </div>
                <div class="left-creator">
                  <span class="left-fontStyle">状态</span>
                </div>
              </div>
              <div class="right">
                <div class="left-creator" style="text-align: right;padding-right: 10%">
                  <span class="left-fontStyle">操作</span>
                </div>
              </div>
            </div>
          </template>
          <div class="container">
            <div class="left">
              <div class="left-time">
                <span class="left-fontStyle">{{ data.type }}</span>
              </div>
              <div class="left-time">
                <span class="left-fontStyle">{{ data.title }}</span>
              </div>
              <div class="left-time">
                <span class="left-fontStyle">{{ data.puber }}</span>
              </div>
              <div class="left-time">
                <span class="left-fontStyle">{{ data.updateTime }}</span>
              </div>
              <div class="left-time">
                <span class="left-fontStyle">{{ data.state }}</span>
              </div>
            </div>
            <div class="right">
              <el-dropdown split-button >
                操作
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="viewContent(data.content)">查看内容</el-dropdown-item>
                    <el-dropdown-item @click="viewData(data.id,data.type,data.typeId)">查看数据</el-dropdown-item>
                    <el-dropdown-item @click="goToHandle(data.id,data.type,data.typeId)" v-if="data.state == '草稿'">前往处理</el-dropdown-item>
                    <el-dropdown-item @click="deleteForm(data.id)" v-if="data.state != '草稿'">删除记录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

            </div>
          </div>
        </template>
      </div>

      <div>
        <el-dialog
            class="dialog-style"
            title="内容"
            v-model="dialogVisible"
            @close="dialogVisible = false"
            :draggable="true"
        ><span style="padding-left: 20px">{{ dialogContent }}</span>
        </el-dialog>
      </div>

      <div class="container-selectPage" v-show="!show">
        <div class="demo-pagination-block">
          <el-pagination
              v-model:current-page="selectPage.currentPage"
              v-model:page-size="selectPage.pageSize"
              small="small"
              layout="total, prev, pager, next, jumper"
              :total="selectPage.total"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div v-show="show">
        <el-empty description="无数据" />
      </div>
    </div>
  </div>
</template>

<script>
import {getWorkInfoList,getFromDataId, deleteWorkTask} from "@/request";
import {ElMessage} from "element-plus";
export default {
  name: "CollectInfoHome",
  data() {
    return {
      selectPage: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        offset: 0,
      },
      searchData: {
        'searchInfo': {}
      },
      dataArray: [],
      dialogVisible: false,
      dialogContent: '',

      searchInput: ""
    };
  },

  // 页面初始化加载
  mounted() {
    this.initCollectData();// 初始话数据
  },
  computed:{
    show(){
      const show = this.dataArray?.length ? false : true;
      return show;
    },
    filteredArray() {
      // 使用筛选条件过滤数组对象
      return this.dataArray.filter(item => {
        return item.type.includes(this.searchInput)
            || item.title.includes(this.searchInput)
            || item.puber.includes(this.searchInput)
            || item.updateTime.includes(this.searchInput)
            || item.state.includes(this.searchInput)
            ;
      });
    }
  },
  methods: {
    viewContent(content) {
      this.dialogContent = content;
      this.dialogVisible = true;
    },

    // 初始化数据
    async initCollectData() {
      let requestData = {
        "selectPage": this.selectPage
      };
      let result = await getWorkInfoList(requestData);
      this.dataArray = result.data?.workList;
      this.selectPage.total = result.data?.amount;
    },

    async viewData(workTaskId,state,typeId) {
      if (state == '信息收集') {
        const requestData = {
          iIFId: typeId,
        };
        const result = await getFromDataId(requestData);
        if (result == null || result == undefined) {
          ElMessage.error("操作失败！");
        }
        if (result.code != 0) {
          ElMessage.error(result.message);
        }
        const id = result.data.id;// 当前人员对应的表单的信息收集记录

        this.$router.push({ path: "/CollectInfoDataDetails", query: { workTaskId:workTaskId, iIFId: typeId, id: id, type: 'view'} });


      } else if (state == '信息收集审批') {
        const requestData = {
          iIFId: typeId,
        };
        const result = await getFromDataId(requestData);
        if (result == null || result == undefined) {
          ElMessage.error("操作失败！");
          return;
        }
        if (result.code != 0) {
          ElMessage.error(result.message);
          return;
        }
        const id = result.data.id;// 当前人员对应的表单的信息收集记录

        this.$router.push({ path: "/CollectInfoDataDetails", query: { workTaskId:workTaskId, iIFId: typeId, id: id, type: 'view'} });
      }
    },

    async goToHandle(workTaskId,state,typeId) {
      if (state == '信息收集') {
        const requestData = {
          iIFId: typeId,
        };
        const result = await getFromDataId(requestData);
        if (result == null || result == undefined) {
          ElMessage.error("操作失败！");
        }
        if (result.code != 0) {
          ElMessage.error(result.message);
        }
        const id = result.data.id;// 当前人员对应的表单的信息收集记录
        this.$router.push({ path: "/CollectInfoDataDetails", query: { iIFId: typeId,id: id, workTaskId: workTaskId, type: 'edit'} });


      } else if (state == '信息收集审批') {
        //这个id需要更改为对应的信息收集表单的id
        const requestData = {
          iIFId: typeId,
        };
        const result = await getFromDataId(requestData);
        if (result == null || result == undefined) {
          ElMessage.error("操作失败！");
        }
        if (result.code != 0) {
          ElMessage.error(result.message);
        }
        const id = result.data.id;// 当前人员对应的表单的信息收集记录

        this.$router.push({ path: "/CollectInfoDataDetails", query: {workTaskId: workTaskId, iIFId: typeId, id: id, type: 'approval'} });
      }


    },

    async deleteForm(id) {
      const requestData = {
        id: id
      }
      const result = await deleteWorkTask(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message)
      this.initCollectData();
    },


    async handleCurrentChange(newPage) {
      // 处理当前页码改变事件
      this.selectPage.currentPage = newPage;
      this.selectPage.offset = this.selectPage.pageSize * (this.selectPage.currentPage-1);
      // 重新加载数据
      const requestData = {
        "selectPage": this.selectPage,
      };
      let result = await getWorkInfoList(requestData);
      this.dataArray = result.data?.workList;
      this.selectPage.total = result.data?.amount;
    },
  }
}
</script>

<style scoped>
.outer-container {
  display: flex;
  width: 100%;
}

.outer-container > div {
  flex-grow: 1;
}

.collect-button {
  margin: 6px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid #000000;
  margin: 0 6px;
  border-bottom: 0px;
  transition: background-color 0.3s ease; /* 添加过渡效果 */
  /* 默认颜色 */
  background-color: #faf7f1;
}

.container:hover {
  /* 鼠标悬停时的颜色 */
  background-color: #eaeaea;
}

.container:first-child{
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.container:last-child{
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: 1px solid #000000;
}

.container .left{
  display: flex;
  justify-content: flex-start;
  width: 70%;
}

.container .left div{
  margin: 0 20px;
}

.container .right button{
  margin: 0 6px;
  height: 32px;
  background-color: #fff;
  border-style: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  color: #606266;
}

.container .right button:hover{
  color: #409eff;
  border: 1px solid #409eff;
  background-color: #ecf5ff;
}

.container-selectPage {
  padding-top: 10px;
  width: 100%;
  height: 50px;
  margin-left: 6px;
  display: flex;
  justify-content: flex-end;
}

.right {
  display: flex;
  justify-content: flex-end;
  width: 20%;
  margin-right: 10px;
}

.left-title {
  flex: 1;
}

.left-time {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.left-creator {
  flex: 1;
}

.left-fontStyle {
  font-size: 16px;
  font-family: 'Kaiti'
}

.wrapper {
  text-align: center;
}

.dialog-style {
  border-radius: 6px;
  width: 50%;
  margin-top: 20px;
}
</style>