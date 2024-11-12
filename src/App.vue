<script setup lang="ts">
import { NConfigProvider, darkTheme, dateZhCN, zhCN, NMessageProvider } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { preferenceState } from '@/store/preferences'
import { createColorPatterns } from '@/utils/color-patterns'

let themeDataWithAuto = ref(null)
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
darkModeMediaQuery.addEventListener('change', handleDarkModeChange)
function handleDarkModeChange(e: any) {
  const darkMode = e.matches
  // @ts-expect-error
  themeDataWithAuto.value = darkMode ? darkTheme : null
}

const theme = computed(() => {
  const themeType = preferenceState.value.theme
  if (themeType === 'auto') {
    return themeDataWithAuto.value
  }
  return themeType === 'dark' ? darkTheme : null
})

watch(theme, (newVal) => {
  preferenceState.value.themeValue = newVal === darkTheme ? 'dark' : 'light'
})

const primaryAccentColor = computed(() => {
  const primaryColor = preferenceState.value.primaryColor
  const colors = createColorPatterns(primaryColor)
  const customPrimaryColor = colors.reduce<any>((acc, color, index) => {
    acc[primaryColor + index] = color
    return acc
  }, {})
  return {
    primaryColor,
    primaryColorHover: colors[6],
    primaryColorPressed: colors[8],
    primaryColorSuppl: colors[6],
    ...customPrimaryColor
  }
})
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme :theme-overrides="{
    common: {
      ...primaryAccentColor,
      borderRadius: '6px',
    },
    Drawer: {
      titleFontSize: '16px',
      headerPadding: '12px'
    }
  }" class="w-full h-full">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>
