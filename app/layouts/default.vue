<template>
  <div class="min-h-screen flex flex-col">
    <NavbarHeader />
    <div class="flex flex-1">
      <SidebarMenu />
      <main class="flex-1 p-6 bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import NavbarHeader from "~/components/NavbarHeader.vue";
import SidebarMenu from "~/components/SidebarMenu.vue";
</script>
