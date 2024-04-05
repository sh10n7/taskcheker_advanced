
import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue';
import Home from '../components/Home.vue';
import MyPage from '../components/MyPage.vue';
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth';

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

function getCurrentUser(auth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser(auth);

  
  // ユーザーがログインしていない場合、
  // ログインページ('/')とサインアップページ('/signup')以外にはアクセスさせない
  if (!currentUser && to.path !== '/' && to.path !== '/signup') {
    next('/');
  }
  // ユーザーがログインしている場合、
  // ログインページ('/')とサインアップページ('/signup')にはアクセスさせない
  else if (currentUser && (to.path === '/' || to.path === '/signup')) {
    // ここで '/home' はリダイレクト先のパスに置き換えてください
    // ログインしているユーザーをホームページなど、適切なパスにリダイレクト
    next('/home');
  } else {
    // それ以外の場合は、通常通りのページ遷移を許可
    next();
  }
});


export default router;