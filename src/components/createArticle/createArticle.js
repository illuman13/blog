import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import showdown from 'showdown';

import * as actions from '../../storage/action';

import create from './createArticle.module.scss';

const CreateArticle = ({
  login,
  asyncCreateArticle,
  completeCreate,
  setFalseCompleteCreate,
  createBol,
  arrayArticle,
  resetArticle,
  asyncEditArticle,
  editArticle,
  setFalseCompleteEdit,
}) => {
  let RenderEditTags = arrayArticle
    ? arrayArticle.tagList.reduce((acc, item, index) => {
        acc.push({ id: `${index + 1}tag`, value: item });
        return acc;
      }, [])
    : [{ id: '1tag', value: '' }];
  const { slug } = useParams();
  useEffect(() => {
    return () => {
      setFalseCompleteCreate();
      setFalseCompleteEdit();
    };
  }, []);
  useEffect(() => {
    if (createBol) {
      resetArticle();
      reset();
      setTags([{ id: '1tag', value: '' }]);
    } else {
      reset();
      setTags(RenderEditTags);
    }
  }, [createBol]);
  useEffect(() => {
    if (completeCreate) {
      reset();
      setTags([{ id: '1tag', value: '' }]);
    }
  }, [completeCreate]);
  const [tags, setTags] = useState([{ id: '1tag', value: '' }]);
  const validationSchema = Yup.object().shape({
    text: Yup.string().required('text is required'),
    title: Yup.string().required('title is required'),
    ShortDescription: Yup.string().required('Short description is required'),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const RenderTags = () => {
    if (tags.length === 0) {
      setTags([{ id: '1tag', value: '' }]);
    }
    return tags.map((item, index) => {
      return (
        <div key={item.id}>
          <input
            type="text"
            {...register(`${item.id}`)}
            defaultValue={item.value}
            placeholder="Tag"
            className={create.create__inputt}
          />
          {tags.length !== 1 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setTags((s) => {
                  return s.filter((tag) => {
                    if (tag.id !== item.id) return tag;
                  });
                });
              }}
              className={create.button__delete}
            >
              Delete
            </button>
          ) : null}
          {index === tags.length - 1 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                return setTags((s) => {
                  return [
                    ...s,
                    {
                      id: `${parseInt(s[s.length - 1].id) + 1}tag`,
                      value: null,
                    },
                  ];
                });
              }}
              className={create.button__add}
            >
              Add tag
            </button>
          ) : null}
        </div>
      );
    });
  };
  function onSubmit(data) {
    const { ShortDescription: description, text: body, title } = data;
    const userTags = tags.reduce((acc, item) => {
      acc.push(data[item.id]);
      return acc;
    }, []);
    const article = {
      article: {
        title,
        description,
        body,
        tagList: userTags,
      },
    };
    if (createBol) {
      asyncCreateArticle(article);
    } else {
      asyncEditArticle(article, slug);
    }
    return false;
  }
  const converts = new showdown.Converter();
  return (
    <>
      {!login && !JSON.parse(localStorage.getItem('user')) ? <Navigate to="/sign-in" /> : null}
      {completeCreate || editArticle ? <Navigate to="/" /> : null}
      <div className={create.create}>
        <h3>{createBol ? 'Create new article' : 'Edit article'}</h3>
        <form className={create.create__form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">
            Title
            <input
              style={errors.title?.message ? { border: '1px solid red' } : null}
              type="text"
              {...register('title')}
              placeholder="Title"
              className={create.create__input}
              defaultValue={arrayArticle ? arrayArticle.title : ''}
            />
            <div className={create.invalidFeedback}>{errors.title?.message}</div>
          </label>
          <label htmlFor="">
            Short description
            <input
              style={errors.ShortDescription?.message ? { border: '1px solid red' } : null}
              type="text"
              {...register('ShortDescription')}
              placeholder="Title"
              className={create.create__input}
              defaultValue={arrayArticle ? arrayArticle.description : ''}
            />
            <div className={create.invalidFeedback}>{errors.ShortDescription?.message}</div>
          </label>
          <label htmlFor="">
            Text
            <textarea
              rows={10}
              style={errors.text?.message ? { border: '1px solid red' } : null}
              {...register('text')}
              placeholder="Text"
              className={create.create__textarea}
              defaultValue={arrayArticle ? converts.makeHtml(arrayArticle.body) : ''}
            />
            <div className={create.invalidFeedback}>{errors.text?.message}</div>
          </label>
          <label htmlFor="">
            <p>Tags</p>
            {RenderTags()}
          </label>
          <input type="submit" className={create.create__submit} value={createBol ? 'Create' : 'Edit'} />
        </form>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    completeCreate: state.completeCreate,
    arrayArticle: state.arrayArticle,
    createBol: state.createBol,
    editArticle: state.editArticle,
  };
};
export default connect(mapStateToProps, actions)(CreateArticle);
