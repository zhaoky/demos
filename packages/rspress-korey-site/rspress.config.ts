import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'korey的前端笔记',
  description: '前端工程师简历，FE简历，web前端学习，前端开发',
  icon: '/avatar.jpg',
  logo: {
    light: '/avatar.jpg',
    dark: '/avatar.jpg',
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/zhaoky' },
      { icon: 'juejin', mode: 'link', content: 'https://juejin.cn/user/1345457961309672' },
      { icon: 'zhihu', mode: 'link', content: 'https://www.zhihu.com/people/fe_korey' },
    ],
    footer:{
      message:'蜀ICP备15021330号 © 2014-2024 Korey Zhao All Rights Reserved.'
    },
  },
});
