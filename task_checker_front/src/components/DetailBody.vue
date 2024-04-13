<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useUserStore } from '../stores/userStore';
import { useCommentStore } from '../stores/commentStore';
import FormModal from './FormModal.vue'
import DeleteIcon from 'vue-material-design-icons/DeleteCircle.vue'

const props = defineProps({
  task: Object
})

const taskStore = useTaskStore();
const userStore = useUserStore();
const commentStore = useCommentStore();
const showModal = ref(false);
const comment = ref({});

const formattedDeadlineDate = computed(() => {
  const date = new Date(props.task.deadlineDate)
  return date.toLocaleDateString('ja-JP')
})

const formattedUserName = computed(()=> {
  //担当者のuidを取得する
  const assigneeId = props.task.assigneeId;
  
  //userStoreから全ユーザー情報を取得し、findメソッドでuidとassigneeIdが同一のユーザーを探す
  const assignee = userStore.users.find(u => u.uid === assigneeId);

  // 該当のユーザーがいれば表示名を戻り値として返し、いない場合は不明なユーザーとして表示させる
  return assignee ? assignee.displayName : '不明なユーザー';
})


const closeModal = () => {
  showModal.value = false;
}

const deleteTask = async() => {
  try{
    await taskStore.removeTask(props.task);
  }catch(error){
    console.log('タスクの削除ができませんでした', error);
  }
}

const addComment = async(task) => {
  comment.value.taskId = task.id
  try{
    await commentStore.addComment(comment.value);
    comment.value = {};
  }catch(error){
    console.log('コメントの保存ができませんでした', error);
  }
}

const deleteComment = async(task) => {
  try{
    await taskStore.removeComment()
  }catch(error){
    console.log('コメントの削除ができませんでした', error);
  }
}

</script>

<template>
  <div class="detail_body">
    <div class="detail_header">
      <h2>{{ props.task.name }}</h2>
      <div class="buttons">
        <span class="btn edit" @click="showModal = true">編集</span>
        <span class="btn" @click="deleteTask">削除</span>
      </div>
    </div>
    <div class="detail_contents">
      <p class="detail_title">詳細</p>
      <div class="task_detail">{{ props.task.explanation}}</div>

      <p class="detail_title">期限</p>
      <div>{{ formattedDeadlineDate }}</div>

      <p class="detail_title">担当者</p>
      <div>{{ formattedUserName }}</div>
    </div>
    <div class="comment_area">
      <h3>コメント一覧</h3>
      <form class="comment_form">
        <input type="text" class="comment_input" placeholder="コメント" v-model="comment.content">
        <button class="add_btn" @click.prevent="addComment(props.task)">投稿</button>
      </form>
      <ul>
        <li class="comment">
          <p class="comment_content">内容</p>
          <DeleteIcon class="delete_btn"/>
          <!-- <button class="delete_btn" @click="deleteComment(props.task)">削除</button> -->
        </li>
      </ul>
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

ul,li {
  padding: 0;
}

.comment_form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment_input {
  width: 320px;
}
.add_btn {
  margin: 0;
}
.comment {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}

.comment_content,
.delete_btn {
  margin: 8px 8px 0 0;
}

.delete_btn {
  color: #a9a9a9;
  font-size: 32px;
}
</style>