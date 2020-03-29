<template>
  <div class="test-container">
    <div v-if="text" class="center-flex">{{text}}</div>
    <template v-else>
      <h2 class="center-flex">你的控制码</h2>
      <div class="center-flex">
        <input type="text" class="k-input flex1" placeholder="请输入您的控制码" />
        <button @click="startControl" class="k-btn k-btn-primary">确认</button>
      </div>
    </template>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

const getTextMap = name => {
  return {
    1: `正在远程控制${name}`,
    2: `正在被${name}远程控制`
  };
};

export default {
  data() {
    return {
      code: "",
      text: ""
    };
  },
  mounted() {
    // this.login();
    ipcRenderer.on("control-state-change", this.handleStateChange);
  },
  beforeDestroy() {
    ipcRenderer.removeListener("control-state-change");
  },
  methods: {
    async login() {
      const code = await ipcRenderer.invoke("login");
      console.log(code);
    },
    handleStateChange({ name, type }) {
      const textMap = getTextMap(name);
      this.text = textMap[type] || "";
    },
    startControl() {
      ipcRenderer.send("control", this.code);
    }
  }
};
</script>

<style scoped>
.test-container {
  padding: 10px;
  line-height: 1.5;
}
</style>