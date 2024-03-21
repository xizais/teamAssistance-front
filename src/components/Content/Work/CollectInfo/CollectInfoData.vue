<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <el-button @click="goBack">
      <el-icon><ArrowLeftBold /></el-icon>
    </el-button>
    <span class="title">{{cIFTitle}}数据展示</span>
    <el-dropdown split-button >
      操作
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="OneClickNotify()">一键提醒</el-dropdown-item>
          <el-dropdown-item @click="StopPublish()" v-if="isPub">停止发布</el-dropdown-item>
          <el-dropdown-item @click="ResumePublish()" v-if="!isPub">继续发布</el-dropdown-item>
          <el-dropdown-item @click="openPersonDialog()">新增人员</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div class="content">
    <div style="height: 40px;">
      <div class="text-container">
        <span class="text-item">总数：{{dataCount.allMount}}</span>
        <span class="text-item">未完成：{{dataCount.toDoMount}}</span>
        <span class="text-item">待审批：{{dataCount.toDoApprovalMount}}</span>
        <span class="text-item">已完成：{{dataCount.DoneMount}}</span>
      </div>
    </div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="学号" prop="code" />
      <el-table-column label="姓名" prop="name"/>
      <el-table-column label="所属" prop="org" />
      <el-table-column label="状态" prop="state" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" @input="handleSearch" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="ClickNotify(scope.$index, scope.row)" v-show="tableData[scope.$index].state==='未完成'"
          >提醒</el-button>
          <el-button size="small" @click="ViewData(scope.$index, scope.row)" v-show="tableData[scope.$index].state==='已完成'"
          >查看</el-button>
          <el-button size="small" @click="ApprovalData(scope.$index, scope.row)" v-show="tableData[scope.$index].state==='待审批'"
          >审批</el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {getPubObject} from "@/request";

export default {
  name: "CollectInfoData",
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
    };
  },
  data() {
    return {
      iIFId: 0,
      cIFTitle: '',
      state: null,

      // 操作权限:是否发布
      isPub: true,

      dataCount: {
        allMount: 0,
        toDoMount: 0,
        toDoApprovalMount: 0,
        DoneMount: 0
      },

      filterKeyword: '',// 新增人员搜索框过滤
      search: '', // 搜索关键字
      tableData: [
        {
          code: '201549221',
          name: '黄晓斌',
          org: '20软工二班',
          state: '未完成',
        },
        {
          code: '201549122',
          name: '谢玄',
          org: '20软工一班',
          state: '未完成',
        },
        {
          code: '201549223',
          name: '莉亚',
          org: '20软工二班',
          state: '待审批',
        },
        {
          code: '201549224',
          name: '赵恒',
          org: '20软工二班',
          state: '待审批',
        },
        {
          code: '201549225',
          name: '王五',
          org: '20软工二班',
          state: '已完成',
        },
        {
          code: '201549126',
          name: '李四',
          org: '20软工一班',
          state: '已完成',
        },
        {
          code: '201549127',
          name: '张三',
          org: '20软工一班',
          state: '已完成',
        },
      ],

    };
  },
  computed: {
    filterTableData() {
      return this.tableData.filter((data) => {
        return !this.search
            || data.name?.toLowerCase().includes(this.search.toLowerCase())
            || data.code?.toLowerCase().includes(this.search.toLowerCase())
            || data.org?.toLowerCase().includes(this.search.toLowerCase())
            || data.state?.toLowerCase().includes(this.search.toLowerCase())
            ;
      });
    },
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
  },
  async mounted() {
    this.iIFId = this.$route.query.iIFId;
    this.cIFTitle = this.$route.query.cIFTitle;
    this.calculateDataCount(this.tableData);
    const result = await getPubObject();
    this.persons = result.code==0?result.data.persons:ref([]);
  },
  watch: {
    tableData: {
      handler(newData) {
        this.calculateDataCount(newData);
      },
      deep: true
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    OneClickNotify() {

    },
    ImportInfo() {

    },
    StopPublish() {

    },
    ResumePublish() {

    },
    DownTemplate() {

    },
    chat() {
      ElMessage.success("ok");
    },
    handleEdit() {

    },
    handleDelete() {

    },
    // 计算总数
    calculateDataCount(data) {
      const allMount = data.length;
      const toDoMount = data.filter(item => item.state === '未完成').length;
      const toDoApprovalMount = data.filter(item => item.state === '待审批').length;
      const DoneMount = data.filter(item => item.state === '已完成').length;

      this.dataCount = {
        allMount,
        toDoMount,
        toDoApprovalMount,
        DoneMount
      };
    }
  },
}

</script>

<style scoped>

.navbar {
  margin: 0;
  display: flex;
  background-color: #dde9fc;
  padding: 10px;
  border-radius: 6px;
}

.title {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.content {
  border-radius: 4px;
  border: 1px solid #cacbb9;
  width: 100%;
  height: 1000px;
  background-color: #fdfdf9;
}

.text-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 0 20%;
  box-sizing: border-box;
}

.text-item {
  font-family: "楷体", "KaiTi", cursive;
  font-size: 16px;
}
</style>