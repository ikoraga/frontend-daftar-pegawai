<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Header dengan Breadcrumb -->
      <div class="mb-6">
        <button
          @click="$router.push('/units')"
          class="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
        >
          <svg
            class="h-5 w-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span class="font-medium">Kembali ke Daftar Unit</span>
        </button>

        <h1 class="text-3xl font-bold text-gray-900">Detail Unit Kerja</h1>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-20"
      >
        <svg
          class="animate-spin h-12 w-12 text-blue-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="text-gray-600">Memuat data...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="errorMessage"
        class="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-500"
      >
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <svg
              class="h-6 w-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-red-900 mb-1">
              Terjadi Kesalahan
            </h3>
            <p class="text-red-700">{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Data Unit -->
      <div v-else-if="unit" class="space-y-6">
        <!-- Card Informasi Utama -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <!-- Header Card dengan Gradient -->
          <div
            class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h2 class="text-3xl font-bold mb-2">{{ unit.name }}</h2>
                <div class="flex items-center gap-3">
                  <span
                    class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-mono"
                  >
                    {{ unit.kode }}
                  </span>
                  <span
                    :class="[
                      'px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm',
                      unit.isActive
                        ? 'bg-green-500/30 border border-green-300'
                        : 'bg-gray-500/30 border border-gray-300',
                    ]"
                  >
                    {{ unit.isActive ? "● Aktif" : "○ Nonaktif" }}
                  </span>
                </div>
              </div>
              <button
                @click="goToEdit"
                class="bg-white text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                ✏️ Edit
              </button>
            </div>
          </div>

          <!-- Body Card -->
          <div class="px-8 py-6 space-y-6">
            <!-- Parent Info -->
            <div
              v-if="unit.parent"
              class="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100"
            >
              <div class="flex-shrink-0 mt-1">
                <svg
                  class="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-blue-900 mb-1">Unit Induk</p>
                <p class="text-blue-700 font-semibold">
                  {{ unit.parent.name }}
                </p>
              </div>
            </div>

            <!-- Metadata -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <svg
                  class="h-5 w-5 text-gray-500 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p class="text-sm text-gray-500 mb-0.5">Dibuat</p>
                  <p class="text-gray-900 font-medium">
                    {{ formatDate(unit.created_at) }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <svg
                  class="h-5 w-5 text-gray-500 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <div>
                  <p class="text-sm text-gray-500 mb-0.5">Terakhir Diupdate</p>
                  <p class="text-gray-900 font-medium">
                    {{ formatDate(unit.updated_at) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Sub Unit -->
        <div
          v-if="unit.children && unit.children.length > 0"
          class="bg-white rounded-2xl shadow-lg p-8"
        >
          <div class="flex items-center gap-3 mb-6">
            <div
              class="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg"
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Sub Unit Kerja</h3>
              <p class="text-sm text-gray-500">
                {{ unit.children.length }} unit di bawah ini
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="child in unit.children"
              :key="child.id"
              class="group relative p-5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer"
              @click="goToDetail(child.id)"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h4
                    class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1"
                  >
                    {{ child.name }}
                  </h4>
                  <p class="text-sm text-gray-500 font-mono">
                    {{ child.kode }}
                  </p>
                </div>
                <svg
                  class="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">Lihat detail</span>
                <svg
                  class="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State untuk Sub Unit -->
        <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4"
          >
            <svg
              class="h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Tidak Ada Sub Unit
          </h3>
          <p class="text-gray-500">
            Unit ini tidak memiliki sub unit di bawahnya
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useApi, navigateTo } from "#imports";

const route = useRoute();
const api = useApi();

const unit = ref<any>(null);
const loading = ref(true);
const errorMessage = ref("");

const formatDate = (date: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const fetchUnit = async () => {
  try {
    const res = await api.get(`/units/${route.params.id}`);
    unit.value = res.data.data || res.data;
  } catch (error: any) {
    console.error("Gagal memuat data unit:", error);
    errorMessage.value =
      error.response?.data?.message || "Gagal memuat data unit.";
  } finally {
    loading.value = false;
  }
};

const goToEdit = () => {
  navigateTo(`/units/${route.params.id}/edit`);
};
const goToDetail = (id: string) => {
  navigateTo(`/units/${id}`);
};

onMounted(fetchUnit);
</script>
