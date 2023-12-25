import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nifal.dev',
  appName: 'Disaster Quizziz',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
