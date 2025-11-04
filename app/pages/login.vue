<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div
          class="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            class="h-10 w-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900">Selamat Datang</h2>
        <p class="mt-2 text-sm text-gray-600">Silakan masuk ke akun Anda</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="onLogin" class="space-y-6">
          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Email Input -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Email</label
            >
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                placeholder="nama@perusahaan.com"
                class="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                :class="{ 'border-red-300': errorMessage }"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                :class="{ 'border-red-300': errorMessage }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  v-if="!showPassword"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
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
                <svg
                  v-else
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember me -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700"
                >Ingat saya</label
              >
            </div>
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-blue-600 hover:text-blue-500 transition"
                >Lupa password?</a
              >
            </div>
          </div>

          <!-- Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            {{ loading ? "Memproses..." : "Masuk" }}
          </button>
        </form>

        <!-- Divider -->
        <div class="mt-6">
          <div class="relative flex justify-center items-center">
            <div class="w-full border-t border-gray-300"></div>
            <span class="px-2 bg-white text-sm text-gray-500"
              >Belum punya akun?</span
            >
          </div>
          <div class="mt-4 text-center">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500"
              >Daftar sekarang</a
            >
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-xs text-gray-500">
        © 2025 Perusahaan Anda. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "#imports";
import { useAuth } from "~/composables/useAuth";
import { definePageMeta, useNuxtApp } from "#imports";
import { useCookie } from "#app";

definePageMeta({ layout: false });

const router = useRouter();
const { login } = useAuth();
const { $toast } = useNuxtApp() as any;
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);

const onLogin = async () => {
  errorMessage.value = "";

  if (!email.value || !password.value) {
    errorMessage.value = "Email dan password tidak boleh kosong";
    if ($toast?.warning) {
      $toast.warning(errorMessage.value, {
        position: "top-right",
        autoClose: 2500,
      });
    }
    return;
  }

  try {
    loading.value = true;
    const response = await login(email.value, password.value);
    console.log("Login response:", response);

    const token = response?.data?.token;
    const user = response?.data?.user;
    const message = response?.message;

    console.log("token", token);
    console.log("user", user);

    if (response?.status === true && token) {
      const tokenCookie = useCookie("auth_token");
      tokenCookie.value = token;

      const userCookie = useCookie("user_data");
      userCookie.value = JSON.stringify(user || {});

      if ($toast?.success) {
        $toast.success(message || "Login berhasil", {
          position: "top-right",
          autoClose: 2000,
        });
      }

      setTimeout(() => router.push("/employees"), 500);
    } else {
      const msg =
        response?.message || "Login gagal. Periksa email dan password kamu.";

      errorMessage.value = msg;

      if ($toast?.error) {
        $toast.error(msg, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  } catch (error: any) {
    console.log("Login error:", error);

    const data = error?.response?.data;
    const msg =
      data?.message ||
      data?.errors?.email?.[0] ||
      data?.errors?.password?.[0] ||
      "Terjadi kesalahan. Silakan coba lagi.";

    errorMessage.value = msg;

    if ($toast?.error) {
      $toast.error(msg, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>
