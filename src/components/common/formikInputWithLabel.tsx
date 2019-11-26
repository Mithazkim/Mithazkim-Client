import React from 'react';
import { FieldAttributes } from 'formik';
import FormikInput from './formikInput';

interface IInputProps extends FieldAttributes<any> {
  label: string;
}

const FormikInputWithLabel = React.forwardRef(({ label, ...props }: IInputProps, ref?: React.Ref<HTMLInputElement>) => {
  return (
    <div className='form-group'>
      <label htmlFor={props.name}>{label}</label>
      <FormikInput ref={ref} {...props}></FormikInput>
    </div>
  );
});

export default React.memo(FormikInputWithLabel);
