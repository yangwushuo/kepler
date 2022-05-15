<template>
  <div>
    <header class="site-header">
      <div class="wrapper site-header__wrapper">
        <div class="site-header__start">
          <span class="brand">Kepler</span>
        </div>
        <div class="site-header__middle">
          <nav class="nav">
            <ul class="nav__wrapper">
              <li class="nav__item">
                <a href="javascript:void(0);" @click="gotoRoute('/home')">首页</a>
              </li>
              <li class="nav__item">
                <a
                  href="javascript:void(0);"
                  @click="gotoRoute('/exchangeData')"
                  >交易所数据</a
                >
              </li>
              <li class="nav__item">
                <a href="javascript:void(0);" @click="gotoRoute">链上数据</a>
              </li>
              <li class="nav__item">
                <a href="javascript:void(0);" @click="gotoRoute">NFT藏品</a>
              </li>
              <li class="nav__item">
                <a href="javascript:void(0);" @click="gotoRoute">市场指数</a>
              </li>
              <li class="nav__item">
                <a href="javascript:void(0);" @click="gotoRoute">动态</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="site-header__end">
          <el-button class="loginAndRegister" size="large" round
            >登录</el-button
          >
          <el-button class="loginAndRegister" size="large" round
            >注册</el-button
          >
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "Header",
  setup() {
    
    const router = useRouter();

    function gotoRoute(path = "") {
      router.push(path);
    }

    return {
      gotoRoute,
    };
  },
};
</script>

<style scoped>
.site-header {
  /* position: relative; */
  background-color: var(--mainbgcolor);
  border-bottom: 0.5px solid rgba(207, 207, 207, 0.2);
}

.wrapper {
  max-width: 1140px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
  height: 7vh;
}

/* logo样式 */
.brand {
  font-weight: bold;
  font-size: 30px;
  color: white;
}

.site-header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

@media (min-width: 660px) {
  .site-header__wrapper {
    padding-top: 0;
    padding-bottom: 0;
  }
}

.site-header__middle {
  font-size: 18px;
}

.site-header__end {
  font-size: 18px;
}

.site-header__end a {
  padding-left: 10px;
}

@media (min-width: 660px) {
  .nav__wrapper {
    display: flex;
  }
}

/* @media (max-width: 659px) {
  .site-header__end { 
    padding-right: 4rem;
  }
}

@media (max-width: 659px) {
  .nav__wrapper {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: -1;
    background-color: #d9f0f7;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }
  .nav__wrapper.active {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
} */

.nav__item a {
  display: block;
  padding: 1.5rem 1rem;
  font-size: 16px;
  text-decoration: none;
}

.nav__item a:hover {
  color: var(--sideBarItemActiveFontColor);
}

.nav__item a:focus {
  color: var(--sideBarItemActiveFontColor);
}

.el-button {
  border: 0 !important;
}

.el-button:hover {
  background: #90b2cb !important;
  opacity: 0.6;
  border: 0 !important;
  color: black !important;
}

.el-button:focus {
  color: black !important;
}
</style>