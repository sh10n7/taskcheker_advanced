import { defineStore } from 'pinia'
import api from '../api/axios'
import { ref } from 'vue'

export const useCommentStore = defineStore('comment', () => {
  const comments = ref([]);

  async function fetchAllComments () {
    try{
      const response = await api.get('/comments');
      comments.value = response.data;
    }catch(error){
      console.log('コメントの取得ができませんでした', error);
    }
  }

  async function addComment (newComment) {
    try{
      const response = await api.post(`/comment`, newComment);
      const addedComment = response.data;
      comments.value.push(addedComment);
    }catch(error){
      console.log('コメントの保存ができませんでした', error);
    }
  }

  return { comments, addComment, fetchAllComments }
})