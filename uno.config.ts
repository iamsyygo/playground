import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetIcons(), presetUno(), presetAttributify()],
  preflights: [],
  theme: {
    spacing: {}
  },
  rules: [['flex-center', { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }]]
});
