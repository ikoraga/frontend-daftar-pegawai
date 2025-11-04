<!-- <template>
  <table class="min-w-full border border-gray-300 bg-white">
    <thead class="bg-gray-200">
      <tr>
        <th class="p-2 border">NIP</th>
        <th class="p-2 border">Nama</th>
        <th class="p-2 border">Unit</th>
        <th class="p-2 border">Jabatan</th>
        <th class="p-2 border">Foto</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="e in employees" :key="e.id" class="hover:bg-gray-50">
        <td class="p-2 border">{{ e.nip }}</td>
        <td class="p-2 border">{{ e.full_name }}</td>
        <td class="p-2 border">{{ e.unit?.name }}</td>
        <td class="p-2 border">{{ e.position?.name }}</td>
        <td class="p-2 border text-center">
          <img
            v-if="e.photo_path"
            :src="`${apiBase}/storage/${e.photo_path}`"
            class="w-10 h-10 rounded-full mx-auto object-cover"
          />
          <span v-else>-</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps<{ employees: any[] }>();
const apiBase = import.meta.env.NUXT_PUBLIC_API_BASE.replace("/api", "");
</script> -->
