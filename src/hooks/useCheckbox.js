import { useState, useEffect } from 'react';

export const useCheckbox = () => {
  const [checked, setChecked] = useState(false);
  const chengeCheckbox = (e) => {
    setChecked(e.target.checked);
  };
  useEffect(() => {
    setChecked(checked);
    // console.log('FilterCheckbox', checked);
  }, [setChecked, checked]);
  return { checked, setChecked, chengeCheckbox };
};
