<template>
  <div class="p-6">
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Daftar Pegawai</h1>
      <button class="btn" @click="onLogout">Logout</button>
    </header>

    <div class="flex justify-between mb-4">
      <input
        v-model="search"
        placeholder="Cari nama / NIP"
        class="input w-1/2"
      />
      <button class="btn" @click="loadEmployees">Cari</button>
    </div>

    <EmployeeTable :employees="employees" />

    <div class="mt-6 flex justify-between items-center">
      <button class="btn" @click="prevPage" :disabled="page === 1">Prev</button>
      <span>Halaman {{ page }}</span>
      <button class="btn" @click="nextPage" :disabled="!hasMore">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";
import { useApi } from "~/composables/useApi";
import EmployeeTable from "~/components/EmployeeTable.vue";

const router = useRouter();
const { logout } = useAuth();
const api = useApi();

const employees = ref([]);
const search = ref("");
const page = ref(1);
const hasMore = ref(true);

const loadEmployees = async () => {
  const { data } = await api.get("/employees", {
    params: { search: search.value, page: page.value },
  });
  employees.value = data.data;
  hasMore.value = data.meta.current_page < data.meta.last_page;
};

onMounted(loadEmployees);
watch(search, () => {
  page.value = 1;
  loadEmployees();
});

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    loadEmployees();
  }
};
const nextPage = () => {
  page.value++;
  loadEmployees();
};
const onLogout = async () => {
  await logout();
  router.push("/login");
};
</script>
