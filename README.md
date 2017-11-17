# cookie-fetch

[![npm](https://img.shields.io/npm/v/cookie-fetch.svg)](https://www.npmjs.com/package/cookie-fetch)
[![npm](https://img.shields.io/npm/l/cookie-fetch.svg)](https://github.com/ljunb/cookie-fetch/blob/master/LICENSE)

## 安装

使用`npm`：
```
npm install cookie-fetch --save
```
用`yarn`：
```
yarn add cookie-fetch
```

## 使用示例

```
import CFetch, { CachePolicy } from 'cookie-fetch';

... 

async componentDidMount() {
  const url = 'http://food.boohee.com/fb/v1/categories/list';
  const options = {cache: CachePolicy.NetworkFirst};
  try {
    const {result, isCache} = await CFetch.get(url, options);
    alert(`response: ${result} \n isCache: ${isCache}`)
  } catch (error) {
    alert('error' + error)
  }
}
  
```

`resolve`的结果为`Object`，`key`为`result`、`isCache`。其中`result`为序列化后的结果，`isCache`代表是否从缓存读取的结果。

## 缓存策略
Name            | Description
----------------  | -----------
NetworkFirst    | 优先请求网络，请求失败则读取缓存，如无缓存，返回`null`
ForceNetwork    | 强制请求网络，请求失败返回`null`
ForceCache      | 强制读取缓存，读取失败返回`null`

## 方法
Name            | Description
----------------  | -----------
get    | `GET`请求方法，使用方式与`fetch`一致
post    | `POST`请求方法，使用方式与`fetch`一致
clearHTTPCacheWithURL  | 基于某个请求`URL`清除`HTTP`缓存，接受的参数与请求的`URL`需匹配一致，包括`query`部分
clearAllHTTPCache      | 清除所有的`HTTP`缓存