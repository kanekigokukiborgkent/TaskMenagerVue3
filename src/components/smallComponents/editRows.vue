<template>
  <div max-width="1100px" transition="dialog-bottom-transition">
    <v-card prepend-icon="mdi-update" title="Edit current Task:">
      <div class="formEdit">
        <v-text-field
          v-model="currentTask.Titlu"
          class="mb-5"
          hide-details="true"
          label="Modify Title"
          required
        />

        <v-text-field
          v-model="currentTask.Descriere"
          class="mb-5"
          hide-details="true"
          label="Modify Descriere"
        />

        <v-select
          v-model="currentTask.Prioritate"
          :items="itemsForPriority"
          label="Modify Prioritate"
          :menu-props="{ zIndex: 9999 }"
          required
        />

        <v-select
          v-model="currentTask.Status"
          :items="itemsForStatus"
          label="Modify Status"
          :menu-props="{ zIndex: 9999 }"
          required
        />

        <v-text-field
          v-model="currentTask.Deadline"
          class="mb-5"
          hide-details="true"
          label="Modify Deadline"
          @click="accesToDataPicker()"
        />

        <div>
          <v-dialog
            v-model="showDataPicker"
            class="datePickerClass"
            max-width="600px"
            persistent
            transition="dialog-bottom-transition"
          >
            <v-date-picker v-model="chooseDate" width="500" />
            <v-spacer />
            <div>
              <v-btn color="red" text width="250" @click="closeDatePicker()">Close</v-btn>
              <v-btn color="green" text width="250" @click="saveDatePicker()">Save</v-btn>
            </div>
          </v-dialog>
        </div>

        <v-select
          v-model="currentTask.deadlineLate"
          :items="itemsForDeadline"
          label="Add deadlineLate"
          :menu-props="{ zIndex: 9999 }"
          required
        />

        <v-text-field
          v-model="currentTask.Etichete"
          class="mb-5"
          hide-details="true"
          label="Modify Etichete"
        />
      </div>
      <template #actions>
        <v-btn
          class="ms-auto mr-2"
          color="green"
          height="50"
          text="Update"
          @click="UpdateTaskInformation()"
        />
      </template>
    </v-card>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { useUiStore } from '@/stores/app';

  const uiStore = useUiStore();

  const props = defineProps(['showDialog', 'currTask']);

  const chooseDate = ref(null);

  const showDataPicker = ref(false);

  const emit = defineEmits(['closeDialog']);

  const itemsForStatus = ['to do', 'in progres', 'done'];
  const itemsForPriority = ['high', 'medium', 'low'];
  const itemsForDeadline = ['less', 'delayed', 'today'];

  const currentTask = ref(props.currTask);

  const formattedDate = ref(null);

  function accesToDataPicker () {
    showDataPicker.value = !showDataPicker.value;
  }

  function closeDialog () {
    emit('closeDialog');
  }
  function UpdateTaskInformation () {
    uiStore.editTaskElement(currentTask.value);
    closeDialog();
  }
  function saveDatePicker () {
    const tempDay = chooseDate.value.getDate();
    const day = tempDay < 10 ? `0${tempDay}` : tempDay;
    const tempMonth = chooseDate.value.getMonth() + 1;
    const month = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
    const year = chooseDate.value.getFullYear();

    formattedDate.value = `${year}-${month}-${day}`;
    currentTask.value.Deadline = formattedDate.value;
    closeDatePicker();
  }
  function closeDatePicker () {
    showDataPicker.value = false;
  }
</script>

<style scoped>
.formEdit {
  padding: 15px;
}
.datePickerClass {
  z-index: 9999 !important;
}
</style>
