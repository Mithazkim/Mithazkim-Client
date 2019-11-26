import React, { useEffect, useState, useRef } from 'react';
import Dictionary from 'dictionary/dictionary';
import { RouteComponentProps } from 'react-router-dom';
import ApiService from 'services/apiService';
import { Formik, Form, FormikHelpers } from 'formik';
import FormikInputWithLabel from 'components/common/formikInputWithLabel';
import ButtonWithLoader from 'components/common/buttonWithLoader';
import FormikSelect from 'components/common/formikSelect';
import * as yup from 'yup';
import { toast } from 'react-toastify';

interface AddFoodFrom {
  name: string;
  berakhahId: string;
}

interface AddFoodProps extends RouteComponentProps {}

const AddFood: React.FC<AddFoodProps> = props => {
  const [berakhot, setBerakhot] = useState<any[]>();
  const [error, setError] = useState('');

  const inputName = useRef<HTMLInputElement>(null);

  const initialValues: AddFoodFrom = { name: '', berakhahId: '' };

  const addFoodSchema = yup.object({
    name: yup.string().required(Dictionary.admin.AddFood.food_name_missing),
    berakhahId: yup.string().required(Dictionary.admin.AddFood.select_berakhah_missing)
  });

  useEffect(() => {
    ApiService.getBerakhah().then(data => {
      setBerakhot(data);
    });
  }, []);

  const handleSubmit = (values: AddFoodFrom, formikActions: FormikHelpers<AddFoodFrom>) => {
    setError('');

    ApiService.addFood(values)
      .then(() => {
        toast.success('ברכה נוספה בהצלחה');

        formikActions.resetForm();

        if (inputName && inputName.current) {
          inputName.current.focus();
        }
      })
      .catch(error => {
        setError(error.response.data.msg);
      })
      .finally(() => formikActions.setSubmitting(false));
  };

  return (
    <div>
      <h2>{Dictionary.admin.AddFood.header}</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={addFoodSchema}>
        {({ isSubmitting }) => (
          <Form name='add-food'>
            <FormikInputWithLabel
              label={Dictionary.admin.AddFood.food_name}
              name='name'
              autoComplete='off'
              autoFocus
              ref={inputName}
            ></FormikInputWithLabel>

            <FormikSelect
              label={Dictionary.admin.AddFood.select_berakhah}
              name='berakhahId'
              options={berakhot ? berakhot.map(berakhah => ({ label: berakhah.shortName, value: berakhah._id })) : []}
            ></FormikSelect>

            <ButtonWithLoader isLoading={isSubmitting} type='submit' className={'btn btn-block btn-primary mt-4 '}>
              {Dictionary.admin.AddFood.add_btn}
            </ButtonWithLoader>
          </Form>
        )}
      </Formik>
      {error && <div className='alert alert-danger mt-3'>{error}</div>}
    </div>
  );
};

export default AddFood;
