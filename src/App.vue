<template>
  <navbar></navbar>
  <router-view/>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: start;
  color: #42b983;
}
body {
  background-color: #E6E6FA;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
