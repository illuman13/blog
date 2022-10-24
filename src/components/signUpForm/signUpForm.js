import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import * as actions from '../../storage/action';

import './signUpForm.scss';

const SignUpForm = ({ login, errSignUp, asyncSignUp }) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Your username needs to be at least 3 characters.')
      .max(20, 'Your username must contain no more than 20 characters.'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password must contain no more than 40 characters.'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(data) {
    const { Email, password, username } = data;
    const user = {
      user: {
        username,
        email: Email,
        password: password,
      },
    };
    asyncSignUp(user);
    return false;
  }
  const renderForm = (
    <div className="signUp">
      <h3>Create new account</h3>
      <form className="signUp__form" onSubmit={handleSubmit(onSubmit)}>
        {errSignUp ? <div style={{ color: 'red' }}>the user with this email or name is already registered</div> : null}
        <label htmlFor="">
          Username
          <input
            type="text"
            placeholder="Username"
            style={errors.username?.message || errSignUp ? { border: '1px solid red' } : null}
            {...register('username')}
            className="signUp__input"
            required
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </label>
        <label htmlFor="">
          Email address
          <input
            type="email"
            style={errSignUp ? { border: '1px solid red' } : null}
            placeholder="Email address"
            {...register('Email')}
            className="signUp__input"
            required
          />
        </label>
        <label htmlFor="">
          Password
          <input
            type="password"
            style={errors.password?.message ? { border: '1px solid red' } : null}
            placeholder="Password"
            {...register('password')}
            className="signUp__input"
            required
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </label>
        <label htmlFor="">
          Repeat Password
          <input
            style={errors.confirmPassword?.message ? { border: '1px solid red' } : null}
            type="password"
            placeholder="Password"
            {...register('confirmPassword')}
            className="signUp__input"
            required
          />
          <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        </label>
        <label htmlFor="">
          <input type="checkbox" className="singUp__checkbox" required />I agree to the processing of my personal
          information
        </label>
        <input type="submit" value="Create" className="signUp__submit" />
        <p>
          Already have an account?
          <Link to="/sign-in"> Sing In</Link>
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
    errSignUp: state.errSignUp,
  };
};
export default connect(mapStateToProps, actions)(SignUpForm);
