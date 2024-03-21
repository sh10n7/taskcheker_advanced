import { defineStore } from 'pinia'
import api from '../api/axios'
import { ref } from 'vue'

export const useGenreStore = defineStore('genre', () => {
  const genres = ref([]);
  
  async function fetchAllGenres () {
    try{
      const response = await api.get('/genres')
      genres.value = response.data;
    }catch(error){
      console.log('タスクデータの取得ができませんでした', error);
    }
  }

  async function addGenre(newGenre){
    try {
      const response = await api.post('/genres', newGenre)
      const addedGenre = response.data
      // 追加したジャンルデータをthis.genresに追加する。
      this.genres.push({
        id: addedGenre.id,
        name: addedGenre.name
      })
    } catch (error) {
      console.log("保存ができませんでした", error);
    }
  }

  return { genres, fetchAllGenres, addGenre }
})