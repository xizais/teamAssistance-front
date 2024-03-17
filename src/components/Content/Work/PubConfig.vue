<template>
  <div class="pubConfig-style">
    <el-form :model="form" label-width="120px">
      <el-form-item label="关联表类型">
        <el-input v-model="form.tableType" readonly=true></el-input>
      </el-form-item>
      <el-form-item label="发布开始时间">
        <el-date-picker v-model="form.startDate" type="date" :readonly="isReadOnly"></el-date-picker>
      </el-form-item>
      <el-form-item label="发布停止时间">
        <el-date-picker v-model="form.endDate" type="date" :readonly="isReadOnly"></el-date-picker>
      </el-form-item>
      <el-form-item label="是否进行审核">
        <el-switch v-model="form.reviewEnabled" :disabled="isReadOnly"></el-switch>
      </el-form-item>
      <el-form-item label="是否启用组织管理">
        <el-switch v-model="form.orgEnabled" :disabled="isReadOnly"></el-switch>
      </el-form-item>
      <el-form-item label="发布者名称">
        <el-input v-model="form.publisherName" :readonly="isReadOnly"></el-input>
      </el-form-item>
      <el-form-item label="发布人员对象">
        <span class="span-style">{{ selectedPersons==null||selectedPersons.length==0 ? '无':selectedPersons.join(', ')}}</span>
        <el-button type="primary" @click="openPersonDialog" v-if="!isReadOnly">选择人员</el-button>
      </el-form-item>
      <el-form-item label="发布组织对象">
        <span class="span-style">{{ selectedOrg==null||selectedOrg.length==0 ? '无':selectedOrg.join(', ')}}</span>
        <el-button type="primary" @click="openOrgDialog" v-if="!isReadOnly">选择组织</el-button>
      </el-form-item>
      <el-form-item label="发布标识对象">
        <span class="span-style">{{ selectedFlag==null||selectedFlag.length==0 ? '无':selectedFlag.join(', ')}}</span>
        <el-button type="primary" @click="openFlagDialog" v-if="!isReadOnly">选择标识</el-button>
      </el-form-item>

      <!--    人员选择-->
      <el-dialog
          class="dialog-style"
          title="选择人员"
          v-model="dialogVisible"
          @close="closePersonDialog"
          :draggable="true"
      >
        <el-input
            v-model="filterKeyword"
            placeholder="请输入关键字进行筛选"
            style="margin-bottom: 10px;"
        ></el-input>
        <el-table
            :data="filteredPersons"
            stripe
            :row-key="getRowKey"
            @selection-change="handleSelectionChange"
            style="max-height: 400px; overflow-y: auto;"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="personId" label="人员编号"></el-table-column>
          <el-table-column prop="personName" label="人员名称"></el-table-column>
          <el-table-column prop="personBelong" label="人员所属"></el-table-column>
        </el-table>
        <template #footer>
          <el-button @click="closePersonDialog">取 消</el-button>
          <el-button type="primary" @click="confirmPersonSelection">确 定</el-button>
        </template>
      </el-dialog>

      <!--    组织选择-->
      <el-dialog
          class="dialog-style"
          title="选择人员"
          v-model="dialogVisibleOrg"
          @close="closeOrgDialog"
          :draggable="true"
      >
        <el-input
            v-model="filterKeywordOrg"
            placeholder="请输入关键字进行筛选"
            style="margin-bottom: 10px;"
        ></el-input>
        <el-table
            :data="filteredOrg"
            stripe
            :row-key="getRowKeyOrg"
            @selection-change="handleSelectionChangeOrg"
            style="max-height: 400px; overflow-y: auto;"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="personId" label="人员编号"></el-table-column>
          <el-table-column prop="personName" label="人员名称"></el-table-column>
          <el-table-column prop="personBelong" label="人员所属"></el-table-column>
        </el-table>
        <template #footer>
          <el-button @click="closeOrgDialog">取 消</el-button>
          <el-button type="primary" @click="confirmOrgSelection">确 定</el-button>
        </template>
      </el-dialog>

      <!--    标签选择-->
      <el-dialog
          class="dialog-style"
          title="选择人员"
          v-model="dialogVisibleFlag"
          @close="closeFlagDialog"
          :draggable="true"
      >
        <el-input
            v-model="filterKeywordFlag"
            placeholder="请输入关键字进行筛选"
            style="margin-bottom: 10px;"
        ></el-input>
        <el-table
            :data="filteredFlag"
            stripe
            :row-key="getRowKeyFlag"
            @selection-change="handleSelectionChangeFlag"
            style="max-height: 400px; overflow-y: auto;"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="personId" label="人员编号"></el-table-column>
          <el-table-column prop="personName" label="人员名称"></el-table-column>
          <el-table-column prop="personBelong" label="人员所属"></el-table-column>
        </el-table>
        <template #footer>
          <el-button @click="closeFlagDialog">取 消</el-button>
          <el-button type="primary" @click="confirmFlagSelection">确 定</el-button>
        </template>
      </el-dialog>
    </el-form>
    <div align="center">
      <el-button type="primary" @click="clostConfig()">关闭</el-button>
      <el-button type="primary" @click="editConfig()" v-if="isReadOnly&&!isPub">修改</el-button>
      <el-button type="primary" @click="saveConfig()" v-if="!isReadOnly">保存</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {getPubConfigInfo, getPubObject, savePubConfig} from "@/request";
import {ElMessage} from "element-plus";

export default {
  setup() {
    //人员选择
    let persons = ref([]);
    const selectedPersons = ref([]);
    const selectedPersonsCode = ref([]);
    const dialogVisible = ref(false);
    const openPersonDialog = () => {
      dialogVisible.value = true;
    };
    const closePersonDialog = () => {
      dialogVisible.value = false;
    };
    const handleSelectionChange = (selection) => {
      selectedPersons.value = selection.map((item) => item.personName);
      selectedPersonsCode.value = selection.map((item) => item.personId);
    };
    const confirmPersonSelection = () => {
      const selectedValues = selectedPersons.value.join(', ');
      // 将选中的值进行处理或传递给其他组件
      console.log(selectedPersonsCode.value);
      console.log(selectedValues);

      dialogVisible.value = false;
    };
    const getRowKey = (row) => {
      return row.personId; // 指定每行的唯一标识属性
    };

    //组织选择
    let orgs = ref([]);
    const selectedOrg = ref([]);
    const selectedOrgCode = ref([]);
    const dialogVisibleOrg = ref(false);
    const openOrgDialog = () => {
      dialogVisibleOrg.value = true;
    };
    const closeOrgDialog = () => {
      dialogVisibleOrg.value = false;
    };
    const handleSelectionChangeOrg = (selection) => {
      selectedOrg.value = selection.map((item) => item.personName);
      selectedOrgCode.value = selection.map((item) => item.personId);
    };
    const confirmOrgSelection = () => {
      const selectedValues = selectedOrg.value.join(', ');
      // 将选中的值进行处理或传递给其他组件
      console.log(selectedOrgCode.value);
      console.log(selectedValues);

      dialogVisibleOrg.value = false;
    };
    const getRowKeyOrg = (row) => {
      return row.personId; // 指定每行的唯一标识属性
    };

    //标签选择
    let flags = ref([]);
    const selectedFlag = ref([]);
    const selectedFlagCode = ref([]);
    const dialogVisibleFlag = ref(false);
    const openFlagDialog = () => {
      dialogVisibleFlag.value = true;
    };
    const closeFlagDialog = () => {
      dialogVisibleFlag.value = false;
    };
    const handleSelectionChangeFlag = (selection) => {
      selectedFlag.value = selection.map((item) => item.personName);
      selectedFlagCode.value = selection.map((item) => item.personId);
    };
    const confirmFlagSelection = () => {
      const selectedValues = selectedFlag.value.join(', ');
      // 将选中的值进行处理或传递给其他组件
      console.log(selectedFlagCode.value);
      console.log(selectedValues);

      dialogVisibleFlag.value = false;
    };
    const getRowKeyFlag = (row) => {
      return row.personId; // 指定每行的唯一标识属性
    };

    return {
      persons,
      selectedPersons,
      selectedPersonsCode,
      dialogVisible,
      openPersonDialog,
      closePersonDialog,
      handleSelectionChange,
      confirmPersonSelection,
      getRowKey,

      orgs,
      selectedOrg,
      selectedOrgCode,
      dialogVisibleOrg,
      openOrgDialog,
      closeOrgDialog,
      handleSelectionChangeOrg,
      confirmOrgSelection,
      getRowKeyOrg,

      flags,
      selectedFlag,
      selectedFlagCode,
      dialogVisibleFlag,
      openFlagDialog,
      closeFlagDialog,
      handleSelectionChangeFlag,
      confirmFlagSelection,
      getRowKeyFlag,
    };
  },

  data() {
    return {
      cType: '',
      iTypeId: 0,
      form: {
        tableType: '',
        startDate: null,
        endDate: null,
        reviewEnabled: false,
        orgEnabled: false,
        publisherName: '',
      },
      disableInput: true, // 设置输入框是否禁用
      isPub: false,//是否发布

      filterKeyword: '',
      filterKeywordOrg: '',
      filterKeywordFlag: '',

      isReadOnly: true,// view
    };
  },
  mounted() {
    this.cType = this.$route.query.cType;
    this.iTypeId = this.$route.query.iTypeId;
    if (this.cType == 'CollectInfo') {
      this.form.tableType = '信息收集';
    }
    this.getPubObject();// 获取发布对象数据
    this.getConfigInfo();// 获取初始化数据
  },
  methods: {
    // 获取发布对象数据
    async getPubObject(){
      const result = await getPubObject();
      this.persons = result.code==0?result.data.persons:ref([]);
      this.orgs = result.code==0?result.data.persons:ref([]);
      this.flags = result.code==0?result.data.persons:ref([]);
    },
    async getConfigInfo(){
      const requestData = {
        type: this.cType,
        iTypeId: this.iTypeId,
      };
      const result = await getPubConfigInfo(requestData);
      if (result.data.pubConfig!=null) {
        const pubConfig = result.data.pubConfig;
        this.form.startDate = pubConfig.dPubStartTime;
        this.form.endDate = pubConfig.dPubEndTime;
        this.form.reviewEnabled = pubConfig.cIsApproval;
        this.form.orgEnabled = pubConfig.cIsOrgManger;
        this.form.publisherName = pubConfig.cPuber;
        this.selectedPersons = (pubConfig.cPubToPerson==null||pubConfig.cPubToPerson=='')?[]:pubConfig.cPubToPerson;
        this.selectedOrg = (pubConfig.cPubToOrg==null||pubConfig.cPubToOrg=='')?[]:pubConfig.cPubToOrg;
        this.selectedFlag = (pubConfig.cPubToFlag==null||pubConfig.cPubToFlag=='')?[]:pubConfig.cPubToFlag;
        this.selectedPersonsCode = (pubConfig.cPubToPersonCode==null||pubConfig.cPubToPersonCode=='')?[]:pubConfig.cPubToPersonCode;
        this.selectedOrgCode = (pubConfig.cPubToOrgCode==null||pubConfig.cPubToOrgCode=='')?[]:pubConfig.cPubToOrgCode;
        this.selectedFlagCode = (pubConfig.cPubToFlagCode==null||pubConfig.cPubToFlagCode=='')?[]:pubConfig.cPubToFlagCode;
        this.isPub = pubConfig.infoState == '发布';
      }
    },
    clostConfig(){
      this.$router.go(-1);
    },
    editConfig() {
      this.isReadOnly = false;
    },
    async saveConfig() {
      const requestData = {
        iTypeId: this.iTypeId,
        cType: this.cType,
        dPubStartTime: this.form.startDate,
        dPubEndTime: this.form.endDate,
        cIsApproval: this.form.reviewEnabled,
        cIsOrgManger:this.form.orgEnabled,
        cPuber: this.form.publisherName,
        cPubToPerson: this.selectedPersons==null||this.selectedPersons.length==0 ? '':this.selectedPersons.join(', '),
        cPubToOrg: this.selectedOrg==null||this.selectedOrg.length==0 ? '':this.selectedOrg.join(', '),
        cPubToFlag: this.selectedFlag==null||this.selectedFlag.length==0 ? '':this.selectedFlag.join(', '),
        cPubToPersonCode: this.selectedPersonsCode==null||this.selectedPersonsCode.length==0 ? '':this.selectedPersonsCode.join(', '),
        cPubToOrgCode: this.selectedOrgCode==null||this.selectedOrgCode.length==0 ? '':this.selectedOrgCode.join(', '),
        cPubToFlagCode: this.selectedFlagCode==null||this.selectedFlagCode.length==0 ? '':this.selectedFlagCode.join(', '),

      };
      const result = await savePubConfig(requestData);
      if (result.code=='0') {
        ElMessage.success(result.data.message);
        this.isReadOnly = true;
      } else {
        ElMessage.warning(result.message);
      }
    },
  },
  computed: {
    filteredPersons() {
      if (!this.filterKeyword) {
        return this.persons;
      }
      const keyword = this.filterKeyword.toLowerCase();
      return this.persons.filter(
          (person) =>
              String(person.personId).toLowerCase().includes(keyword) ||
              person.personName.toLowerCase().includes(keyword) ||
              person.personBelong.toLowerCase().includes(keyword)
      );
    },
    filteredOrg() {
      if (!this.filterKeywordOrg) {
        return this.orgs;
      }
      const keyword = this.filterKeywordOrg.toLowerCase();
      return this.orgs.filter(
          (person) =>
              String(person.personId).toLowerCase().includes(keyword) ||
              person.personName.toLowerCase().includes(keyword) ||
              person.personBelong.toLowerCase().includes(keyword)
      );
    },
    filteredFlag() {
      if (!this.filterKeywordFlag) {
        return this.flags;
      }
      const keyword = this.filterKeywordFlag.toLowerCase();
      return this.flags.filter(
          (person) =>
              String(person.personId).toLowerCase().includes(keyword) ||
              person.personName.toLowerCase().includes(keyword) ||
              person.personBelong.toLowerCase().includes(keyword)
      );
    },
  },
};


// el-table bug修复
const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 200);
    super(callback);
  }
}
</script>

<style>
.dialog-style {
  border-radius: 6px;
  width: 50%;
  margin-top: 20px;
}

.pubConfig-style {
  width: 70%;
  margin-left: 15%;
  margin-top: 20px;
  font-family: Kaiti, serif;
}

.el-dialog .el-table,
.el-dialog .el-table th,
.el-dialog .el-table td {
  font-size: 16px;
}

.span-style {
  padding-right: 10px;
}
</style>