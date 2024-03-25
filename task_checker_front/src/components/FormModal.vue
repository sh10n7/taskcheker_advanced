<script setup>
import { computed } from 'vue'
import GenreBody from './GenreBody.vue'
import TaskBody from './TaskBody.vue'
import DetailBody from './DetailBody.vue'

const props = defineProps({
  body: String,
  task: Object
})

const component = computed(() =>  {
  // return props.body === 'taskBody' ? TaskBody: GenreBody
  if (props.body === 'taskBody') {
    return TaskBody;
  } else if (props.body === 'genreBody') {
    return GenreBody;
  } else if (props.body === 'DetailBody') {
    return DetailBody;
  }
})

const emit = defineEmits('close-modal') 

const closeModal = () => {
  emit('close-modal')
}

</script>

<template>
  <Modal v-model="showModal">
    <component :is="component" @close-modal="closeModal" :task="props.task"/>
  </Modal>
</template>

<style>
.vm {
  height: 75vh;
  padding: 2vw 10vw;
  text-align: center;
}
</style>