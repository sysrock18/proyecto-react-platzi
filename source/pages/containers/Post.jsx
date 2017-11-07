import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostBody from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import Comment from '../../comments/components/Comment';

import api from '../../api';

import actions from '../../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      document.title = 'Post';
    }
    this.initialFetch();
  }

  async initialFetch() {
    if (this.props.post && this.props.comments.size > 0) {
      return this.setState({ loading: false });
    }

    await Promise.all([
      this.props.actions.loadSinglePost(this.props.match.params.id),
      this.props.actions.loadCommentsForPost(this.props.match.params.id),
    ]);

    return this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section name="Post">
        <PostBody
          key={this.props.post.get('id')}
          {...this.props.post.toJS()}
        />

        <section>
          {this.props.comments
            .map(comment => (
              <Comment key={comment.get('id')} {...comment.toJS()} />
            )).toArray()
          }
        </section>
      </section>
    );
  }
}

Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state, props) {
  return {
    post: state.get('posts').get('entities').get(Number(props.match.params.id)),
    comments: state.get('comments').filter(comment => comment.get('postId') === Number(props.match.params.id)),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
