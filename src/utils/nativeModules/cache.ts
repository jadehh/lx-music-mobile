// import { NativeModules } from 'react-native'
//
// const { CacheModule } = NativeModules

export const getAppCacheSize = async(): Promise<number> => {
  console.log("getAppCacheSize")
   // CacheModule.getAppCacheSize().then((size: number) => Math.trunc(size))
  return 0
}

export  const clearAppCache = async ()=> {
  console.log("clearAppCache")
}
// export const clearAppCache = CacheModule.clearAppCache as () => Promise<void>
