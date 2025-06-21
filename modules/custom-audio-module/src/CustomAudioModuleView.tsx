import { requireNativeView } from 'expo';
import * as React from 'react';

import { CustomAudioModuleViewProps } from './CustomAudioModule.types';

const NativeView: React.ComponentType<CustomAudioModuleViewProps> =
  requireNativeView('CustomAudioModule');

export default function CustomAudioModuleView(props: CustomAudioModuleViewProps) {
  return <NativeView {...props} />;
}
