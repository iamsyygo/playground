import { NIcon } from 'naive-ui';
import { Component, h } from 'vue';

export function createRendererWithIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export function createRendererWithClass(
  renderedClass: string,
  size = 14,
  color: string = 'var(--n-text-color)'
) {
  return () =>
    h('i', {
      class: 'w-1em h-1em ' + renderedClass,
      style: { color, fontSize: size + 'px', display: 'inline-block' }
    });
}
