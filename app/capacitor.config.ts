import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xjc.harlab',
  appName: 'app',
  webDir: 'dist/app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
