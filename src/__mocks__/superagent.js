let mockResponse;
const mocksuperagent = {
  post: () => { return mocksuperagent; },
  send: () => { return mocksuperagent; },
  then: (cb) => {
    return cb(mockResponse);
  },
  setMockResponse: (m) => {
    mockResponse = m;
  }
};

export default mocksuperagent;
