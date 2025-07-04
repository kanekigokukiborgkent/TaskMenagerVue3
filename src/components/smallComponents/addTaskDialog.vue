<template>
  <app-draggable-dialog v-model="showDialog" max-width="1100px" persistent>
    <template #header>
      <v-row class="ma-0">
        <v-spacer />
        <v-btn icon text @click="closeDialog()">
          <v-icon color="red" size="25"> mdi-close </v-icon>
        </v-btn>
      </v-row>
    </template>
    <v-card flat>
      <div max-width="1100px" transition="dialog-bottom-transition">
        <v-card prepend-icon="mdi-update" title="Add new Task:">
          <div class="formEdit">
            <v-text-field
              v-model="currentNewTask.Titlu"
              class="mb-5"
              hide-details="true"
              label="Add Title"
              required
            />

            <v-text-field
              v-model="currentNewTask.Descriere"
              class="mb-5"
              hide-details="true"
              label="Add Descriere"
            />

            <v-select
              v-model="currentNewTask.Prioritate"
              :items="itemsForPriority"
              label="Add Prioritate"
              :menu-props="{ zIndex: 9999 }"
              required
            />

            <v-select
              v-model="currentNewTask.Status"
              :items="itemsForStatus"
              label="Add Status"
              :menu-props="{ zIndex: 9999 }"
              required
            />

            <v-text-field
              v-model="currentNewTask.Deadline"
              class="mb-5"
              hide-details="true"
              label="Add Deadline"
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
                  <v-btn
                    color="green"
                    text
                    width="250"
                    @click="saveDatePicker()"
                  >Save</v-btn>
                </div>
              </v-dialog>
            </div>

            <v-select
              v-model="currentNewTask.deadlineLate"
              :items="itemsForDeadline"
              label="Add deadlineLate"
              :menu-props="{ zIndex: 9999 }"
              required
            />

            <v-text-field
              v-model="currentNewTask.Etichete"
              class="mb-5"
              hide-details="true"
              label="Add Etichete"
            />
          </div>
          <template #actions>
            <v-btn
              class="ms-auto mr-2"
              color="green"
              height="50"
              text="Add Task"
              @click="SaveNewTask()"
            />
          </template>
        </v-card>
      </div>
    </v-card>
  </app-draggable-dialog>
</template>

<script setup>
  import { ref } from 'vue';
  import { useUiStore } from '@/stores/app';
  import swalAlert from '@/reusables/sweetsAlerts';

  const uiStore = useUiStore();

  const props = defineProps(['showAddTaskDialog', 'selectedTask']);

  const chooseDate = ref(null);

  const showDataPicker = ref(false);

  const emit = defineEmits(['closeDialog', 'saveValDatePicker']);

  const itemsForStatus = ['to do', 'in progres', 'done'];
  const itemsForPriority = ['high', 'medium', 'low'];
  const itemsForDeadline = ['less', 'delayed', 'today'];

  const currentNewTask = ref({
    Deadline: null,
    Descriere: null,
    Etichete: null,
    Id: null,
    Prioritate: null,
    Status: null,
    Titlu: null,
    deadlineLate: null,
  });

  const formattedDate = ref(null);

  function accesToDataPicker () {
    showDataPicker.value = !showDataPicker.value;
  }

  async function SaveNewTask () {
    if (
      !currentNewTask.value.Deadline ||
      !currentNewTask.value.Descriere ||
      !currentNewTask.value.Etichete ||
      !currentNewTask.value.Prioritate ||
      !currentNewTask.value.Status ||
      !currentNewTask.value.Titlu ||
      !currentNewTask.value.deadlineLate
    ) {
      const res = await swalAlert.errorSwalTabWithHtml(
        'Add new task?',
        'question',
        'Save',
        'Cancel',
      );
      if (res === true) {
        currentNewTask.value.Id = 4;
        uiStore.addNewTask(currentNewTask.value);
        closeDialog();
      }
    } else {
      await swalAlert.errorSwalTabWithHtml('Complete all rows!', 'error', 'OK');
    }
  }

  // async function SaveNewTask() {

  // currentNewTask.value.Id = 4;
  // if(!currentNewTask.value.Deadline || !currentNewTask.value.Descriere || !currentNewTask.value.Etichete ||
  //  !currentNewTask.value.Prioritate || !currentNewTask.value.Status || !currentNewTask.value.Titlu ||
  //   !currentNewTask.value.deadlineLate){
  // const res = await swalAlert.errorSwalTabWithHtml(
  //   "Continue to edit this task?",
  //   "question"
  // );
  // if (res === true) {
  // uiStore.addNewTask(currentNewTask.value);
  // closeDialog();
  // }
  // }

  function saveDatePicker () {
    const tempDay = chooseDate.value.getDate();
    const day = tempDay < 10 ? `0${tempDay}` : tempDay;
    const tempMonth = chooseDate.value.getMonth() + 1;
    const month = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
    const year = chooseDate.value.getFullYear();

    formattedDate.value = `${year}-${month}-${day}`;
    currentNewTask.value.Deadline = formattedDate.value;
    closeDatePicker();
  }
  function closeDatePicker () {
    showDataPicker.value = false;
  }

  const showDialog = ref(props.showAddTaskDialog);

  function closeDialog () {
    emit('closeDialog');
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
