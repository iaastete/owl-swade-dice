import { createWebHistory, createRouter } from "vue-router"
import Home from '../pages/Home.vue'
import Results from '../pages/Results.vue'
import Modal from '../pages/Modal.vue'

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
    },
    {
        path: '/modal',
        name: 'modal',
        component: Modal,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;