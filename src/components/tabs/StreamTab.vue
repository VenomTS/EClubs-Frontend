<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import { useUserStore } from "../../stores/user.store"
import { useMessageStore } from "../../stores/messages.store"

import type { GetMessageResponse } from "../../../api"
import MessageCard from "../cards/MessageCard.vue";

const route = useRoute()
const userStore = useUserStore()
const messageStore = useMessageStore()

const messages = ref<GetMessageResponse[]>([])
const newMessage = ref("")
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const clubId = route.params.clubId as string

/* -----------------------------
   FETCH MESSAGES
------------------------------*/
const loadMessages = async () => {
  const result = await messageStore.getMessagesByClubId(clubId)

  if (result.success) {
    messages.value = (result.data ?? []).sort(
        (a, b) =>
            new Date(b.sentAt ?? 0).getTime() -
            new Date(a.sentAt ?? 0).getTime()
    )
  }
}

/* -----------------------------
   SEND MESSAGE
------------------------------*/
const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  const result = await messageStore.sendMessage(clubId, {
    senderId: userStore.userId,
    content: newMessage.value.trim()
  })

  if (result.success && result.data) {
    messages.value.unshift(result.data)
    newMessage.value = ""
  }
}

/* -----------------------------
   AUTO RESIZE TEXTAREA
------------------------------*/
const autoResize = () => {
  const el = textareaRef.value
  if (!el) return

  el.style.height = "auto"
  el.style.height = el.scrollHeight + "px"
}

/* -----------------------------
   ENTER TO SEND
------------------------------*/
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

/* -----------------------------
   INIT
------------------------------*/
onMounted(loadMessages)
</script>

<template>
  <div class="space-y-4">

    <!-- INPUT (Professor only) -->
    <div
        v-if="userStore.hasRole('Professor')"
        class="bg-surface-card border border-surface-border rounded-xl p-3 space-y-3"
    >
      <textarea
          ref="textareaRef"
          v-model="newMessage"
          class="w-full resize-none bg-transparent text-content-primary text-sm outline-none overflow-hidden"
          placeholder="Write an announcement..."
          rows="1"
          @input="autoResize"
          @keydown="handleKeyDown"
      />

      <div class="flex justify-end">
        <Button
            :disabled="!newMessage.trim()"
            class="bg-primary-500! border-none! hover:bg-primary-600! text-content-primary"
            icon="pi pi-send"
            label="Post"
            size="small"
            @click="sendMessage"
        />
      </div>
    </div>

    <!-- EMPTY STATE -->
    <div
        v-if="messages.length === 0"
        class="bg-surface-card border border-surface-border rounded-xl p-6 text-center"
    >
      <p class="text-sm text-content-secondary">
        No messages yet
      </p>
    </div>

    <!-- MESSAGES -->
    <div v-else class="space-y-3">
      <MessageCard
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :currentUserId="userStore.userId"
      />
    </div>

  </div>
</template>