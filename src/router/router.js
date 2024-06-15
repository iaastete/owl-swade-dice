import { createWebHistory, createRouter } from "vue-router"
import Home from '../pages/Home.vue'
import Results from '../pages/Results.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/results',
        name: 'results',
        component: Results,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;