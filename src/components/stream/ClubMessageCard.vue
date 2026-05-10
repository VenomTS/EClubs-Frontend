<script setup lang="ts">
import type { ClubMessageResponse } from "../../../api"

const props = defineProps<ClubMessageResponse>()

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`

  return date.toLocaleDateString()
}
</script>

<template>
  <div
      class="group bg-surface-card border border-surface-border
           rounded-xl p-4 space-y-3
           hover:border-primary-500/30
           transition-all duration-200"
  >

    <!-- HEADER -->
    <div class="flex items-start justify-between">

      <!-- Sender -->
      <div class="flex items-center gap-3">

        <!-- Avatar -->
        <div
            class="w-9 h-9 rounded-full
                 bg-surface-hover
                 flex items-center justify-center
                 text-xs font-semibold text-content-primary
                 border border-surface-border"
        >
          {{ props.sender.firstName![0] }}{{ props.sender.lastName![0] }}
        </div>

        <!-- Name -->
        <div class="flex flex-col leading-tight">
          <span class="text-sm font-medium text-content-primary">
            {{ props.sender.firstName }} {{ props.sender.lastName }}
          </span>

          <span class="text-xs text-content-secondary opacity-80">
            Professor
          </span>
        </div>

      </div>

      <!-- Timestamp -->
      <span class="text-xs text-content-secondary opacity-70">
        {{ formatTime(props.sentAt!) }}
      </span>

    </div>

    <!-- CONTENT -->
    <p
        class="text-sm text-content-primary
             leading-relaxed whitespace-pre-wrap"
    >
      {{ props.content }}
    </p>

  </div>
</template>