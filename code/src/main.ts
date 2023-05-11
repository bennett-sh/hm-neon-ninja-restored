
import { createRepository } from 'repository-script'
import { createPatch } from 'quickentity-script'
import { mkdir } from 'fs/promises'
import path from 'path'

async function savePatch(patch: any, name: string, chunk: number = 0) {
  const chunkFolder = path.join('..', 'content', `chunk${chunk}`)

  await mkdir(chunkFolder, { recursive: true })
  await patch.save(path.join(chunkFolder, `${name}.entity.patch.json`))
}

async function saveRepo(repo: any, name: string = 'repo', chunk: number = 0) {
  const chunkFolder = path.join('..', 'content', `chunk${chunk}`)

  await mkdir(chunkFolder, { recursive: true })
  await repo.save(path.join(chunkFolder, `${name}.repository.json`))
}

async function createMainPatch() {
  const patch = createPatch('', '')

  await savePatch(patch, 'main')
}

async function createRepositoryPatch() {
  const repo = createRepository()

  await saveRepo(repo)
}

async function main() {
  console.log('Making main patch...')
  await createMainPatch()
  console.log('Done.')

  console.log('Making main repository patch...')
  await createRepositoryPatch()
  console.log('Done.')
}

main()
