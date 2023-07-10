import { useState } from 'react';

export const useForm = () => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    console.log(event);
  };
  return { values, handleChange, setValues };
};
