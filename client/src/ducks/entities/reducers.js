import * as _ from "lodash";
import { booksReducer } from "../books/reducer";
import { authorsReducer } from "../authors/reducer";
import { reviewsReucer } from "../reviews/reducer";

const allEntities = ["books", "authors", "reviews"];

const defaultState = allEntities.reduce(
  (acc, entity) => ({
    ...acc,
    [entity]: {
      byId: {},
      allIds: [],
    },
  }),
  {}
);

const entityReducer = (entity, state = { allIds: [], byId: {} }, action) => {
  switch (entity) {
    case "books":
      return booksReducer(entity, state, action);
    case "authors":
      return authorsReducer(entity, state, action);
    case "reviews":
      return reviewsReucer(entity, state, action);
    default:
      return state;
  }
};

export const entities = (state = defaultState, action) => {
  if (!action.meta || !action.meta.actionType) return state;
  return {
    ...state,
    ...Object.keys(action.payload).reduce(
      (acc, entity) => ({
        ...acc,
        [entity]: entityReducer(entity, state[entity], action),
      }),
      {}
    ),
  };
};
