<script setup>
import Select from './Select.vue'
import FormModal from './FormModal.vue'
import { ref, computed } from 'vue'
import { useTaskStore } from'../stores/taskStore'

const props = defineProps({
  task: Object
})
const showModal = ref(false)
const taskStore = useTaskStore();

const formattedDeadlineDate = computed(() => {
  const date = new Date(props.task.deadlineDate)
  return date.toLocaleDateString('ja-JP')
})

const taskStyle = computed(() => {
  // 現在の日時より deadlineDate が後であるかをチェック
  const isDeadlineAfterToday = new Date(props.task.deadlineDate) > new Date();
  // 条件に基づいてスタイルオブジェクトを返す
  return {
    backgroundColor: isDeadlineAfterToday ? 'white' : 'rgb(250, 194, 194)',
  };
})
const taskStatusElements = [
    "ToDo",
    "Pending",
    "Doing(ToDay)",
    "WIP",
    "Check",
    "Done",
  ]

const changeSelectStatus = async(e) => {
  try{
    const taskId = props.task.id
    const statusId = Number(e.target.value);
    taskStore.updateTaskStatus(taskId, statusId)
  }catch(error){
    console.log('ステータスの更新ができませんでした', error);
  }
}

</script>

<template>
   <div class="task" :style="taskStyle">
    <span class="task_date">{{ formattedDeadlineDate }}</span>
    <div class="task_text_contents" @click="showModal = true">
      <h3 class="task_title">{{ task.name }}</h3>
      <p class="task_sentence">{{ task.explanation}}</p>
    </div>
    <div class="task_input_contents">
      <Select v-model="task.statusId" :taskStatus="taskStatusElements" :value="task.status" @change="changeSelectStatus"/>
    </div>
    <FormModal v-model="showModal" body="DetailBody" :task="task" @close-modal="closeModal"/>
  </div>
</template>

<style>
.task {
  background-color: white;
  max-height: 350px;
  width: 300px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  top: 0;
  transition: top left ease 0.2s;
}

.task:hover {
  top: -2px;
  left: -2px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
}

.task_text_contents {
  padding: 30px 45px 0 20px;
}

.task_title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(70, 70, 70);
  font-size: 15px;
  margin-bottom: 10px;
}

.task_sentence {
  overflow: hidden;
  color: rgb(70, 70, 70);
  font-size: 12px;
  text-align: start;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.task_date {
  position: absolute;
  top: 20px;
  left: 20px;
  color: rgb(133, 133, 133);
  font-size: 11px;
}

.task_input_contents {
  padding: 0 20px 20px 20px;
}

</style>