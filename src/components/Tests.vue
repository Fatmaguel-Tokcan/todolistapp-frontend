<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card" id="list" style="border-radius: .75rem; background-color: rgba(241,239,242,0.84);">
          <div class="card-body py-4 px-4 px-md-5">

            <p class="h1 text-center text-primary">
              <u>ToDoListe</u>
            </p>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Aufgabentitel</label>
              <input type="text" class="form-control" v-model="aufgabentitel" required>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Aufgabe</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" v-model="aufgabe" rows="3" required></textarea>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Fälligkeitsdatum</label>
              <label for="formDate"></label>
              <Datepicker class="form-control" id="minimumView" v-model="date"></Datepicker>
            </div>
            <div className="mb-3">
              <label htmlFor="dringlichkeit" className="form-label">Priorität</label>
              <select class="form-select form-select-sm" id="exampleFormControlTextarea2" v-model="dringlichkeit" required>
                <option value="" selected disabled>Wählen Sie bitte</option>
                <option value="HOCH">hoch</option>
                <option value="MITTEL">mittel</option>
                <option value="NIEDRIG">niedrig</option>
                <div class="invalid-feedback">
                  Bitte wählen Sie eine Priorität.
                </div>
            <button type="submit" class="btn btn-success" v-on:click="createToDoListe">hinzufügen</button>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-8 offset-md-2">
    <p class="text-white">Hinweis: Um ein task zu ändern müssen die Felder zum erstellen der Tasks nochmal ausgefüllt werden und anschließend auf den "<i class="bi bi-pencil"></i>" Button vom jeweiligen Task geklickt werden.</p>
  </div>
  <section class="vh-100">
    <div class="container py-5 h-30">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card" id="list1" style="border-radius: .75rem; background-color: #7b28a4;">
            <div class="card-body py-4 px-4 px-md-5">
              <div class=""><th scope="col">ToDoListe insgesamt: {{ToDoListe.length}}
                <button type="submit" class="btn btn-outline-danger btn-sm ms-3" v-on:click="deleteAllToDoListe"><i class="bi bi-trash3-fill"></i> alle ToDoListen löschen</button></th>
              </div>
              <hr class="my-4">
              <table class="table mb-4">
                <thead class="table-light">
                <tr>
                  <th scope="col"><i class="bi bi-ui-checks-grid"></i>Status</th>
                  <th scope="col"><i class="bi bi-justify"></i>Aufgabentitel</th>
                  <th scope="col"><i class="bi bi-card-text"></i>Aufgabe</th>
                  <th scope="col"><i class="bi bi-calendar-x"></i>Fälligkeitsdatum</th>
                  <th scope="col"><i class="bi bi-calendar-x"></i>Priorität</th>
                  <th scope="col"><i class="bi bi-pencil"></i>Bearbeiten</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="ToDoListe in ToDoListe" :key="ToDoListe.id">
                  <td><input class="form-check-input" type="checkbox" v-model="ToDoListe.erledigt" v-on:click="isDone (ToDoListe.id)"></td>
                  <td>{{ToDoListe.aufgabentitel}}</td>
                  <td>{{ToDoListe.aufgabe}}</td>
                  <td>{{new Date(ToDoListe.datum).toLocaleDateString()}}</td>
                  <td>{{ToDoListe.dringlichkeit}}</td>
                  <td>
                    <button type="submit" class="btn btn-outline-primary btn-sm me-2" v-on:click="updateToDoListe (ToDoListe.id)"><i class="bi bi-pencil"></i></button>
                    <button type="submit" class="btn btn-outline-danger btn-sm" v-on:click="deleteToDoListe (ToDoListe.id)"><i class="bi bi-trash3-fill"></i></button>
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
  name: 'Tests',
  data () {
    return {
      id: '',
      aufgabentitel: '',
      aufgabe: '',
      date: null,
      dringlichkeit:'',
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
      .then(result => result.forEach(ToDoListe => {
        this.ToDoListe.push(ToDoListe)
      }))
      .catch(error => console.log('error', error))
  },
  methods: {
    createToDoListe () {
      if (this.aufgabentitel === '' || this.aufgabe === ''|| this.dringlichkeit==='') {
        alert('Die Felder "Aufgabentitel" und "Aufgabenbeschreibung" und "Priorität" dürfen nicht leer sein')
      } else {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todolist'
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const raw = JSON.stringify({

          aufgabentitel: this.aufgabentitel,
          aufgabe: this.aufgabe,
          datum: this.date,
          dringlichkeit: this.dringlichkeit,
          erledigt:this.erledigt
        })

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        }

        fetch(endpoint, requestOptions)
          .then(response => response.text())
          .then(async result => {
            console.log(result)
            document.location.reload()
          })
          .catch(error => console.log('error', error))
      }
    },
    updateToDoListe (id) {
      if (this.aufgabentitel === '' || this.aufgabe === '' || this.dringlichkeit==='') {
        alert('Die Felder "Aufgabentitel" und "Aufgabenbeschreibung" und "Priorität" dürfen nicht leer sein')
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todolist'
        const raw = ''

        const requestOptions = {
          method: 'GET',
          body: raw,
          redirect: 'follow'
        }

        fetch(endpoint + '/api/v1/todolist/' + id, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))
      } else {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const raw = JSON.stringify({

          aufgabentitel: this.aufgabentitel,
          aufgabe: this.aufgabe,
          datum: this.date,
          dringlichkeit: this.dringlichkeit,
          erledigt:this.erledigt
        })

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
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
      }
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
    isDone (id) {
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

#list .form-control {
  border-color: transparent;
}
#list .form-control:focus {
  border-color: transparent;
  box-shadow: none;
}
#list .select-input.form-control[readonly]:not([disabled]) {
  background-color: #fbfbfb;
}
.col-center{
  margin: 0 auto;
}


</style>

