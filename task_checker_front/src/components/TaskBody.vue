<script setup>
import Select from './Select.vue'
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useGenreStore } from '../stores/genreStore'
import { useUserStore } from '../stores/userStore'
import { auth } from '../firebase';
import { Form, Field, defineRule, ErrorMessage } from 'vee-validate';
import { required } from '@vee-validate/rules';


const props = defineProps({
  task: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

const taskStore = useTaskStore();
const genreStore = useGenreStore();
const userStore = useUserStore();
const emit = defineEmits(['close-modal'])
const task = ref(props.task);

// 必須のバリデーション
defineRule('required', (value) => {
  if(!value){
    return `This field is required`
  }
  return true;
});

defineRule('checkPulldown', () => {
  if(task.value.genreId) {
    return 'This field must be selected'
  }
  return true
})

const genreSelect = (e) => {
  console.log(e)
  task.value.genreId = Number(e.target.value)
}

const assigneeSelect = (e) => {
  props.task.assigneeId = e.target.value
}

const submitTask = async() => {
  // ログイン中のユーザーuidをtaskオブジェクトに追加
  const user = auth.currentUser;
  props.task.uid = user.uid;
  console.log(props.task)

  if(props.task.id) {
    try{
      taskStore.updateTask(props.task);
      emit('close-modal');
    }catch(error){
      console.log('タスクの更新ができませんでした',error);
    }
  }else{
    try{
      taskStore.addTask(props.task);
      emit('close-modal')
    }catch(error){
      console.log('タスクの追加ができませんでした',error);
    }
  }
}

</script>

<template>
  <Form class="modal_body">
    <h2 class="input_menu">{{ task.id ? 'タスクの編集' : 'タスクの追加'}}</h2>
    <div>
      <h4 class="input_title">ジャンル</h4>
      <div class="task_genre">
        <Select @change="genreSelect" :value="task.genreId" :genres="genreStore.genres"/>
      </div>

      <h4 class="input_title">タイトル</h4>
      <div class="input_area">
        <ErrorMessage name="name" class="error-message"/> 
        <Field type="text" name="name" v-model="task.name" rules="required"/>
      </div>

      <h4 class="input_title">説明</h4>
      <div class="input_area">
        <ErrorMessage name="explanation" class="error-message"/> 
        <Field type="text" name="explanation" v-model="task.explanation" rules="required"/>
      </div>

      <h4 class="input_title">期限</h4>
      <div class="input_area">
        <ErrorMessage name="deadlineDate" class="error-message"/> 
        <Field name="deadlineDate" class="input_date" type="date" v-model="task.deadlineDate" rules="required"/>
      </div>

      <h4 class="input_title">担当者</h4>
        <Select @change="assigneeSelect" :value="task.assigneeId" :assignees="userStore.users"/>
    </div>
    <input class="input_submit" type="button" value="送信" @click="submitTask"/>
  </Form>
</template>

<style>
.modal_body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.genre_title {
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.input_title {
  height: 3px;
}
input,
textarea {
  border: none;
  background-color: #f3f3f3;
  padding: 16px;
  border-radius: 5px;
  width: 230px;
  line-height: 1.5em;
}
.input_submit {
  margin-top: 30px;
  background-color: rgb(66, 163, 247);
  color: white;
  border-radius: 25px;
  border-style: none;
  padding: 16px 40px;
  font-size: 15px;
}

.input_area {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error-message {
color: red;
}
</style>