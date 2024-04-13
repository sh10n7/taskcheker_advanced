<script setup>
import { auth, signInWithEmailAndPassword } from '../firebase';
import Header from './Header.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { Form, Field, defineRule, ErrorMessage } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';

const emailAddress = ref('');
const password = ref('');

const router = useRouter();
const currentUser = ref(null);

// 必須のバリデーション
defineRule('required', (value) => {
  if(!value){
    return `This field is required`
  }
  return true;
});

// emailのバリデーション
defineRule('email', email);

// 最小値のバリデーション
defineRule('min', min);

// 英数字混合
defineRule('checkPassword', (value) => {
  if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)){
    return true;
  }
  return 'password should be in mix of letters and numbers'
})


const handleSignIn = async() => {
  try{
    const credentialUser = await signInWithEmailAndPassword(auth, emailAddress.value, password.value)
    currentUser.value = credentialUser.user;
    // Json Web Tokenの取得
    const token = await credentialUser.user.getIdToken();
    // 取得したtokenをlocalStorageに保存する。
    localStorage.setItem('jwt', token);
    router.push("/home")
  }catch(error){
    console.log('ログインに失敗しました')
  }
}
</script>

<template>
  <Header />
  <Form class="form-body">
      <h1>ログイン</h1>
      <ErrorMessage name="email" class="error-message"/> 
      <Field type="text" id="email" name="email" v-model="emailAddress" placeholder="email" rules="required|email"/>

      <ErrorMessage name="password" class="error-message"/> 
      <Field type="password" id="password" name="password" v-model="password" placeholder="password" autocomplete="current-password" rules="required|min:6|checkPassword"/>
     
      <button value="ログイン" @click.prevent="handleSignIn">ログイン</button>
      <p>アカウント作成がお済みでない場合は<router-link to="/signup">こちら</router-link></p>
  </Form>
</template>

<style scoped>
.form-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  padding: 2vw 10vw;
  text-align: center;
}

input {
  margin-bottom: 16px;
}

button {
  background-color: rgb(66, 163, 247);
  color: white;
  border-radius: 25px;
  border-style: none;
  padding: 8px 20px;
  margin-bottom: 8px;
  font-size: 15px;
  width: 246px;
}

.error-message {
  color: red;
}

</style>