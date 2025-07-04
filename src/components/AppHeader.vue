<template>
  <v-container>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-icon="mdi-account-circle"
          :subtitle="userData?.email"
          :title="userData?.fullName"
        />
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-format-list-checks"
          title="Tasks"
          @click="changeTabActive('Tasks')"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="1">
      <template #prepend>
        <v-app-bar-title class="ml-5 mr-5">Task Menager</v-app-bar-title>
      </template>

      <template #append>
        <v-switch
          v-model="model"
          class="mr-4"
          false-value="light"
          hide-details
          :label="`${model}`"
          true-value="dark"
        />
        <v-btn class="mr-1" color="primary" variant="flat" @click="Logout()">Logout</v-btn>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script setup>
  import { useUiStore } from '@/stores/app';

  import { useTheme } from 'vuetify';

  const themeGlobal = useTheme();

  const userData = JSON.parse(sessionStorage.getItem('user'));
  const uiStore = useUiStore();
  const model = ref(localStorage.getItem('userTheme') || 'light');

  onMounted(() => {
    themeGlobal.global.name.value = model.value;
  });

  watch(model, async val => {
    document.body.classList.add('disable-theme-transition');

    themeGlobal.global.name.value = val;
    localStorage.setItem('userTheme', val);

    await nextTick();
    setTimeout(() => {
      document.body.classList.remove('disable-theme-transition');
    }, 50);
  });

  function Logout () {
    sessionStorage.removeItem('user');
    window.location = '/logare';
  }
  function changeTabActive (choosenTab) {
    if (uiStore.selectedTab?.tabs?.includes(choosenTab)) {
      uiStore.deleteTab(choosenTab);
    // uiStore.deleteTaskList();
    } else {
      uiStore.setTaskList();
      uiStore.setTab(choosenTab);
    }
  }
</script>

<style scoped>
.btnStyle:hover {
  background-color: aliceblue;
}
.disable-theme-transition *,
.disable-theme-transition {
  transition: none !important;
}
.v-btn {
  transition: none !important;
}
</style>
