import {createApp} from "vue";
import "./style.css";
import App from "@/views/App.vue";
import router from "@/router";
import {createPinia} from "pinia";
import "@/plugins/axios";
import {useMainStore} from "@/store/index.js";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

const store = useMainStore();
// 비동기 초기화
Promise.all([])
  .then(() => {
    store.fetchAllItems();
    app.mount("#app");
  })
  .catch(console.error);
