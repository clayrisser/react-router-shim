import React, { Component, FC } from 'react';
import { Reducer } from 'redux';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import history from '../history';
import { Provider, ProviderProps } from '../types';

export interface UnknownProps {
  [key: string]: any;
}

export default function withProvider(
  ReduxProvider: Provider,
  storeContext: any,
  providerProps?: ProviderProps
): (App: FC | typeof Component) => FC {
  return (App: FC | typeof Component) => {
    return (props: UnknownProps) => (
      <ReduxProvider
        {...providerProps}
        reducers={{
          router: connectRouter(history) as Reducer,
          ...(providerProps?.reducers || {})
        }}
        middlewares={[
          ...(providerProps?.middlewares || []),
          routerMiddleware(history)
        ]}
      >
        <ConnectedRouter history={history} context={storeContext}>
          <App {...props} />
        </ConnectedRouter>
      </ReduxProvider>
    );
  };
}

export * from 'connected-react-router';
