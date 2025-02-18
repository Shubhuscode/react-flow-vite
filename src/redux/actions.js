// src/redux/actions.js
export const ADD_NODE = 'ADD_NODE';

export const addNode = (card) => ({
  type: ADD_NODE,
  payload: card,
});
