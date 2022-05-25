import React from 'react';

import './LoginBox.scss';

const LoginForm = ({ onSubmit, disabled }) => {
  console.log(process.env.REACT_APP_API_ENDPOINT);
  return (
    <form onSubmit={onSubmit} autoComplete='off'>
      <div className='form-block__input-wrapper'>
        <div className='form-group form-group--login'>
          <Input type='text' id='email' label='Email nhân viên' />
          <Input type='text' id='code' label='Mã nhân viên' />
        </div>
      </div>
      <button
        disabled={disabled}
        className='button button--primary full-width'
        type='submit'
      >
        Vào chơi
      </button>
    </form>
  );
};

const Input = ({ id, type, label }) => (
  <input
    className='form-group__input'
    type={type}
    id={id}
    placeholder={label}
    autoComplete='off'
  />
);

const LoginBox = ({ onSubmit, disabled }) => {
  return (
    <div className='login-container'>
      <div className={`form-block-wrapper form-block-wrapper--is-login`}></div>
      <section className={`form-block form-block--is-login`}>
        <LoginForm onSubmit={onSubmit} disabled={disabled} />
      </section>
    </div>
  );
};

export default LoginBox;
