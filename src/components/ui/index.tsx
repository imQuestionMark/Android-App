import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

export * from './button';
export * from './checkbox';
export { default as colors } from './colors';
export * from './dotted-line';
export * from './error-message';
export * from './focus-aware-status-bar';
export * from './image';
export * from './input';
export * from './list';
export * from './modal';
export * from './progress-bar';
export * from './text';
export * from './utils';

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: 'style',
  },
});
