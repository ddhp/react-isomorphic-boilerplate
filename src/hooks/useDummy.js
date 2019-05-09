import { useSelector, useDispatch } from 'react-redux';
import { dummy as dummyAction } from '../actions';

export default function useDummy() {
  const howManyDummies = useSelector(state => state.pages.home.howManyDummies);
  const dispatch = useDispatch();
  const triggerDummy = () => {
    dispatch(dummyAction());
  };
  return [howManyDummies, triggerDummy];
}
