import { useRedux } from './useRedux';
import { dummy as dummyAction } from '../actions';

export default function useDummy() {
  const [state, dispatch] = useRedux();
  const triggerDummy = () => {
    dispatch(dummyAction());
  };
  return [state.pages.home.howManyDummies, triggerDummy];
}
