module.exports = {
  // ... other webpack configuration
  module: {
    rules: [
      // ... other rules
      {
        test: /\.(mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/', // Specify the output directory for the file
            },
          },
        ],
      },
    ],
  },
  resolve:{
    fallback: {
      "fs": false
    },
  }
  // ... other webpack configuration
};