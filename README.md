# react-ncaa-data

> Put live (or old) NCAA data in your website!

[![NPM](https://img.shields.io/npm/v/react-ncaa-data.svg)](https://www.npmjs.com/package/react-ncaa-data) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-ncaa-data
```

## Usage

First you need to configure a proxy. I like to use express, so here is an example on how to set that up. This allows the NCAA react component to properly reroute fetch's to the NCAA casablanca server.

> **NOTE:** this NCAA react component library defaults to '/ncaa_api' as shown below. If you use a different proxy api name....please make sure to set it accordingly.

```js
const express = require('express');

const targetUrl = 'https://data.ncaa/com/';

app.use( '/ncaa_api',        // this is the 'proxy_api' setting
         createProxyMiddleware({
           target: targetUrl,
           changeOrigin: true,
           pathRewrite: {
             '^/ncaa_api/': '/'
           }
         })
);

```

Once you have your proxy configured, you can go ahead and import the NCAA context to use the data whereever you need to in your website.

```jsx
import React, { Component } from 'react'

import { useNCAA } from 'react-ncaa-data'

class Example extends Component {
  const { 
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [flynneva](https://github.com/flynneva)
