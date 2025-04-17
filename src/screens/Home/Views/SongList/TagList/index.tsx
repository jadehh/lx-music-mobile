import { useEffect, useRef, useState } from 'react'

import { type Source } from '@/store/songlist/state'
import List, { type ListProps, type ListType } from './List'


const TagList = () => {
  console.log("TagList")
  const [visible, setVisible] = useState(false)
  const listRef = useRef<ListType>(null)
  // const [info, setInfo] = useState({ souce: 'kw', activeId: '' })
  console.log("visible", visible)


  useEffect(() => {
    console.log("useEffect")
    let isInited = false
    const handleShow = (source: Source, id: string) => {
      console.log("handleShow", source, id)
      if (isInited) {
        listRef.current?.loadTag(source, id)
      } else {
        requestAnimationFrame(() => {
          setVisible(true)
          requestAnimationFrame(() => {
            listRef.current?.loadTag(source, id)
          })
        })
        isInited = true
      }
    }
    global.app_event.on('showSonglistTagList', handleShow)

    return () => {
      global.app_event.off('showSonglistTagList', handleShow)
    }
  }, [])

  const handleTagChange: ListProps['onTagChange'] = (name, id) => {
    global.app_event.hideSonglistTagList()
    requestAnimationFrame(() => {
      global.app_event.songlistTagInfoChange(name, id)
    })
  }

  return (
    visible
      ? <List ref={listRef} onTagChange={handleTagChange} />
      : null
  )
}
export default TagList;
