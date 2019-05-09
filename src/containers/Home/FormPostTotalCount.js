import React/* , { useEffect } */ from 'react';
import { useSelector } from 'react-redux';
import useDummy from '../../hooks/useDummy';

import style from './style.scss'; // eslint-disable-line no-unused-vars

const debug = require('../../stdout').default('containers/Home/FormPostTotalCount');

export default function FormPostTotalCount() {
  const posts = useSelector(state => state.pages.home.posts);
  const [dummyTimes, triggerDummy] = useDummy();
  debug('under rendering');

  return (
    <div styleName="style.posts__total">
      <small styleName="style.posts__small">
        this component uses react hook
      </small>
      <div>
        Total&nbsp;
        {posts.length}
        &nbsp;Posts
      </div>
      <div styleName="style.posts__dummy">
        {dummyTimes}
        &nbsp;times dummy
      </div>
      <button type="button" onClick={triggerDummy}>
        Dispatch Dummy
      </button>
    </div>
  );
}
