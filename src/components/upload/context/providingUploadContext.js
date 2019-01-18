// @flow
import React from 'react';
import type { ComponentType } from 'react';
import UploadContextProvider from './UploadContextProvider';

function getDisplayName(WrappedComponent: ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function providingUploadContext(WrappedComponent: ComponentType<{}>): ComponentType<{}> {
  function WithUploadContext() {
    return (
      <UploadContextProvider>
        <WrappedComponent />
      </UploadContextProvider>
    );
  }

  WithUploadContext.displayName = `ẀithUploadContext(${getDisplayName(WrappedComponent)})`;

  return WithUploadContext;
}

export default providingUploadContext;
