<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <div class="title">Kepler</div>
        <div class="subheading">专业的区块链数据分析</div>
      </el-aside>
      <el-main>
        <img src="@/assets/img/indexImg1.png" alt="" />
        <img src="@/assets/img/indexImg2.png" alt="" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.el-container {
  display: flex !important;
  flex-direction: column !important;
  align-items: center;
  position: relative;
  margin: auto 0;
}

.common-layout {
  min-height: 93vh;
  display: flex;
}

.title {
  font-size: 10rem;
  color: white;
  text-align: center;
}

.subheading {
  font-size: 5rem;
  color: white;
}

.el-main{
  overflow: hidden;
}
.el-main img:hover{
  transform: scale(1.1);
  transition: all 0.4s;
}

</style>