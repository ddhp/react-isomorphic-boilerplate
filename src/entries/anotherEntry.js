import mount from './template';
import Routes from '../routes/anotherEntry';
import rootReducer from '../reducers/anotherEntry';
import './global.scss';

mount(Routes, rootReducer);
