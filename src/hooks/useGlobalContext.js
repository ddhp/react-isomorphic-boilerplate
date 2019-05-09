import { useSelector, useDispatch } from 'react-redux';
import { changeLocale, setScreenSize } from '../actions';

export function useGlobalContext() {
  const global = useSelector(state => state.global);
  const dispatch = useDispatch();
  return [global, {
    changeLocale: targetLocale => dispatch(changeLocale(targetLocale)),
    setScreenSize: size => dispatch(setScreenSize(size)),
  }];
}
export default useGlobalContext;
