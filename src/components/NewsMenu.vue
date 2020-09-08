<template>
  <div class="news-menu-container">
    <div class="news-menu-home"><router-link to="/">HOME</router-link></div>
    <div class="news-menu-categories">
      <router-link to="/categories">CATEGORIES</router-link>
    </div>
    <div class="news-menu-random">
      <router-link to="/random">RANDOM</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NewsMenu extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.news-menu-container {
  display: flex;
  justify-content: space-between;
  background-color: blue;
  width: 100%;
  padding: 5% 0% 5% 0%;
  margin-bottom: 5%;
}

.news-menu-container a {
  color: white !important;
  text-decoration: none;
}

.news-menu-home {
  padding-left: 5%;
}

.news-menu-random {
  padding-right: 5%;
}
</style>
