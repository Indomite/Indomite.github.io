module.exports = {
  title: 'Indomite',
  themeConfig: {
    logo: '/public/logo.png',
    nav: [
      {
        text: '个人笔记',
        link: '/guide/',
      },
      {
        text: '技术博客',
        link: '/guide/',
      },
      {
        text: 'GitHub',
        link: '/guide/',
      }
    ],
    sidebar: [{
      title: '前端',
      path: '/guide/front/',
      children: [{
        title: 'HTML代码风格',
        path: '/guide/front/html/'
      }
      ]
    },]
  },
  description: 'Just playing around'
}