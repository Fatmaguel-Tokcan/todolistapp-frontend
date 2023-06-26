<template>
  <h1>Welcome to ToDoLists</h1>
  <table class="table table-bordered">
    <thead>
    <tr>
      <th scope="col">Aufgabentitel</th>
      <th scope="col">Aufgabe</th>
      <th scope="col">Datum</th>
      <th scope="col">Dringlichkeit</th>
      <th scope="col">Erledigt</th>

    </tr>
    </thead>

    <tbody>
    <tr v-for="todoList in todoList" :key="todoList.id">
      <td>{{todoList.aufgabentitel}}</td>
      <td>{{todoList.aufgabe}}</td>
      <td>{{todoList.datum}}</td>
      <td>{{todoList.dringlichkeit ? 'sehr wichtig':'wichtig','nicht wichtig'}}</td>
      <td>{{todoList.erledigt ? 'erledigt':'nicht erledigt'}}</td>


    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'TodoListTable',
  data() {
    return {
      todolist: []
    }
  },
  methods: {
    AddTodoList (todoListLocation) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + todoListLocation
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(todoList => this.todolist.push(todoList))
        .catch(error => console.log('error', error))
    }
  },
  mounted () {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todolist'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(todoList => {
        this.todolist.push(todoList)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>

</style>


