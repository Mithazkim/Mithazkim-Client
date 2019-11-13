import React from 'react';
import Loader from 'react-loaders';

interface IButtonWithLoaderProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loaderClassName?: any;
  isLoading: boolean;
}

const ButtonWithLoader: React.FC<IButtonWithLoaderProps> = ({ loaderClassName, isLoading, ...props }) => (
  <button {...props}>
    {isLoading ? (
      <Loader type='ball-pulse' active={isLoading} innerClassName={` ${loaderClassName || 'flex-center'}`} />
    ) : (
      props.children
    )}
  </button>
);

export default React.memo(ButtonWithLoader);
