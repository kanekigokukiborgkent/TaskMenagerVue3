<template>
  <div>
    <TasksMenager v-if="showTaskstab" />
  </div>
</template>

<script setup>
  import { computed, ref, watch } from 'vue';
  import { useUiStore } from '@/stores/app';
  import TasksMenager from '@/components/TasksMenager.vue';

  const userData = JSON.parse(sessionStorage.getItem('user'));

  const uiStore = useUiStore();
  const selectedTab = computed(() => uiStore.selectedTab);
  let showTaskstab = ref(false);
  showTaskstab = ref(uiStore.selectedTab.tabs.includes('Tasks') || false);

  watch(
    selectedTab,
    val => {
      showTaskstab.value = val?.tabs?.includes('Tasks') || false;
    },
    { deep: true },
  );

  onMounted(() => {
    if (!userData) window.location = '/logare';
  });
</script>

<style scoped></style>
