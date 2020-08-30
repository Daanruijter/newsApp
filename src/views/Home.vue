<template>
  <div class="home">
    <div>
      <div v-for="newsItem in allNews" :key="newsItem.title">
        {{ newsItem.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// interface dataFetcher{
//   fetchNews(){
// return "ss"
//   }

// }

import { mapGetters, mapActions } from "vuex";
// @ is an alias to /src

export default {
  name: "Home",
  computed: mapGetters(["allNews"]),
  // created: this.fetchData(),
  methods: {
    ...mapActions(["fetchNews"]),
  },
  created() {
    this.fetchNews();
  },
};
</script>
