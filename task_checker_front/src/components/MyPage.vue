<script setup>
import Header from './Header.vue'
import {ref,onMounted, computed } from 'vue';
import api from '../api/axios';

const myTasks = ref();

const taskStatusElements = [
    "ToDo",
    "Pending",
    "Doing(ToDay)",
    "WIP",
    "Check",
    "Done",
  ]

onMounted(async()=> {
  try{
    const response = await api.get('/mytasks', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    myTasks.value = response.data;
  }catch(error){
    console.log('データの取得ができませんでした', error);
  }
});

// ここをmethodsの形に変更します
const formattedDeadlineDate = (task) => {
  const date = new Date(task.deadlineDate)
  return date.toLocaleDateString('ja-JP')
}

const showStatus = (status) => {
  const index = status
  return taskStatusElements[status];
}



</script>

<template>
    <Header />
    <h2 class="mypage-title">投稿タスク一覧</h2>
    <div class="tasks" v-for="task in myTasks" :key="task.id">
      <div class="task">
        <span class="task_date">{{ formattedDeadlineDate(task) }}</span>
        <div class="task_text_contents">
          <h3 class="task_title">{{task.name}}</h3>
          <p class="task_sentence">{{task.explanation}}</p>
        </div>
        <div class="task_input_contents">
          {{ showStatus(task.status) }}
        </div>
      </div>
    </div>
</template>

<style scoped>
.tasks {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.task {
  flex: 1;
  min-width: calc(25% - 20px); 
  max-width: calc(25% - 20px); 
}

.mypage-title {
  text-align: center;
}
</style>
