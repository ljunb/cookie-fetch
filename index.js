/**
 * Description : entry file
 *
 * Author : cookiej
 * Date   : 2017/11/14
 * Time   : 17:24
 */

const CachePolicy = {
  NoCache: 0,
  NetworkFirst: 1,
  CacheFirst: 2,
  ForceNetwork: 3,
  ForceCache: 4,
};

const _get = (url, options) => {

};

const _post = (url, options) => {

};

export default {
  CachePolicy,
  get: _get,
  post: _post,
};