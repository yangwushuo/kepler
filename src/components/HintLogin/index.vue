<template>
  <div class="hint_wrapper">
    <div class="hint">
      <span class="hint_title">请先登录</span>
      <button class="button1 button1-plain button1-border button1-pill button1-block button1-uppercase" @click="goLogin">
        <span style="color: white;">Go</span>
      </button>
    </div>  
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "HintLogin",
  setup() {

    const router = useRouter();

    function goLogin(){
      router.push('/login');
    }

    return {
      goLogin
    }
  },
};
</script>

<style scoped>

.hint_wrapper .hint {
  width: 120px;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
}

.hint .hint_title {
  font-size: 30px;
  font-family: "dreamH";
  color: white;
}

</style>