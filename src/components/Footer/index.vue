<template>
  <div>
    <footer class="site-footer">
      <div class="wrapper site-footer__wrapper">
        <div class="site-footer__start">
          <span class="brand">Kepler</span>
        </div>

        <div class="site-footer__middle">

        </div>

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

.site-footer{
  /*  */
  border-top: 0.5px solid rgba(207, 207, 207, 0.2);
  position: relative;
}

.wrapper {
  max-width: 1140px;
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
  font-weight: bold;
  font-size: 30px;
  color: white;
}

.site-footer__end span{
  padding-right: 1rem;
  font-size: 2rem;
}

.icon-tuite{
  color: #1CA2F2;
}

.icon-telegram{
  color: #25A4E2;
}
</style>