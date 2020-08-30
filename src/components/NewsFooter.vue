<template>
  <div class="news-footer">NewsFooter</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NewsFooter extends Vue {
  @Prop() private msg!: string;
  fetchNews() {
    console.log("kjk");
  }
  created() {
    this.fetchNews();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
