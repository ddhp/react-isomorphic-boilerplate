let mockState;
let dispatchSpy = () => {};

const configureStore = () => {
  return {
    getState: () => {
      return mockState;
    },
    dispatch: dispatchSpy
  };
};

export const setMockState = (s) => {
  mockState = s;
};
export const setDispatchSpy = (d) => {
  dispatchSpy = d;
};
export default configureStore;
