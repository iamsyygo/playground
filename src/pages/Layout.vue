<template>
  <n-layout w-full h-full>
    <n-layout-header
      :inverted="preferenceState.themeValue === 'dark'"
      bordered
      :style="{ height: preferenceState.headerHeight + 'px' }"
    >
      <layout-header />
    </n-layout-header>
    <n-layout-content :content-style="{ height: `calc(100vh - ${preferenceState.headerHeight}px)` }">
      <n-split direction="horizontal" :max="0.75" :min="0.25" :resize-trigger-size="2">
        <template #1>
          <slot name="left"></slot>
        </template>
        <template #2>
          <slot name="right"></slot>
        </template>
      </n-split>
    </n-layout-content>
  </n-layout>
</template>
<script setup lang="ts">
import { preferenceState } from '@/store/preferences';
import { NLayout, NLayoutContent, NLayoutHeader, NSplit } from 'naive-ui';
import LayoutHeader from './Header.vue';
</script>
<style lang="scss" scoped></style>
