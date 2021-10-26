import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App/App';
import { RootStore } from './StoreRegistrator';
import { configure } from "mobx";

configure({ enforceActions: "never" });

ReactDOM.render(
    <div className="App">
        <Provider {...RootStore}>
            <App caUiStore={RootStore.caUiStore} routing={RootStore.routing} stores={RootStore.stores} />
        </Provider>
    </div>
    ,
    document.getElementById('root')
);