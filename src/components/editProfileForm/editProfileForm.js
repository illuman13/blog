import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from 'react-redux';

import * as actions from '../../storage/action';

import './editProfileForm.scss';

const EditProfileForm = ({ userInfo, asyncEditProfile, completeEdit, setCompleteEdit }) => {
  useEffect(() => {
    return () => setCompleteEdit();
  }, []);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(5, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password must contain no more than 40 characters.'),
    email: Yup.string().required('Confirm Password is required'),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(data) {
    const { email, password, username, image } = data;
    const user = {
      user: {
        username,
        email,
        password,
        image,
      },
    };
    asyncEditProfile(user);
    reset();
    return false;
  }
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  let localName = user.username || userInfo.username;
  let localEmail = user.email || userInfo.email;
  let localImage = user.image || userInfo.image;
  return (
    <div className="signUp">
      <h3>Edit Profile</h3>
      <form className="signUp__form" onSubmit={handleSubmit(onSubmit)}>
        {completeEdit ? <div style={{ color: 'green' }}>data was successfully updated</div> : null}
        <label htmlFor="">
          Username
          <input
            type="text"
            {...register('username')}
            placeholder="Username"
            className="signUp__input"
            defaultValue={localName}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </label>
        <label htmlFor="">
          Email address
          <input
            type="email"
            {...register('email')}
            placeholder="Email address"
            className="signUp__input"
            defaultValue={localEmail}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </label>
        <label htmlFor="">
          New Password
          <input type="password" {...register('password')} placeholder="New Password" className="signUp__input" />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </label>
        <label htmlFor="">
          Avatar image (url)
          <input
            type="url"
            {...register('image')}
            placeholder="Avatar image"
            className="signUp__input"
            defaultValue={localImage}
          />
        </label>
        <input type="submit" value="Save" className="signUp__submit" />
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    completeEdit: state.completeEdit,
  };
};
export default connect(mapStateToProps, actions)(EditProfileForm);
