import { defineStore } from 'pinia'
import api from '../api/axios'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([]);
  const filteredTasks = ref([]);
  const selectedTask = ref(null);

  async function fetchAllTasks () {
    try{
      const response = await api.get('/tasks')
      tasks.value = response.data;

      // 読み込み時に、this.filteredTasksも全タスクを取得しておく。
      // この記述をすることでフィルタがかかっていない状態で全タスクを選択できる。
      filteredTasks.value = tasks.value;
    }catch(error){
      console.log('タスクデータの取得ができませんでした', error);
    }
  }

  // ジャンルデータ変更に伴うタスクのフィルタリング
  async function filterTasks(genreId) {
    //取得したselectedGenreIdとtaskのidが同一だったらtasks.valueのデータを更新
    if(!genreId) {
      filteredTasks.value = [...tasks.value];
    } else {
      filteredTasks.value = tasks.value.filter(task => genreId === task.genreId)
    }
  }

  async function addTask(newTask) {
    try{
      const response = await api.post('/tasks', newTask)
      const addedTask = response.data;
      tasks.value.push(addedTask)
    }catch(error){
      console.log('タスクデータの保存ができませんでした', error);
    }
  }

  async function updateTask(updateTask) {
    try{
      const response = await api.put(`/tasks/${updateTask.id}`, updateTask)
      const index = this.tasks.findIndex(t => t.id === updateTask.id);
      if (index !== -1) {
        this.tasks[index] = response.data;
      }
    }catch(error){
      console.log('タスクの更新に失敗しました', error);
    }
  }

  // タスクの削除
  async function removeTask(deleteTask) {
    try{
      const response = await api.delete(`/tasks/${deleteTask.id}`, deleteTask); 
      const index = this.tasks.findIndex(t => t.id === response.data.id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
      //this.tasksの配列から特定のデータを削除する
    } catch(error) {
      console.log('タスクの削除に失敗しました。', error)
    }
  }

  // ステータスの更新
  async function updateTaskStatus(taskId, newStatus){
    try{
      // taskのステータス更新のリクエストを送る
      await api.put(`/tasks/${taskId}/status`, {newStatus: newStatus})

      //更新したステータスを該当タスクのステータスに紐付けする
      const index = this.tasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        this.tasks[index].status = newStatus
      }
    }catch(error){
      console.log("ステータスの更新に失敗しました", error)
    }
  }

  return { tasks, filteredTasks, fetchAllTasks, filterTasks, addTask, updateTask, removeTask, updateTaskStatus }
})
 