<template>
  <div class="max-w-5xl mx-auto">
    <h1 class="font-bold text-3xl mb-8">Список устройств</h1>
    <ul class="bg-neutral-300 w-fit p-5 mb-2 flex flex-col gap-3">
      <li v-for="device in devices" :key="device.id">
        <DeviceCard :device="device" />
      </li>
    </ul>
    <button
      @click="addDevice"
      class="bg-neutral-400 hover:bg-neutral-600 rounded-full px-3 py-2 text-white"
    >
      Добавить устройство
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDevicesStore } from "./stores/devices";
import DeviceCard from "@/components/DeviceCard.vue";

const store = useDevicesStore();

const devices = computed(() => store.devices);

const addDevice = () => {
  store.addDevice();
};
</script>
