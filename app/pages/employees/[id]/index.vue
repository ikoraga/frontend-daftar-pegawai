<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Detail Pegawai</h1>
        <button
          @click="$router.push('/employees')"
          class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
        ></button>
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

      <!-- Data Pegawai -->
      <div v-else-if="employee" class="space-y-6">
        <!-- Foto + Nama -->
        <div class="flex flex-col sm:flex-row items-center gap-6 border-b pb-4">
          <img
            v-if="employee.photo_path"
            :src="getPhotoUrl(employee.photo_path)"
            alt="Foto Pegawai"
            class="w-28 h-28 object-cover rounded-xl border-2 border-gray-200"
          />
          <div
            v-else
            class="w-28 h-28 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-semibold"
          >
            {{ getInitials(employee.full_name) }}
          </div>
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">
              {{ employee.full_name }}
            </h2>
            <p class="text-gray-500">{{ employee.nip || "NIP belum diisi" }}</p>
            <p class="text-gray-600 text-sm">
              {{ employee.position?.name || "-" }} ·
              {{ employee.unit?.name || "-" }}
            </p>
          </div>
        </div>

        <!-- Informasi Pribadi -->
        <div>
          <h3 class="text-lg font-semibold text-blue-700 mb-2">
            Informasi Pribadi
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Tempat, Tanggal Lahir:</strong>
              {{ employee.birth_place || "-" }},
              {{ formatDate(employee.birth_date) }}
            </p>
            <p>
              <strong>Jenis Kelamin:</strong>
              {{ employee.gender ? "Laki-laki" : "Perempuan" }}
            </p>
            <p><strong>Agama:</strong> {{ employee.religion?.name || "-" }}</p>
            <p>
              <strong>Tempat Tugas:</strong> {{ employee.duty_place || "-" }}
            </p>
            <p><strong>Alamat:</strong> {{ employee.address || "-" }}</p>
            <p><strong>No. Telepon:</strong> {{ employee.phone || "-" }}</p>
            <p><strong>NPWP:</strong> {{ employee.npwp || "-" }}</p>
          </div>
        </div>

        <!-- Informasi Kepegawaian -->
        <div>
          <h3 class="text-lg font-semibold text-green-700 mb-2">
            Informasi Kepegawaian
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Pangkat/Golongan:</strong>
              {{ employee.rank?.code || "-" }} -
              {{ employee.rank?.name || "-" }}
            </p>
            <p>
              <strong>Eselon:</strong> {{ employee.echelon?.code || "-" }} -
              {{ employee.echelon?.name || "-" }}
            </p>
            <p>
              <strong>Jabatan:</strong> {{ employee.position?.name || "-" }}
            </p>
            <p><strong>Unit Kerja:</strong> {{ employee.unit?.name || "-" }}</p>
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="flex justify-end gap-4 mt-6 border-t pt-4">
          <button
            @click="goToEdit"
            class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            Edit Data
          </button>
          <button
            @click="$router.push('/employees')"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-lg transition"
          >
            Kembali
          </button>
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

const employee = ref<any>(null);
const loading = ref(true);
const errorMessage = ref("");

const formatDate = (date: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getPhotoUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${api.defaults.baseURL?.replace("/api", "")}/storage/${path.replace(
    /^storage\//,
    ""
  )}`;
};

const fetchEmployee = async () => {
  try {
    const res = await api.get(`/employees/${route.params.id}`);
    employee.value = res.data.data || res.data;
  } catch (error: any) {
    console.error("Gagal memuat data pegawai:", error);
    errorMessage.value =
      error.response?.data?.message || "Gagal memuat data pegawai.";
  } finally {
    loading.value = false;
  }
};

const goToEdit = () => {
  navigateTo(`/employees/${route.params.id}/edit`);
};

onMounted(fetchEmployee);
</script>
