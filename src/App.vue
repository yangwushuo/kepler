<template>
  <div>
    <Header></Header>
    <div class="wrapper">
      <router-view ></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  setup() {
    const store = useStore(); 

    //判断本地是否存有token
    var token = localStorage.getItem("qp-token");
    if (token) {
      //进行登录
      store.dispatch("userInfoStore/getUserInfo");
      //获取用户头像信息
      store.dispatch("userInfoStore/getUserPortraitImage");
    }
  },
};
</script>

<style scoped>
body {
  /* background: var(--mainbgcolor); */
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

a {
  text-decoration: none;
}

.wrapper{
  background-color: var(--mainbgcolor);
  min-height: 95vh;
  margin: 0;
}

</style>
