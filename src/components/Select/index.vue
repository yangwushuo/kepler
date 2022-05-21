<template>
  <div class="one_select">
    <p class="selectTitle">{{title}}</p>
    <el-select
      v-model="value"
      collapse-tags
      :multiple="multiple"
      class="element_select"
      :placeholder="placeholder"
      filterable
      :loading="loadingOpen"
      loading-text="加载中..."
      no-match-text="无"
      fit-input-width
      style="width: 11rem"
      @change="change"
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
import {reactive, toRefs,toRaw, watch, computed} from "vue";
export default {
  name: "Select",
  props: ["multiple", "placeholder", "title", "change", "value","options"],
  setup(props) {
    let selectOptions = reactive({
      //加载提示开关
      loadingOpen: false,
      //提示文字
      placeholder: props.placeholder,
      //标题
      title: props.title,
      //选项改变触发回调
      change: props.change,
      //默认选择
      value: props.value, 
      //数据
      options: toRaw(props.options),
    });

    //为数据创建计算属性，如果props.options发生改变则返回新数值并渲染页面
    selectOptions.options = computed(function(){
      return toRaw(props.options);
    })

    return {
      ...toRefs(selectOptions),
    };
  },
};
</script>

<style scoped>
.one_select {
  display: flex;
  flex-direction: column;
  padding: 1rem 0 1rem 1rem;
}
.el-select-dropdown__item:hover {
  color: var(--sideBarItemActiveFontColor) !important;
}
.selected {
  color: var(--sideBarItemActiveFontColor) !important;
}
.selectTitle {
  font-size: 15px;
  color: white;
  padding: 2px 0 2px 0;
}
</style>