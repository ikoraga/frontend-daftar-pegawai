<template>
  <div class="error-page">
    <h1>{{ error?.statusCode }}</h1>
    <p>{{ error?.message }}</p>
    <button @click="handleBack">Kembali ke halaman utama</button>
  </div>
</template>

<script setup lang="ts">
import { clearError } from "#imports";
const props = defineProps({
  error: Object,
});

const handleBack = () => clearError({ redirect: "/" });
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

.error-page h1 {
  font-size: 6rem;
  margin-bottom: 1rem;
  color: #e74c3c;
}
</style>
