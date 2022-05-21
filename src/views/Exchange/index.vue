<template>
  <div class="wrapper">
    <div class="sideBar">
      <SideBar
        :menuInfo="menuInfo"
        :scrollbar_height="scrollbar_height"
      ></SideBar>
    </div>
    <div class="wrapper_middle" ref="wrapper_middle">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs,} from "vue";
//侧边栏
import SideBar from "@/components/SideBar";
//常量数据
import { Partten } from "@/partten/index";
export default {
  name: "Exchange",
  components: {
    SideBar,
  },
  setup() {
    //菜单数据  //请求服务器获取菜单栏数据
    let menuInfo = reactive(Partten.exchangeSideBar);
    //数据  
    let data = reactive({
      echartsTop: 0,
      echartsBottom: 0,
    });

    let wrapper_middle = ref(null);
    let scrollbar_height = ref('')
    
    onMounted(()=>{
      scrollbar_height.value = wrapper_middle.value.scrollHeight+'px';
    })
  
    return {
      ...toRefs(data),
      wrapper_middle,
      menuInfo,
      scrollbar_height,
    };
  },
};
</script>

<style scoped>
.wrapper {
  width: auto;
  display: flex;
  height: auto;
  flex-direction: row;
}
.wrapper_middle {
  width: 87vw;
  min-height: 93vh;
  display: flex;
  flex-direction: column;
}
.breadcrumb {
}
</style>