<script setup lang="ts">
import "katex/dist/katex.css";
import { ref, watchEffect } from "vue";
import { md } from "../lib/renderer";

const props = defineProps<{
  content: string;
}>();

const renderedContent = ref<string>("");
watchEffect(() => {
  renderedContent.value = md.render(props.content);
});
</script>

<template>
  <div v-html="renderedContent"></div>
</template>

<style scoped></style>
