import mount from './template';
import Routes from '../routes/main';
import rootReducer from '../reducers/main';
import './global.scss';

export default mount(Routes, rootReducer);
