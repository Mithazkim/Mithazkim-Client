import React from 'react';
import { useField, FieldAttributes } from 'formik';
interface IInputProps extends FieldAttributes<any> {}

const FormikInput: React.FC<IInputProps> = ({ ...props }) => {
  const [field, meta] = useField<any>(props);
  return (
    <>
      <input
        {...field}
        {...props}
        id={props.id || props.name}
        className={`form-control ${props.className || ''}`}
      ></input>
      {meta.touched && meta.error ? <div className='text-danger'>{meta.error}</div> : null}
    </>
  );
};

export default React.memo(FormikInput);
