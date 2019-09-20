<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">login</router-link>
    </div>

    <vue-element-loading :active="LOADING " spinner="bar-fade-scale" color="#FF6700"/>
    <router-view/>
  </div>
</template>


<script>
  import VueElementLoading from 'vue-element-loading'
  import {mapState} from 'vuex'
  export default {
    name: 'App',
    computed:{
      ...mapState([
        'LOADING'
      ])
    },
    components: {
      VueElementLoading
    },

  }
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body{
    padding: 0;
    margin: 0;
    height: 100vh;
  }
</style>
