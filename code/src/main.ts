
import { createPatch } from 'quickentity-script'
import { mkdir } from 'fs/promises'
import path from 'path'

async function savePatch(patch: any, name: string, chunk: number = 0, option: string = 'content') {
  const chunkFolder = path.join('..', option, `chunk${chunk}`)

  await mkdir(chunkFolder, { recursive: true })
  await patch.save(path.join(chunkFolder, `${name}.entity.patch.json`))
}

async function createMainPatch() {
  const patch = createPatch(
    '[assembly:/_pro/characters/templates/hero/agent47/agent47_outfits.template?/outfit_agent47_reward_neon_heroa_v0.entitytemplate].pc_entitytemplate',
    '[assembly:/_pro/characters/templates/hero/agent47/agent47_outfits.template?/outfit_agent47_reward_neon_heroa_v0.entitytemplate].pc_entityblueprint',
  )

  patch
    .getEntity('59e0361e55d60c9a')
    .setPropertyValue('ConstantVector1D_07_Value', 90)

  await savePatch(patch, 'main')
}

async function createUnplayablePatch() {
  const patch = createPatch(
    '[assembly:/_pro/characters/templates/hero/agent47/agent47_outfits.template?/outfit_agent47_reward_neon_heroa_v0.entitytemplate].pc_entitytemplate',
    '[assembly:/_pro/characters/templates/hero/agent47/agent47_outfits.template?/outfit_agent47_reward_neon_heroa_v0.entitytemplate].pc_entityblueprint',
  )

  patch
    .getEntity('59e0361e55d60c9a')
    .setPropertyValue('ConstantVector1D_07_Value', 1000)

  await savePatch(patch, 'main', 0, 'unplayable')
}

async function main() {
  console.log('Making main patch...')
  await createMainPatch()
  console.log('Done.')
  console.log('Making unplayable patch...')
  await createUnplayablePatch()
  console.log('Done.')
}

main()
