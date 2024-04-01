<template>
  <div class="outer-container">
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex;">
        <div style="width: 500px;height: 40px;margin-left: 10px">
          <el-input style="width: 300px;" v-model="searchInput" placeholder="请输入筛选内容"></el-input>
          <el-button class="container-button" type="primary" style="margin-left: 4px" @click="this.searchInput=''">重置</el-button>
        </div>
        <el-button class="collect-button" @click="goToOrgCreate()">组织创建</el-button>
      </div>
      <div style="width: 200px;height: 50px;margin-left: 10px">
        <div style="width: 88px;height: 40px;float: left ">
          <el-button type="primary" @click="goToOrgCreate()">我的组织</el-button>
        </div>
        <div style="width: 98px;height: 40px;float: left ">
          <el-button  @click="goToOrgCreate()">公共组织</el-button>
        </div>
      </div>
      <div class="wrapper">
        <template
            v-for="(data,index) in filteredArray"
            :key="data.iNMId"
        >
          <template v-if="index===0">
            <div class="container" style="font-weight: bolder; font-size: 18px">
              <div class="left">
                <div class="left-title">
                  <span class="left-fontStyle">编号</span>
                </div>
                <div class="left-time">
                  <span class="left-fontStyle">组织名称</span>
                </div>
                <div class="left-creator">
                  <span class="left-fontStyle">组织负责人</span>
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
              <div class="left-title">
                <span class="left-fontStyle">{{ data.cNMTitle }}</span>
              </div>
              <div class="left-creator">
                <span class="left-fontStyle">{{ data.dNMUpdateTime }}</span>
              </div>
              <div class="left-creator">
                <span class="left-fontStyle">{{ data.cNMPubName }}</span>
              </div>
            </div>
            <div class="right">
              <el-dropdown split-button >
                操作
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="goToShow(data.iNMId)">查看人员</el-dropdown-item>
                    <el-dropdown-item @click="editNotify(data.iNMId)">查看子级</el-dropdown-item>
                    <el-dropdown-item @click="deleteNotify(data.iNMId)">管理信息</el-dropdown-item>
                    <el-dropdown-item @click="managerConfigShow(data.iNMId)">停用部门</el-dropdown-item>
                    <el-dropdown-item @click="pubNotifyInfo(data.iNMId)">删除通知</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </template>
      </div>
      <div>
        <el-dialog v-model="dialogTableVisible" :title="this.title+'数据详情'" width="800"
                   style="border-radius: 6px;" top="3vh"
        >
          <div style="width: 380px;height: 40px;margin-left: 0px; float: left">
            <el-input style="width: 300px;" v-model="searchInputDialog" placeholder="请输入筛选内容"></el-input>
            <el-button class="container-button" type="primary" style="margin-left: 4px" @click="this.searchInputDialog=''">重置</el-button>
          </div>
          <div style="float: right">
            <el-row>
              <el-col :span="12" style="display: flex; flex-direction: column;">
                <div>总数：</div>
              </el-col>
              <el-col :span="12" style="display: flex; flex-direction: column;">
                <div>{{ this.allMount }}</div>
              </el-col>
              <el-col :span="12" style="display: flex; flex-direction: column;">
                <div>已确认：</div>
              </el-col>
              <el-col :span="12" style="display: flex; flex-direction: column;">
                <div>{{ this.doneAmont }}</div>
              </el-col>
            </el-row>
          </div>
          <el-table :data="filteredGridData"  height="70vh">
            <el-table-column property="code" label="学号"  />
            <el-table-column property="name" label="姓名" />
            <el-table-column property="state" label="状态" />
            <!--              <el-table-column fixed="right" label="操作" width="120">-->
            <!--                <template #default="scope">-->
            <!--                  <el-button-->
            <!--                      link-->
            <!--                      type="primary"-->
            <!--                      size="small"-->
            <!--                      @click.prevent="deleteRow(scope.$index)"-->
            <!--                  >-->
            <!--                    提醒-->
            <!--                  </el-button>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
          </el-table>
        </el-dialog>
      </div>
      <div v-show="show">
        <el-empty description="无数据" />
      </div>
    </div>
  </div>
</template>

<script>
import {deleteNotifyInfo, getNotifyInfoList, getNotifyPersonDataList, pubNotify} from "@/request";
import {ElMessage} from "element-plus";
export default {
  name: "NoticeHome",
  data() {
    return {
      dialogTableVisible: false,
      title: '',

      searchInput: '',
      searchInputDialog: '',
      doneAmont: 0,
      allMount: 0,
      dataArray: [],
      gridData : []
    };
  },

  // 页面初始化加载
  mounted() {
    this.initInfoData();// 初始话数据
  },
  computed:{
    show(){
      const show = this.dataArray?.length ? false : true;
      return show;
    },
    filteredArray() {
      // 使用筛选条件过滤数组对象
      return this.dataArray?.filter(item => {
        return item?.cNMTitle?.includes(this.searchInput)
            || item?.dNMUpdateTime?.includes(this.searchInput)
            || item?.cNMPubName?.includes(this.searchInput)
            ;
      });
    },
    filteredGridData() {
      // 使用筛选条件过滤数组对象
      return this.gridData.filter(item => {
        return item?.code?.includes(this.searchInputDialog)
            || item?.name?.includes(this.searchInputDialog)
            || item?.state?.includes(this.searchInputDialog)
            ;
      });
    }


  },
  methods: {
    async initInfoData() {
      let result = await getNotifyInfoList();
      this.dataArray = result.data?.infoList;
      this.dataArray =[
        {
          cNMTitle: '20154921',
          dNMUpdateTime: '20软工一班',
          cNMPubName: '希仔',
        },
        {
          cNMTitle: '2015492',
          dNMUpdateTime: '20软工二班',
          cNMPubName: '希仔',
        },
        {
          cNMTitle: '2015493',
          dNMUpdateTime: '20软工三班',
          cNMPubName: '希仔',
        },
        {
          cNMTitle: '2015494',
          dNMUpdateTime: '20软工四班',
          cNMPubName: '李阳',
        },
      ];
    },

    goToOrgCreate() {
      this.$router.push({ path: "/organizeInfo", query: { state: 'add' } });
    },
    goToShow(iNMId) {
      this.$router.push({ path: "/noticeInfoDesign", query: { state: 'view',iNMId: iNMId } });
    },
    editNotify(iNMId) {
      this.$router.push({ path: "/noticeInfoDesign", query: { state: 'edit',iNMId: iNMId } });
    },

    async deleteNotify(iNMId){
      const requestData = {
        iNMId: iNMId
      }
      const result = await deleteNotifyInfo(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.initInfoData()
    },

    managerConfigShow(iNMId) {
      this.$router.push({ path: "/PubConfig", query: { iTypeId: iNMId, cType: 'Notify' } });
    },

    async pubNotifyInfo(iNMId) {
      const requestData = {
        iTypeId: iNMId
      }
      const result = await pubNotify(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.initInfoData();
    },

    async viewData(title,iNMId){
      this.dialogTableVisible = true;
      this.title = title;
      // 获取数据
      const requestData = {
        typeId: iNMId,
      }
      const result = await getNotifyPersonDataList(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("操作失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      this.gridData = result.data.notifyPersonData;
      this.doneAmont = result.data.doneAmont;
      this.allMount = this.gridData.length;
    }
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
  width: 98%;
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

.collect-button{
  margin-left: 370px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>