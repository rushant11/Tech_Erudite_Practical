module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@screens/Splash': './src/screens/auth/Splash/index',
          '@screens/Login': './src/screens/auth/Login/index',
          '@screens/Search': './src/screens/main/Search/index',
          '@screens/Events': './src/screens/main/Events/index',
          '@screens/Favourites': './src/screens/main/Favourites/index',
          '@screens/Profile': './src/screens/main/Profile/index',
          '@utils': './src/utils',
          '@components': './src/component',
          '@navigation': './src/navigation',
          '@theme': './src/theme',
          '@hooks': './src/hooks',
          '@redux': './src/redux',
          '@store': './src/store',
          '@features': './src/features',
          '@services': './src/services',
          '@assets': './src/assets',
          '@api': './src/api',
          '@skeletons': './src/skeletons/index',
        },
      },
    ],
  ],
};
