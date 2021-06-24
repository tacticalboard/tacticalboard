module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Badminton Tactical Board';
        args[0].description = 'Make tactical communication convenient.';
        return args;
      });
  },
}