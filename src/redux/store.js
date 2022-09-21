import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import { RootReducer } from './Reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter']
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

export const configStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store)
    return { store, persistor }
}