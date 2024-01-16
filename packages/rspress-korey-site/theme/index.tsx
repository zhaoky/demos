import Theme from 'rspress/theme';
import { usePageData } from 'rspress/runtime';
import { MySearch } from './search';

const Layout = () => {
  console.log(444, usePageData(),Theme);
  return <Theme.Layout beforeNavTitle={<div>{MySearch()}</div>} />;
};
export default {
  ...Theme,
  Layout,
};

export * from 'rspress/theme';
