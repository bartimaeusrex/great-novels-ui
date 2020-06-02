import axios from 'axios'

import React, { useEffect, useState } from 'react'
import Novel from './Novel'
import Search from './Search'
// import { filteredNovels, retrieveNovels } from '../utils/novels'

export default () => {
  const [novelList, setNovelList] = useState([])
  const [filteredNovelList, setFilteredNovelList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function retrieveData() {
      const { data } = await axios.get('http://localhost:1337/api/novels')

      setNovelList(data)
      setFilteredNovelList(data)
    }

    retrieveData()
  }, [])

  useEffect(() => {
    const filtered = novelList.filter(novel => (
      novel.title.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    setFilteredNovelList(filtered)
  }, [searchTerm])

  return (
    <div className="page">
      <div className="title">Great Novels</div>
      <Search term={searchTerm} setter={setSearchTerm} />
      <div className="output">
        {
          filteredNovelList.map(novel => (
            <Novel
              key={novel.id}
              id={novel.id}
              title={novel.title}
              name={`${novel.author.nameFirst} ${novel.author.nameLast}`}
            />
          ))
        }
      </div>
    </div>
  )
}
