import RNFS from 'react-native-fs'
import {pick} from '@react-native-documents/picker'
import {Dirs, type Encoding, FileSystem, type HashAlgorithm} from 'react-native-file-access'
import {log} from "@/utils/log.ts";


// export const externalDirectoryPath = RNFS.ExternalDirectoryPath

export const extname = (name: string) => name.lastIndexOf('.') > 0 ? name.substring(name.lastIndexOf('.') + 1) : ''

export const temporaryDirectoryPath = Dirs.CacheDir
export const externalStorageDirectoryPath = Dirs.SDCardDir
export const privateStorageDirectoryPath = Dirs.DocumentDir

export const getExternalStoragePaths = async (is_removable?: boolean) => {
  // _getExternalStoragePaths(is_removable)
  log.todo("getExternalStoragePaths")
}

export const selectManagedFolder = async (isPersist: boolean = false) => {
  // AndroidScoped.openDocumentTree(isPersist)
  log.todo("selectManagedFolder")
}
export const selectFile = async (options: any) => {
  const [file] = await pick()
  log.debug("select file", file.uri)
  return file
  // AndroidScoped.openDocument(options)
}

export const removeManagedFolder = async (path: string) => {
  // AndroidScoped.releasePersistableUriPermission(path)
  log.todo("removeManagedFolder")
}
export const getManagedFolders = async () => {
  // AndroidScoped.getPersistedUriPermissions()
  log.todo("getManagedFolders")
}

export const getPersistedUriList = async () => {
  // AndroidScoped.getPersistedUriPermissions()
  log.todo("getPersistedUriList")
}


export const readDir = async (path: string) => FileSystem.ls(path)

export const unlink = async (path: string) => {
  log.todo("unlink", path)
  FileSystem.unlink(path)
}


export const mkdir = async (path: string) => FileSystem.mkdir(path)

export const stat = async (path: string) => FileSystem.stat(path)
export const hash = async (path: string, algorithm: HashAlgorithm) => FileSystem.hash(path, algorithm)

export const readFile = async (path: string, encoding?: Encoding) => FileSystem.readFile(path, encoding)


// export const copyFile = async(fromPath: string, toPath: string) => FileSystem.cp(fromPath, toPath)

export const moveFile = async (fromPath: string, toPath: string) => FileSystem.mv(fromPath, toPath)
export const gzipFile = async (fromPath: string, toPath: string) => {
  console.log("gzipFile")
  // FileSystem.gzipFile(fromPath, toPath)
}
export const unGzipFile = async (fromPath: string, toPath: string) => {
  console.log("unGzipFile")
  // FileSystem.unGzipFile(fromPath, toPath)
}
export const gzipString = async (data: string, encoding?: Encoding) => {
  // FileSystem.gzipString(data, encoding)
  console.log("gzipString")
}
export const unGzipString = async (data: string, encoding?: Encoding) => {
  console.log("unGzipString")
  // FileSystem.unGzipString(data, encoding)
}

export const existsFile = async (path: string) => FileSystem.exists(path)

export const rename = async (path: string, name: string) => {
  console.log("rename")
  // FileSystem.rename(path, name)
}

export const writeFile = async (path: string, data: string, encoding?: Encoding) => FileSystem.writeFile(path, data, encoding)

export const appendFile = async (path: string, data: string, encoding?: Encoding) => FileSystem.appendFile(path, data, encoding)

export const downloadFile = (url: string, path: string, options: Omit<RNFS.DownloadFileOptions, 'fromUrl' | 'toFile'> = {}) => {
  if (!options.headers) {
    options.headers = {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Mobile Safari/537.36',
    }
  }
  return RNFS.downloadFile({
    fromUrl: url, // URL to download file from
    toFile: path, // Local filesystem path to save the file to
    ...options,
    // headers: options.headers, // An object of headers to be passed to the server
    // // background?: boolean;     // Continue the download in the background after the app terminates (iOS only)
    // // discretionary?: boolean;  // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)
    // // cacheable?: boolean;      // Whether the download can be stored in the shared NSURLCache (iOS only, defaults to true)
    // progressInterval: options.progressInterval,
    // progressDivider: options.progressDivider,
    // begin: (res: DownloadBeginCallbackResult) => void;
    // progress?: (res: DownloadProgressCallbackResult) => void;
    // // resumable?: () => void;    // only supported on iOS yet
    // connectionTimeout?: number // only supported on Android yet
    // readTimeout?: number       // supported on Android and iOS
    // // backgroundTimeout?: number // Maximum time (in milliseconds) to download an entire resource (iOS only, useful for timing out background downloads)
  })
}

export const stopDownload = (jobId: number) => {
  RNFS.stopDownload(jobId)
}
