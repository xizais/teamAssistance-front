import { createWebHistory, createRouter } from 'vue-router';
// 首页
import LoginPage from '@/components/Login/LoginPage.vue';
import HomePage from '@/components/Home/HomePage.vue';
// 消息
import MessageHome from "@/components/Content/Message/MessageHome";
// 工作
import CollectInfoHome from "@/components/Content/Work/CollectInfo/CollectInfoHome";
import CollectInfoDesign from "@/components/Content/Work/CollectInfo/CollectInfoDesign";
import CollectInfoShow from "@/components/Content/Work/CollectInfo/CollectInfoShow";
// 组织
import OrgHome from "@/components/Content/Organization/OrgHome";
// 发布配置
import PubConfig from "@/components/Content/Work/PubConfig";
import CollectInfoDataDetails from "@/components/Content/Work/CollectInfo/CollectInfoDataDetails.vue";
import WorkInfoHome from "@/components/Content/Work/WorkInfoHome.vue";

const routes = [
    { path: '/', component: LoginPage },
    {
        path: '/home',
        component: HomePage,
        redirect: '/collectInfoHome', // 默认定向路径
        children: [
            { path: '/workInfoHome', component: WorkInfoHome },
            { path: '/messageHome', component: MessageHome },
            { path: '/collectInfoHome', component: CollectInfoHome },
            { path: '/OrgHome', component: OrgHome },
            // 通知发布
            {
                path: '/noticeHome',
                component: () =>
                    import ('@/components/Content/Work/Notice/MessageHome')
            },
            // 任务发布
            {
                path: '/taskHome',
                component: () =>
                    import ('@/components/Content/Work/Task/TaskHome')
            },
            //聊天
            {
                path: '/talk',
                component: () =>
                    import ('@/components/Content/Message/Talk')
            },
            //场地信息
            {
                path: '/siteInfoHome',
                component: () =>
                    import ('@/components/Content/Work/Site/SiteInfoHome')
            },
        ]
    },
    { path: '/collectInfoDesign', component: CollectInfoDesign },
    { path: '/CollectInfoShow', component: CollectInfoShow },
    { path: '/CollectInfoDataDetails', component: CollectInfoDataDetails },
    { path: '/PubConfig', component: PubConfig },
    //  任务数据
    {
        path: '/taskDataShow',
        component: () =>
            import ('@/components/Content/Work/Task/TaskDataShow.vue')
    },
    // 通知创建
    {
        path: '/noticeInfoDesign',
        component: () =>
            import ('@/components/Content/Work/Notice/MessageInfoDesign')
    },
    // 任务创建
    {
        path: '/taskInfoDesign',
        component: () =>
            import ('@/components/Content/Work/Task/TaskInfoDesign')
    },
    // 信息收集发布、停止数据展示
    {
        path: '/CollectInfoData',
        component: () =>
            import ('@/components/Content/Work/CollectInfo/CollectInfoData')
    },
    //管理场地信息
    {
        path: '/manageSite',
        component: () =>
            import ('@/components/Content/Work/Site/ManageSite')
    },
    //查看预约信息
    {
        path: '/reserveSite',
        component: () =>
            import ('@/components/Content/Work/Site/ReserveSite')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;