<template>
  <navbar-component></navbar-component>
  <TodoListTable></TodoListTable>
  <router-view></router-view>
</template>

<script>

import NavbarComponent from "@/components/Navbar";
import TodoListTable from "@/components/TodoListTable";



export default {
  name: 'App',
  components: {TodoListTable, NavbarComponent}
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
