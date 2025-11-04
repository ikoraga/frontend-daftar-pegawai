<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Daftar Pegawai</h2>

    <!-- Search Input -->
    <div class="flex items-center mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Cari pegawai..."
        class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <!-- Table -->
    <EmployeeTable v-if="!loading && employees.length" :employees="employees" />

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8 text-gray-500">
      ⏳ Memuat data pegawai...
    </div>

    <!-- Empty State -->
    <div
      v-if="!loading && employees.length === 0"
      class="text-center py-8 text-gray-400"
    >
      Tidak ada pegawai ditemukan.
    </div>

    <!-- Pagination -->
    <div
      class="flex justify-between items-center mt-6"
      v-if="!loading && employees.length"
    >
      <button
        @click="prevPage"
        :disabled="page <= 1"
        class="btn px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      <span class="text-gray-700 font-medium"> Halaman {{ page }} </span>

      <button
        @click="nextPage"
        :disabled="!hasMore"
        class="btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useApi } from "~/composables/useApi";
import EmployeeTable from "~/components/EmployeeTable.vue";
import { navigateTo } from "#app";

navigateTo("/login");
const api = useApi();

const employees = ref<any[]>([]);
const search = ref("");
const page = ref(1);
const hasMore = ref(false);
const loading = ref(false);
const errorMessage = ref("");

// 🚀 Fungsi utama untuk load data pegawai
const loadEmployees = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const { data } = await api.get("/employees", {
      params: { search: search.value, page: page.value },
    });

    employees.value = data?.data ?? [];
    const meta = data?.meta ?? {};

    hasMore.value = meta.current_page < meta.last_page;
  } catch (error: any) {
    console.error("Gagal memuat pegawai:", error);
    errorMessage.value = "Gagal memuat data pegawai.";
  } finally {
    loading.value = false;
  }
};

let searchTimeout: NodeJS.Timeout;
watch(search, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    page.value = 1;
    loadEmployees();
  }, 500);
});

// Pagination
const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    loadEmployees();
  }
};
const nextPage = () => {
  if (hasMore.value) {
    page.value++;
    loadEmployees();
  }
};

// Load awal
onMounted(loadEmployees);
</script>

<style scoped>
.btn {
  transition: all 0.2s ease-in-out;
}
</style>
