<template>
  <div class="wrapper_tags">
    <div class="wrapper_tag" v-for="tag in tags" :key="tag.name">
      <el-tag class="mx-1" closable :type="tag.type" size="large">
        {{ tag.name }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Tag",
  setup() {
    const tags = ref([
      { name: "BTC", type: "info" },
      { name: "ETH", type: "info" },
      { name: "SOL", type: "info" },
      { name: "DOT", type: "info" },
      { name: "XRP", type: "info" },
    ]);

    return {
      tags,
    };
  },
};
</script>

<style scoped>
.wrapper_tags {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.wrapper_tags .wrapper_tag{
  padding-left: 5px;
}

.mx-1{
  font-size: 1rem;
  font-weight: bold;
}
</style>