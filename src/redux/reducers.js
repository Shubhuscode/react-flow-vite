// src/redux/reducer.js

const initialState = {
    nodes: [],
    edges: []
  };
  
  const flowReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_NODE':
        return {
          ...state,
          nodes: [...state.nodes, action.payload],
        };
      case 'REMOVE_NODE':
        return {
          ...state,
          nodes: state.nodes.filter(node => node.id !== action.payload),
        };
      case 'SET_NODES':
        return {
          ...state,
          nodes: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default flowReducer;
  