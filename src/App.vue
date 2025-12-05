<script setup lang="ts">
import contents from "../data/contents.json";
import MarkdownIt from "./components/MarkdownIt.vue";

const headers = Object.keys(contents);
</script>

<template>
  <article>
    <h1 class="super-header">NanaCPC Notebook</h1>
    <ul>
      <li v-for="header in headers" :key="header">
        {{ header }}
      </li>
    </ul>
  </article>
  <article v-for="(item, header) in contents" :key="header">
    <MarkdownIt :content="item" />
  </article>
</template>

<style scoped>
article {
  padding: 1rem;
}
article:not(:last-child) {
  break-after: always;
}
</style>
