import { mkdir, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const GROUP_IDS = ['1103323319', '1101147419', '1075143235', '713114598', '1106448578']
const API_BASE = process.env.QQ_GROUP_INFO_API ?? 'https://uapis.cn/api/v1/social/qq/groupinfo'
const DEFAULT_MEMBER_LIMIT = 2000
const rawMemberLimit = Number(process.env.QQ_GROUP_MEMBER_LIMIT)
const MEMBER_LIMIT = Number.isFinite(rawMemberLimit) ? rawMemberLimit : DEFAULT_MEMBER_LIMIT

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = process.env.QQ_GROUP_OUTPUT
  ? path.resolve(process.env.QQ_GROUP_OUTPUT)
  : path.resolve(__dirname, '../docs/.vuepress/public/data/qq-group.json')

async function fetchGroup(groupId) {
  const url = new URL(API_BASE)
  url.searchParams.set('group_id', groupId)

  const response = await fetch(url, {
    headers: { accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for group ${groupId}`)
  }

  const data = await response.json()
  return normalizeGroup(groupId, data)
}

function normalizeGroup(groupId, data) {
  const memberCount = toNumber(data.member_count)
  const maxMemberCount = toNumber(data.max_member_count)

  return {
    ok: true,
    group_id: String(data.group_id ?? groupId),
    group_name: toOptionalString(data.group_name),
    avatar_url: toOptionalString(data.avatar_url),
    description: toOptionalString(data.description),
    join_url: toOptionalString(data.join_url),
    last_updated: toOptionalString(data.last_updated),
    member_count: memberCount,
    max_member_count: maxMemberCount,
  }
}

function toOptionalString(value) {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

function toNumber(value) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : undefined
}

function compareGroups(left, right) {
  const leftCount = typeof left.member_count === 'number' ? left.member_count : Number.POSITIVE_INFINITY
  const rightCount = typeof right.member_count === 'number' ? right.member_count : Number.POSITIVE_INFINITY
  return leftCount - rightCount || String(left.group_id).localeCompare(String(right.group_id))
}

const groups = await Promise.all(
  GROUP_IDS.map(async (groupId) => {
    try {
      return await fetchGroup(groupId)
    } catch (error) {
      return {
        ok: false,
        group_id: groupId,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }),
)

groups.sort(compareGroups)
groups.forEach((group) => {
  group.joinable = isJoinable(group)
})

const candidates = groups.filter((group) => group.joinable)

const selected = candidates[0] ?? null
const output = {
  updated_at: new Date().toISOString(),
  member_limit: MEMBER_LIMIT,
  selected_group_id: selected?.group_id ?? null,
  selected,
  groups,
}

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(`${outputPath}.tmp`, `${JSON.stringify(output, null, 2)}\n`, 'utf8')
await rename(`${outputPath}.tmp`, outputPath)

if (selected) {
  console.log(`Selected QQ group ${selected.group_id} with ${selected.member_count} members.`)
} else {
  console.log(`No QQ group below ${MEMBER_LIMIT} members was found.`)
}

function isJoinable(group) {
  return Boolean(group.ok && group.join_url && typeof group.member_count === 'number' && group.member_count < MEMBER_LIMIT)
}
