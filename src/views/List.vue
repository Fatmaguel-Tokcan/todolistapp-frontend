<template>
  <div style="background-color: #382f50"></div>
  <section class="vh-10">

              <p class="h1 text-center text-primary">
                <u>ToDoListe</u>
              </p>
  </section>
  <section class="vh-100">
    <div class="container py-5 h-30">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card" id="list1" style="border-radius: .75rem; background-color: #c7bce5;">
            <div class="card-body py-4 px-4 px-md-5">
              <hr class="my-4">
              <table class="table mb-4">
                <thead class="table-light">
                <tr>
                  <th scope="col"><i class="bi bi-justify"></i> Aufgabentitel</th>
                  <th scope="col"><i class="bi bi-card-text"></i> Aufgabe</th>
                  <th scope="col"><i class="bi bi-calendar-x"></i> Fälligkeitsdatum</th>
                  <th scope="col"><i class="bi bi-card-text"></i> Dringlichkeit</th>
                  <th scope="col"><i className="bi bi-ui-checks-grid"></i> Erledigt</th>
                  <th scope="col"><i class="bi bi-pencil-square"></i> überarbeiten</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="ToDoList in ToDoListe" :key="ToDoList.id">

                  <td>{{ToDoList.aufgabentitel}}</td>
                  <td>{{ToDoList.aufgabe}}</td>
                  <td>{{new Date(ToDoList.datum).toDateString()}}</td>
                  <td>{{ToDoList.dringlichkeit}}</td>
                  <td><input className="form-check-input" type="checkbox" v-model="ToDoList.erledigt"
                             v-on:click="isDone (ToDoList.id)"></td>
                  <td>
                    <button type="submit" class="btn btn-outline-danger btn-sm" v-on:click="deleteToDoListe (ToDoList.id)"><i class="bi bi-trash3-fill"></i></button>
                  </td>
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ToDoListe',
  data () {
    return {
      aufgabentitel: '',
      aufgabe: '',
      date: null,
      dringlichkeit: '',
      erledigt: false,
      ToDoListe: []
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
      .then(result => result.forEach(ToDoList => {
        this.ToDoListe.push(ToDoList)
      }))
      .catch(error => console.log('error', error))
  },
  methods: {
    isDone(id) {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({
        erledigt: this.erledigt = !this.erledigt
      })

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch(endpoint + '/api/v1/todolist/' + id + '/erledigt', requestOptions)
        .then(response => response.text())
        .then(async result => {
          console.log(result)
          document.location.reload()
        })
        .catch(error => console.log('error', error))
    },
    deleteToDoListe (id) {
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
    deleteAllToDoListe () {
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
#list1 .form-control {
  border-color: transparent;
}
#list1 .form-control:focus {
  border-color: transparent;
  box-shadow: none;
}
#list1 .select-input.form-control[readonly]:not([disabled]) {
  background-color: #c7bce5;
}
</style>
