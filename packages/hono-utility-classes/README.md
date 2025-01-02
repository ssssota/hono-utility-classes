# hono-utility-classes

```tsx
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
const Component = ({children}) => <div className={c('flex', 'items-center')}>{children}</div>;
```
