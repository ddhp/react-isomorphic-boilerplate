import React from 'react';
import { useGlobalContext } from '../../../hooks/useGlobalContext';
import { BtnLocale } from '../../../components/BtnLocale';
import style from './style.scss'; // eslint-disable-line no-unused-vars

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
  console.log('rendering LocaleExample');
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
