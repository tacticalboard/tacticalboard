module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Badminton Sand Table';
        args[0].description = 'Make tactical communication convenient.';
        return args;
      });
  },
}