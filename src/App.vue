<template>
  <div id="app">
    <div class="app-container">
      <div class="app-newsmenu">
        <NewsMenu />
      </div>
      <div class="app-main">
        <main>
          <router-view />
        </main>
      </div>
      <div class="app-newsfooter">
        <NewsFooter />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import NewsMenu from "@/components/NewsMenu.vue";
import NewsFooter from "@/components/NewsFooter.vue";
import DetailsPage from "@/views/DetailsPage.vue";

@Component({
  components: { NewsMenu, NewsFooter, DetailsPage }
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
  height: 100vw;
}

.app-container {
  display: flex;
  flex-direction: column;
}
</style>
