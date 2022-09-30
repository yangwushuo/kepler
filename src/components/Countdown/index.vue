<template>
  <div class="countdown">
    <p :style="titleStyle">{{ countdown.data.title }}</p>
    <div>
      <span :style="dayStyle">{{ timer.days }}</span
      ><span :style="separatorStyle"> 天 </span><span :style="hourStyle">{{ timer.hours }}</span
      ><span :style="separatorStyle"> 时 </span><span :style="minuteStyle">{{ timer.minutes }}</span
      ><span :style="separatorStyle"> 分 </span><span :style="secondStyle">{{ timer.seconds }}</span
      ><span :style="separatorStyle"> 秒 </span>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watch } from "@vue/runtime-core";
import { useTimer } from "vue-timer-hook";
export default {
  name: "Countdown",
  props: {
    countdownSetting: Object,
  },
  setup(props) {
    var countdown = computed(() => {
      return props.countdownSetting;
    });

    var titleStyle = null;
    var dayStyle = null;
    var hourStyle = null;
    var minuteStyle = null;
    var secondStyle = null;
    var separatorStyle = null;
  
    watch(
      () => props.countdownSetting,
      (n) => {
        titleStyle = reactive({
          fontSize: n.style.titleFontSize,
          color: n.style.titleColor,
          fontFamily: n.style.fontFamily,
        });
        dayStyle = reactive({
          fontSize: n.style.fontSize,
          fontFamily: n.style.fontFamily,
          color: n.style.dayColor,
        });
        hourStyle = reactive({
          fontSize: n.style.fontSize,
          fontFamily: n.style.fontFamily,
          color: n.style.hourColor,
        });
        minuteStyle = reactive({
          fontSize: n.style.fontSize,
          fontFamily: n.style.fontFamily,
          color: n.style.minuteColor,
        });
        secondStyle = reactive({
          fontSize: n.style.fontSize,
          fontFamily: n.style.fontFamily,
          color: n.style.secondColor,
        });
        separatorStyle = reactive({
          fontSize: n.style.separatorSize,
          fontFamily: n.style.fontFamily,
          color: n.style.separatorColor,
        })
      },
      {
        immediate: true,
      }
    );

    var timer = null;
    watch(
      () => props.countdownSetting.data,
      (n) => {
        if (n.expiryTime) {
          const time = new Date("2024/5/3 0:0:0");
          console.log(time);
          timer = useTimer(time);
        }
      },
      {
        immediate: true,
      }
    );

    return {
      timer,
      countdown,
      titleStyle,
      dayStyle,
      hourStyle,
      minuteStyle,
      secondStyle,
      separatorStyle
    };
  },
};
</script>

<style>
</style>