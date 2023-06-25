<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
      </a>
      <img src="../assets/logo.png" alt="Humble" width="40" height="40" class="align-baseline">Humble
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#">TodoLists</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
     </div>
    </div>
    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <h6><router-link class="text-white" to="/">Home</router-link></h6>
        <h6><router-link class="text-white" to="/about">About</router-link></h6>
        <h6><router-link class="text-white" to="/todoListTable">TodoLists</router-link></h6>
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
