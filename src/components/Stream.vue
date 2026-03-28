<script setup lang="ts">
import {ref} from "vue"
import StreamMessage from "./StreamMessage.vue";
import {type ClubMessageResponse, MessagesApi} from "../../api";
import {useRoute} from "vue-router";

const messagesApi = new MessagesApi();
const route = useRoute();
const clubId = route.params.clubId;

const newPostContent = ref("")

const props = defineProps({
  messages: { type: Array as () => ClubMessageResponse[], required: true },
});

// const isProfessor = computed(() => userStore.hasRole(Role.Professor))
const isProfessor = true;

async function createMessage()
{
  if(clubId === null || Array.isArray(clubId)) return;
  let response = await messagesApi.createMessageForClub(clubId, { senderId: "019d0d1a-ddb9-723e-9695-0ae7dce00bb9", content: newPostContent.value })

  let clubMessageResponse: ClubMessageResponse = {
    id: response.data.id,
    sender: response.data.sender,
    content: response.data.content,
    sentAt: response.data.sentAt,
  }
  props.messages?.unshift(clubMessageResponse);

  newPostContent.value = "";
}
</script>

<template>
  <!-- CREATE POST (samo profesor)-->
  <div v-if="isProfessor" class="flex justify-center mt-2">

    <div class="rounded-2xl shadow p-4 mr-4 w-full max-w-3xl">
      <div class="flex gap-3">

        <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
          D
        </div>

        <textarea
            v-model="newPostContent"
            @keyup.enter.exact.prevent="createMessage"
            placeholder="Share something with your class..."
            rows="2"
            class="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>

    <div class="flex h-10 mt-4">
      <button
          @click="createMessage"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm">
        Post
      </button>
    </div>
  </div>

  <div class="flex flex-col items-center mt-4 gap-4">
    <StreamMessage
        v-for="message in messages"
        :id="message.id"
        :sender="message.sender"
        :content="message.content"
        :sentAt="message.sentAt"/>
  </div>
</template>