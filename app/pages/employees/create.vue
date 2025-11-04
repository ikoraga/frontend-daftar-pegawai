<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header Card -->
      <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              Tambah Pegawai Baru
            </h1>
            <p class="text-gray-500 mt-1">
              Lengkapi formulir data pegawai di bawah ini
            </p>
          </div>
          <div class="hidden md:block">
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-8 h-8 text-blue-600"
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
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="bg-white shadow-sm rounded-lg p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Data Pribadi Section -->
          <div class="mb-8">
            <h2
              class="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500"
            >
              Data Pribadi
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  NIP
                </label>
                <input
                  v-model="form.nip"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Masukkan NIP"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.full_name"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Tempat Lahir
                </label>
                <input
                  v-model="form.birth_place"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Contoh: Jakarta"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Lahir <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.birth_date"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kelamin <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.gender"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option :value="true">Laki-laki</option>
                  <option :value="false">Perempuan</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Tempat Tugas <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.duty_place"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Masukkan tempat tugas"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Agama <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.religion_id"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="" disabled>Pilih agama</option>
                  <option
                    v-for="r in lookups.religions"
                    :key="r.id"
                    :value="r.id"
                  >
                    {{ r.name }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Alamat
                </label>
                <textarea
                  v-model="form.address"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  rows="3"
                  placeholder="Masukkan alamat lengkap"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  No. Telepon
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Contoh: 08123456789"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  NPWP
                </label>
                <input
                  v-model="form.npwp"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Contoh: 12.345.678.9-012.345"
                />
              </div>
            </div>
          </div>

          <!-- Data Kepegawaian Section -->
          <div class="mb-8">
            <h2
              class="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-green-500"
            >
              Data Kepegawaian
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Pangkat / Golongan <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.rank_id"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="" disabled>Pilih pangkat</option>
                  <option v-for="r in lookups.ranks" :key="r.id" :value="r.id">
                    {{ r.code }} - {{ r.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Eselon
                </label>
                <select
                  v-model="form.echelon_id"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="" disabled>Pilih eselon</option>
                  <option
                    v-for="e in lookups.echelons"
                    :key="e.id"
                    :value="e.id"
                  >
                    {{ e.code }} - {{ e.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Jabatan
                </label>
                <select
                  v-model="form.position_id"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="" disabled>Pilih jabatan</option>
                  <option
                    v-for="p in lookups.positions"
                    :key="p.id"
                    :value="p.id"
                  >
                    {{ p.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Unit Kerja
                </label>
                <select
                  v-model="form.unit_id"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="" disabled>Pilih unit kerja</option>
                  <option v-for="u in units" :key="u.id" :value="u.id">
                    {{ u.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Upload Foto Section -->
          <div class="mb-8">
            <h2
              class="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-purple-500"
            >
              Foto Pegawai
            </h2>
            <div class="flex items-start gap-4">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Upload Foto (Opsional)
                </label>
                <input
                  type="file"
                  @change="handleFile"
                  accept="image/*"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Format: JPG, PNG, maksimal 2MB
                </p>
              </div>
              <div v-if="photoPreview" class="flex-shrink-0">
                <img
                  :src="photoPreview"
                  alt="Preview"
                  class="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <p class="text-sm text-green-700">{{ successMessage }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4">
            <button
              type="button"
              @click="resetForm"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition disabled:opacity-50"
              :disabled="loading"
            >
              Reset Form
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              :disabled="loading"
            >
              <svg
                v-if="loading"
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
              {{ loading ? "Menyimpan..." : "Simpan Data Pegawai" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { navigateTo, useApi } from "#imports";

/* 🧩 TYPING SECTION */
interface BaseOption {
  id: string;
  name: string;
}
interface RankOption extends BaseOption {
  code?: string;
}
interface EchelonOption extends BaseOption {
  code?: string;
}
interface LookupData {
  religions: BaseOption[];
  ranks: RankOption[];
  echelons: EchelonOption[];
  positions: BaseOption[];
}
interface Unit extends BaseOption {}

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

/* ⚙️ MAIN LOGIC */
const api = useApi();
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const photoPreview = ref("");

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

const lookups = ref<LookupData>({
  religions: [],
  ranks: [],
  echelons: [],
  positions: [],
});

const units = ref<Unit[]>([]);

const handleFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    form.value.photo = file;

    // Preview foto
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    form.value.photo = null;
    photoPreview.value = "";
  }
};

const fetchLookups = async () => {
  try {
    const [{ data: lookupData }, { data: unitData }] = await Promise.all([
      api.get("http://localhost:8000/api/lookups"),
      api.get("http://localhost:8000/api/units"),
    ]);

    if (lookupData.status) {
      lookups.value = lookupData.data;
    }
    units.value = unitData || [];
  } catch (error: any) {
    console.error("Gagal mengambil data lookup/unit:", error);
    const message =
      error.response?.data?.message ||
      "Gagal memuat data. Silakan refresh halaman.";
    errorMessage.value = message;
  }
};

const resetForm = () => {
  form.value = {
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
  };
  photoPreview.value = "";
  errorMessage.value = "";
  successMessage.value = "";

  // Reset file input
  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  if (fileInput) fileInput.value = "";
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const formData = new FormData();

    // Append semua field ke FormData
    for (const key in form.value) {
      const val = form.value[key as keyof EmployeeForm];
      if (val !== null && val !== undefined && val !== "") {
        if (key === "photo" && val instanceof File) {
          formData.append(key, val);
        } else if (key !== "photo") {
          formData.append(key, String(val));
        }
      }
    }

    const { data } = await api.post(
      "http://localhost:8000/api/employees",
      formData
    );

    successMessage.value = data.message || "Pegawai berhasil ditambahkan!";

    // Reset form setelah berhasil
    setTimeout(() => {
      resetForm();
    }, 2000);
    await navigateTo("/employees");
  } catch (error: any) {
    console.error(error);
    errorMessage.value =
      error.response?.data?.message ||
      "Gagal menyimpan data pegawai. Silakan coba lagi.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchLookups);
</script>
