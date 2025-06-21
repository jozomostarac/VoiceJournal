import * as React from 'react';

import { CustomAudioModuleViewProps } from './CustomAudioModule.types';

export default function CustomAudioModuleView(props: CustomAudioModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
