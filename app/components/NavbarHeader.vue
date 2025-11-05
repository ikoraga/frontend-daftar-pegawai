<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
    <div class="px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-4">
        <div
          class="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg"
        >
          <svg
            class="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-xl text-gray-900">Dashboard Pegawai</h1>
          <p class="text-xs text-gray-500">Sistem Manajemen Kepegawaian</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Version Badge -->
        <div class="bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
          <span class="text-xs font-semibold text-blue-700">v1.0.0</span>
        </div>

        <div
          class="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200"
        >
          <div class="text-right">
            <p class="text-sm font-semibold text-gray-900">Admin User</p>
            <p class="text-xs text-gray-500">Administrator</p>
          </div>
          <div
            class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold"
          >
            A
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
