import api from './api';

function setPost(post) {
  return {
    type: 'SET_POST',
    payload: post,
  };
}

function setComments(comments) {
  return {
    type: 'SET_COMMENTS',
    payload: comments,
  };
}

function setUser(user) {
  return {
    type: 'SET_USER',
    payload: user,
  };
}

/* function setSinglePost(post) {
  return {
    type: 'SET_SINGLE_POST',
    payload: post,
  };
} */

function postsNextPage() {
  return async (dispatch, getState) => {
    const state = getState();
    const currentPage = state.get('posts').get('page');

    const posts = await api.posts.getList(currentPage);
    dispatch(setPost(posts));

    return posts;
  };
}

function loadCommentsForPost(postId) {
  return async (dispatch) => {
    const comments = await api.posts.getComments(postId);
    dispatch(setComments(comments));

    return comments;
  };
}

function loadUser(userId) {
  return async (dispatch) => {
    const user = await api.users.getSingle(userId);
    dispatch(setUser(user));

    return user;
  };
}

function loadUserPosts(userId) {
  return async (dispatch) => {
    const posts = await api.users.getPosts(userId);
    dispatch(setPost(posts));

    return posts;
  };
}

function loadSinglePost(postId) {
  return async (dispatch) => {
    const post = await api.posts.getSingle(postId);
    dispatch(setPost(post));

    return post;
  };
}

export default {
  setPost,
  setComments,
  setUser,
  // setSinglePost,
  postsNextPage,
  loadCommentsForPost,
  loadUser,
  loadSinglePost,
  loadUserPosts,
};
