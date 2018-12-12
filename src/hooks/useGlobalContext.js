import { useRedux } from './useRedux';
import { changeLocale } from '../actions';

export function useGlobalContext() {
  const [state, dispatch] = useRedux();
  return [state.global, {
    changeLocale: targetLocale => dispatch(changeLocale(targetLocale)),
  }];
}
export default useGlobalContext;
