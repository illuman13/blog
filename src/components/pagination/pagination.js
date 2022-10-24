import { Pagination } from 'antd';
import React, { Component } from 'react';
import './pagination.scss';
export default class Pag extends Component {
  render() {
    return (
      <Pagination
        className="pagination"
        defaultCurrent={1}
        current={this.props.page}
        total={50}
        onChange={(value) => this.props.setPageFn(value)}
      />
    );
  }
}
