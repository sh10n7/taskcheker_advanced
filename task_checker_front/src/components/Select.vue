<script setup>
import { useGenreStore } from '../stores/genreStore';

const genreStore = useGenreStore();

const props = defineProps({
  taskStatus: Array,
  genres: Array
})

</script>

<template>

  <select v-if="props.taskStatus" class="select">
    <option v-for="(status, index) in props.taskStatus" :key="index" :value=index>{{ status }}</option>
  </select>

  <select v-else-if="genres" class="select">
    <option v-for="genre in props.genres" :key="genre.id" :value=genre.id>{{ genre.name }}</option>
  </select>
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