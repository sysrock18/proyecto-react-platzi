import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../posts/containers/Post.jsx';

import api from '../../api.js'; 

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      posts: [],
      loading: true
    };
  }

  async componentDidMount() {
    const posts = await api.posts.getList(this.state.page);

    this.setState({
      page: this.state.page + 1,
      posts,
      loading: false
    })
  }

  render() {
    return (
      <section name="Home">
        <h1>Home</h1>

        <Link to="/user/1">
          Go to Profile
        </Link>

        <section>
          {this.state.loading && 
            (<h2>Cargando Posts...</h2>)
          }
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)}
        </section>

      </section>
    );
  }
}

export default Home;