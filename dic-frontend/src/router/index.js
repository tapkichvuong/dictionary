import { createWebHistory, createRouter} from "vue-router";

const routes = [
    {
        path:"/",
        name:"eng_vie",
        component: () => import("@/views/eng_vie.vue"),
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path:"/eng/:id",
        name:"word.edit",
        component:()=>import("@/views/wordEdit.vue"),
        props: true
    },
    {
        path:"/eng/",
        name:"word.add",
        component:()=>import("@/views/wordAdd.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;