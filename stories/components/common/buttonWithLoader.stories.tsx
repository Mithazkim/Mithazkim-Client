import React from 'react';
import ButtonWithLoader from 'components/common/buttonWithLoader';
import Dictionary from 'dictionary/dictionary';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Button with loader',
  component: ButtonWithLoader
};

export const _default = () => (
  <ButtonWithLoader onClick={action('clicked')} isLoading={false} className='btn btn-primary'>
    {Dictionary.login.login_btn}
  </ButtonWithLoader>
);
export const withLoading = () => (
  <ButtonWithLoader onClick={action('clicked')} isLoading={true} className='btn btn-primary'>
    {Dictionary.login.login_btn}
  </ButtonWithLoader>
);
