import React from 'react';
import { useGlobalContext } from '../../../hooks/useGlobalContext';
import { BtnLocale } from '../../../components/BtnLocale';
import style from './style.scss'; // eslint-disable-line no-unused-vars

const debug = require('../../../stdout').default('containers/Home/LocaleExample');

export function LocaleExample() {
  const [{ locale }] = useGlobalContext();
  const sampleTexts = [{
    locale: 'en',
    text: 'this is english',
  }, {
    locale: 'zh',
    text: '這是中文',
  }, {
    locale: 'ja',
    text: 'これは日本語です',
  }];
  let targetText = sampleTexts.find(text => text.locale === locale) || {};
  targetText = targetText.text;
  debug('under rendering');
  return (
    <div styleName="style.main">
      <div styleName="style.child">
        <BtnLocale />
      </div>
      <p styleName="style.child">
        {targetText}
      </p>
    </div>
  );
}

export default LocaleExample;
