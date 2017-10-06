import React, { PropTypes } from 'react';

function Comment(props) {
  return (
    <article id={`comment-${props.id}`}>
      <div>
        By: <a href={`mailto:${props.email}`}>{props.name}</a>
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
