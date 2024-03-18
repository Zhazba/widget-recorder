import { createApp } from 'vue'
import './style.css';
import App from './App.vue';
import routes from './routes';
import { createWebHistory, createRouter } from 'vue-router';



const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes
});


app.use(router);
app.mount('#app')