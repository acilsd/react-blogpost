import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li class="list-group-item" key={post.id}>
          <Link to={'/' + post.id}>
            <span class="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div class="container">
        <h2>Recent Posts:</h2>
        <ul class="list-group">
          <li class="list-group-item">
            <strong class="pull-xs-right">Description</strong>
            <strong>Post title</strong>
          </li>
          {this.renderPosts()}
        </ul>
        <div class="list-group__btn-container">
          <Link to='/add' class="btn btn-primary custom">
            New post
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
