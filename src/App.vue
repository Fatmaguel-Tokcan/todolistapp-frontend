<template>
  <navbar></navbar>
  <router-view/>
</template>

<script>


import Navbar from "@/components/Navbar";



export default {
  name: 'App',
  components: {Navbar}
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: start;
  color: #9276d5;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #619ed3;
}

#nav a.router-link-exact-active {
  color: #51c494;
}
</style>
