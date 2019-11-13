import React, { Component } from 'react';
import ButtonWithLoader from 'components/common/buttonWithLoader';
import { Form, Formik, FormikHelpers } from 'formik';
import FormikInputWithLabel from 'components/common/formikInputWithLabel';
import Dictionary from 'dictionary/dictionary';
import styles from './login.module.scss';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';

interface LoginProps extends Partial<RouteComponentProps> {}
interface LoginState {
  error: '';
}

interface LoginForm {
  username: string;
  password: string;
}

export default class Login extends Component<LoginProps, LoginState> {
  initialValues: LoginForm = { username: '', password: '' };

  state: LoginState = { error: '' };

  loginSchema = yup.object({
    username: yup.string().required(Dictionary.login.username_missing),
    password: yup.string().required(Dictionary.login.password_missing)
  });

  handleSubmit = (values: LoginForm, formikActions: FormikHelpers<LoginForm>) => {
    axios
      .post<any>(process.env.REACT_APP_SERVER_API + '/api/user/login', values)
      .then(() => this.props.history!.replace('/'))
      .catch(error => this.setState({ error: error.response.data.msg }))
      .finally(() => formikActions.setSubmitting(false));
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-5 mx-auto'>
            <div className='mb-4'>
              <div className='col-md-12 text-center'>
                <h1>{Dictionary.login.header}</h1>
              </div>
            </div>
            <Formik initialValues={this.initialValues} onSubmit={this.handleSubmit} validationSchema={this.loginSchema}>
              {({ isSubmitting }) => (
                <Form name='login'>
                  <FormikInputWithLabel
                    label={Dictionary.login.username}
                    name='username'
                    id='username'
                  ></FormikInputWithLabel>

                  <FormikInputWithLabel
                    label={Dictionary.login.password}
                    type='password'
                    name='password'
                    id='password'
                  ></FormikInputWithLabel>

                  <ButtonWithLoader
                    isLoading={isSubmitting}
                    type='submit'
                    className={'btn btn-block btn-primary mt-4 ' + styles.loginBtn}
                  >
                    {Dictionary.login.login_btn}
                  </ButtonWithLoader>
                </Form>
              )}
            </Formik>
            {this.state.error && <div className='alert alert-danger mt-3'>{this.state.error}</div>}
          </div>
        </div>
      </div>
    );
  }
}
