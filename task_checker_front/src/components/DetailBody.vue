<script setup>
import { ref, computed } from 'vue'
import FormModal from './FormModal.vue'

const props = defineProps({
  task: Object
})

const formattedDeadlineDate = computed(() => {
  const date = new Date(props.task.deadlineDate)
  return date.toLocaleDateString('ja-JP')
})

const closeModal = () => {
  showModal.value = false;
}

const showModal = ref(false)
</script>

<template>
  <div class="detail_body">
    <div class="detail_header">
      <h2>{{ props.task.name }}</h2>
      <div class="buttons">
        <span class="btn edit" @click="showModal = true">編集</span>
        <span class="btn">削除</span>
      </div>
    </div>
    <div class="detail_contents">
      <p class="detail_title">詳細</p>
      <div class="task_detail">{{ props.task.explanation}}</div>

      <p class="detail_title">期限</p>
      <div>{{ formattedDeadlineDate }}</div>
    </div>
    <FormModal v-model="showModal" body="taskBody" :task="props.task" @close-modal="closeModal"/>
  </div>
  
</template>

<style scoped>
.detail_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 8px 20px;
  background-color: rgb(66, 163, 247);
  border-radius: 25px;
  color: white;
}

.edit {
  margin-right: 8px;
}

.detail_contents {
  text-align: left;
}

.detail_title {
  text-align: left;
  font-weight: bold;
  margin: 8px 0;
}

.task_detail {
  border: none;
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 16px;
  height: 40px;
}

</style>