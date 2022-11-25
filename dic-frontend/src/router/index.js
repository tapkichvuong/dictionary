import { createWebHistory, createRouter} from "vue-router";

const routes = [
    {
        path:"/",
        name:"home",
        component: () => import("@/views/eng_vie.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path:"/eng/",
        name:"eng_vie",
        component: () => import("@/views/eng_vie.vue"),
    },
    {
        path:"/eng/edit/:id",
        name:"eng.edit",
        component:() => import("@/views/en_vnEdit.vue"),
        props: true
    },
    {
        path:"/eng/add/",
        name:"eng.add",
        component:() => import("@/views/en_vnAdd.vue"),
    },
    {
        path:"/fra/",
        name:"fra_vie",
        component: () => import("@/views/fra_vie.vue"),
    },
    {
        path:"/fra/edit/:id",
        name:"fra.edit",
        component:() => import("@/views/fr_vnEdit.vue"),
        props: true
    },
    {
        path:"/fra/add/",
        name:"fra.add",
        component:() => import("@/views/fr_vnAdd.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;