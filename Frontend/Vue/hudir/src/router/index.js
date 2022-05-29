import { createRouter, createWebHistory } from 'vue-router';
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Signup from '../components/Signup.vue';
import Post from '../components/Post.vue';
import User from '../components/User.vue';
import NoRoute from '../components/NoRoute.vue';
import Upload from '../components/Upload.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: Post
    },
    {
      path: '/user/:name',
      name: 'user',
      component: User
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/:catchAll(.*)',
      component: NoRoute
    }
  ]
})

export default router;
