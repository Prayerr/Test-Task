import type { IDevice, INode } from "@/interface/device";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useDevicesStore = defineStore("devices", () => {
  const devices = ref<IDevice[]>([]);
  let nextDeviceId: number = 1;

  const addDevice = () => {
    const newDevice = {
      id: nextDeviceId,
      name: `Устройство ${nextDeviceId}`,
      nodes: [],
    };
    devices.value.push(newDevice);
    nextDeviceId += 1;
  };

  const updateDevice = (id: number, name: string) => {
    const device = devices.value.find((d) => d.id === id);
    if (device) {
      device.name = name;
    }
  };

  const removeDevice = (id: number) => {
    devices.value = devices.value.filter((d) => d.id !== id);
  };

  const addNodeToDevice = (deviceId: number, node: INode) => {
    const device = devices.value.find((d) => d.id === deviceId);
    if (device) {
      device.nodes.push(node);
    }
  };

  const updateNode = (deviceId: number, nodeId: number, name: string) => {
    const device = devices.value.find((d) => d.id === deviceId);
    if (device) {
      const node = device.nodes.find((n) => n.id === nodeId);
      if (node) {
        node.name = name;
      }
    }
  };

  const removeNodeFromDevice = (deviceId: number, nodeId: number) => {
    const device = devices.value.find((d) => d.id === deviceId);
    if (device) {
      device.nodes = device.nodes.filter((n) => n.id !== nodeId);
    }
  };

  return {
    devices,
    addDevice,
    updateDevice,
    removeDevice,
    addNodeToDevice,
    updateNode,
    removeNodeFromDevice,
  };
});
