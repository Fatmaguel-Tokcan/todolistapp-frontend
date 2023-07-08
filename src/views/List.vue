<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <div class="container py-5 h-100" id="list1">
    <div class="col">
      <div class="mb-3">
        <label for="filterDropdown" class="form-label">Filter:</label>
        <select class="form-select" id="filterDropdown" v-model="filterOption">
          <option value="default">None</option>
          <option value="alphabet">Alphabet</option>
          <option value="urgency">Priorität</option>
          <option value="date">Fälligkeitsdatum</option>
        </select>
      </div>
      <div class="">
        <div class="d-flex justify-content-between mb-3">
          <div>
            <span>Todos insgesamt: {{ ToDoListe.length }}</span>
          </div>
          <div>
            <a href="Search" class="btn btn-outline-primary btn-sm ms-3" role="button">Kalender</a>
            <button type="submit" class="btn btn-outline-danger btn-sm ms-3" v-on:click="deleteAllToDoListe">
              <i class="bi bi-trash3-fill"></i> Alle ToDos löschen
            </button>
          </div>
        </div>
      </div>
      <hr class="my-4">
      <table class="table mb-4">
        <thead class="table-light">
        <tr>
          <th scope="col"><i class="bi bi-justify"></i> Aufgabentitel</th>
          <th scope="col"><i class="bi bi-card-text"></i> Aufgabe</th>
          <th scope="col"><i class="bi bi-calendar4"></i> Fälligkeitsdatum</th>
          <th scope="col"><i class="bi bi-list-ol"></i> Priorität</th>
          <th scope="col"><i class="bi bi-check-all"></i> Erledigt</th>
          <th scope="col"><i class="bi bi-pencil-square"></i> überarbeiten</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="ToDoList in filteredToDoListe" :key="ToDoList.id" :class="{ 'completed-task': ToDoList.erledigt }">
          <td>
            <span v-if="selectedToDoList !== ToDoList.id">{{ ToDoList.aufgabentitel }}</span>
            <form v-else @submit.prevent="updateToDoListe(ToDoList.id)">
              <input v-model="getSelectedToDoList(ToDoList.id).updatedAufgabentitel" />
              <button type="submit" class="btn btn-success square-rounded">Speichern</button>
            </form>
          </td>
          <td>{{ ToDoList.aufgabe }}</td>
          <td>{{ new Date(ToDoList.datum).toLocaleDateString() }}</td>
          <td>
            <div
              v-bind:class="{
        'priority-circle': true,
        'high-priority': ToDoList.dringlichkeit === 'HOCH',
        'medium-priority': ToDoList.dringlichkeit === 'MITTEL',
        'low-priority': ToDoList.dringlichkeit === 'NIEDRIG'
      }"
            >
      <span
        :class="{
          'high-priority-text': ToDoList.dringlichkeit === 'HOCH',
          'medium-priority-text': ToDoList.dringlichkeit === 'MITTEL',
          'low-priority-text': ToDoList.dringlichkeit === 'NIEDRIG'
        }"
      >
        {{ ToDoList.dringlichkeit }}
      </span>
            </div>
          </td>
          <td>
            <input type="checkbox" v-model="ToDoList.erledigt" v-on:click="toggleDone(ToDoList)">
          </td>
          <td>
            <button v-if="selectedToDoList !== ToDoList.id" @click="setSelectedToDoList(ToDoList.id)" class="btn btn-primary me-2">
              <i class="bi bi-pencil-fill" :class="{ 'active': selectedToDoList === ToDoList.id }"></i>
            </button>
            <button @click="deleteToDoListe(ToDoList.id)" class="btn btn-danger me-2">
              <i class="bi bi-x-circle-fill" :class="{ 'active': selectedToDoList === ToDoList.id }"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoListe',
  data() {
    return{
      selectedToDoList: null,
      id: '',
      aufgabentitel: '',
      aufgabe: '',
      date: null,
      dringlichkeit: '',
      erledigt:false,
      updatedAufgabentitel: '',
      ToDoListe: [],
      filterOption: 'default'
    }
  },
  mounted() {
    const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todolist'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => {
        result.forEach(ToDoList => {
          ToDoList.updatedAufgabentitel = '';
          this.ToDoListe.push(ToDoList);
        });
      })
      .catch(error => console.log('error', error))
  },
  computed: {
    filteredToDoListe() {
      if (this.filterOption === 'alphabet') {
        return this.ToDoListe.slice().sort((a, b) => a.aufgabentitel.localeCompare(b.aufgabentitel))
      } else if (this.filterOption === 'urgency') {
        return this.ToDoListe.slice().sort((a, b) => a.dringlichkeit.localeCompare(b.dringlichkeit))
      } else if (this.filterOption === 'date') {
        return this.ToDoListe.slice().sort((a, b) => new Date(a.datum) - new Date(b.datum))
      } else {
        return this.ToDoListe
      }
    }
  },
  methods: {
    toggleDone(id) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL;
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        erledigt: this.erledigt === false // Korrektur: Gleichheitsoperator verwenden
      });

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(endpoint + '/api/v1/todolist/' + id + '/erledigt', requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          document.location.reload();
        })
        .catch(error => console.log('error', error));
    },
    getSelectedToDoList(id) {
      return this.ToDoListe.find(toDoList => toDoList.id === id);
    },

    setSelectedToDoList(id) {
      this.selectedToDoList = id;
      const selectedToDoList = this.ToDoListe.find(toDoList => toDoList.id === id);
      this.aufgabentitel = selectedToDoList.aufgabentitel;
      this.aufgabe = selectedToDoList.aufgabe;
      this.date = selectedToDoList.datum;
      this.dringlichkeit = selectedToDoList.dringlichkeit;
    },
    updateToDoListe(id) {
      const updatedAufgabentitel = this.getSelectedToDoList(id).updatedAufgabentitel;
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL;
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        aufgabentitel: updatedAufgabentitel,
        aufgabe: this.aufgabe,
        datum: this.date,
        dringlichkeit: this.dringlichkeit,
        erledigt: false
      });
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(endpoint + '/api/v1/todolist/' + id, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          document.location.reload();
        })
        .catch(error => console.log('error', error));
      this.selectedToDoList = null;
    },
    deleteToDoListe(id) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL
      const raw = ''

      const requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
      }

      fetch(endpoint + '/api/v1/todolist/' + id, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          document.location.reload()
        })
        .catch(error => console.log('error', error))
    },
    deleteAllToDoListe() {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL
      const raw = ''

      const requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
      }

      fetch(endpoint + '/api/v1/todolist/deleteAll', requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          document.location.reload()
        })
        .catch(error => console.log('error', error))
    }
  }
};
</script>


<style scoped>
#list1 button.btn-primary {
  background-color: #61a1e3;
  color: white;
}

#list1 button.btn-danger {
  background-color: rgba(227, 92, 92, 0.98);
  color: white;
}
#list1 button.btn btn-secondary{
  background-color: #9e82dc;
  color: white;
}
.priority-circle {
  display: inline-block;
  padding: .1rem .5rem; /* Adjust the padding as needed */
  border-radius: 0.4rem; /* Add a border */
}

.priority-circle.high-priority {
  background-color: #fd8888;
}

.priority-circle.medium-priority {
  background-color: #f8e07e;
}

.priority-circle.low-priority {
  background-color: #9aee9a;
}
.completed-task td,
.completed-task .priority-circle {
  text-decoration: line-through;
  color: #b2b2b2;
  text-decoration-thickness: 2px; /* Adjust the thickness as needed */
}
#list1 button.btn-success.square-rounded {
  border-radius: 4px; /* Adjust the border radius as needed */
  background-color: #42b983;
  color: white;
  padding: 0.25rem 0.75rem; /* Adjust the padding as needed */
}
</style>

