module.exports = {
  title: 'Indomite',
  theme: 'reco',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  themeConfig: {
    nav: [
      {
        text: '学习笔记',
        link: '/note/',
      },
      {
        text: '技术博客',
        link: '/blog/',
      },
      {
        text: '关于我',
        link: '/about/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/Indomite',
      }
    ],
    sidebar: 'auto',
    subSidebar: "auto",
    type: "blog",
    lastUpdated: 'Last Updated',
    displayAllHeaders: true
  },
  noFoundPageByTencent: false,
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github',
      locale: 'zh',
      owner: 'Indomite', //github账户名
      repo: 'Indomite.github.io', //github一个项目的名称
      clientId: 'd8f9f88ac5b09f168cb6',//注册的Client ID
      clientSecret: '5aca68bd67d346d1804ee896ac0f7c85d81e2e7b',//注册的Client Secret
      autoCreateIssue:true
    },
  }
}