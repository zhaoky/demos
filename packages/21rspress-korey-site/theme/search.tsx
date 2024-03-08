import { useFullTextSearch } from 'rspress/theme';
import { useEffect } from 'react';

function MySearch() {
  const { initialized, search } = useFullTextSearch();

  const s = async()=>{
    console.log(5,initialized)
    const results = await search('remote');
    console.log(results);
  }

  useEffect(() => {
    console.log(6);
    async function searchSomeKeywords(keywords: string) {
      if (initialized) {
        // 搜索关键字
        const results = await search(keywords);
        console.log(666,results);
      }
    }
    searchSomeKeywords('remote');
  }, [initialized]);

  return <div onClick={s}>Search</div>;
}

export { MySearch };
