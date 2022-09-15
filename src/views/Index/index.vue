<template>
  <div class="index_wrapper">
    <div class="wrapper_start">
      <div class="title">QING PU</div>
      <div class="sub_title">专业阅读交易账户</div>
      <div class="three_title">
          <button class="button button--bestia" id="three_title_butt">
            <div class="button__bg"></div>
          <span style="font-family: 'draemH'; font-size: 20px" @click="createAccount">创建实盘</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
export default {
  name: "Index",
  setup(){

    const route = useRouter();
    const store = useStore();

    function createAccount(){
      //判断当前用户是否登录
      if(store.state.userInfoStore.userInfo.username){
        route.push('/tradAccount/add');
      }else{
        //提示用户登录
        errHint('请先登录再创建');
      }
    }

    //弹窗
    function errHint(msg, time = 3000) {
      return ElMessage({
        showClose: true,
        message: msg,
        type: "error",
        center: true,
        effect: "dark",
        description: "",
        showIcon: true,
        offset: 100,
        duration: time,
      });
    }

    return {
      createAccount,
    }
  }
};
</script>

<style scoped>
.index_wrapper {
}

.index_wrapper .wrapper_start {
  height: 95vh;
  background-image: url("@/assets/img/index_back.png");
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center top;
  background-color: var(--mainbgcolor);
}

.wrapper_start .title {
  font-size: 90px;
  color: white;
  font-family: "Bebas Neue";
  position: relative;
  text-align: center;
  top: 30%;
}

.wrapper_start .sub_title {
  font-size: 75px;
  color: white;
  font-family: "dreamH";
  position: relative;
  text-align: center;
  top: 28%;
}

.wrapper_start .three_title {
  position: relative;
  top: 30%;
  display: flex;
  justify-content: center;
}

.wrapper_start .three_title #three_butt {
}

@keyframes huerotate {
  100% {
    filter: hue-rotate(360deg);
  }
}

.button--bestia .button__bg {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #e7e7e7;
  border-radius: 0.9rem;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.1, 0, 0.3, 1);
}

.button--bestia:hover .button__bg {
  transform: scale3d(1.1, 1, 1);
}

.button--bestia .button__bg::before,
.button--bestia .button__bg::after {
  content: "";
  position: absolute;
  background: #ffff;
}

.button--bestia .button__bg::before {
  width: 110%;
  height: 0;
  padding-bottom: 110%;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 1);
}

.button--bestia:hover .button__bg::before {
  transition: transform 0.4s cubic-bezier(0.1, 0, 0.3, 1);
  transform: translate3d(-50%, -50%, 0) scale3d(1, 1, 1);
}

.button--bestia .button__bg::after {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s;
}

.button--bestia:hover .button__bg::after {
  opacity: 1;
  transition-duration: 0.01s;
  transition-delay: 0.3s;
}
</style>