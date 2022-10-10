<template>
  <div>
    <el-empty>
      <template #image>
        <span class="material-symbols-outlined logo">vpn_key_off</span>
      </template>
      <template #description>
        <span class="description">{{ des }}</span>
      </template>
    </el-empty>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "Empty",
  props: {
    description: String
  },
  setup(props) {
    var des = computed(() => {
      console.log(props.description)
      return props.description;
    });

    return {
      des,
    };
  },
};
</script>

<style scoped>
.logo {
  font-size: 100px;
  color: #fff;
  opacity: 0.5;
}

.description {
  font-size: 22px;
  color: #fff;
}
</style>