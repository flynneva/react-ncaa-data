import { createPlugin } from 'docz-core'
import proxy from 'http-proxy-middleware'

const proxyPlugin = () =>
  createPlugin({
    onCreateDevServer: ({ app }) => {
      app.use(
        '/ncaa_api',
        proxy({
          target: 'https://data.ncaa.com/',
          changeOrigin: true,
          pathRewrite: {'^/ncaa_api/': '/'
	  }
        })
      )
    }
  })

export default {
  dest: './docs/',
  base: './react-ncaa-data/',
  title: 'react-ncaa-data',
  plugins: [
    proxyPlugin()]
}
