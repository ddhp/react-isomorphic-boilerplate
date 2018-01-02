/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
