<template>
  <Weather></Weather>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card" id="list1" style="border-radius: .75rem; background-color: #eff1f2;">
          <div className="card-body py-4 px-4 px-md-5">

            <p className="h1 text-center mt-2 mb-4 pb-3 text-primary">
              <u>TO-DOS</u>
            </p>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Aufgabentitel</label>
              <input type="text" className="form-control" v-model="aufgabentitel" required>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Aufgabe</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" v-model="aufgabe" rows="3"
                        required></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Datum</label>
              <label htmlFor="formDate"></label>
              <Datepicker class="form-control" id="minimumView" v-model="date"></Datepicker>
            </div>
            <button type="submit" className="btn btn-primary" v-on:click="createToDo">Erstellen</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-md-8 offset-md-2">
    <p className="text-white">Tipp: Um ein task zu ändern müssen die Felder zum erstellen der Tasks nochmal
      ausgefüllt werden und anschließend auf den "<i className="bi bi-pencil"></i>" Button vom jeweiligen Task geklickt
      werden.</p>
  </div>
  <section className="vh-100">
    <div className="container py-5 h-30">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card" id="list1" style="border-radius: .75rem; background-color: #eff1f2;">
            <div className="card-body py-4 px-4 px-md-5">
              <div className="">
                <th scope="col">Todos insgesamt: {{ toDos.length }}
                  <a href="List" className="btn btn-outline-primary btn-sm ms-3" role="button">Bereits vorhandene
                    To-Dos</a>
                  <button type="submit" className="btn btn-outline-danger btn-sm ms-3" v-on:click="deleteAllToDos"><i
                    className="bi bi-trash3-fill"></i> Alle ToDos löschen
                  </button>
                </th>
              </div>
              <hr className="my-4">
              <table className="table mb-4">
                <thead className="table-light">
                <tr>
                  <th scope="col"><i className="bi bi-ui-checks-grid"></i> Erledigt</th>
                  <th scope="col"><i className="bi bi-justify"></i> Aufgabentitel</th>
                  <th scope="col"><i className="bi bi-card-text"></i> Aufgabe</th>
                  <th scope="col"><i className="bi bi-calendar-x"></i> Datum</th>
                  <th scope="col"><i className="bi bi-pencil-square"></i> überarbeiten</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="toDo in toDos" :key="toDo.id">
                  <td><input className="form-check-input" type="checkbox" v-model="toDo.erledigt"
                             v-on:click="isDone (toDo.id)"></td>
                  <td>{{ toDo.aufgabentitel }}</td>
                  <td>{{ toDo.aufgabe }}</td>
                  <td>{{ new Date(toDo.datum).toLocaleDateString() }}</td>
                  <td>
                    <button type="submit" className="btn btn-outline-primary btn-sm me-2"
                            v-on:click="updateToDo (toDo.id)"><i className="bi bi-pencil"></i></button>
                    <button type="submit" className="btn btn-outline-danger btn-sm" v-on:click="deleteToDo (toDo.id)"><i
                      className="bi bi-trash3-fill"></i></button>
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
  name: 'CreateList',

  data() {
    return {
      id: '',
      aufgabentitel: '',
      aufgabe: '',
      erledigt: false,
      date: null,
      toDos: []
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
      .then(result => result.forEach(toDo => {
        this.toDos.push(toDo)
      }))
      .catch(error => console.log('error', error))
  },
  methods: {
    createToDo() {
      if (this.aufgabentitel === '' || this.aufgabe === '') {
        alert('Die Felder "Aufgabentitel" und "Aufgabenbeschreibung" dürfen nicht leer sein')
      } else {
        const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/todolist'
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const raw = JSON.stringify({

          aufgabentitel: this.aufgabentitel,
          aufgabe: this.aufgabe,
          erledigt: this.erledigt,
          datum: this.date
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
    updateToDo(id) {
      if (this.aufgabentitel === '' || this.aufgabe === '') {
        alert('Die Felder "Aufgabentitel" und "Aufgabenbeschreibung" dürfen nicht leer sein')
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
          erledigt: this.erledigt,
          datum: this.date
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
    deleteToDo(id) {
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
    },
    deleteAllToDos() {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL
      const raw = ''

      const requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
      }

      fetch(endpoint + '/api/v1/todolist/deleteall', requestOptions)
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

.col-center {
  margin: 0 auto;
}

</style>
