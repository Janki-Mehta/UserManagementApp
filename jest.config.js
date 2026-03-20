module.exports = {
  preset: 'react-native',
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-flash-message|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|react-native-image-picker|zustand|react-native-country-picker-modal)/)',
  ],
  moduleNameMapper: {
    '^react-native-mmkv$': '<rootDir>/__mocks__/react-native-mmkv.js',
  },
};
