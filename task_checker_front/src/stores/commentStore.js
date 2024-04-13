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

  // コメントの削除
  async function removeComment(deleteComment) {
    try{
      const response = await api.delete(`/comment/${deleteComment.id}`, deleteComment); 
      const index = comments.value.findIndex(c => c.id === deleteComment.id);
      if (index !== -1) {
        comments.value.splice(index, 1);
      }
    } catch(error) {
      console.log('コメントの削除に失敗しました。', error)
    }
  }

  return { comments, fetchAllComments, addComment, removeComment }
})