<script setup lang="ts">
import { computed } from "vue"
import type { GetMessageResponse } from "../../../api"
import UserIcon from "../reusables/UserIcon.vue";

const props = defineProps<{
  message: GetMessageResponse
  currentUserId: string
}>()

const emit = defineEmits<{
  (e: "edit", message: GetMessageResponse): void
  (e: "delete", message: GetMessageResponse): void
}>()

const isOwner = computed(() =>
    props.message.sender.id === props.currentUserId
)

const senderName = computed(() => {
  const s = props.message.sender
  return `${s.firstName} ${s.lastName}`
})

const initials = computed(() => {
  return `${props.message.sender.firstName?.[0] ?? ''}${props.message.sender.lastName?.[0] ?? ''}`;
});

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

const handleEdit = () => emit("edit", props.message)
const handleDelete = () => emit("delete", props.message)
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

        <UserIcon :initials="initials"/>

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