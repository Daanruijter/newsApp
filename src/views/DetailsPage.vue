<template>
  <div class="home">
    <DetailsPage />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import DetailsPage from "@/components/DetailsPage.vue";

export default {
  name: "Home",
  components: {
    DetailsPage
  }
};
</script>
