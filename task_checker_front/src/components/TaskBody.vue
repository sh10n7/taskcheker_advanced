<script setup>
import Select from './Select.vue'
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const props = defineProps({
  task: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

const taskStore = useTaskStore();
const emit = defineEmits(['close-modal'])

const genreSelect = (e) => {
  props.task.genreId = Number(e.target.value)
}

const submitTask = async() => {
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
  <form class="modal_body">
    <h2 class="input_menu">{{ task.id ? 'タスクの編集' : 'タスクの追加'}}</h2>
    <div>
      <h4 class="input_title">ジャンル</h4>
      <div class="task_genre">
        <Select @change="genreSelect" :value="props.task.genreId"/>
      </div>
      <h4 class="input_title">タイトル</h4>
      <input type="text" v-model="props.task.name"/>
      <h4 class="input_title">説明</h4>
      <textarea v-model="props.task.explanation"/>
      <h4 class="input_title">期限</h4>
      <input class="input_date" type="date" v-model="props.task.deadlineDate"/>
    </div>
    <input class="input_submit" type="button" value="送信" @click="submitTask"/>
  </form>
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
</style>