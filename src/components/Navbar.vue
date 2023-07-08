<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <img src="../assets/logo.png" alt="Humble" width="40" height="40" class="align-baseline">Humble
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" style="color: black" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style="color: black" to="/createList">Erstellen</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style="color: black" to="/list">ToDoListe</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style="color: black" to="/search">Suche</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style="color: black" to="/archiv">Archiv</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="collapse" id="navbarToggleExternalContent">
    <div class="bg-dark p-4">
      <h6><router-link class="text-black" to="/">Home</router-link></h6>
      <h6><router-link class="text-black" to="/createList">Erstellen</router-link></h6>
      <h6><router-link class="text-black" to="/list">ToDoListe</router-link></h6>
      <h6><router-link class="text-black" to="/search">Suche</router-link></h6>
      <h6><router-link class="text-black" to="/archiv">Archiv</router-link></h6>
    </div>
  </div>
</template>
<script>



export default {
  name: 'NavBar',
  components: {}


}
</script>

