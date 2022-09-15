<template>
  <div class="nav">
    <ul>
      <li v-for="item in menu.navItem" :key="item.index" @click="item.click">
        <button
          :class="
            item.index == menu.activeButton.split('-')[0]
              ? 'nav-button nav-button-active'
              : 'nav-button'
          "
        >
          <div class="nav-title">
            <span>{{ item.name }}</span>
            <span
              v-show="item.index != menu.activeButton && item.childs"
              class="material-symbols-outlined"
              >expand_more</span
            >
            <span
              v-show="item.index == menu.activeButton && item.childs"
              class="material-symbols-outlined"
              >expand_less</span
            >
          </div>
        </button>
        <transition name="fade">
          <div
            v-show="item.index == menu.activeButton.split('-')[0]"
            class="nav1-wrapper"
          >
            <button
              v-for="item1 in item.childs"
              :key="item1.index"
              @click.stop="item1.click"
              :class="
                item1.index == menu.activeButton
                  ? 'nav1-button nav1-button-active'
                  : 'nav1-button'
              "
            >
              <span>{{ item1.name}}</span>
            </button>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "Navcation",
  props: {
    navMenu: Object,
  },
  setup(props) {
    var menu = computed(() => {
      if (props.navMenu.style) {
          console.log(2222)
          var dc = document.documentElement.style;
          var name = props.navMenu.styleName;
          for (var key in props.navMenu.style) {
            dc.setProperty(name + key, props.navMenu.style[key]);
          }
        }
      return props.navMenu;
    });

    return {
      menu,
    };
  },
};
</script>

<style scoped>
.nav {
  margin-top: 40px;
  width: var(--pcswidth);
  text-align: right;
}

.nav li {
  margin-bottom: 5px;
  font-family: "dreamH";
}

.nav .nav-title {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.nav .nav-button {
  width: var(--pcsnavButtonWidth);
  height: var(--pcsnavButtonHeight);
  border-radius: var(--pcsnavButtonRadius);
  background-color: var(--pcsnavButtonBC);
  border: none;
  font-size: var(--pcsnavButtonFontSize);
  color: var(--pcsnavButtonFontBC);
  transition: 0.4s;
  cursor: pointer;
}

.nav .nav-button:hover {
  width: var(--pcsnavButtonHoverWidth);
  background-color: var(--pcsnavButtonHoverBC);
  color: white;
}

.nav-button-active {
  width: var(--pcsnavButtonActiveWidth) !important;
  background-color: var(--pcsnavButtonActiveBC) !important;
  color: white;
}

.nav1-wrapper {
  transition: 2s;
}

.nav .nav1-button {
  width: var(--pcsnav1ButtonWidth);
  height: var(--pcsnav1ButtonHeight);
  border-radius: var(--pcsnav1ButtonRadius);
  background-color: var(--pcsnav1ButtonBC);
  margin-top: 5px;
  border: none;
  font-size: var(--pcsnav1ButtonFontSize);
  /* 圆角矩形高度一半 */
  color: var(--pcsnav1ButtonFontBC);
  transition: 0.4s;
  cursor: pointer;
}

.nav .nav1-button:hover {
  width: var(--pcsnav1ButtonHoverWidth) !important;
  background-color: var(--pcsnav1ButtonHoverBC) !important;
  color: white;
}

.nav1-button-active {
  width: var(--pcsnav1ButtonActiveWidth) !important;
  background-color: var(--pcsnav1ButtonActiveBC) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
</style>