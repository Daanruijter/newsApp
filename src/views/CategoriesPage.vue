<template>
  <div class="categoriespage-container">
    <h1>CategoriesPage</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// import news from "../store/modules/news";
import store from "../store";

store.watch(
  (state) => state,
  (value: {}, oldValue: {}) => {
    console.log("tab changed", value, oldValue);
  }
);

@Component
export default class CategoriesPage extends Vue {
  // onChange(newVal: boolean, oldVal: boolean) {
  //   console.log("watch");
  //   console.log(newVal);
  //   console.log(oldVal);
  //   // Some action
  // }
  // //populate categoriesPageBoolean
  // get categoriesPageBoolean() {
  //   console.log("EXECTUTED");
  //   this.categoriesDivOpen = this.$store.getters[
  //     "vuexModuleDecorators/newsDataModule"
  //   ].categoriesPageBoolean;
  //   return null;
  // }
}
</script>

<style scoped>
.categoriespage-container {
  margin-top: 161px;
}
</style>
