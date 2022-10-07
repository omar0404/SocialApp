import SInfo from 'react-native-sensitive-info';

const OPTIONS = {
  sharedPreferencesName: 'myKeychain',
  keychainService: 'mySharedPrefs',
};
const getItem = async (key: string): Promise<string> =>
  await SInfo.getItem(key, OPTIONS);
const setItem = async (key: string, value: string): Promise<null> =>
  await SInfo.setItem(key, value, OPTIONS);
const SensitiveInfo = {getItem, setItem};

export {SensitiveInfo};
