<template>
  <div style="background-color: #9d8bcb"></div>
  <section class="vh-10">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card" id="list2" style="border-radius: .75rem; background-color: #eff1f2;">
            <div class="card-body py-4 px-4 px-md-5">

              <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <i class="fas fa-check-square me-1"></i>
                <u>ToDoListe</u>
              </p>

              <div class="mb-3">
                <label class="form-label">Aufgabentitel</label>
                <input type="text" class="form-control">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Aufgabe</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Datum</label>
                <label></label>
                <Datepicker v-model="date" class="form-control" id="minimumView" ></Datepicker>
              </div>
              <button type="submit" class="btn btn-secondary" @click.prevent="createToDo">erstellen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="vh-100">
    <div class="container py-5 h-30">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card" id="list1" style="border-radius: .75rem; background-color: #eff1f2;">
            <div class="card-body py-4 px-4 px-md-5">
              <hr class="my-4">
              <table class="table mb-4">
                <thead class="table-light">
                <tr>
                  <th scope="col">Aufgabentitel</th>
                  <th scope="col">Aufgabe</th>
                  <th scope="col">Datum</th>
                  <th scope="col">Dringlichkeit</th>
                  <th scope="col"><i className="bi bi-ui-checks-grid"></i> Erledigt</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="ToDoListe in ToDoListe" :key="ToDoListe.id">

                  <td>{{ToDoListe.aufgabentitel}}</td>
                  <td>{{ToDoListe.aufgabe}}</td>
                  <td>{{new Date(ToDoListe.datum).toDateString()}}</td>
                  <td>{{ToDoListe.dringlichkeit}}</td>
                  <td><input className="form-check-input" type="checkbox" v-model="ToDoListe.erledigt"
                             v-on:click="isDone (ToDoListe.id)"></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref } from 'vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ToDoListe',
  data () {
    return {
      aufgabentitel: '',
      aufgabe: '',
      date: null,
      dringlichkeit: true,
      ToDoListe: []
    }
  },
  mounted () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch('http://localhost:8080/api/v1/todolist', requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(ToDoListe => {
        this.ToDoListe.push(ToDoListe)
      }))
      .catch(error => console.log('error', error))
    console.log('http://localhost:8080/api/v1/todolist')
  },
  methods: {
    createToDoList () {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      // eslint-disable-next-line no-undef
      const date = ref(new Date()).value
      const dateType = new Date(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay())
      const raw = JSON.stringify({
        aufgabentitel: this.aufgabentitel,
        aufgabe: this.aufgabe,
        datum: dateType,
        dringlichkeit: false

      })

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }
      fetch('http://localhost:8080/api/v1/todolist', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    },
    isDone(id) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({
        todoStatus: this.status = !this.status
      })

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch(endpoint + '/api/v1/todolist/' + id + '/status', requestOptions)
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
#list1 .form-control {
  border-color: transparent;
}
#list1 .form-control:focus {
  border-color: transparent;
  box-shadow: none;
}
#list1 .select-input.form-control[readonly]:not([disabled]) {
  background-color: #fbfbfb;
}
</style>
