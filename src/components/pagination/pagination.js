import { Pagination } from 'antd';
import React, { Component } from 'react';
import './pagination.scss';
export default class Pag extends Component {
  render() {
    return (
      <Pagination
        className="pagination"
        defaultCurrent={1}
        current={Number(localStorage.getItem('page'))}
        total={50}
        onChange={(value) => {
          localStorage.setItem('page', String(value));
          this.props.setPageFn(Number(localStorage.getItem('page')));
        }}
      />
    );
  }
}
