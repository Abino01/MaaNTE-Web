<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vuepress/client'

interface QQGroup {
  group_id: string
  group_name?: string
  member_count?: number
  max_member_count?: number
  ok?: boolean
  joinable?: boolean
  error?: string
}

interface QQGroupData {
  updated_at?: string
  member_limit?: number
  selected_group_id?: string | null
  groups?: QQGroup[]
}

const loading = ref(true)
const errorMessage = ref('')
const groupData = ref<QQGroupData | null>(null)
const copiedGroupId = ref('')
const copyErrorGroupId = ref('')
let resetCopyFeedbackTimer: ReturnType<typeof setTimeout> | undefined

onBeforeUnmount(() => {
  clearCopyFeedbackTimer()
  copiedGroupId.value = ''
  copyErrorGroupId.value = ''
})

const groups = computed(() => groupData.value?.groups ?? [])
const selectedGroup = computed(() => {
  const selectedGroupId = groupData.value?.selected_group_id
  return groups.value.find((group) => group.group_id === selectedGroupId) ?? null
})
const memberLimit = computed(() => groupData.value?.member_limit ?? 2000)

const updatedAt = computed(() => {
  const value = groupData.value?.updated_at
  return value ? formatDate(value) : '等待首次更新'
})

onMounted(async () => {
  try {
    const response = await fetch(withBase(`/data/qq-group.json?t=${Date.now()}`), {
      cache: 'no-store',
      headers: { accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    groupData.value = await response.json()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '未知错误'
  } finally {
    loading.value = false
  }
})

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatCount(value?: number): string {
  return typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('zh-CN') : '未知'
}

function hasMemberCount(group: QQGroup): boolean {
  return typeof group.member_count === 'number' && Number.isFinite(group.member_count)
}

function formatGroupMemberCount(group: QQGroup): string {
  if (!hasMemberCount(group)) return '未知'

  const maxMemberCount = group.max_member_count ?? memberLimit.value
  return `${group.member_count}/${maxMemberCount}`
}

function hasFewRemainingSlots(group: QQGroup): boolean {
  if (!hasMemberCount(group)) return false

  const maxMemberCount = group.max_member_count ?? memberLimit.value
  return maxMemberCount - group.member_count! < 50
}

function formatGroupName(group: QQGroup): string {
  return group.group_name || `QQ群 ${group.group_id}`
}

async function copyGroupId(groupId: string): Promise<void> {
  try {
    await copyText(groupId)
    copiedGroupId.value = groupId
    copyErrorGroupId.value = ''
  } catch {
    copiedGroupId.value = ''
    copyErrorGroupId.value = groupId
  }

  clearCopyFeedbackTimer()
  resetCopyFeedbackTimer = setTimeout(() => {
    copiedGroupId.value = ''
    copyErrorGroupId.value = ''
    resetCopyFeedbackTimer = undefined
  }, 2000)
}

function clearCopyFeedbackTimer(): void {
  if (resetCopyFeedbackTimer === undefined) return

  clearTimeout(resetCopyFeedbackTimer)
  resetCopyFeedbackTimer = undefined
}

async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return
    } catch {
      // Fall back for browsers that expose the Clipboard API but deny access.
    }
  }

  copyTextWithFallback(value)
}

function copyTextWithFallback(value: string): void {
  if (typeof document.execCommand !== 'function') {
    throw new Error('Clipboard API is not supported')
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  const copied = document.execCommand('copy')
  textarea.remove()

  if (!copied) {
    throw new Error('Copy failed')
  }
}

function copyButtonLabel(groupId: string): string {
  if (copiedGroupId.value === groupId) return '已复制'
  if (copyErrorGroupId.value === groupId) return '复制失败'
  return '复制群号'
}
</script>

<template>
  <section class="qq-group">
    <div v-if="loading" class="qq-group__state">正在获取 QQ 群信息...</div>

    <div v-else-if="!selectedGroup" class="qq-group__empty">
      <h2>暂时没有可加入的 QQ 群</h2>
      <p>
        {{ errorMessage || `当前没有人数低于 ${memberLimit} 的群，或群信息还未完成同步。请稍后再试。` }}
      </p>
      <p class="qq-group__meta">最近同步：{{ updatedAt }}</p>
    </div>

    <div v-else class="qq-group__content">
      <div class="qq-group__main">
        <h2>{{ formatGroupName(selectedGroup) }}</h2>

        <dl class="qq-group__stats">
          <div>
            <dt>群号</dt>
            <dd>{{ selectedGroup.group_id }}</dd>
          </div>
          <div>
            <dt>当前人数</dt>
            <dd>{{ formatCount(selectedGroup.member_count) }} / {{ formatCount(selectedGroup.max_member_count) }}</dd>
          </div>
          <div>
            <dt>最近同步</dt>
            <dd>{{ updatedAt }}</dd>
          </div>
        </dl>

        <button class="qq-group__button" type="button" @click="copyGroupId(selectedGroup.group_id)">
          {{ copyButtonLabel(selectedGroup.group_id) }}
        </button>
      </div>
    </div>

    <details v-if="groups.length > 1" class="qq-group__details">
      <summary>查看全部群状态</summary>
      <ul>
        <li v-for="group in groups" :key="group.group_id">
          <span>
            {{ formatGroupName(group) }}
            <small>{{ group.group_id }}</small>
          </span>
          <span class="qq-group__details-actions">
            <strong
              v-if="hasMemberCount(group)"
              :class="{ 'qq-group__details-count--warning': hasFewRemainingSlots(group) }"
            >
              {{ formatGroupMemberCount(group) }}
            </strong>
            <em v-else>{{ group.error || '已满或不可加入' }}</em>
            <button type="button" @click="copyGroupId(group.group_id)">
              {{ copyButtonLabel(group.group_id) }}
            </button>
          </span>
        </li>
      </ul>
    </details>
  </section>
</template>

<style scoped>
.qq-group {
  margin: 32px 0;
  padding: 28px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.qq-group__state,
.qq-group__empty {
  color: var(--vp-c-text-2);
}

.qq-group__empty h2,
.qq-group__content h2 {
  margin: 0 0 10px;
  font-size: 1.55rem;
  line-height: 1.3;
}

.qq-group__content {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.qq-group__main {
  min-width: 0;
}

.qq-group__eyebrow {
  margin: 0 0 6px;
  color: var(--vp-c-brand-1);
  font-size: 0.85rem;
  font-weight: 700;
}

.qq-group__hint,
.qq-group__meta {
  color: var(--vp-c-text-2);
}

.qq-group__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 20px 0;
}

.qq-group__stats div {
  min-width: 0;
}

.qq-group__stats dt {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}

.qq-group__stats dd {
  margin: 4px 0 0;
  overflow-wrap: anywhere;
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.qq-group__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 18px;
  border-radius: 8px;
  border: 0;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
}

.qq-group__button:hover {
  background: var(--vp-c-brand-2);
  color: var(--vp-c-white);
}

.qq-group__details {
  margin-top: 24px;
}

.qq-group__details summary {
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-weight: 700;
}

.qq-group__details ul {
  display: grid;
  gap: 8px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.qq-group__details li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.qq-group__details span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.qq-group__details small {
  display: block;
  margin-top: 2px;
  color: var(--vp-c-text-3);
  font-size: 0.85em;
}

.qq-group__details strong {
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.qq-group__details-count--warning {
  color: var(--vp-c-danger-1) !important;
}

.qq-group__details em {
  color: var(--vp-c-text-3);
  font-style: normal;
  white-space: nowrap;
}

.qq-group__details-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.qq-group__details-actions button {
  padding: 3px 10px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
}

.qq-group__details-actions button:hover {
  background: var(--vp-c-brand-soft);
}

@media (max-width: 640px) {
  .qq-group {
    padding: 20px;
  }

  .qq-group__content {
    display: block;
  }

  .qq-group__stats {
    grid-template-columns: 1fr;
  }

  .qq-group__details li {
    display: block;
  }

  .qq-group__details strong,
  .qq-group__details em {
    margin-top: 0;
  }

  .qq-group__details-actions {
    margin-top: 6px;
  }
}
</style>
