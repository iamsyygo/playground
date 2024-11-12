<template>
  <div w-full h-full flex items-center justify-between box-border px-24px>
    <div flex-center gap-10px>
      <img src="/logo.svg" alt="logo" w-30px />
      <h2>Playground</h2>
    </div>
    <div
      @click="cutAppearance"
      v-if="preferenceState.themeValue === 'light'"
      class="i-fluent-emoji:sun"
      w-em
      h-em
      text-18px
      inline-block
      cursor-pointer
    ></div>
    <div
      @click="cutAppearance"
      v-else
      class="i-fluent-emoji:crescent-moon"
      w-em
      h-em
      text-18px
      inline-block
      cursor-pointer
    ></div>
  </div>
</template>

<script setup lang="ts">
import { preferenceState } from '@/store/preferences';
import { createRendererWithClass } from '@/utils/icon';

function cutAppearance() {
  if (preferenceState.value.themeValue === 'dark') {
    preferenceState.value.theme = 'light';
  } else {
    preferenceState.value.theme = 'dark';
  }
}
</script>

<style scoped></style>
