<template>
  <div class="home">
    <div>
      <div v-for="newsItem in allNews" :key="newsItem.id">{{ newsItem }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
// @ is an alias to /src

export default {
  name: "Home",
  computed: mapGetters(["allNews"]),
  created() {
    this.fetchNews();
  },
  methods: {
    ...mapActions(["fetchNews"]),
  },
};
</script>
