<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4"
  >
    <div class="mx-auto">
      <!-- Header dengan Breadcrumb -->
      <div class="mb-6">
        <button
          @click="$router.push(`/units/${route.params.id}`)"
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
          <span class="font-medium">Kembali ke Detail</span>
        </button>

        <h1 class="text-3xl font-bold text-gray-900">Edit Unit Kerja</h1>
        <p class="text-gray-600 mt-2">Perbarui informasi unit kerja</p>
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

      <!-- Form -->
      <div v-else class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Header Form -->
        <div
          class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white"
        >
          <div class="flex items-center gap-3">
            <div class="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold">Form Edit Unit</h2>
              <p class="text-blue-100 text-sm">Lengkapi form di bawah ini</p>
            </div>
          </div>
        </div>

        <!-- Alert Error -->
        <div
          v-if="errorMessage"
          class="mx-8 mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
        >
          <div class="flex items-start gap-3">
            <svg
              class="h-5 w-5 text-red-500 mt-0.5"
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
            <div>
              <p class="font-medium text-red-900">Terjadi Kesalahan</p>
              <p class="text-sm text-red-700 mt-1">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
          <!-- Nama Unit -->
          <div>
            <label
              class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
            >
              <svg
                class="h-4 w-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              Nama Unit
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              placeholder="Masukkan nama unit kerja"
            />
          </div>

          <!-- Kode Unit -->
          <div>
            <label
              class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
            >
              <svg
                class="h-4 w-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Kode Unit
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.kode"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-mono"
              placeholder="Contoh: UNIT-001"
            />
          </div>

          <!-- Parent Unit -->
          <div>
            <label
              class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
            >
              <svg
                class="h-4 w-4 text-blue-600"
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
              Unit Induk (Parent)
            </label>
            <select
              v-model="form.parent_id"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            >
              <option :value="null">-- Tidak Ada Parent --</option>
              <option
                v-for="unit in parentUnits"
                :key="unit.id"
                :value="unit.id"
                :disabled="unit.id === route.params.id"
              >
                {{ unit.name }} ({{ unit.kode }})
              </option>
            </select>
            <p class="text-xs text-gray-500 mt-2">
              Pilih unit induk jika unit ini merupakan sub unit
            </p>
          </div>

          <!-- Status Aktif -->
          <div class="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
            <label class="flex items-start gap-4 cursor-pointer">
              <div class="flex items-center h-6">
                <input
                  v-model="form.isActive"
                  type="checkbox"
                  class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <svg
                    class="h-5 w-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="font-semibold text-gray-900">Status Aktif</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">
                  Centang jika unit kerja ini masih aktif dan beroperasi
                </p>
              </div>
            </label>
          </div>

          <!-- Info Box -->
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <div class="flex items-start gap-3">
              <svg
                class="h-5 w-5 text-blue-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p class="text-sm font-medium text-blue-900">Informasi</p>
                <p class="text-sm text-blue-700 mt-1">
                  Pastikan data yang Anda masukkan sudah benar sebelum menyimpan
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-6 border-t-2 border-gray-100">
            <button
              type="submit"
              :disabled="submitting"
              class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              <span
                v-if="!submitting"
                class="flex items-center justify-center gap-2"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Simpan Perubahan
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg
                  class="animate-spin h-5 w-5"
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
                Menyimpan...
              </span>
            </button>

            <button
              type="button"
              @click="$router.push(`/units/${route.params.id}`)"
              :disabled="submitting"
              class="px-6 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useApi, navigateTo } from "#imports";

const route = useRoute();
const api = useApi();

const loading = ref(true);
const submitting = ref(false);
const errorMessage = ref("");
const parentUnits = ref<any[]>([]);

const form = ref({
  name: "",
  kode: "",
  parent_id: null as string | null,
  isActive: true,
});

const fetchUnit = async () => {
  try {
    const res = await api.get(`/units/${route.params.id}`);
    const unit = res.data.data || res.data;

    form.value = {
      name: unit.name || "",
      kode: unit.kode || "",
      parent_id: unit.parent_id || null,
      isActive: unit.isActive !== undefined ? unit.isActive : true,
    };
  } catch (error: any) {
    console.error("Gagal memuat data unit:", error);
    errorMessage.value =
      error.response?.data?.message || "Gagal memuat data unit.";
  }
};

const fetchParentUnits = async () => {
  try {
    const res = await api.get("/units");
    parentUnits.value = res.data.data || res.data || [];
  } catch (error: any) {
    console.error("Gagal memuat daftar unit:", error);
  }
};

// Load data saat component mounted
onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchUnit(), fetchParentUnits()]);
  loading.value = false;
});

const handleSubmit = async () => {
  submitting.value = true;
  errorMessage.value = "";

  try {
    await api.patch(`/units/${route.params.id}`, form.value);

    navigateTo(`/units/${route.params.id}`);
  } catch (error: any) {
    console.error("Gagal mengupdate unit:", error);
    errorMessage.value =
      error.response?.data?.message || "Gagal mengupdate data unit.";
  } finally {
    submitting.value = false;
  }
};
</script>
