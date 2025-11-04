<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCookie } from "#app";

const router = useRouter();
const token = useCookie("auth_token");

if (token.value) {
  router.replace("/employees");
} else {
  router.replace("/login");
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen text-gray-600">
    <p>Mengarahkan ke halaman utama...</p>
  </div>
</template>
