<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Edit Data Pegawai</h1>
            <p class="text-gray-500 mt-1">Perbarui data pegawai di bawah ini</p>
          </div>
          <button
            @click="$router.push('/employees')"
            class="text-gray-600 hover:text-gray-900"
          >
            <svg
              class="w-6 h-6"
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
      </div>

      <!-- Loading State -->
      <div
        v-if="loadingData"
        class="bg-white shadow-sm rounded-lg p-12 text-center"
      >
        <svg
          class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
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
        <p class="text-gray-600">Memuat data pegawai...</p>
      </div>

      <!-- Form -->
      <div v-else class="bg-white shadow-sm rounded-lg p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Error -->
          <div
            v-if="errorMessage"
            class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <svg
              class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
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
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>

          <!-- Success -->
          <div
            v-if="successMessage"
            class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
          >
            <svg
              class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
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
            <p class="text-sm text-green-700">{{ successMessage }}</p>
          </div>

          <!-- Photo Upload Section -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Foto Pegawai
            </label>
            <div class="flex items-start gap-6">
              <!-- Photo Preview -->
              <div
                class="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center"
              >
                <img
                  v-if="photoPreview"
                  :src="photoPreview"
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
                <svg
                  v-else
                  class="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <!-- Upload Button -->
              <div class="flex-1">
                <label
                  class="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span class="text-sm font-medium text-gray-700"
                    >Pilih Foto</span
                  >
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleFile"
                    class="hidden"
                  />
                </label>
                <p class="text-xs text-gray-500 mt-2">
                  Format: JPG, PNG, GIF (Max: 2MB)
                </p>
              </div>
            </div>
          </div>

          <!-- Grid Layout for Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- NIP -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                NIP <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.nip"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Masukkan NIP"
              />
            </div>

            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.full_name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <!-- Birth Place -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tempat Lahir <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.birth_place"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Masukkan tempat lahir"
              />
            </div>

            <!-- Birth Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Lahir <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.birth_date"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <!-- Gender -->
            <div>
              <div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Kelamin <span class="text-red-500">*</span>
                  </label>
                  <div class="flex items-center gap-6">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        v-model="form.gender"
                        :value="true"
                        class="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Laki-laki</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        v-model="form.gender"
                        :value="false"
                        class="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Perempuan</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <!-- Religion -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Agama <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.religion_id"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Pilih Agama</option>
                <option
                  v-for="religion in lookups.religions"
                  :key="religion.id"
                  :value="religion.id"
                >
                  {{ religion.name }}
                </option>
              </select>
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                No. HP <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.phone"
                type="tel"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Masukkan nomor HP"
              />
            </div>

            <!-- NPWP -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                NPWP
              </label>
              <input
                v-model="form.npwp"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Masukkan NPWP"
              />
            </div>

            <!-- Rank -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Pangkat/Golongan <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.rank_id"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Pilih Pangkat</option>
                <option
                  v-for="rank in lookups.ranks"
                  :key="rank.id"
                  :value="rank.id"
                >
                  {{ rank.code }} - {{ rank.name }}
                </option>
              </select>
            </div>

            <!-- Echelon -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Eselon <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.echelon_id"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Pilih Eselon</option>
                <option
                  v-for="echelon in lookups.echelons"
                  :key="echelon.id"
                  :value="echelon.id"
                >
                  {{ echelon.code }} - {{ echelon.name }}
                </option>
              </select>
            </div>

            <!-- Position -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Jabatan <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.position_id"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Pilih Jabatan</option>
                <option
                  v-for="position in lookups.positions"
                  :key="position.id"
                  :value="position.id"
                >
                  {{ position.name }}
                </option>
              </select>
            </div>

            <!-- Unit -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Unit Kerja <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.unit_id"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Pilih Unit Kerja</option>
                <option v-for="unit in units" :key="unit.id" :value="unit.id">
                  {{ unit.kode }} - {{ unit.name }}
                </option>
              </select>
            </div>

            <!-- Work Location -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tempat Tugas <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.duty_place"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Masukkan tempat tugas"
              />
            </div>
          </div>

          <!-- Address - Full Width -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Alamat <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.address"
              required
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Masukkan alamat lengkap"
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4">
            <button
              type="button"
              @click="handleReset"
              :disabled="loading"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg
                v-if="loading"
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
              {{ loading ? "Menyimpan..." : "Update Data Pegawai" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, navigateTo } from "#imports";
import { useApi } from "~/composables/useApi";

const api = useApi();
const route = useRoute();
const id = route.params.id;

const loading = ref(false);
const loadingData = ref(true);
const errorMessage = ref("");
const successMessage = ref("");
const photoPreview = ref("");

interface EmployeeForm {
  nip: string;
  full_name: string;
  birth_place: string;
  birth_date: string;
  address: string;
  phone: string;
  npwp: string;
  gender: boolean;
  duty_place: string;
  religion_id: string;
  rank_id: string;
  echelon_id: string;
  position_id: string;
  unit_id: string;
  photo: File | null;
}

const form = ref<EmployeeForm>({
  nip: "",
  full_name: "",
  birth_place: "",
  birth_date: "",
  address: "",
  phone: "",
  npwp: "",
  gender: true,
  duty_place: "",
  religion_id: "",
  rank_id: "",
  echelon_id: "",
  position_id: "",
  unit_id: "",
  photo: null,
});

const originalData = ref<EmployeeForm | null>(null);

interface LookupItem {
  id: number | string;
  name: string;
}

interface RankItem extends LookupItem {
  code?: string;
}

interface EchelonItem extends LookupItem {
  code?: string;
}

const lookups = ref<{
  religions: Array<LookupItem>;
  ranks: Array<RankItem>;
  echelons: Array<EchelonItem>;
  positions: Array<LookupItem>;
}>({
  religions: [],
  ranks: [],
  echelons: [],
  positions: [],
});

const units = ref<Array<{ id: number | string; kode: string; name: string }>>(
  []
);

const fetchEmployee = async () => {
  try {
    loadingData.value = true;
    const { data } = await api.get(`/employees/${id}`);

    if (data?.data) {
      const employee = data.data;
      form.value = {
        nip: employee.nip || "",
        full_name: employee.full_name || "",
        birth_place: employee.birth_place || "",
        birth_date: employee.birth_date || "",
        address: employee.address || "",
        phone: employee.phone || "",
        npwp: employee.npwp || "",
        gender: employee.gender ?? true,
        duty_place: employee.duty_place || "",
        religion_id: employee.religion_id || "",
        rank_id: employee.rank_id || "",
        echelon_id: employee.echelon_id || "",
        position_id: employee.position_id || "",
        unit_id: employee.unit_id || "",
        photo: null,
      };

      originalData.value = { ...form.value };

      if (employee.photo_path) {
        photoPreview.value = getPhotoUrl(employee.photo_path);
      }
    }
  } catch (error: any) {
    console.error("Error fetching employee:", error);
    errorMessage.value =
      error?.response?.data?.message || "Gagal memuat data pegawai.";
  } finally {
    loadingData.value = false;
  }
};

const getPhotoUrl = (photoPath: string) => {
  if (!photoPath) return "";
  if (photoPath.startsWith("http://") || photoPath.startsWith("https://")) {
    return photoPath;
  }
  const baseUrl = import.meta.env.NUXT_PUBLIC_API_BASE?.replace("/api", "");
  if (photoPath.startsWith("storage/")) {
    return `${baseUrl}/${photoPath}`;
  }
  if (photoPath.startsWith("photos/")) {
    return `${baseUrl}/storage/${photoPath}`;
  }
  return `${baseUrl}/storage/${photoPath}`;
};

const fetchLookups = async () => {
  try {
    const [{ data: lookupData }, { data: unitData }] = await Promise.all([
      api.get("/lookups"),
      api.get("/units"),
    ]);

    if (lookupData?.data) {
      lookups.value = lookupData.data;
    }
    units.value = unitData.data;
  } catch (error: any) {
    console.error("Error fetching lookups:", error);
    errorMessage.value = "Gagal memuat data referensi.";
  }
};

const handleFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      errorMessage.value = "Ukuran file terlalu besar. Maksimal 2MB.";
      return;
    }

    form.value.photo = file;
    const reader = new FileReader();
    reader.onload = (e) => (photoPreview.value = e.target?.result as string);
    reader.readAsDataURL(file);
  }
};

const handleReset = () => {
  if (originalData.value) {
    form.value = { ...originalData.value };
    form.value.photo = null;

    // Reset photo preview to original
    fetchEmployee();
  }
  errorMessage.value = "";
  successMessage.value = "";
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const formData = new FormData();
    formData.append("_method", "PATCH");

    for (const key in form.value) {
      let val = form.value[key as keyof EmployeeForm];

      if (key === "gender") {
        val = form.value.gender ? "1" : "0";
      }

      if (val !== null && val !== undefined && val !== "") {
        if (val instanceof File) {
          formData.append(key, val);
        } else {
          formData.append(key, String(val));
        }
      }
    }

    const { data } = await api.post(`/employees/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    successMessage.value = data?.message || "Pegawai berhasil diperbarui!";

    // Redirect after success
    setTimeout(() => {
      navigateTo("/employees");
    }, 1500);
  } catch (error: any) {
    console.error("Error updating employee:", error);
    errorMessage.value =
      error?.response?.data?.message ||
      "Gagal memperbarui data pegawai. Silakan coba lagi.";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await Promise.all([fetchLookups(), fetchEmployee()]);
});
</script>
