<script setup>

const props = defineProps({
  task: Object
})

</script>

<template>
  <div class="detail_body">
    <div class="detail_header">
      <h2>{{ props.task.name }}</h2>
      <div class="buttons">
        <span class="btn edit">編集</span>
        <span class="btn">削除</span>
      </div>
    </div>
    <div class="detail_contents">
      <p class="detail_title">タスク詳細</p>
      <div class="task_detail">詳細</div>

      <p class="detail_title">タスクの締め切り</p>
      <div class="task_detail">締め切り</div>

      <p class="detail_title">ステータス</p>
      <div class="task_detail">ステータス</div>
    </div>
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
}

</style>