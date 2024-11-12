<template>
    <n-layout>
        <n-layout-header :inverted="preferenceState.themeValue === 'dark'" bordered
            :style="{ height: preferenceState.headerHeight + 'px' }">1</n-layout-header>
        <n-layout-content content-style="padding: 24px;">
            <n-split direction="horizontal" style="height: 200px" :max="0.75" :min="0.25">
                <template #1>
                    Pane 1
                </template>
                <template #2>
                    Pane 2
                </template>
            </n-split>
        </n-layout-content>
    </n-layout>
</template>
<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutContent, NSplit } from 'naive-ui';
import { transform } from '@babel/standalone';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { preferenceState } from '@/store/preferences';

const test = `
import { createApp } from 'vue';
import '@/styles/index.scss';
import App from '@/App.vue';

import 'virtual:uno.css';
import { router } from '@/router';
const app = createApp(App);
app.use(router);
app.mount('#app');
`

const result = transform(test, {
    presets: ['typescript'],
    filename: 'test.ts',
})

console.log(result);
</script>
<style lang="scss" scoped></style>