<template>
  <div id="app">
    <NewsMenu />

    <main>
      <router-view />
    </main>

    <NewsFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import NewsMenu from "@/components/NewsMenu.vue";
import NewsFooter from "@/components/NewsFooter.vue";
import DetailsPage from "@/views/DetailsPage.vue";

@Component({
  components: { NewsMenu, NewsFooter, DetailsPage },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  // margin-left: 15%;
  // margin-right: 15%;
}
</style>
