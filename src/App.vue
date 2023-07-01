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
  background-color: #a2baf2;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #a2baf2;
}

#nav a.router-link-exact-active {
  color: #a2baf2;
}
</style>
