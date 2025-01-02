# hono-utility-classes

```tsx
// renderer.ts
import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
export const renderer = jsxRenderer(({ children }) => (
  <html>
    <head><Style /></head>
    <body>{children}</body>
  </html>
));
// composer.ts
import { createUtilityClassesComposer, DEFAULT, ARBITRARY } from 'hono-utility-classes'; // or 'hono-utility-classes/dom'
const c = createUtilityClassesComposer((css) => ({
  flex: css`display:flex;`,
  items: {
    [DEFAULT]: (val: 'start' | 'center' | 'end') => css`align-items:${val};`,
  }
  p: {
    [DEFAULT]: (val: number) => css`padding:${val * 4}px;`,
    [ARBITRARY]: (val: string) => css`padding:${val};`
  }
}));
// Component.tsx
import { c } from './composer';
const Component = ({children}) => <div className={c('flex', 'items-center', 'p-4')}>{children}</div>; // <- display:flex; align-items:center; padding:16px;
```
