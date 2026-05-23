<script setup lang="ts">
import { computed } from "vue"
import type { GetMessageResponse } from "../../../api"

const props = defineProps<{
  message: GetMessageResponse
  currentUserId: string
}>()

const emit = defineEmits<{
  (e: "uredi", message: GetMessageResponse): void
  (e: "izbriši", message: GetMessageResponse): void
}>()

const isOwner = computed(() =>
    props.message.sender.id === props.currentUserId
)

const senderName = computed(() => {
  const s = props.message.sender
  return `${s.firstName} ${s.lastName}`
})

const formattedDate = computed(() => {
  if (!props.message.sentAt) return "—"

  return new Date(props.message.sentAt).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  })
})

const handleEdit = () => emit("uredi", props.message)
const handleDelete = () => emit("izbriši", props.message)
</script>

<template>
  <div
      class="
      group
      bg-surface-card
      border border-surface-border
      rounded-2xl
      p-5
      transition-all duration-200
      hover:bg-surface-hover
      hover:border-primary-600/30
      hover:shadow-lg
    "
  >

    <!-- HEADER -->
    <div class="flex items-start justify-between gap-4">

      <div class="flex items-center gap-3">

        <!-- AVATAR -->
        <div
            class="
            w-10 h-10 rounded-full
            bg-primary-500/20
            text-primary-400
            flex items-center justify-center
            font-semibold
          "
        >
          {{ message.sender!.firstName!.charAt(0) }}
        </div>

        <!-- INFO -->
        <div>
          <p class="text-sm font-medium text-content-primary">
            {{ senderName }}
          </p>

          <p class="text-xs text-content-muted">
            {{ formattedDate }}
          </p>
        </div>
      </div>

      <!-- ACTIONS (ONLY OWNER) -->
      <div
          v-if="isOwner"
          class="flex gap-2 opacity-0 group-hover:opacity-100 transition"
      >
        <Button
            icon="pi pi-pencil"
            text
            rounded
            class="text-content-muted hover:text-primary-400"
            @click="handleEdit"
        />

        <Button
            icon="pi pi-trash"
            text
            rounded
            class="text-content-muted hover:text-danger-500"
            @click="handleDelete"
        />
      </div>

    </div>

    <!-- CONTENT -->
    <div class="mt-4">
      <p class="text-content-secondary leading-relaxed whitespace-pre-wrap">
        {{ message.content ?? "Nema sadržaja" }}
      </p>
    </div>
  </div>
</template>