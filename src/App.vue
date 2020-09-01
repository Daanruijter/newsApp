<template>
  <div id="app">
    <div id="nav">
      <NewsMenu />
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>-->
    </div>

    <router-view />
    <DetailsPage />
    <NewsFooter />
  </div>
</template>

<script lang="ts">
import NewsMenu from "@/components/NewsMenu.vue";
import NewsFooter from "@/components/NewsFooter.vue";
import DetailsPage from "@/views/DetailsPage.vue";

export default {
  components: {
    NewsMenu,
    NewsFooter,
    DetailsPage
  }

  // created: function(): void {
  //   console.log("created");
  //   const url: string =
  //     "http://newsapi.org/v2/top-headlines?" +
  //     "country=au&" +
  //     "apiKey=771f495b60b94bfabf9a9800d4996456";
  //   const req = new Request(url);
  //   fetch(req).then(function(response) {
  //     console.log(response.json());
  //     // let data = response.json();
  //     // this.$store.dispatch("sendData", data);
  //   });
  // },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
