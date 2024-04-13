<script setup>
import { useGenreStore } from '../stores/genreStore';
import { Field, defineRule, ErrorMessage } from 'vee-validate';
import { required} from '@vee-validate/rules';

const genreStore = useGenreStore();

const props = defineProps({
  taskStatus: Array,
  genres: Array,
  assignees: Array,
})


// 必須のバリデーション
defineRule('required', (value) => {
  if(!value){
    return `This field is required`
  }
  return true;
});

// 選択必須のバリデーション
defineRule('selectPullDown', (value) => {
  if(!value){
    return `This field must be selected`
  }
  return true;
});

</script>

<template>
  <!-- タスクステータスの一覧 -->
  <select class="select" v-if="props.taskStatus">
    <option v-for="(status, index) in props.taskStatus" :key="index" :value=index>{{ status }}</option>
  </select>

  <!-- ジャンルの一覧 -->
  <div v-else-if="props.genres" class="input_area">
    <ErrorMessage name="genre" class="error-message"/> 
    <Field name="genre" as="select" class="select" rules="selectPullDown">
      <option v-for="genre in props.genres" :key="genre.id" :value=genre.id>{{ genre.name }}</option>
    </Field>
  </div>

  <!-- 担当者一覧 -->
  <div v-else-if="props.assignees" class="input_area">
    <ErrorMessage name="assignees" class="error-message"/> 
    <Field name="assignees" as="select" class="select" rules="selectPullDown">
      <option v-for="assignee in props.assignees" :key="assignee.id" :value=assignee.uid>{{ assignee.displayName }}</option>
    </Field>
  </div>


  <!-- <select v-if="props.taskStatus" class="select">
    <option v-for="(status, index) in props.taskStatus" :key="index" :value=index>{{ status }}</option>
  </select> -->

  <!-- <select v-else-if="genres" class="select">
    <option value="">---</option>
    <option v-for="genre in props.genres" :key="genre.id" :value=genre.id>{{ genre.name }}</option>
  </select> -->

  <!-- <select v-else-if="assignees" class="select">
    <option value="">---</option>
    <option v-for="assignee in props.assignees" :key="assignee.id" :value=assignee.uid>{{ assignee.displayName }}</option>
  </select> -->
</template>

<style scoped>
.select {
  width: 150px;
  height: 25px;
  font-size: 15px;
  color: rgb(70, 70, 70);
  border: none;
  border-bottom: thin solid #cfcfcf;
  outline: none;
  cursor: pointer;
}
</style>