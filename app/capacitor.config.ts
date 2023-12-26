import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xjc.harlab',
  appName: 'app',
  webDir: 'dist/app',
  server: {
    hostname:"alas.xerotech.cloud",
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
