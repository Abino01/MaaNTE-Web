<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface QQGroup {
  group_id: string
  group_name?: string
  avatar_url?: string
  description?: string
  join_url?: string
  last_updated?: string
  member_count?: number
  max_member_count?: number
  ok?: boolean
  joinable?: boolean
  error?: string
}

interface QQGroupData {
  updated_at?: string
  member_limit?: number
  selected?: QQGroup | null
  groups?: QQGroup[]
}

const loading = ref(true)
const errorMessage = ref('')
const groupData = ref<QQGroupData | null>(null)

const selectedGroup = computed(() => groupData.value?.selected ?? null)
const groups = computed(() => groupData.value?.groups ?? [])
const memberLimit = computed(() => groupData.value?.member_limit ?? 2000)

const updatedAt = computed(() => {
  const value = groupData.value?.updated_at ?? selectedGroup.value?.last_updated
  return value ? formatDate(value) : '等待首次更新'
})

onMounted(async () => {
  try {
    const response = await fetch(`/data/qq-group.json?t=${Date.now()}`, {
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

function isJoinable(group: QQGroup): boolean {
  return group.joinable === true
}
</script>

<template>
  <section class="qq-group">
    <div v-if="loading" class="qq-group__state">正在获取 QQ 群链接...</div>

    <div v-else-if="!selectedGroup" class="qq-group__empty">
      <h2>暂时没有可加入的 QQ 群</h2>
      <p>
        {{ errorMessage || `当前没有人数低于 ${memberLimit} 的群，或群信息还未完成同步。请稍后再试。` }}
      </p>
      <p class="qq-group__meta">最近同步：{{ updatedAt }}</p>
    </div>

    <div v-else class="qq-group__content">
      <img
        v-if="selectedGroup.avatar_url"
        class="qq-group__avatar"
        :src="selectedGroup.avatar_url"
        :alt="selectedGroup.group_name || `QQ群 ${selectedGroup.group_id}`"
        width="88"
        height="88"
      />
      <div class="qq-group__main">
        <p class="qq-group__eyebrow">当前推荐</p>
        <h2>{{ selectedGroup.group_name || `QQ群 ${selectedGroup.group_id}` }}</h2>
        <p v-if="selectedGroup.description" class="qq-group__description">{{ selectedGroup.description }}</p>

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

        <a class="qq-group__button" :href="selectedGroup.join_url" target="_blank" rel="noopener noreferrer">
          加入 QQ 群
        </a>
        <p class="qq-group__hint">系统会自动推荐 5 个群里人数最少且低于 {{ memberLimit }} 人的群。</p>
      </div>
    </div>

    <details v-if="groups.length > 1" class="qq-group__details">
      <summary>查看全部群状态</summary>
      <ul>
        <li v-for="group in groups" :key="group.group_id">
          <span>{{ group.group_name || `QQ群 ${group.group_id}` }}</span>
          <strong v-if="isJoinable(group)">{{ formatCount(group.member_count) }} 人</strong>
          <em v-else>{{ group.error || '已满或不可加入' }}</em>
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

.qq-group__avatar {
  flex: 0 0 auto;
  width: 88px;
  height: 88px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
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

.qq-group__description,
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
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
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

.qq-group__details strong {
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.qq-group__details em {
  color: var(--vp-c-text-3);
  font-style: normal;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .qq-group {
    padding: 20px;
  }

  .qq-group__content {
    display: block;
  }

  .qq-group__avatar {
    margin-bottom: 16px;
  }

  .qq-group__stats {
    grid-template-columns: 1fr;
  }

  .qq-group__details li {
    display: block;
  }

  .qq-group__details strong,
  .qq-group__details em {
    display: block;
    margin-top: 4px;
  }
}
</style>
