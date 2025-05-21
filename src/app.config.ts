export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/appoint/index'
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home-selected.png',
      },
      {
        pagePath: 'pages/appoint/index',
        text: '预约',
        iconPath: 'assets/tabbar/appoint.png',
        selectedIconPath: 'assets/tabbar/appoint-selected.png',
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
