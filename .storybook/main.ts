import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: false,
  },
  features: {
    interactionsDebugger: true,
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    const newConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': '/src',
        },
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [],
      },
      build: {
        ...config.build,
        rollupOptions: {
          ...config.build?.rollupOptions,
          external: [],
        },
      },
    };
    return  newConfig;
  },
};

export default config;


  // async viteFinal(config) {
  //   console.log('config', config);
    
  //   const {mergeConfig} = await import('vite');
  //   const mergedConfig = mergeConfig(config, {
  //     resolve: {
  //       alias: {
  //         '@': '/src',
  //       },
  //     },
  //     optimizeDeps: {
  //       exclude: [],
  //     },
  //     build: {
  //       rollupOptions: {
  //         external: [],
  //       },
  //     },
  //   });
  //   console.log('mergedConfig', mergedConfig);
  //   return  mergedConfig;
  // },