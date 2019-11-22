module.exports = {
  presets: ['react-app'],
  plugins: [
    [
      'react-intl',
      {
        messagesDir: './src/translations',
      },
    ],
  ],
};
