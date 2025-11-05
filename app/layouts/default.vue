<template>
  <div class="h-screen flex flex-col overflow-hidden bg-gray-50">
    <!-- Header - Fixed at Top -->
    <NavbarHeader />

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar - Fixed Width, Scrollable -->
      <div class="w-64 flex-shrink-0 hidden md:block overflow-y-auto">
        <SidebarMenu />
      </div>

      <!-- Main Content Area - Scrollable -->
      <main class="flex-1 overflow-x-auto overflow-y-auto bg-gray-50">
        <div class="p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import NavbarHeader from "~/components/NavbarHeader.vue";
import SidebarMenu from "~/components/SidebarMenu.vue";
</script>
