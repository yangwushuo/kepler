<template>
  <div class="info-wrapper">
    <el-descriptions
      direction="horizontal"
      :column="2"
      :size="large"
      :border="true"
    >
      <template #title
        ><div class="title-wrapper">
          <div>
            <span class="title">账户名:</span>
            <span class="title" v-if="!nickNameEditState"
              >{{ exchangeAccountInfo.nickName }}
            </span>
            <el-input
              style="width: 100px; height: 22px"
              v-model="exchangeAccountInfo.nickName"
              @blur="changeNickNameEditState()"
              v-if="nickNameEditState"
              :placeholder="exchangeAccountInfo.nickName"
            />
            <span
              style="font-size: 16px; color: #76b852; cursor: pointer"
              class="material-symbols-outlined icon"
              @click="changeNickNameEditState()"
              >edit_square</span
            >
          </div>
          <div>
            <el-popconfirm title="确认注销实盘?" :hide-icon="true">
              <template #reference>
                <el-button size="small" type="danger" round
                  ><el-icon><Remove /></el-icon>注销</el-button
                >
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
      <el-descriptions-item label-align="center">
        <template #label> 交易所: </template>
        <span>{{ exchangeAccountInfo.exchangeName }}</span>
      </el-descriptions-item>
      <el-descriptions-item label-align="center">
        <template #label> 添加账户时间: </template>
        <span>{{ exchangeAccountInfo.createTime }}</span>
      </el-descriptions-item>
      <el-descriptions-item label-align="center" span="2">
        <template #label> 账户展示: </template>
        <div class="trand-ex-show">
          <span>
            上线广场&nbsp;
            <el-switch v-model="exchangeAccountInfo.online" size="default" />
          </span>
          <span
            >通过验证码关注&nbsp;
            <el-switch
              v-model="exchangeAccountInfo.verCodeFollow"
              size="default"
            />
            <el-input
              style="width: 100px; height: 24px; margin-left: 5px"
              v-if="exchangeAccountInfo.verCodeFollow"
              :size="small"
              :maxlength="6"
              :minlength="6"
              v-model="exchangeAccountInfo.verCode"
            >
              <template #prefix>
                <span
                  class="material-symbols-outlined"
                  style="
                    font-variation-settings: 'FILL' 1;
                    font-size: 14px;
                    color: #168eea;
                  "
                  >health_and_safety</span
                >
              </template>
            </el-input>
          </span>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label-align="center" span="2">
        <template #label> 实盘展示信息: </template>
        <div class="trand-ex-show">
          <span>
            资金&nbsp;
            <el-switch v-model="exchangeAccountInfo.moneyShow" size="default" />
          </span>
          <span
            >最近交易 &nbsp;
            <el-switch
              v-model="exchangeAccountInfo.tradeHistory"
              size="default"
            />
          </span>
          <span
            >持仓 &nbsp;
            <el-switch v-model="exchangeAccountInfo.option" size="default" />
          </span>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
export default {
  name: "ExchangeAccountInfo",
  props: {
    eai: Object,
  },
  setup(props) {
    var nickNameEditState = ref(false);
    var exchangeAccountInfo = computed(() => {
      return props.eai;
    });

    function changeNickNameEditState() {
      nickNameEditState.value = !nickNameEditState.value;
    }

    return {
      nickNameEditState,
      exchangeAccountInfo,
      changeNickNameEditState,
    };
  },
};
</script>

<style scoped>
.title {
  font-size: 18px;
  color: white;
}

.el-descriptions {
  margin-top: 20px;
}

.el-switch {
  --el-switch-on-color: #00ad45 !important;
}

.info-wrapper >>> .el-descriptions__body {
  background-color: transparent !important;
}

.info-wrapper >>> .el-descriptions__table.is-bordered .el-descriptions__cell {
  border-top: none;
  border-left: none;
  border-right: none;
}

.info-wrapper >>> .el-descriptions__table .is-bordered-label {
  color: #f5f5f5;
  background-color: var(--mainbgcolor);
  padding-top: 10px;
  border-bottom: 1px rgba(150, 150, 150, 0.3) solid;
}

.info-wrapper >>> .el-descriptions__table .is-bordered-content {
  color: #f5f5f5;
  background-color: var(--mainbgcolor);
  padding-top: 10px;
  border-bottom: 1px rgba(150, 150, 150, 0.3) solid;
}

.info-wrapper .trand-ex-show {
  display: flex;
  justify-content: space-around;
}

.info-wrapper .trand-ex-show span {
  display: flex;
  flex-direction: row;
  line-height: 32px;
  text-align: center;
  align-items: center;
}

.title-wrapper {
  width: 650px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>