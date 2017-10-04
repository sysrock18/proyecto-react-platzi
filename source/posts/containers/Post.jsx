import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../api.js';

import styles from './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: props.user || null,
      comments: []
    }
  }

  async componentDidMount() {
    const [
      user,
      comments
    ] = await Promise.all([
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
      api.posts.getComments(this.props.id)
    ]);

    this.setState({
      loading: false,
      user: user || this.state.user,
      comments
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
              hay {this.state.comments.length} comentarios
            </span>
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string
};

export default Post;