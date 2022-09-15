<template>
  <div>
    <footer class="site-footer">
      <div class="wrapper site-footer__wrapper">
        <div class="site-footer__start">
          <span class="brand">QING PU</span>
        </div>

        <div class="site-footer__middle"></div>

        <div class="site-footer__end">
          <span class="iconfont icon-tuite"></span>
          <span class="iconfont icon-telegram"></span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  setup() {},
};
</script>

<style scoped>
.site-footer {
  /*  */
  background-color: var(--mainbgcolor);
  border-top: 0.5px solid rgba(207, 207, 207, 0.2);
  position: relative;
}

.wrapper {
  max-width: 1500px;
  height: 5vh;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.site-footer__wrapper {
  /* 弹性 */
  display: flex;
  /* 均匀分布 */
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

/* logo样式 */
.brand {
  font-family: "Bebas Neue";
  font-weight: bold;
  font-size: 30px;
  color: white;
}

.site-footer__start span {
  width: 200px;
}

.site-footer__middle span {
}

.site-footer__end span {
  font-size: 2rem;
  width: 200px;
}

.icon-tuite {
  color: #1ca2f2;
}

.icon-telegram {
  color: #25a4e2;
}
</style>