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

const routes = [
    { path: '/', component: LoginPage },
    {
        path: '/home',
        component: HomePage ,
        redirect:'/collectInfoHome',// 默认定向路径
        children:[
            { path: '/messageHome', component: MessageHome },
            { path: '/collectInfoHome', component: CollectInfoHome },
            { path: '/OrgHome', component: OrgHome },
        ]
    },
    { path: '/collectInfoDesign', component: CollectInfoDesign },
    { path: '/CollectInfoShow', component: CollectInfoShow },
    { path: '/PubConfig', component: PubConfig },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;