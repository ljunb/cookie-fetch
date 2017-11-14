/**
 * Project - cookie-fetch
 * Author      : ljunb
 * Date        : 2017/11/14 下午8:42
 * Description : 简易的缓存工具类
 */
import { AsyncStorage } from 'react-native';

class Storage {
  static setItem = (key, value) => {
    const jsonValue = JSON.stringify(value);
    return AsyncStorage.setItem(key, jsonValue, err => {
      console.log(`[cookie-fetch] storage setItem error: ${err}`)
    });
  };

  static getItem = key => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((data, err) => {
          if (err || !data) {
            console.log(`[cookie-fetch] storage getItem error: ${err}`);
            reject(null);
          }
          resolve(JSON.parse(data));
        })
    });
  };

  static removeItem = key => {
    return AsyncStorage.removeItem(key);
  };
}

export default Storage;