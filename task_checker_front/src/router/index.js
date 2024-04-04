
import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue';
import Home from '../components/Home.vue';
import MyPage from '../components/MyPage.vue';
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // ログインしていないユーザーを対象にする
  if (!auth.currentUser) {
    // ホームページ(/)やサインアップページアクセスしようとしている場合は、そのまま進む
    if (to.path === '/' || to.path === '/signup') {
      next();
    } else {
      // 上記以外のページにアクセスしようとした場合は、ログインページにリダイレクトする
      next('/');
    }
  } else {
    // ユーザーがログインしている場合は、どのページにもアクセスできる
    next();
  }
});

export default router;