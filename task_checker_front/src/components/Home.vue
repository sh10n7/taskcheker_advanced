<script setup>
import Header from './Header.vue'
import Select from './Select.vue'
import ToDoList from './ToDoList.vue'
import FormModal from './FormModal.vue'
import AddCircleIcon from 'vue-material-design-icons/PlusCircleOutline.vue'
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useGenreStore } from '../stores/genreStore'
import { auth } from '../firebase'

const showModal = ref(false);
const taskStore = useTaskStore();
const genreStore = useGenreStore();
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
    await taskStore.fetchAllTasks();
  }catch(error){
    console.log(error)
  }

  try {
    await genreStore.fetchAllGenres();
  }catch(error){
    console.log(error)
  }
})

const changeSelectedGenreId = (e) => {
  const selectGenreId = Number(e.target.value);
  taskStore.filterTasks(selectGenreId);
}

const filterTasksByStatus = (statusIndex) => {
  //statusで受け取った値がtaskStatusの配列の何番目の数値か調べる。
  const index = statusIndex
  //indexとtask.statusの値が同じ場合のみデータ取得する。
  return taskStore.filteredTasks.filter(task => task.status == index);
}

const currentUser = auth.currentUser;
const displayName = computed(()=>{
  return currentUser.displayName;
})

</script>

<template>
  <div class="main">
    <Header />
    <p class="user_name">こんにちは{{ displayName }}さん</p>
    <div class="genre">
      <Select @change="changeSelectedGenreId" :genres="genreStore.genres"/>
      <AddCircleIcon class="add_circle_outline_icon" @click="showModal = true"/>
      <FormModal v-model="showModal" body="genreBody"/>
    </div>
    <div class="contents">
      <div v-for="(status, index) in taskStatusElements" :key="index">
        <ToDoList :tasks="filterTasksByStatus(index)" :status="status"/>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  width: 100vw;
  height: 100vh;
  background-color: #f6f8f9;
}

.user_name {
  margin: 30px 30px 0 30px;
}

.genre {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding-top: 20px;
}

.add_circle_outline_icon {
  margin-left: 10px;
  color: rgb(70, 70, 70);
}

.contents {
  display: flex;
  height: calc(100vh - 120px);
  width: 100%;
  overflow: auto;
}
</style>
