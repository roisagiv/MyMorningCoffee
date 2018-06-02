module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    extensions = process.env.RN_SRC_EXT ?
      process.env.RN_SRC_EXT.split(',') : [];
    return [...extensions, 'ts', 'tsx'];
  },
};
