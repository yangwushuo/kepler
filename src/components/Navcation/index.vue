<template>
  <div class="nav" id="nav">
    <ul>
      <li v-for="item in menuItem" :key="item.index" @click="item.click">
        <button
          :class="
            item.index == activeButton.split('-')[0]
              ? 'nav-button nav-button-active'
              : 'nav-button'
          "
        >
          <div class="nav-title">
            <img
              style="width: 20px; margin-right: 5px;"
              v-if="item.logo"
              :src="getLogo(item.logo)"
            />
            <span>{{ item.name }}</span>
            <span
              v-show="item.index != activeButton && item.childs"
              class="material-symbols-outlined"
              >expand_more</span
            >
            <span
              v-show="item.index == activeButton && item.childs"
              class="material-symbols-outlined"
              >expand_less</span
            >
          </div>
        </button>
        <transition name="fade">
          <div
            v-show="item.index == activeButton.split('-')[0]"
            class="nav1-wrapper"
          >
            <button
              v-for="item1 in item.childs"
              :key="item1.index"
              @click.stop="item1.click"
              :class="
                item1.index == activeButton
                  ? 'nav1-button nav1-button-active'
                  : 'nav1-button'
              "
            >
              <span>{{ item1.name }}</span>
            </button>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, nextTick, watch } from "@vue/runtime-core";
export default {
  name: "Navcation",
  props: {
    navMenu: Object,
  },
  setup(props) {
    var menu = computed(() => {
      return props.navMenu;
    });

    var menuItem = computed(() => {
      return props.navMenu.navItem;
    });

    var activeButton = computed(() => {
      return props.navMenu.activeButton;
    });

    nextTick(() => {
      var nav = document.getElementById("nav").style;
      watch(
        () => props.navMenu.style,
        () => {
          if (props.navMenu.style) {
            var name = props.navMenu.styleName;
            for (var key in props.navMenu.style) {
              nav.setProperty(name + key, props.navMenu.style[key]);
            }
          }
        },
        {
          immediate: true,
          deep: true,
        }
      );
    });

    function getLogo(src) {
      if (src) {
        return require("@/assets/img/"+src);
      }
    }

    return {
      menu,
      menuItem,
      activeButton,
      getLogo,
    };
  },
};
</script>

<style scoped>
.nav {
  width: var(--nswidth);
  text-align: right;
  float: right;
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
  width: var(--nsnavButtonWidth);
  height: var(--nsnavButtonHeight);
  border-radius: var(--nsnavButtonRadius);
  background-color: var(--nsnavButtonBC);
  border: none;
  font-size: var(--nsnavButtonFontSize);
  color: var(--nsnavButtonFontBC);
  transition: 0.4s;
  cursor: pointer;
}

.nav .nav-button:hover {
  width: var(--nsnavButtonHoverWidth);
  background-color: var(--nsnavButtonHoverBC);
  color: white;
}

.nav-button-active {
  width: var(--nsnavButtonActiveWidth) !important;
  background-color: var(--nsnavButtonActiveBC) !important;
  color: white;
}

.nav1-wrapper {
  transition: 2s;
}

.nav .nav1-button {
  width: var(--nsnav1ButtonWidth);
  height: var(--nsnav1ButtonHeight);
  border-radius: var(--nsnav1ButtonRadius);
  background-color: var(--nsnav1ButtonBC);
  margin-top: 5px;
  border: none;
  font-size: var(--nsnav1ButtonFontSize);
  /* 圆角矩形高度一半 */
  color: var(--nsnav1ButtonFontBC);
  transition: 0.4s;
  cursor: pointer;
}

.nav .nav1-button:hover {
  width: var(--nsnav1ButtonHoverWidth) !important;
  background-color: var(--nsnav1ButtonHoverBC) !important;
  color: white;
}

.nav1-button-active {
  width: var(--nsnav1ButtonActiveWidth) !important;
  background-color: var(--nsnav1ButtonActiveBC) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
</style>