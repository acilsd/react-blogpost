import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPost, deletePost, cleanState } from '../actions/index';
import ProgressBar from './ProgressBar';

class ShowPost extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }
  componentWillUnmount() {
    this.props.cleanState(this.props.params.id);
  }
  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
    .then(() => {
      this.context.router.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if(!this.props.post) {
      return <ProgressBar />;
    }

    return (
      <div class="container">
        <h4 class="post-title">{post.title}</h4>
        <h4 class="post-category">{post.categories}</h4>
        <p class="post-text">{post.content}</p>
        <div class="post-buttons">
          <Link class="btn btn-primary custom" to='/'>Back to main page
          </Link>
          <button
            class="btn btn-danger custom"
            onClick={this.onDeleteClick.bind(this)}
          >Delete this post
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost, cleanState })(ShowPost);
