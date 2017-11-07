import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Post from '../../posts/containers/Post';
import api from '../../api';

import actions from '../../actions';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    await Promise.all([
      this.props.actions.loadUser(this.props.match.params.id),
      this.props.actions.loadUserPosts(this.props.match.params.id),
    ]);

    this.setState({
      loading: false,
    });
  }

  render() {
    return (
      <section name="Profile">
        <h2>
          <FormattedMessage
            id="title.profile"
            values={{
              name: this.props.user.get('name'),
            }}
          />
        </h2>

        <fieldset>
          <FormattedMessage id="profile.field.basic" tagName="legend" />
          {this.props.user.get('email')}
        </fieldset>

        {this.props.user.get('address') && (
          <fieldset>
            <legend>Address</legend>
            <FormattedMessage id="profile.field.address" tagName="legend" />
            <address>
              {this.props.user.get('address').street}<br />
              {this.props.user.get('address').suite}<br />
              {this.props.user.get('address').city}<br />
              {this.props.user.get('address').zipcode}<br />
            </address>
          </fieldset>
        )}

        <section>
          {this.props.posts
            .map(post => (<Post key={post.get('id')} {...post.toJS()} user={this.props.user.toJS()} />))
            .toArray()
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
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state, props) {
  return {
    user: state.get('users').get(Number(props.match.params.id)),
    posts: state.get('posts').get('entities'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
