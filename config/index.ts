import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
// import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack';
import TerserPlugin from 'terser-webpack-plugin';
import devConfig from './dev';
import prodConfig from './prod';

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'webpack5'>(async merge => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'imd-seat-fe',
    date: '2025-4-28',
    // designWidth: 750,
    designWidth: 440,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
      440: 1.7,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@taro-hooks/plugin-react'],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    sass: {
      data: '$hd: 2 / 1.7;',
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);

        // chain.merge({
        //   plugin: {
        //     install: {
        //       plugin: UnifiedWebpackPluginV5,
        //       args: [
        //         {
        //           appType: 'taro',
        //           // disabled: WeappTailwindcssDisabled,
        //           rem2rpx: true,
        //         },
        //       ],
        //     },
        //   },
        // });

        chain.merge({
          plugin: {
            install: {
              plugin: TerserPlugin,
              args: [
                {
                  terserOptions: {
                    compress: true, // 默认使用terser压缩
                    // mangle: false,
                    keep_classnames: true, // 不改变class名称
                    keep_fnames: true, // 不改变函数名称
                  },
                },
              ],
            },
          },
        });
      },
    },
  };

  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
