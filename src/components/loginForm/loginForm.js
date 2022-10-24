import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import * as actions from '../../storage/action';

import './loginForm.scss';

const LoginForm = ({ asyncSignIn, errSignIn, login }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(data) {
    const { email, password } = data;
    const user = {
      user: {
        email: email,
        password: password,
      },
    };
    asyncSignIn(user);
    return false;
  }
  const renderForm = (
    <div className="signUp">
      <h3>Sign In</h3>
      <form className="signUp__form" onSubmit={handleSubmit(onSubmit)}>
        {errSignIn ? <div style={{ color: 'red' }}>Incorrect email or password</div> : null}
        <label htmlFor="">
          Email address
          <input
            type="email"
            {...register('email')}
            style={errors.email?.message || errSignIn ? { border: '1px solid red' } : null}
            placeholder="Email address"
            className="signUp__input"
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </label>
        <label htmlFor="">
          Password
          <input
            type="password"
            style={errors.password?.message || errSignIn ? { border: '1px solid red' } : null}
            {...register('password')}
            placeholder="Password"
            className="signUp__input"
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </label>
        <input type="submit" value="Login" className="signUp__submit" />
        <p>
          Already have an account?
          <Link to="/sign-up"> Sing Up</Link>
        </p>
      </form>
    </div>
  );
  const item = login ? <Navigate to="/" /> : renderForm;
  return <>{item}</>;
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    errSignIn: state.errSignIn,
  };
};
export default connect(mapStateToProps, actions)(LoginForm);
