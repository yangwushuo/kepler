<template>
  <div class="more_select">
    <!-- <p class="selectTitle">Token选择</p> -->
    <el-select
      v-model="value"
      multiple
      collapse-tags
      class="element_select"
      placeholder="TOKEN 选择"
      filterable
      :loading="loadingOpen"
      loading-text="加载中..."
      no-match-text="无"
      fit-input-width
      style="width: 11rem"
      @change="selectChange"
    >
      <!-- 滚动条 -->
      <c-scrollbar
        maxHeight="10rem"
        :vBarStyle="{ 'background-color': 'rgba(255, 255, 255, 0.2)' }"
        :vThumbStyle="{ 'background-color': 'rgba(33, 35, 61, 0.2)' }"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="element_option"
        >
          <span>
            <i :class="item.icon"></i>
          </span>
          <span style="padding-left: 7px">{{ item.label }}</span>
        </el-option>
      </c-scrollbar>
    </el-select>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
export default {
  name: "MoreSelect",
  props: [],
  setup() {
    const value = ref([]);
    const options = [
      {
        icon: 'iconfont icon-jiaoyisuo',
        value: "BTC",
        label: "BTC",
      },
      {
        icon: 'iconfont icon-jiaoyisuo',
        value: "ETH",
        label: "ETH",
      },
      {
        icon: 'iconfont icon-jiaoyisuo',
        value: "XRP",
        label: "XRP",
      },
      {
        icon: 'iconfont icon-jiaoyisuo',
        value: "SOL",
        label: "SOL",
      },
      {
        icon: 'iconfont icon-jiaoyisuo',
        value: "DOT",
        label: "DOT",
      },
      {
        icon: 'iconfont icon-jiaoyisuo',
        value: "ADA",
        label: "ADA",
      },
      {
        icon: 'iconfont icon-jiaoyisuo',
        value: "UNI",
        label: "UNI",
      },
      {
        icon: 'iconfont icon-jiaoyisuo',
        value: "BNB",
        label: "BNB",
      },
    ];
    const selectOptions = reactive({
      //加载提示开关
      loadingOpen: false,
    });
    const tokenIsClick = ref([]);

    //选择框发生选项改变时候触发
    function selectChange(tokens){
      tokenIsClick.value = [];
      tokenIsClick.value = tokenIsClick.value.concat(tokens)
      console.log(tokenIsClick.value);
    }
    
    return {
      value,
      options,
      ...toRefs(selectOptions),
      selectChange
    };
  },
};
</script>

<style scoped>

.more_select{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem 0 2rem;
}
.selectTitle {
  font-size: 20px;
  color: white;
  padding: 1rem 0 1rem 0;
}

.element_select {
}

.element_option:focus {
}
</style>