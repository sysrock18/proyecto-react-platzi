import React, { PropTypes } from 'react';
import { FormattedHTMLMessage } from 'react-intl';

function Comment(props) {
  return (
    <article id={`comment-${props.id}`}>
      <div>
        <FormattedHTMLMessage
          id="comment.meta.author"
          values={{
            email: props.email,
            name: props.name,
          }}
        />
      </div>

      <p>
        {props.body}
      </p>
    </article>
  );
}

Comment.defaultProps = {
  email: '',
  name: '',
  body: '',
};

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.string,
};

export default Comment;
