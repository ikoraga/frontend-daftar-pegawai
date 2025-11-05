<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Daftar Unit Kerja</h1>
        <div class="flex items-center gap-3">
          <button
            @click="navigateTo('/units/create')"
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            ➕ Tambah Unit
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <svg
          class="animate-spin h-10 w-10 text-blue-600"
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
      </div>

      <!-- Error -->
      <div
        v-else-if="errorMessage"
        class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg"
      >
        {{ errorMessage }}
      </div>

      <!-- Empty -->
      <div
        v-else-if="units.length === 0"
        class="text-center text-gray-500 py-12"
      >
        Tidak ada data unit ditemukan.
      </div>

      <!-- Table -->
      <div v-else class="bg-white shadow rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                #
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Nama Unit
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Kode
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
              >
                Aksi
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="(unit, idx) in units" :key="unit.id">
              <!-- Parent Row -->
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm text-gray-700 font-medium">
                  {{ idx + 1 }}
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-gray-900">
                  {{ unit.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 font-mono">
                  {{ unit.kode || "-" }}
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      unit.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600',
                    ]"
                  >
                    {{ unit.isActive ? "Aktif" : "Nonaktif" }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 text-right text-sm font-medium flex justify-end gap-2"
                >
                  <button
                    @click="goToDetail(unit.id)"
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
                    @click="goToEdit(unit.id)"
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
                    @click="confirmDelete(unit)"
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
                </td>
              </tr>

              <!-- Children Rows -->
              <tr
                v-for="child in unit.children"
                :key="child.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4"></td>
                <td class="px-6 py-4 pl-12 text-sm text-gray-800">
                  ↳ {{ child.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 font-mono">
                  {{ child.kode || "-" }}
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      child.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600',
                    ]"
                  >
                    {{ child.isActive ? "Aktif" : "Nonaktif" }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 text-right text-sm font-medium flex justify-end gap-2"
                >
                  <button
                    @click="goToDetail(child.id)"
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
                    @click="goToEdit(child.id)"
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
                    @click="confirmDelete(child)"
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
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Delete -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showDeleteModal = false"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Konfirmasi Hapus
        </h3>
        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus unit
          <strong>{{ unitToDelete?.name }}</strong
          >? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            @click="deleteUnit"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi, navigateTo } from "#imports";

const api = useApi();
const units = ref<any[]>([]);
const loading = ref(false);
const errorMessage = ref("");
const showDeleteModal = ref(false);
const unitToDelete = ref<any>(null);

const loadUnits = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";
    const res = await api.get("/units");
    units.value = res.data.data || res.data;
  } catch (error: any) {
    console.error("Gagal memuat unit:", error);
    errorMessage.value =
      error.response?.data?.message || "Gagal memuat data unit kerja.";
  } finally {
    loading.value = false;
  }
};

const goToDetail = (id: string) => navigateTo(`/units/${id}`);
const goToEdit = (id: string) => navigateTo(`/units/${id}/edit`);

const confirmDelete = (unit: any) => {
  unitToDelete.value = unit;
  showDeleteModal.value = true;
};

const deleteUnit = async () => {
  if (!unitToDelete.value) return;
  try {
    await api.delete(`/units/${unitToDelete.value.id}`);
    showDeleteModal.value = false;
    await loadUnits();
  } catch (error: any) {
    console.error("Gagal menghapus unit:", error);
    alert(error.response?.data?.message || "Gagal menghapus unit");
  }
};
onMounted(loadUnits);
</script>
