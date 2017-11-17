/**
 * Project - cookie-fetch
 * Author      : ljunb
 * Date        : 2017/11/16 上午10:58
 * Description : 对URL请求参数的转换处理
 */

class Convert {
  /**
   * 基于请求URL返回用于缓存的key
   *
   * @param {string} url 请求的URL
   * @return {string} targetUrl 处理后的缓存key
   */
  static getCacheKeyBaseOnURL = url => {
    let targetUrl = url;

    if (!targetUrl.includes('?')) {
      targetUrl += '?';
    } else {
      const urlCompArr = url.split('?');
      const queryStr = urlCompArr[1];
      const queryArr = queryStr ? queryStr.split('&') : [];
      targetUrl = `${urlCompArr[0]}?${queryArr.sort().join('&')}`;
    }

    return targetUrl;
  };

  /**
   * 设置超时
   *
   * @param {Promise} promise 请求promise
   * @param {number} timeout 超时时长，单位s
   * @return {Promise} 新的请求promise
   */
  static toBeTimeout = (promise, timeout) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('请求超时')), timeout * 1000);
    });
    return Promise.race([promise, timeoutPromise]);
  };
}

export default Convert;