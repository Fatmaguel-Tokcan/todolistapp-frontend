<template>
  <div>
    <input v-model="searchQuery" type="text" placeholder="Search">
    <button @click="searchTodos">Search</button>

    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        {{ todo.aufgabentitel }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchTodo',
  data() {
    return {
      searchQuery: '',
      todos: [],
      filteredTodos: []
    };
  },
  created() {
    this.loadTodos();
  },
  methods: {
    searchTodos() {
      this.filteredTodos = this.todos.filter(todo =>
        todo.aufgabentitel.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log('Filtered Todos:', this.filteredTodos); // Konsolenausgabe für Debugging
    },
    loadTodos() {
      axios.get('/api/v1/todolist')
        .then(response => {
          this.todos = response.data;
          this.filteredTodos = response.data; // Hier Änderung: Verwende response.data für die initialen gefilterten Todos
          console.log('Todos:', this.todos); // Konsolenausgabe für Debugging
        })
        .catch(error => {
          console.error('Fehler beim Laden der Todos:', error);
        });
    }
  }
};
</script>

