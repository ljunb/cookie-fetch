/**
 * Project - cookie-fetch
 * Author      : ljunb
 * Date        : 2017/11/14 下午8:42
 * Description : 简易的缓存工具类
 */
import { AsyncStorage } from 'react-native';

// 用于保存请求缓存key的Set
const cacheKeySet = new Set();

class Storage {

  static setItem = (key, value) => {
    cacheKeySet.add(key);

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

  static removeHTTPCacheBaseOnURL = key => {
    if (!cacheKeySet.has(key)) return;

    cacheKeySet.delete(key);
    return AsyncStorage.removeItem(key);
  };

  static removeAllHTTPCache = () => {
    if (cacheKeySet.size === 0) return;

    cacheKeySet.forEach(key => Storage.removeHTTPCacheBaseOnURL(key));
    cacheKeySet.clear();
  };
}

export default Storage;