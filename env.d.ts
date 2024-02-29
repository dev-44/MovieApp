declare module 'react-native-config' {
  export interface Env {
    API_KEY: string;
  }

  const Config: Env;

  export default Config;
}