<template>
  <div class="outer-container">
    <div style="display: flex; flex-direction: column;">
      <div style="display: flex;">
        <div style="width: 500px;height: 40px;margin-left: 10px">
          <el-input style="width: 300px;" v-model="searchInput" placeholder="请输入筛选内容"></el-input>
          <el-button class="container-button" type="primary" style="margin-left: 4px" @click="this.searchInput=''">重置</el-button>
        </div>
        <el-button class="collect-button" style="margin-left: 600px" @click="personManager()" v-if="isSysManager">组织人员管理</el-button>
      </div>
      <div style="width: 200px;height: 50px;margin-left: 10px">
        <div style="width: 88px;height: 40px;float: left ">
          <el-button :type="curTargetMy?'primary':'null'" @click="myOrgList(true)">我的组织</el-button>
        </div>
        <div style="width: 98px;height: 40px;float: left ">
          <el-button :type="!curTargetMy?'primary':'null'" @click="myOrgList(false)">公共组织</el-button>
        </div>
      </div>
      <div class="wrapper">
        <template
            v-for="(data,index) in filteredArray"
            :key="data.cOICode"
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
                <span class="left-fontStyle">{{ data.cOIOrgCode }}</span>
              </div>
              <div class="left-creator">
                <span class="left-fontStyle">{{ data.cOIOrgName }}</span>
              </div>
              <div class="left-creator">
                <span class="left-fontStyle">{{ data.cOIManagerCode }}</span>
              </div>
            </div>
            <div class="right">
              <el-dropdown split-button >
                操作
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="goToShow(data.cOICode)" v-if="curTargetMy">查看人员</el-dropdown-item>
                    <el-dropdown-item @click="goToChild(data.cOICode)">查看子级</el-dropdown-item>
                    <el-dropdown-item @click="outOrgPerOnly(data.cOICode)" v-if="curTargetMy">退出组织</el-dropdown-item>
                    <el-dropdown-item @click="managerOrg(data.cOICode)">管理信息</el-dropdown-item>
                    <el-dropdown-item @click="goToOrgCreate(data.cOICode)" v-if="curTargetMy">创建组织</el-dropdown-item>
                    <el-dropdown-item @click="changeOrgState(data.cOICode,true)">停用部门</el-dropdown-item>
                    <el-dropdown-item @click="changeOrgState(data.cOICode,false)">启用部门</el-dropdown-item>
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
            :title="'组织人员信息（总数：'+ this.curAmount +'）'"
            v-model="dialogVisible"
            @close="dialogVisible = false"
            :draggable="true"
        >
          <div style="display: flex; align-items: center;">
            <el-input
                v-model="filterPerOrgKey"
                placeholder="请输入关键字进行筛选"
                style="margin-right: 10px;"
            ></el-input>
            <el-button type="primary" @click="addOrgPer(curOrgCode)">新增用户</el-button>
          </div>
          <el-table
              :data="filterPerArray"
              stripe
              style="max-height: 400px; overflow-y: auto;width: 800px"
          >
            <el-table-column prop="cPIName" label="人员编号"></el-table-column>
            <el-table-column prop="cPICode" label="人员名称"></el-table-column>
            <el-table-column prop="cOIOrgName" label="人员所属"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button type="primary" @click="outOrgPer(row.cPICode,curOrgCode)" >剔除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>

      <div>
        <el-dialog
            class="dialog-style"
            title="组织人员新增"
            v-model="myPerVisable"
            @close="myPerVisable = false"
            :draggable="true"
        >
          <div style="display: flex; align-items: center;">
            <el-input
                v-model="filterMyPerKey"
                placeholder="请输入关键字进行筛选"
                style="margin-right: 10px;"
            ></el-input>
          </div>
          <el-table
              :data="filterMyPerArray"
              stripe
              style="max-height: 400px; overflow-y: auto;width: 800px"
          >
            <el-table-column prop="cPICode" label="人员编号"></el-table-column>
            <el-table-column prop="cPIName" label="人员名称"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button type="primary" @click="addNewOrgPer(row.cPICode,curOrgCode)" >新增</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>

      <div>
        <el-dialog
            class="dialog-style"
            title="组织子级信息"
            v-model="dialogVisibleOrg"
            @close="dialogVisibleOrg = false"
            :draggable="true"
        >
          <el-input
              v-model="filterOrgKey"
              placeholder="请输入关键字进行筛选"
              style="margin-bottom: 10px;"
          ></el-input>
          <el-table
              :data="filterOrgArray"
              stripe
              style="max-height: 600px; overflow-y: auto;"
          >
            <el-table-column prop="cOIOrgCode" label="组织编码"></el-table-column>
            <el-table-column prop="cOIOrgName" label="组织名称"></el-table-column>
            <el-table-column prop="bOIIsEnable" label="组织状态"></el-table-column>
            <el-table-column prop="bOIIsPublicVisible" label="组织公示"></el-table-column>
            <el-table-column prop="cOIManagerCode" label="组织负责人"></el-table-column>
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
import {
  addNewOrgPer,
  deleteNotifyInfo,
  getChildOrg, getCurPerInfo,
  getMyPer,
  getOrgList,
  getOrgPers, outOrgPer,
  pubNotify
} from "@/request";
import {ElMessage} from "element-plus";
export default {
  name: "NoticeHome",
  data() {
    return {
      isSysManager: true, // 是否系统人员
      curOrgCode: null,// 当前组织
      curAmount: 0,// 当前组织总人数
      dialogTableVisible: false,
      title: '',
      curTargetMy: true,
      searchInput: '',
      searchInputDialog: '',
      doneAmont: 0,
      allMount: 0,
      dataArray: [],
      perArray: [],

      dialogVisible: false,
      filterPerOrgKey: '',

      dialogVisibleOrg: false,
      filterOrgKey: '',
      orgArray: [],

      myPerArray: [],
      myPerVisable: false,
      filterMyPerKey: '',
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
        return item?.cOIOrgCode?.includes(this.searchInput)
            || item?.cOIOrgName?.includes(this.searchInput)
            || item?.cOIManagerCode?.includes(this.searchInput)
            ;
      });
    },

    filterPerArray() {
      // 使用筛选条件过滤数组对象
      return this.perArray?.filter(item => {
        return item?.cPIName?.includes(this.filterPerOrgKey)
            || item?.cPICode?.includes(this.filterPerOrgKey)
            ;
      });
    },

    filterMyPerArray() {
      // 使用筛选条件过滤数组对象
      return this.myPerArray?.filter(item => {
        return item?.cPIName?.includes(this.filterMyPerKey)
            || item?.cPICode?.includes(this.filterMyPerKey)
            ;
      });
    },

    filterOrgArray() {
      // 使用筛选条件过滤数组对象
      return this.orgArray?.filter(item => {
        return item?.cOIOrgCode?.includes(this.filterOrgKey)
            || item?.cOIOrgName?.includes(this.filterOrgKey)
            || item?.bOIIsEnable?.includes(this.filterOrgKey)
            || item?.bOIIsPublicVisible?.includes(this.filterOrgKey)
            ;
      });
    },
  },
  methods: {
    initInfoData() {
      this.myOrgList(true);
    },

    async myOrgList(isMyOrg){
      this.curTargetMy = isMyOrg;
      const requestData = {
        isMyOrg: isMyOrg
      }
      const result = await getOrgList(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("数据获取失败！");
        return;
      }
      if (result.code !=0) {
        ElMessage.error(result.message);
        return;
      }
      this.dataArray = result.data?.orgList;
    },

    goToOrgCreate(cOICode) {
      this.$router.push({ path: "/organizeInfo", query: { state: 'add',cOICode: cOICode } });
    },

    // 组织人员管理
    personManager() {
      this.$router.push({ path: "/sysOrgPerManager"});
    },

    // 查看组织人员信息
    async goToShow(cOICode) {
      this.curOrgCode = cOICode;
      const requestData = {
        cOICode: cOICode
      }
      const result = await getOrgPers(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("输出查询失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      this.perArray = result.data.perArray;
      this.curAmount = result.data.curAmount;
      this.dialogVisible = true;
    },

    // 添加用户界面
    async addOrgPer(){
      const requestData = {
        curOrgCode: this.curOrgCode,
      }
      const result = await getMyPer(requestData);
      this.myPerArray = result.data.myPerArray;
      this.myPerVisable = true;
    },

    // 退出组织
    async outOrgPerOnly(curOrgCode) {
      const curPerInfo = await getCurPerInfo();
      this.outOrgPer(curPerInfo.data.code,curOrgCode);
      this.myOrgList(this.curTargetMy);
    },

    // 剔除人员
    async outOrgPer(curPerCode,curOrgCode){
      const requestData = {
        curPerCode: curPerCode,
        curOrgCode: curOrgCode,
      }
      const result = await outOrgPer(requestData);
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.perArray = this.perArray.filter(item => item.cPICode !== curPerCode);
      this.curAmount--;
    },

    // 添加用户
    async addNewOrgPer(curPerCode,curOrgCode){
      const requestData = {
        curPerCode: curPerCode,
        curOrgCode: curOrgCode,
      }
      const result = await addNewOrgPer(requestData);
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      ElMessage.success(result.data.message);
      this.myPerArray = this.myPerArray.filter(item => item.cPICode !== curPerCode);
      await this.goToShow(this.curOrgCode);
    },

    async goToChild(cOICode) {
      const requestData = {
        cOICode: cOICode
      }
      const result = await getChildOrg(requestData);
      if (result == null || result == undefined) {
        ElMessage.error("输出查询失败！");
        return;
      }
      if (result.code != 0) {
        ElMessage.error(result.message);
        return;
      }
      this.orgArray = result.data?.orgArray;
      this.dialogVisibleOrg = true;
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