import Layout from './Component/Layout/Layout'
import { Route, Switch } from 'react-router-dom';
import catagory from './Container/Catagory/Catagory';
import { Provider } from 'react-redux';
import { configStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  let {store, persistor} = configStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Switch>
            <Route path={'/catagory'} exact component={catagory} />
          </Switch>
        </Layout>
      </PersistGate>
    </Provider>

  );
}

export default App;
