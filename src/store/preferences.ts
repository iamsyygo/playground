import { ref } from 'vue';

export const designrReferenceColors = [
  { name: '薄暮', primary: '#f5222d' },
  { name: '火山', primary: '#fa541c' },
  { name: '日暮', primary: '#faad14' },
  { name: '明青', primary: '#13c2c2' },
  { name: '极光绿', primary: '#52c41a' },
  { name: '拂晓蓝', primary: '#1890ff' },
  { name: '极客蓝', primary: '#2f54eb' },
  { name: '酱紫', primary: '#722ed1' },
  { name: '法式洋红', primary: '#eb2f96' }
];

export interface PreferenceType {
  theme: 'dark' | 'light' | 'auto';
  themeValue: 'dark' | 'light';
  locale: string;
  primaryColor: string;
  headerHeight: number;
}

/** 系统首选项 */
export const preferenceState = ref<PreferenceType>({
  locale: 'en',
  theme: 'light',
  themeValue: 'light',
  primaryColor: '#1677ff',
  headerHeight: 50
});
