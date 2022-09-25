<template>
  <div class="person-center-wrapper">
    <div class="main">
      <Navcation :navMenu="navMenu"></Navcation>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Navcation from "@/components/Navcation";
export default {
  name: "PersonalCenter",
  components: { Navcation },
  setup() {
    const router = useRouter();
    const route = useRoute();

    //配置导航栏数据
    var navMenu = reactive({
      activeButton: route.meta.index,
      styleName: '--ns',
      style: {
        width: "135px",

        navButtonWidth: "120px",
        navButtonHeight: "40px",
        navButtonRadius: "20px 0px 0px 20px", //圆角矩形高度一半
        navButtonBC: "#8f8f8c",
        navButtonFontSize: '16px',
        navButtonFontBC: 'white',
        navButtonHoverWidth: "135px",
        navButtonHoverBC: "#285ff3",
        navButtonActiveWidth: "135px",
        navButtonActiveBC: "#285ff3",

        nav1ButtonWidth: "90px",
        nav1ButtonHeight: "30px",
        nav1ButtonRadius: "20px 0px 0px 20px",
        nav1ButtonBC: "#8f8f8c",
        nav1ButtonFontSize: '12px',
        nav1ButtonFontBC: 'white',
        nav1ButtonHoverWidth: "100px",
        nav1ButtonHoverBC: "#ff6319",
        nav1ButtonActiveWidth: "100px",
        nav1ButtonActiveBC: "#ff6319",
      },
      navItem: [
        {
          index: '0',
          name: "个人信息",
          click: () => {
            navMenu.activeButton = '0';
            router.push("/personalCenter/info");
          },
          // childs: [
          //   {
          //     index: '0-1',
          //     name: "副的标题",
          //     click: () => {
          //       navMenu.activeButton = '0-1';
          //       console.log("这是副标题",navMenu.activeButton);
          //     },
          //   },
          //   {
          //     index: '0-2',
          //     name: "副的标题",
          //     click: () => {
          //       navMenu.activeButton = '0-2';
          //       console.log("这是副标题",navMenu.activeButton);
          //     },
          //   },
          // ],
        },
        {
          index: '1',
          name: "实盘信息",
          click: () => {
            navMenu.activeButton = '1';
            router.push("/personalCenter/tradeInfo");
          },
        },
      
      ],
    });

    return {
      navMenu,
    };
  },
};
</script>

<style scoped>
.person-center-wrapper {
  border: 1px solid transparent;
}

.container {
  width: 800px;
  min-height: 700px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 4%;
  border: 1px solid transparent;
}

.main {
  display: flex;
  justify-content: center;
  background-color: var(--mainbgcolor);
  padding: 0;
  margin: 5vh auto;
}

.nav {
  margin-top: 40px;
  width: 135px;
  text-align: right;
}

.nav li {
  margin-bottom: 5px;
  font-size: 16px;
  font-family: "dreamH";
}

.nav .nav-button {
  height: 40px;
  width: 120px;
  border: none;
  /* 圆角矩形高度一半 */
  border-radius: 20px 0px 0px 20px;
  background-color: rgba(58, 58, 57, 0.4);
  transition: 0.4s;
  cursor: pointer;
}

.nav .nav-button:hover {
  background-color: #285ff3;
  width: 135px;
  color: white;
}

.nav-button-active {
  background-color: #285ff3 !important;
  width: 135px !important;
  color: white;
}
</style>