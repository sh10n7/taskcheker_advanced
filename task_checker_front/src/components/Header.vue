<script setup>
import CheckAll from 'vue-material-design-icons/CheckAll.vue';
import { auth, signOut, onAuthStateChanged } from '../firebase';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const currentUser = ref(null);

const handleSignOut = async() => {
  try{
    await signOut(auth);
    //サインアウトしたら、JWTを破棄する
    localStorage.removeItem('jwt')
    router.push("/")
  }catch(error){
    console.log('ログアウトに失敗しました')
  }
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    // ユーザーがログイン中の場合はuserがtrueを返す
    if(user) {
      currentUser.value = auth.currentUser;
    }else{
      currentUser.value = null;
    }
  })
})

</script>

<template>
  <div class="header">
    <div>
      <CheckAll class="header_icon" fontsize="large" />
      <span class="header-title"><router-link to="/home">Task Checker</router-link></span>
    </div>
    <div class="header-rignt" v-if="currentUser">
      <button @click="handleSignOut">ログアウト</button>
      <button class="mypage-btn"><router-link to="/mypage">マイページ</router-link></button>
    </div>
  </div>
</template>


<style>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  height: 60px;
  background-color: white;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
}

.header_icon {
  color: rgb(170, 1, 1);
}

.header-title {
  /* font-size: 25px; */
  font-weight: bold;
  margin-left: 10px;
}

.header-title a {
  text-decoration: none;
  color: rgb(70, 70, 70);
}

button {
  background-color: rgb(66, 163, 247);
  color: white;
  border-radius: 25px;
  border-style: none;
  padding: 8px 20px;
  margin-bottom: 8px;
  font-size: 15px;
}

.mypage-btn {
  margin-left: 8px;
}

.mypage-btn a {
  text-decoration: none;
  color: white;
}
</style>
