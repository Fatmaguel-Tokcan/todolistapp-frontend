<template>

  <h1></h1>
  <div class="container-fluid">
    <todo-list-table></todo-list-table>
  </div>
</template>

<script>

import TodoListTable from "@/components/TodoListTable";

export default {
  name: "TodoList",


  components: {TodoListTable},
  data() {
    return {
      todolist: []
    }
  }

}

</script>

<style scoped>

</style>
