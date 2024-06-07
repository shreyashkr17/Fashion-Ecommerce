module.exports = {
  env:{
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NEXT_PUBLIC_RAZORPAY_KEY_SECRET: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
  },
  basePath:
    process.env.NODE_ENV === "production"
      ? ``
      : "",
  trailingSlash: true,
  env: {
    PUBLIC_URL:
      process.env.NODE_ENV === "production"
        ? ``
        : "/",
    APP_URL:
      process.env.NODE_ENV === "production"
        ? "https://www.iretiensemble.com/"
        : "http://localhost/",
  },
  devIndicators: {
    autoPrerender: false,
  },
  devServer:{
    port:2000
  },
  webpack: (config, {isServer}) => {
    if(!isServer){
      config.node = {
        fs: 'empty'
      }
    }
    config.module.rules.push({
      test: /\.(mp4)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/", // Specify the output directory for the file
          },
        },
      ],
    },{
      test: /\.(png|jpe?g|gif|ico)$/i, // Add JPEG file support
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },
};
