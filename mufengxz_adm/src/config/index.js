/**
 * 环境配置文件
 * 一般在企业级项目里面有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */
// 当前的环境
const env = import.meta.env.MODE || 'prod'
// console.log(env)

const EnvConfig = {
  development: {
    baseApi: '//localhost:8222',
    mockApi: 'https://www.fastmock.site/mock/8421ba89504974c9bd26346475926163/api',
    // mockApi: 'https://www.fastmock.site/mock/300283cb590d2022f75682f11a1848b0/api',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://www.fastmock.site/mock/300283cb590d2022f75682f11a1848b0/api',
  },
  pro: {
    baseApi: '//future.com/api',
    mockApi: 'https://www.fastmock.site/mock/300283cb590d2022f75682f11a1848b0/api',
  },
}
// console.log(EnvConfig)

export default {
  env,
  // mock的总开关,
  mock: false,
  ...EnvConfig[env]
}

