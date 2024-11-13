<template>
    <Layout>
        <template #left>
            <n-tabs type="line" animated size="small" class="plygrd-tab-bar" v-model:value="currentActiveTabbarKey"
                pl-12px>
                <n-tab-pane v-for="(item) in tabbars" :name="item.filename" :key="item.filename">
                    <template #tab>
                        {{ item.filename }}
                    </template>
                </n-tab-pane>
            </n-tabs>
            <div ref="codeRef" w-full h-full></div>
        </template>
        <template #right>
            <iframe w-full h-full :src="iframeUrl" frameborder="0"></iframe>
        </template>
    </Layout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { transform } from '@babel/standalone';
import Layout from './Layout.vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
import { preferenceState } from '@/store/preferences';
import { NTabPane, NTabs, NIcon, useThemeVars } from 'naive-ui';
import preview from './preview.html?raw';
import mime from 'mime/lite';

const iframeUrl = URL.createObjectURL(new Blob([preview], { type: 'text/html' }));

// const naiveThemeVars = useThemeVars();

interface CodeSpace {
    filename: string;
    language: string;
    raw: string;
    value: string;
}
const currentActiveTabbarKey = ref('code');
const tabbars = reactive<CodeSpace[]>([{
    filename: 'test.ts',
    language: '',
    raw: ['function x(foo: string) {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    value: ''
}])



const codeRef = useTemplateRef('codeRef');
let MonacoCodeEditor: ReturnType<typeof monaco.editor.create>;
onMounted(() => {
    MonacoCodeEditor = monaco.editor.create(codeRef.value!, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        language: 'typescript',
        theme: preferenceState.value.themeValue === 'dark' ? 'vs-dark' : '',
        fontFamily: 'Fira Code, Consolas, "Courier New", monospace',
        fontSize: 14,
        fontLigatures: true,
        minimap: {
            enabled: false
        }
    });

    // const languages = monaco.languages.getLanguages();
});
watch(
    () => preferenceState.value.themeValue,
    () => {
        monaco.editor.setTheme(preferenceState.value.themeValue === 'dark' ? 'vs-dark' : 'vs');
    }
);
watch(
    () => preferenceState.value.paneSize,
    () => {
        MonacoCodeEditor.layout();
    }
);

function codeTransformHander(data: CodeSpace) {
    const result = transform(data.raw, {
        filename: data.filename,
        presets: ['env', 'typescript'],
    });
    if (typeof result.code === 'string') {
        data.value = result.code;
    }
}
codeTransformHander(tabbars[0])
</script>

<style lang="scss">
.monaco-editor {
    transition: background-color 0.3s var(--n-bezier);
}

.monaco-editor .margin {
    transition: background-color 0.3s var(--n-bezier);

}

.monaco-editor-background {
    transition: background-color 0.3s var(--n-bezier);

}
</style>
