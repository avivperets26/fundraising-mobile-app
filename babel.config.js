/* eslint-env node */
const isEnvDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: {
        version: 3,
        proposals: true,
      },
    }],
    '@babel/plugin-syntax-dynamic-import',
    isEnvDevelopment && 'react-refresh/babel',
  ].filter(Boolean),
}
