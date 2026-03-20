// __mocks__/react-native-mmkv.js
// Jest mock for react-native-mmkv (native module — cannot run in Node)
const store = {};

const MMKV = jest.fn().mockImplementation(() => ({
  set: jest.fn((key, value) => { store[key] = value; }),
  getString: jest.fn((key) => store[key] ?? undefined),
  getBoolean: jest.fn((key) => store[key] ?? undefined),
  getNumber: jest.fn((key) => store[key] ?? undefined),
  delete: jest.fn((key) => { delete store[key]; }),
  clearAll: jest.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
  getAllKeys: jest.fn(() => Object.keys(store)),
  contains: jest.fn((key) => key in store),
}));

module.exports = { MMKV };
