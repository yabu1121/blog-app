'use client'

import { useState, useEffect } from "react"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation";

export const SearchBox = () => {
  const [search, setSearch] = useState("");
  // debounceは高頻度に起こるイベントを少なくする。
  const [debouncedSearch, setDebouncedSearch] = useState("");
  //useRouterはインスタンスを作成する。新しいページに遷移する、履歴を操作するなどに使用。
  const router = useRouter();



  useEffect(() => {
    //timerを開始する関数がsetTimeout
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500);
    //500ms 秒ごとにdebouncedSearchを更新する。
    //timerを停止するのがclearTimeout
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    //trim()は空白、改行などを取り除いた状態の文字列を返却する。
    if (debouncedSearch.trim()) {
      router.push(`/?search=${debouncedSearch.trim()}`);
    } else {
      router.push('/');
    }
  }, [debouncedSearch, router]);
  //監視対象を二つにするだけ。

  return (
    <>
      <Input
        placeholder="記事を検索..."
        value={search}
        onChange={(e) => { setSearch(e.target.value) }}
        className="w-[200px] lg:w-[300px]"
      />
    </>
  )
}


