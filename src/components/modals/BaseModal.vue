<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"

const emit = defineEmits(["close"])

function close() {
  emit("close")
}

function handleEsc(e: KeyboardEvent) {
  if (e.key === "Escape") close()
}

onMounted(() => {
  window.addEventListener("keydown", handleEsc)
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc)
})
</script>

<template>
  <transition name="modal">
    <div
        class="fixed inset-0 z-50 flex items-center justify-center px-4"
        @click.self="close"
    >
      <!-- Overlay -->
      <div
          class="absolute inset-0
               bg-black/50 backdrop-blur-md"
      />

      <!-- Modal -->
      <div
          class="relative w-full max-w-md
               bg-surface-card
               text-content-primary
               border border-surface-border
               rounded-2xl
               shadow-2xl
               p-6"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>