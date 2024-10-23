<template>
  <div class="flex items-center gap-3 justify-between">
    <input v-if="isEditing" v-model="deviceName" />
    <span v-else class="font-semibold">{{ device.name }}</span>
    <button
      @click="toggleEdit"
      class="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded-full"
    >
      {{ isEditing ? "Сохранить" : "Редактировать" }}
    </button>
    <button
      @click="removeDevice"
      class="bg-red-400 hover:bg-red-600 rounded-full px-2 py-1 text-white"
    >
      Удалить
    </button>
    <div v-if="isEditing">
      <ul class="flex flex-col gap-2">
        <li v-for="node in device.nodes" :key="node.id">
          <input v-model="node.name" />
          <button
            @click="removeNode(node.id)"
            class="ml-2 bg-red-400 hover:bg-red-600 rounded-full px-2 py-1 text-white"
          >
            Удалить узел
          </button>
        </li>
      </ul>
      <button
        @click="addNode"
        class="mt-2 bg-green-400 hover:bg-green-600 rounded-full px-2 py-1 text-white"
      >
        Добавить узел
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDevice } from "@/interface/device";
import { ref } from "vue";
import { useDevicesStore } from "@/stores/devices";

interface IDeviceCardProps {
  device: IDevice;
}

const props = defineProps<IDeviceCardProps>();
const store = useDevicesStore();

const isEditing = ref<boolean>(false);

const deviceName = ref<string>(props.device.name);

const toggleEdit = (): void => {
  if (isEditing.value) {
    store.updateDevice(props.device.id, deviceName.value);
  }

  isEditing.value = !isEditing.value;
};

const removeDevice = (): void => {
  store.removeDevice(props.device.id);
};

const addNode = (): void => {
  const nodeId: number = Math.floor(Math.random() * 100_000_000);
  const newNode = { id: nodeId, name: `Узел ${nodeId}` };
  store.addNodeToDevice(props.device.id, newNode);
};

const removeNode = (nodeId: number): void => {
  store.removeNodeFromDevice(props.device.id, nodeId);
};
</script>
