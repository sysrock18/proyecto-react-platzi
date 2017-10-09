import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import api from '../../api';

import styles from './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: props.user || null,
      comments: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [
      user,
      comments,
    ] = await Promise.all([
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
      api.posts.getComments(this.props.id),
    ]);

    this.setState({
      loading: false,
      user: user || this.state.user,
      comments,
    });
  }

  render() {
    return (
      <article id={`post-${this.props.id}`} className={styles.post}>

        <h2 className={styles.title}>
          <Link to={`/post/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>

        <p className={styles.body}>{this.props.body}</p>

        {!this.state.loading && (
          <div className={styles.meta}>
            <Link to={`/user/${this.state.user.id}`} className={styles.user}>
              {this.state.user.name}
            </Link>
            <span className={styles.comments}>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.state.comments.length,
                }}
              />
            </span>
            <Link to={`/post/${this.props.id}`}>
              <FormattedMessage id="post.meta.readMore" />
            </Link>
          </div>
        )}
      </article>
    );
  }
}

Post.defaultProps = {
  user: null,
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default Post;
