// Reexport the native module. On web, it will be resolved to CustomAudioModule.web.ts
// and on native platforms to CustomAudioModule.ts
export { default } from './src/CustomAudioModule';
export { default as CustomAudioModuleView } from './src/CustomAudioModuleView';
export * from  './src/CustomAudioModule.types';
