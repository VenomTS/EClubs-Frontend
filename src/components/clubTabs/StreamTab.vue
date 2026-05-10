<script setup lang="ts">
import ClubMessageCard from "../stream/ClubMessageCard.vue";
import {onMounted, ref} from "vue";
import {ClubMessagesApi, type GetAllMessagesByClubIdResponse} from "../../../api";
import {useUserStore} from "../../stores/userStore.ts";

const newMessage = ref("");
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const messages = ref<GetAllMessagesByClubIdResponse[]>([]);
const clubMessagesAPI = new ClubMessagesApi();
const userStore = useUserStore();

const props = defineProps<{
  clubId: string
}>();

async function sendMessage() {
  if (!newMessage.value?.trim()) return;

  const userId = userStore.userId;

  const response = await clubMessagesAPI.createMessageForClub(props.clubId, {
    senderId: userId,
    content: newMessage.value.trim(),
  });

  const createdMessage = response.data;

  messages.value.unshift({
    id: createdMessage.id,
    sender: createdMessage.sender,
    content: createdMessage.content,
    sentAt: createdMessage.sentAt,
  });

  newMessage.value = "";
}

/* AUTO RESIZE */
function autoResize() {
  const el = textareaRef.value;
  if (!el) return;

  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

/* ENTER TO SEND */
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

onMounted(async () => {
  try {
    const response = await clubMessagesAPI.getMessagesForClub(props.clubId);
    messages.value = response.data;
    messages.value.sort((a, b) => new Date(b.sentAt!).getTime() - new Date(a.sentAt!).getTime());
  }
  catch(error) {}
})
</script>

<template>
  <div class="space-y-4">

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
            :disabled="!newMessage?.trim()"
            class="bg-primary-500! border-none! hover:bg-primary-600! text-content-primary"
            icon="pi pi-send"
            label="Post"
            size="small"
            @click="sendMessage"
        />
      </div>
    </div>

    <div class="space-y-3">

      <div
          v-if="!messages || messages.length === 0"
          class="bg-surface-card border border-surface-border rounded-xl p-6 text-center"
      >
        <p class="text-sm text-content-secondary">
          No messages yet
        </p>
      </div>

      <ClubMessageCard
          v-for="message in messages"
          v-else
          :key="message.id"
          :id="message.id"
          :content="message.content"
          :sender="message.sender"
          :sentAt="message.sentAt"
      />

    </div>

  </div>
</template>

<style scoped>

</style>