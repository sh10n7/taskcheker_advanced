import { defineStore } from 'pinia'
import api from '../api/axios'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([]);

  async function fetchAllUsers () {
    try{
      const response = await api.get('/users')
      users.value = response.data;
    }catch(error){
      console.log('タスクデータの取得ができませんでした', error);
    }
  }

  return { users, fetchAllUsers }
})