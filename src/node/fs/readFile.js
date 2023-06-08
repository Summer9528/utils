'use strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
// console.log('files', files)
async function _readFile (filepath) {
  const files = await fs.readdir(filepath)
  files.forEach(async (filename) => {
    const fileDir = path.resolve(__dirname, filename)
    console.log('fileDir', fileDir)
    const stats = await fs.stat(fileDir)
    console.log(filename, stats)

    if (stats.isFile()) {
      const file = await fs.readFile(path.resolve(__dirname, filename))
      console.log('file', file)
    }
    if (stats.isDirectory()) {
      //   _readFile(fileDir)
    }
  })
}
_readFile(path.resolve(__dirname))
