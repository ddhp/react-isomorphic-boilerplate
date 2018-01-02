let mockResponse;
const mocksuperagent = {
  post: () => mocksuperagent,
  send: () => mocksuperagent,
  then: cb => cb(mockResponse),
  setMockResponse: (m) => {
    mockResponse = m;
  },
};

export default mocksuperagent;
