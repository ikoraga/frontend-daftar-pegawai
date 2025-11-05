<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Daftar Pegawai</h1>
        <p class="text-gray-600 mt-1">Kelola data pegawai secara efisien</p>
      </div>

      <!-- Search & Filter -->
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
              placeholder="Cari nama/NIP..."
              class="w-full sm:w-1/2 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div
            class="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
          >
            <!-- Unit Filter -->
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <label class="text-sm font-medium text-gray-600 whitespace-nowrap"
                >Unit:</label
              >
              <select
                v-model="selectedUnit"
                class="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Unit</option>
                <option v-for="opt in flatUnits" :key="opt.id" :value="opt.id">
                  {{ opt.name }}
                </option>
              </select>
            </div>
            <div>
              <button
                @click="printEmployees"
                class="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-medium"
              >
                🖨️ Cetak Daftar
              </button>
            </div>
            <!-- Add Button -->
            <button
              @click="$router.push('/employees/create')"
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
          <table class="w-full divide-y divide-gray-200">
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
                  Tempat Lahir
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Alamat
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tgl Lahir
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  L/P
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Agama
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tempat Tugas
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No. HP
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  NPWP
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pangkat/Gol
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Eselon
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
                  class="px-6 py-3 text-right text-xs font-medium text-gray-800 uppercase tracking-wider"
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
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-mono text-gray-900">{{
                    emp.nip
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ emp.full_name }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ emp.birth_place || "-" }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs truncate">
                    {{ emp.address || "-" }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatDate(emp.birth_date) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      emp.gender
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-pink-100 text-pink-800',
                    ]"
                  >
                    {{ emp.gender ? "L" : "P" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900">{{
                    emp.religion?.name || "-"
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ emp.duty_place || "-" }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900">{{
                    emp.phone || "-"
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-mono text-gray-900">{{
                    emp.npwp || "-"
                  }}</span>
                </td>
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
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ emp.echelon?.code || "-" }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ emp.echelon?.name || "-" }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs">
                    {{ emp.position?.name || "-" }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ emp.unit?.name || "-" }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ emp.unit?.kode || "-" }}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex justify-end gap-2">
                    <button
                      @click="viewEmployee(emp.id)"
                      class="text-blue-600 hover:text-blue-900 transition"
                      title="Lihat Detail"
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
                      @click="editEmployee(emp.id)"
                      class="text-gray-600 hover:text-gray-900 transition"
                      title="Edit"
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
                    <button
                      @click="confirmDelete(emp)"
                      class="text-red-600 hover:text-red-900 transition"
                      title="Hapus"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
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
            <div class="text-sm text-gray-700">
              Menampilkan
              <span class="font-medium">{{ pagination.from }}</span>
              sampai
              <span class="font-medium">{{ pagination.to }}</span>
              dari
              <span class="font-medium">{{ pagination.total }}</span>
              pegawai
            </div>

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

              <div class="flex items-center gap-1">
                <button
                  v-for="(link, idx) in paginationLinks"
                  :key="idx"
                  @click="goToPage(link.page)"
                  :disabled="!link.page || link.active"
                  :class="[
                    'px-4 py-2 border rounded-lg text-sm font-medium transition',
                    link.active
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
                    (!link.page || link.active) &&
                      'opacity-50 cursor-not-allowed',
                  ]"
                >
                  {{ link.label }}
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

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="showDeleteModal = false"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              Konfirmasi Hapus
            </h3>
            <button
              @click="showDeleteModal = false"
              class="text-gray-400 hover:text-gray-600 transition"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus pegawai
            <span class="font-semibold">{{ employeeToDelete?.full_name }}</span
            >? Tindakan ini tidak dapat dibatalkan.
          </p>

          <div class="flex gap-3 justify-end">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              :disabled="deleting"
            >
              Batal
            </button>
            <button
              @click="deleteEmployee"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              :disabled="deleting"
            >
              <svg
                v-if="deleting"
                class="animate-spin h-4 w-4"
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
              {{ deleting ? "Menghapus..." : "Hapus" }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useApi } from "~/composables/useApi";
import { navigateTo } from "#imports";

const api = useApi();

// State
const employees = ref<any[]>([]);
const search = ref("");
const loading = ref(false);
const errorMessage = ref("");
const showDeleteModal = ref(false);
const employeeToDelete = ref<any>(null);
const deleting = ref(false);
const units = ref<any[]>([]);
const selectedUnit = ref("");

const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  from: 0,
  to: 0,
  prev_page_url: null as string | null,
  next_page_url: null as string | null,
});

const paginationLinks = ref<any[]>([]);

const flatUnits = computed(() => {
  const flatten = (unitsList: any[], prefix = ""): any[] => {
    return unitsList.flatMap((unit) => [
      { id: unit.id, name: `${prefix}${unit.name}` },
      ...(unit.children ? flatten(unit.children, prefix + "— ") : []),
    ]);
  };
  return flatten(units.value);
});

// Helper Functions
const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getPhotoUrl = (photoPath: string) => {
  if (!photoPath) return "";
  if (photoPath.startsWith("http://") || photoPath.startsWith("https://")) {
    return photoPath;
  }

  const baseUrl =
    import.meta.env.NUXT_PUBLIC_API_BASE?.replace("/api", "") ||
    "http://localhost:8000";

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
  img.style.display = "none";
};

// API Calls
const fetchUnits = async () => {
  try {
    const { data } = await api.get("/units");
    units.value = data.data || data;
  } catch (error) {
    console.error("Gagal memuat units:", error);
  }
};

const printEmployees = async () => {
  try {
    const response = await api.get(`/print/employees`, {
      responseType: "blob",
    });

    const file = new Blob([response.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);

    window.open(fileURL, "_blank");
  } catch (error) {
    console.error("Gagal mencetak:", error);
  }
};

const loadEmployees = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const params: any = {
      page: pagination.value.current_page,
    };

    if (search.value) params.search = search.value;
    if (selectedUnit.value) params.unit_id = selectedUnit.value;

    const response = await api.get("/employees", { params });
    const data = response.data;

    employees.value = data?.data || [];

    Object.assign(pagination.value, {
      current_page: data?.current_page || 1,
      last_page: data?.last_page || 1,
      per_page: data?.per_page || 10,
      total: data?.total || 0,
      from: data?.from || 0,
      to: data?.to || 0,
      prev_page_url: data?.prev_page_url || null,
      next_page_url: data?.next_page_url || null,
    });

    if (data?.links) {
      paginationLinks.value = data.links
        .filter((link: any) => {
          const label = link.label.replace(/&laquo;|&raquo;/g, "").trim();
          return label !== "Previous" && label !== "Next";
        })
        .map((link: any) => ({
          label: link.label.replace(/&laquo;|&raquo;/g, "").trim(),
          page: link.url ? new URL(link.url).searchParams.get("page") : null,
          active: link.active,
        }));
    }
  } catch (error: any) {
    console.error("Gagal memuat pegawai:", error);
    errorMessage.value =
      error?.response?.data?.message || "Gagal memuat data pegawai.";
  } finally {
    loading.value = false;
  }
};

// Navigation
const viewEmployee = (id: string) => navigateTo(`/employees/${id}`);
const editEmployee = (id: string) => navigateTo(`/employees/${id}/edit`);

// Pagination
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

const goToPage = (page: string | null) => {
  if (page && Number(page) !== pagination.value.current_page) {
    pagination.value.current_page = Number(page);
    loadEmployees();
  }
};

// Delete
const confirmDelete = (employee: any) => {
  employeeToDelete.value = employee;
  showDeleteModal.value = true;
};

const deleteEmployee = async () => {
  if (!employeeToDelete.value) return;

  try {
    deleting.value = true;
    await api.delete(`/employees/${employeeToDelete.value.id}`);
    showDeleteModal.value = false;
    employeeToDelete.value = null;
    await loadEmployees();
  } catch (error: any) {
    console.error("Gagal menghapus pegawai:", error);
    alert(error?.response?.data?.message || "Gagal menghapus pegawai");
  } finally {
    deleting.value = false;
  }
};

// Watchers
let searchTimeout: ReturnType<typeof setTimeout>;
watch(search, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    pagination.value.current_page = 1;
    loadEmployees();
  }, 500);
});

watch(selectedUnit, () => {
  pagination.value.current_page = 1;
  loadEmployees();
});

onMounted(() => {
  fetchUnits();
  loadEmployees();
});
</script>
