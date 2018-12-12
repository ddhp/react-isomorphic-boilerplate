import React from 'react';
import { useGlobalContext } from '../../hooks/useGlobalContext';

export function BtnLocale() {
  const [{ locale, localeOptions }, { changeLocale }] = useGlobalContext();
  const onChange = event => changeLocale(event.target.value);

  return (
    <select
      value={locale}
      onChange={onChange}
    >
      {localeOptions.map(opt => (
        <option
          value={opt.id}
          key={opt.id}
        >
          {opt.name}
        </option>
      ))}
    </select>
  );
}

export default BtnLocale;
