<template>
  <div class="index-wrapper" style="width: 100%; height: 95vh">
    <div class="title-wrapper">
      <div>
        <el-carousel
          style="width: 250px; margin-left: -25px"
          :height="carouselSetting.height"
          :indicator-position="carouselSetting.indicatorPosition"
          :arrow="carouselSetting.arrow"
          :initial-index="carouselSetting.initialIndex"
        >
          <el-carousel-item
            v-for="item in carouselSetting.carouseItem"
            :key="item.id"
          >
            <img class="title-logo" :src="getCarouseImg(item.url)" alt="BAYC" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="title">QING PU</div>
      <div class="sub_title">专业阅读交易账户</div>
      <div class="title-btn">
        <button
          class="
            button1
            button1-plain
            button1-border
            button1-pill
            button1-block
            button1-uppercase
          "
        >
          实盘广场
        </button>
        <button
          class="
            button1
            button1-plain
            button1-border
            button1-pill
            button1-block
            button1-uppercase
          "
        >
          创建实盘
        </button> 
      </div>
    </div>
    <div class="side-wrapper" ref="sideWrapper">
      <div class="countdown-wrapper">
        <Countdown :countdownSetting="countdownSetting"/>
        <div style="width:280px;height: 6px;background-color: white;border-radius: 2px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref } from "@vue/reactivity";
import Countdown from "@/components/Countdown/index.vue";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";
import { nextTick, onBeforeMount, onBeforeUnmount } from "@vue/runtime-core";
export default {
  name: "Index",
  components: {
    Countdown,
  },
  setup() {
    const route = useRouter();
    const store = useStore();
    const sideWrapper = ref(null);
    var halo = ref(null);

    var countdownSetting = reactive({
      data: {
        title: "Bitcoin减半",
        autoStart: false,
        expiryTime: "1664467200",
      },
      style: {
        titleFontSize: "22px",
        titleColor: "white",
        fontFamily: "dreamH",
        fontSize: "30px",
        dayColor: "white",
        hourColor: "white",
        minuteColor: "white",
        secondColor: "white",
        separatorSize: "16px",
        separatorColor: "white",
      },
      expiryTimeHandler: () => {},
    });

    var carouselSetting = reactive({
      height: "250px",
      indicatorPosition: "outside",
      arrow: "never",
      initialIndex: 1,
      carouseItem: [
        {
          id: 1,
          url: "NFT/1.png",
        },
        {
          id: 2,
          url: "NFT/2.png",
        },
        {
          id: 3,
          url: "NFT/3.png",
        },
        {
          id: 4,
          url: "NFT/4.png",
        },
        {
          id: 5,
          url: "NFT/5.png",
        },
      ],
    });

    var timelineSetting = reactive({
      hideTimestamp: true,
    });

    function createAccount() {
      route.push("/tradeAccount/add");
    }

    function getCarouseImg(url) {
      return require("@/assets/img/" + url);
    }

    function getEndDate() {
      return new Date(Date.parse("5/3/2024"));
    }

    nextTick(() => {
      halo = HALO({
        el: sideWrapper.value,
        THREE: THREE,
        color: 0x111111,
        waveHeight: 20,
        shininess: 50,
        waveSpeed: 1.5,
        zoom: 0.75,
        backgroundColor: "#24292E",
        amplitudeFactor: 0,
        xOffset: 0.15,
        yOffset: 0.0,
        size: 0.9,
        speed: 0.4
      });
    });

    onBeforeUnmount(()=>{
      halo.destroy();
    })

    return {
      sideWrapper,
      countdownSetting,
      carouselSetting,
      createAccount,
      getCarouseImg,
      getEndDate,
    };
  },
};
</script>

<style scoped>
.index_wrapper {
  background-color: transparent;
}

.title-wrapper {
  position: absolute;
  top: 150px;
  left: 150px;
  z-index: 2;
}

.side-wrapper {
  position: absolute;
  width: 100%;
  height: 95vh;
  overflow: hidden;
  z-index: 1;
}

.side-wrapper .countdown-wrapper{
  position: relative;
  width: 300px;
  top: 45%;
  left: 60%;
}

.title-wrapper .title-logo {
  width: 200px;
  border-radius: 5%;
  margin: 50px 25px 0px 25px;
}

.title-wrapper .title-btn {
  display: flex;
}

.title-wrapper .title-btn button {
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  margin-top: 20px;
  margin-right: 30px;
}

.title-wrapper .title {
  font-size: 85px;
  color: white;
  font-family: "Bebas Neue";
}

.title-wrapper .sub_title {
  font-size: 70px;
  color: white;
  font-family: "dreamH";
}

.side-wrapper .timeline-wrapper {
  width: auto;
  height: auto;
  padding: 20px;
  background-color: #6d6e70;
  border-radius: 20px;
}

.side-wrapper .timeline-wrapper:nth-child(2) {
  width: auto;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
}
</style>