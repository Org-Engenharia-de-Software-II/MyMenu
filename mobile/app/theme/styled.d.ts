import 'styled-components/native';

import type { AppTheme } from './appTheme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
