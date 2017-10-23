import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Post from '../../posts/containers/Post';
import api from '../../api';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      document.title = 'User';
    }
    this.initialFetch();
  }

  async initialFetch() {
    const [
      user,
      posts,
    ] = await Promise.all([
      api.users.getSingle(this.props.match.params.id),
      api.users.getPosts(this.props.match.params.id),
    ]);

    this.setState({
      loading: false,
      user,
      posts,
    });
  }

  render() {
    return (
      <section name="Profile">
        <h2>
          <FormattedMessage
            id="title.profile"
            values={{
              name: this.state.user.name,
            }}
          />
        </h2>

        <fieldset>
          <FormattedMessage id="profile.field.basic" tagName="legend" />
          {this.state.user.email}
        </fieldset>

        {this.state.user.address && (
          <fieldset>
            <legend>Address</legend>
            <FormattedMessage id="profile.field.address" tagName="legend" />
            <address>
              {this.state.user.address.street}<br />
              {this.state.user.address.suite}<br />
              {this.state.user.address.city}<br />
              {this.state.user.address.zipcode}<br />
            </address>
          </fieldset>
        )}

        <section>
          {this.state.posts
            .map(post => (<Post key={post.id} {...post} user={this.state.user} />))
          }
        </section>

      </section>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Profile;
