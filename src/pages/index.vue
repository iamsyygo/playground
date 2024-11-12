<template>
  <Layout>
    <template #left>
      <div ref="codeRef" w-full h-full></div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue';
import Layout from './Layout.vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
import { preferenceState } from '@/store/preferences';
import { useThemeVars } from 'naive-ui';
const codeRef = useTemplateRef('codeRef');
let MonacoCodeEditor: ReturnType<typeof monaco.editor.create>;
onMounted(() => {
  MonacoCodeEditor = monaco.editor.create(codeRef.value!, {
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'typescript',
    theme: preferenceState.value.themeValue === 'dark' ? 'vs-dark' : '',
    fontFamily: 'Fira Code, Consolas, "Courier New", monospace',
    fontSize: 14,
    fontLigatures: true
  });
  const languages = monaco.languages.getLanguages();
  console.log(languages);
});
watch(
  () => preferenceState.value.themeValue,
  () => {
    monaco.editor.setTheme(preferenceState.value.themeValue === 'dark' ? 'vs-dark' : 'vs');
  }
);

const naiveThemeVars = useThemeVars();
</script>

<style lang="scss">
// .monaco-editor,
// .monaco-diff-editor,
// .monaco-component {
//   --vscode-editor-background: v-bind('naiveThemeVars.cardColor');
// }
</style>
