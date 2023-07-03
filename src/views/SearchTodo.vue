<template>
  <div>
    <input v-model="searchQuery" type="text" placeholder="Search">
    <button @click="searchToDoListe">Search</button>

    <ul>
      <li v-for="ToDoListe in filteredToDoListe" :key="ToDoListe.id">
        {{ ToDoListe.aufgabentitel }}
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
      ToDoListe: [],
      filteredToDoListe: []
    };
  },
  created() {
    this.loadToDoListe();
  },
  methods: {
    searchToDoListe() {
      this.filteredToDoListe = this.ToDoListe.filter(ToDoListe =>
        ToDoListe.aufgabentitel.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log('Filtered Todos:', this.filteredToDoListe); // Konsolenausgabe für Debugging
    },
    loadToDoListe() {
      axios.get('/api/v1/todolist')
        .then(response => {
          this.ToDoListe = response.data;
          this.filteredToDoListe = response.data; // Hier Änderung: Verwende response.data für die initialen gefilterten Todos
          console.log('Todos:', this.ToDoListe); // Konsolenausgabe für Debugging
        })
        .catch(error => {
          console.error('Fehler beim Laden der Todos:', error);
        });
    }
  }
};
</script>

