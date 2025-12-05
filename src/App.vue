<script setup lang="ts">
import contents from "../data/contents.json";
import MarkdownIt from "./components/MarkdownIt.vue";
</script>

<template>
  <article>
    <MarkdownIt
      v-for="(item, index) in contents"
      :key="index"
      :content="item"
    />
  </article>
</template>

<style scoped>
article:not(:last-child) {
  page-break-after: always;
}
</style>
