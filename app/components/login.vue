<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      @submit.prevent="onLogin"
      class="bg-white p-8 rounded-lg shadow-md w-96"
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input"
      />
      <button type="submit" class="btn w-full mt-4" :disabled="loading">
        {{ loading ? "Loading..." : "Login" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const router = useRouter();
const { login } = useAuth();
const email = ref("");
const password = ref("");
const loading = ref(false);

const onLogin = async () => {
  try {
    loading.value = true;
    await login(email.value, password.value);
    router.push("/employees");
  } catch (err) {
    alert("Login gagal. Cek email & password.");
  } finally {
    loading.value = false;
  }
};
</script>
