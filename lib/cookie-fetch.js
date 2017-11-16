/**
 * Project - cookie-fetch
 * Author      : ljunb
 * Date        : 2017/11/14 下午9:20
 * Description : 基于AsyncStorage封装的一个简易版fetch，支持定制网络缓存请求策略
 */

import { AsyncStorage } from 'react-native';
import storage from './storage';
import convert from './convert';

const CachePolicy = {
  // 网络优先：优先请求网络，如请求失败则读取缓存，缓存为空时返回null
  NetworkFirst: 'NetworkFirst',
  // 强制网络：只请求网络，相当于fetch
  ForceNetwork: 'ForceNetwork',
  // 强制缓存：只读取缓存，缓存为空时返回null
  ForceCache: 'ForceCache',
};

const defaultGetOptions = {
  cache: CachePolicy.NetworkFirst,
};

class CFetch {
  constructor() {
    this.requestMap = new Map();
    this.setupRequestHandle();
  }

  setupRequestHandle = () => {
    this.requestMap.set(CachePolicy.ForceNetwork, this.handleForceNetwork);
    this.requestMap.set(CachePolicy.ForceCache, this.handleForceCache);
    this.requestMap.set(CachePolicy.NetworkFirst, this.handleNetworkFirst);
  };

  handleForceNetwork = (url, options) => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(res => res.text())
        .then(response => resolve({result: response, isCache: false}))
        .catch(error => reject(error));
    });
  };

  handleNetworkFirst = (url, options) => {
    const cacheKey = convert.getCacheKeyBaseOnURL(url);

    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(res => res.text())
        .then(response => {
          storage.setItem(cacheKey, response);
          resolve({result: response, isCache: false});
        })
        .catch(error => {
          storage.getItem(cacheKey)
            .then(cacheResult => resolve({result: cacheResult, isCache: true}))
            .catch(() => reject(error));
        });
    });
  };

  handleForceCache = (url, {}) => {
    return new Promise((resolve, reject) => {
      storage.getItem(convert.getCacheKeyBaseOnURL(url))
        .then(response => resolve({result: response, isCache: true}))
        .catch(error => reject(error));
    });
  };

  get = (url, options = {}) => {
    const opt = {...defaultGetOptions, ...options};
    const cachePolicy = opt['cache'];
    const fn = this.requestMap.get(cachePolicy);
    if (fn) {
      return fn(url, opt);
    } else {
      throw new Error('Could not find reference handle');
    }
  };

  clearHTTPCacheWithURL = url => storage.removeHTTPCacheBaseOnURL(url);

  clearAllHTTPCache = () => storage.removeAllHTTPCache();

}

const cFetch = new CFetch();

export default {
  get: cFetch.get,
  clearHTTPCacheWithURL: cFetch.clearHTTPCacheWithURL,
  clearAllHTTPCache: cFetch.clearAllHTTPCache,
}
export { CachePolicy };