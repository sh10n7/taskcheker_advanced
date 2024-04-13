<script setup>
import Header from './Header.vue'
import { ref } from 'vue'
import { auth, createUserWithEmailAndPassword } from '../firebase';
import { useRouter } from 'vue-router';
import { updateProfile } from 'firebase/auth';
import { Form, Field } from 'vee-validate';

const email = ref('');
const password = ref('');
const nickname = ref('');
const currentUser = ref('');
const router = useRouter();

const handleSignUp = async() => {
  // 入力されたemail, passwordを元にユーザー登録をする
  try {
    const credentialUser = await createUserWithEmailAndPassword(auth, email.value, password.value);

    // 登録したユーザー情報を取得する
    const user = credentialUser.user;
    // ユーザーデータ内のnicknameの値をdisplayNameの値として保持する
    await updateProfile(user, {
      displayName: nickname.value
    });
    router.push("/home");
  }catch(error) {
    console.log('ユーザー登録できませんでした', error)
  }
}

</script>

<template>
  <Header />
    <Form class="form-body">
      <h1>新規登録</h1>
      <Field type="text" id="email" name="email" v-model="email" placeholder="email" /> 
      <Field type="password" id="password" name="password" v-model="password" placeholder="password" />
      <Field type="text" id="nickname" name="nickname" v-model="nickname" placeholder="nickname" />
      <button value="新規登録" @click="handleSignUp">新規登録</button>
      <p>既にアカウントをお持ちの方はこちらへ<router-link to="/">こちら</router-link></p>
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

</style>