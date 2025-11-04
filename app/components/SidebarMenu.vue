<template>
  <aside class="h-full flex flex-col p-12">
    <h3 class="text-lg font-bold mb-6">Daftar Pegawai</h3>
    <nav class="flex flex-col gap-3">
      <NuxtLink to="/employees" class="hover:text-blue-600"
        >🏠 Dashboard</NuxtLink
      >
      <button @click="onLogout" class="text-red-600 text-left mt-auto">
        🚪 Logout
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";

const { logout } = useAuth();
const router = useRouter();

const onLogout = async () => {
  await logout();
  router.push("/login");
};
</script>
