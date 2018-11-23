// react is very likely to provide an official hook for redux
// https://reactjs.org/docs/hooks-faq.html#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router
import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

export function useRedux() {
  const { storeState: state, store: { dispatch } } = useContext(ReactReduxContext);
  return [state, dispatch];
}

export default useRedux;
