<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Daftar Pegawai</h1>
        <p class="text-gray-600 mt-1">Kelola data pegawai secara efisien</p>
      </div>

      <!-- Search & Add Button -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div
          class="flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          <!-- Search Input -->
          <div class="relative flex-1 w-full">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="search"
              type="text"
              placeholder="Cari berdasarkan nama atau NIP..."
              class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <!-- Add Button -->
          <button
            class="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Tambah Pegawai
          </button>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- Loading State -->
        <div
          v-if="loading"
          class="flex flex-col items-center justify-center py-16"
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
          <p class="text-gray-500 font-medium">Memuat data pegawai...</p>
        </div>

        <!-- Error State -->
        <div
          v-else-if="errorMessage"
          class="flex flex-col items-center justify-center py-16"
        >
          <svg
            class="h-12 w-12 text-red-500 mb-4"
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
          <p class="text-red-600 font-medium">{{ errorMessage }}</p>
          <button
            @click="loadEmployees"
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Coba Lagi
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="employees.length === 0"
          class="flex flex-col items-center justify-center py-16"
        >
          <svg
            class="h-16 w-16 text-gray-300 mb-4"
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
          <p class="text-gray-500 font-medium text-lg">
            Tidak ada pegawai ditemukan
          </p>
          <p class="text-gray-400 text-sm mt-1">
            {{
              search ? "Coba kata kunci lain" : "Mulai tambahkan pegawai baru"
            }}
          </p>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Foto
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  NIP
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Lengkap
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Jabatan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Unit Kerja
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pangkat
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="emp in employees"
                :key="emp.id"
                class="hover:bg-gray-50 transition"
              >
                <!-- Photo -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden flex items-center justify-center"
                  >
                    <img
                      v-if="emp.photo_path"
                      :src="getPhotoUrl(emp.photo_path)"
                      :alt="emp.full_name"
                      class="h-full w-full object-cover"
                      @error="handleImageError"
                    />
                    <span v-else class="text-white font-semibold text-sm">
                      {{ getInitials(emp.full_name) }}
                    </span>
                  </div>
                </td>

                <!-- NIP -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-mono text-gray-900">{{
                    emp.nip
                  }}</span>
                </td>

                <!-- Full Name -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ emp.full_name }}
                  </div>
                  <div class="text-sm text-gray-500">{{ emp.phone }}</div>
                </td>

                <!-- Position -->
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ emp.position?.name || "-" }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ emp.echelon?.name || "-" }}
                  </div>
                </td>

                <!-- Unit -->
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ emp.unit?.name || "-" }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ emp.unit?.kode || "-" }}
                  </div>
                </td>

                <!-- Rank -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    {{ emp.rank?.code || "-" }}
                  </span>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ emp.rank?.name || "-" }}
                  </div>
                </td>

                <!-- Actions -->
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    class="text-blue-600 hover:text-blue-900 mr-3 transition"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    class="text-gray-600 hover:text-gray-900 mr-3 transition"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button class="text-red-600 hover:text-red-900 transition">
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="!loading && employees.length > 0"
          class="bg-gray-50 px-6 py-4 border-t border-gray-200"
        >
          <div
            class="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <!-- Info -->
            <div class="text-sm text-gray-700">
              Menampilkan
              <span class="font-medium">{{ pagination.from }}</span>
              sampai
              <span class="font-medium">{{ pagination.to }}</span>
              dari
              <span class="font-medium">{{ pagination.total }}</span>
              pegawai
            </div>

            <!-- Pagination Buttons -->
            <div class="flex items-center gap-2">
              <button
                @click="prevPage"
                :disabled="!pagination.prev_page_url"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <!-- Page Numbers -->
              <div class="flex items-center gap-1">
                <button
                  v-for="link in paginationLinks"
                  :key="link.label"
                  @click="goToPage(link.page)"
                  :disabled="!link.page"
                  :class="[
                    'px-4 py-2 border rounded-lg text-sm font-medium transition',
                    link.active
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
                    !link.page && 'opacity-50 cursor-not-allowed',
                  ]"
                >
                  {{
                    link.label
                      .replace("&laquo;", "")
                      .replace("&raquo;", "")
                      .trim()
                  }}
                </button>
              </div>

              <button
                @click="nextPage"
                :disabled="!pagination.next_page_url"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useApi } from "~/composables/useApi";

const api = useApi();

const employees = ref<any[]>([]);
const search = ref("");
const loading = ref(false);
const errorMessage = ref("");

const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  from: 0,
  to: 0,
  prev_page_url: null,
  next_page_url: null,
});

const paginationLinks = ref<any[]>([]);

// 🎨 Helper untuk inisial nama
const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// 🖼️ Helper untuk URL foto
const getPhotoUrl = (photoPath: string) => {
  if (!photoPath) return "";

  if (photoPath.startsWith("http://") || photoPath.startsWith("https://")) {
    return photoPath;
  }

  const baseUrl = "http://localhost:8000";

  if (photoPath.startsWith("storage/")) {
    return `${baseUrl}/${photoPath}`;
  }

  if (photoPath.startsWith("photos/")) {
    return `${baseUrl}/storage/${photoPath}`;
  }

  return `${baseUrl}/storage/${photoPath}`;
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  // Sembunyikan img, tampilkan inisial
  img.style.display = "none";
};

const loadEmployees = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const response = await api.get("/employees", {
      params: {
        search: search.value,
        page: pagination.value.current_page,
      },
    });

    console.log("Employee response:", response);

    const data = response.data;

    employees.value = data?.data || [];

    pagination.value = {
      current_page: data?.current_page || 1,
      last_page: data?.last_page || 1,
      per_page: data?.per_page || 10,
      total: data?.total || 0,
      from: data?.from || 0,
      to: data?.to || 0,
      prev_page_url: data?.prev_page_url || null,
      next_page_url: data?.next_page_url || null,
    };

    paginationLinks.value = data?.links || [];
  } catch (error: any) {
    console.error("Gagal memuat pegawai:", error);
    errorMessage.value =
      error?.response?.data?.message || "Gagal memuat data pegawai.";
  } finally {
    loading.value = false;
  }
};

let searchTimeout: NodeJS.Timeout;
watch(search, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    pagination.value.current_page = 1;
    loadEmployees();
  }, 500);
});

const prevPage = () => {
  if (pagination.value.prev_page_url) {
    pagination.value.current_page--;
    loadEmployees();
  }
};

const nextPage = () => {
  if (pagination.value.next_page_url) {
    pagination.value.current_page++;
    loadEmployees();
  }
};

const goToPage = (page: number | null) => {
  if (page && page !== pagination.value.current_page) {
    pagination.value.current_page = page;
    loadEmployees();
  }
};

onMounted(loadEmployees);
</script>

<style scoped></style>
