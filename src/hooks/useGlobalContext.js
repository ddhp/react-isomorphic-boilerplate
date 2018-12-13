import { useRedux } from './useRedux';
import { changeLocale, setScreenSize } from '../actions';

export function useGlobalContext() {
  const [state, dispatch] = useRedux();
  return [state.global, {
    changeLocale: targetLocale => dispatch(changeLocale(targetLocale)),
    setScreenSize: size => dispatch(setScreenSize(size)),
  }];
}
export default useGlobalContext;
