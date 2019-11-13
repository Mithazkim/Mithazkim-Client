import React from 'react';
import { FieldAttributes } from 'formik';
import FormikInput from './formikInput';

interface IInputProps extends FieldAttributes<any> {
  label: string;
}

const FormikInputWithLabel: React.FC<IInputProps> = ({ label, ...props }) => {
  return (
    <div className='form-group'>
      <label htmlFor={props.name}>{label}</label>
      <FormikInput {...props}></FormikInput>
    </div>
  );
};

export default React.memo(FormikInputWithLabel);
