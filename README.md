[![CI](https://github.com/Fatmaguel-Tokcan/todolistapp-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/Fatmaguel-Tokcan/todolistapp-frontend/actions/workflows/ci.yml)
# todolistapp-frontend

## Project setup
```
npm install
```


### Compiles and hot-reloads for development
```
npm run serve
```




### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <img src="../assets/logo.png" alt="Humble" width="40" height="40" class="align-baseline">Humble
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/create" class="nav-link">To-Dos erstellen</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/list" class="nav-link">Deine To-Dos</router-link>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>

</style>
