<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { onMounted } from 'vue';
// import useStore from 'vuex';

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  setup(){
    
  }
};
</script>

<style>

body{
  background: var(--mainbgcolor);
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

a {
  text-decoration: none;
  color: white;
}

</style>
