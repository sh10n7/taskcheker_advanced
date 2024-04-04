<script setup>
import Header from './Header.vue'
import {ref,onMounted } from 'vue';
import api from '../api/axios';

const myTasks = ref();

onMounted(async()=> {
  try{
    const response = await api.get('/mytask', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    myTasks.value = response.data;
  }catch(error){
    console.log('データの取得ができませんでした', error);
  }
});
</script>

<template>
    <Header />
    <h2 class="mypage-title">投稿タスク一覧</h2>
    <div class="tasks">
      <div class="task">
        <span class="task_date">締切</span>
        <div class="task_text_contents">
          <h3 class="task_title">タスク名</h3>
          <p class="task_sentence">タスク説明</p>
        </div>
        <div class="task_input_contents">
          タスクステータス
        </div>
      </div>
      <div class="task">
        <span class="task_date">締切</span>
        <div class="task_text_contents">
          <h3 class="task_title">タスク名</h3>
          <p class="task_sentence">タスク説明</p>
        </div>
        <div class="task_input_contents">
          タスクステータス
        </div>
      </div>
      <div class="task">
        <span class="task_date">締切</span>
        <div class="task_text_contents">
          <h3 class="task_title">タスク名</h3>
          <p class="task_sentence">タスク説明</p>
        </div>
        <div class="task_input_contents">
          タスクステータス
        </div>
      </div>
      <div class="task">
        <span class="task_date">締切</span>
        <div class="task_text_contents">
          <h3 class="task_title">タスク名</h3>
          <p class="task_sentence">タスク説明</p>
        </div>
        <div class="task_input_contents">
          タスクステータス
        </div>
      </div>
      <div class="task">
        <span class="task_date">締切</span>
        <div class="task_text_contents">
          <h3 class="task_title">タスク名</h3>
          <p class="task_sentence">タスク説明</p>
        </div>
        <div class="task_input_contents">
          タスクステータス
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
