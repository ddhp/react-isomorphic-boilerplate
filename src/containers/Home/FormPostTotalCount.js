import React/* , { useEffect } */ from 'react';
import { useRedux } from '../../hooks/useRedux';
import { dummy as dummyAction } from '../../actions';

import style from './style.scss'; // eslint-disable-line no-unused-vars

export default function FormPostTotalCount() {
  const [state, dispatch] = useRedux();
  const triggerDummy = () => {
    dispatch(dummyAction());
  };

  return (
    <div styleName="style.posts__total">
      <small styleName="style.posts__small">
        this component uses react hook
      </small>
      <div>
        Total&nbsp;
        {state.pages.home.posts.length}
        &nbsp;Posts
      </div>
      <div styleName="style.posts__dummy">
        {state.pages.home.howManyDummies}
        &nbsp;times dummy
      </div>
      <button type="button" onClick={triggerDummy}>
        Dispatch Dummy
      </button>
    </div>
  );
}
