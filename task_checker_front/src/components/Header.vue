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
      <span class="header-title">Task Checker</span>
    </div>
    <button v-if="currentUser" @click="handleSignOut">ログアウト</button>
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

.header_title {
  font-size: 25px;
  color: rgb(70, 70, 70);
  font-weight: bold;
  margin-left: 10px;
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
</style>
