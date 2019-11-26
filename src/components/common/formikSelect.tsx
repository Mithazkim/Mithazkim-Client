import React from 'react';
import { useField, FieldAttributes } from 'formik';
import Dictionary from 'dictionary/dictionary';

interface ISelectProps extends FieldAttributes<any> {
  options: { label: string; value: string | number }[];
}

const FormikSelect: React.FC<ISelectProps> = ({ options, label, ...props }) => {
  const [field, meta] = useField<any>(props);
  return (
    <div className='form-group'>
      <label htmlFor={props.id}>{label}</label>
      <select {...field} {...props} className='form-control'>
        <option key='' value='' selected disabled hidden>
          {Dictionary.common.formikSelect.select + ' ' + label}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? <div className='text-danger'>{meta.error}</div> : null}
    </div>
  );
};

export default React.memo(FormikSelect);
