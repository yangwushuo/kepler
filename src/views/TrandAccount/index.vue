<template>
  <div class="trand_warpper">
    <div class="navigation">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        :background-color="navigation.backgroundColor"
        :text-color="navigation.textColor"
        :active-text-color="navigation.activeTextColor"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>AAA</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>BBB</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="2-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
export default {
  name: "TrandAccount",
  setup() {
    const navigation = reactive({
      backgroundColor:
        document.documentElement.style.getPropertyValue("--mainbgcolor"),
      textColor: "#fff",
      activeTextColor: "#fff234",
    });

    return {
      navigation,
    };
  },
};
</script>

<style scoped>
.trand_warpper {
  background-color: var(--mainbgcolor);
}

.el-menu {
  border: 0 !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 95vh;
}
</style>