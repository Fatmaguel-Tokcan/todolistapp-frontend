<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <div class="container py-5 h-100" id="list1">
    <div class="col">
      <div class="mb-3">
        <label htmlFor="exampleFormControlInput1" class="form-label" style="color :#6b8de7" >Aufgabentitel</label>
        <input type="text" class="form-control" v-model="aufgabentitel" required>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleFormControlTextarea1" class="form-label" style="color :#6b8de7">Aufgabe</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" v-model="aufgabe" rows="3" required></textarea>
      </div>
      <div class="mb-3">
        <label htmlFor="exampleFormControlTextarea1" class="form-label" style="color :#6b8de7">Fälligkeitsdatum</label>
        <label htmlFor="formDate"></label>
        <input type="date" class="form-control" v-model="date" required>
      </div>
    <div class="mb-3">
      <label htmlFor="dringlichkeit" class="form-label" style="color :#6b8de7">Priorität</label>
      <select class="form-select form-select-sm" id="exampleFormControlTextarea2" v-model="dringlichkeit" required>
        <option value="" selected disabled>Wählen Sie bitte</option>
        <option value="HOCH">hoch</option>
        <option value="MITTEL">mittel</option>
        <option value="NIEDRIG">niedrig</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary px-2 mx-2" style="background-color: #6b8de7; color :#fffefe " v-on:click="createToDoListe">Hinzufügen</button>
  </div>
  </div>
  <div class="col-md-8 offset-md-2">
  </div>
  <section class="vh-100">
    <div class="container py-5 h-30" id="list1">
      <div class="col">
        <div class="">
          <div class="d-flex justify-content-between mb-3">
            <div>
              <span>Todos insgesamt: {{ ToDoListe.length }}</span>
            </div>
            <div>
              <a href="List" class="btn btn-outline-primary btn-sm ms-3" role="button">Bereits vorhandene To-Dos</a>
              <button type="submit" class="btn btn-outline-danger btn-sm ms-3" v-on:click="deleteAllToDoListe">
                <i class="bi bi-trash3-fill"></i> Alle ToDos löschen
              </button>
            </div>
          </div>
        </div>
        <table class="table mb-4">
          <thead class="table-light">
          <tr>
            <th scope="col"><i class="bi bi-justify"></i> Aufgabentitel</th>
            <th scope="col"><i class="bi bi-card-text"></i> Aufgabe</th>
            <th scope="col"><i class="bi bi-calendar4"></i> Fälligkeitsdatum</th>
            <th scope="col"><i class="bi bi-list-ol"></i> Priorität</th>
            <th scope="col"><i class="bi bi-pencil-square"></i> überarbeiten</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="ToDoList in ToDoListe" :key="ToDoList.id">
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
              <button v-if="selectedToDoList !== ToDoList.id" @click="setSelectedToDoList(ToDoList.id)" class="btn btn-primary me-2">
                <i class="bi bi-pencil-fill" :class="{ 'active': selectedToDoList === ToDoList.id }"></i>
              </button>
              <button @click="deleteToDoListe(ToDoList.id)" class="btn btn-danger ml-5">
                <i class="bi bi-x-circle-fill" :class="{ 'active': selectedToDoList === ToDoList.id }"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
  </div>
  </section>
</template>

<script>

export default {
  name: 'CreateList',

  data() {
    return {
      selectedToDoList: null,
      id: '',
      aufgabentitel: '',
      aufgabe: '',
      date: null,
      dringlichkeit: '',
      erledigt:false,
      updatedAufgabentitel: '',
      ToDoListe: []
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
          // Initialisiere das updatedAufgabentitel-Feld für jedes
          ToDoList.updatedAufgabentitel = '';
          this.ToDoListe.push(ToDoList);
        });
      })
      .catch(error => console.log('error', error))
  },
  methods: {
    createToDoListe() {
      if (this.aufgabentitel === '' || this.aufgabe === '' || this.dringlichkeit === '') {
        alert('Die Felder "Aufgabentitel", "Aufgabenbeschreibung" und "Priorität" dürfen nicht leer sein.')
      } else {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todolist'
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const raw = JSON.stringify({
          aufgabentitel: this.aufgabentitel,
          aufgabe: this.aufgabe,
          datum: this.date,
          dringlichkeit: this.dringlichkeit,
          erledigt: false // Setze erledigt auf false
        })

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        }

        fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(async result => {
            console.log(result);
            if (window && window.location && window.location.reload) {
              window.location.reload();
            }
          })
          .catch(error => console.log('error', error))
      }
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
        .then(async result => {
          console.log(result)
          document.location.reload()
        })
        .catch(error => console.log('error', error))
    },
    toggleDone(ToDoList) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({
        erledigt: !ToDoList.erledigt
      })

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch(endpoint + '/api/v1/todolist/' + ToDoList.id + '/erledigt', requestOptions)
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
        .then(async result => {
          console.log(result)
          document.location.reload()
        })
        .catch(error => console.log('error', error))
    }
  }
}

</script>

<style scoped>
.container {

  height: 50vh;
}

 #list1 button.btn-primary {
   background-color: #61a1e3;
   color: white;
 }

#list1 button.btn-danger {
  background-color: rgba(227, 92, 92, 0.98);
  color: white;
}

/* CSS styles for priority options */
tbody tr:hover{
  background-color: #fbfbfb;
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
#list1 button.btn-success.square-rounded {
  border-radius: 4px; /* Adjust the border radius as needed */
  background-color: #42b983;
  color: white;
  padding: 0.25rem 0.75rem; /* Adjust the padding as needed */
}
</style>


