<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #9bc6ff;
  background: -webkit-linear-gradient(top, #9bc6ff, #ffffff);
  background: -moz-linear-gradient(top, #9bc6ff, #ffffff);
  background: linear-gradient(to bottom, #9bc6ff, #ffffff);
}
</style>
