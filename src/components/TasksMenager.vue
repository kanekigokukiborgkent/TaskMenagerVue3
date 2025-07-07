<template>
  <div>
    <div class="container-fluid">
      <div>
        <v-card class="mb-2" elevation="0" :style="{ boxShadow }">
          <v-card-item>
            <v-card-title style="height: auto">
              <v-text-field
                v-model="searchTitle"
                class="mb-5"
                hide-details="true"
                label="Search..."
                required
              />
              <div>
                <v-expansion-panels multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-title>Filters :</v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <!-- Filtrare după status, etichete, prioritate -->
                      <v-select
                        v-model="filterPriority"
                        :items="itemsForPriority"
                        label="Priority"
                        :menu-props="{ zIndex: 9999 }"
                        required
                      />
                      <v-text-field
                        v-model="formattedDate"
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
                            <v-btn
                              color="red"
                              text
                              width="250"
                              @click="closeDatePicker()"
                              >Close</v-btn
                            >
                            <v-btn
                              color="green"
                              text
                              width="250"
                              @click="saveDatePicker()"
                              >Save</v-btn
                            >
                          </div>
                        </v-dialog>
                      </div>

                      <!-- <v-checkbox label="Checkbox"></v-checkbox> -->
                      <div class="partActions">
                        <v-btn color="red" @click="clearFilters()"
                          >Clear Filters</v-btn
                        >
                        <v-btn color="primary" @click="applyFilters()"
                          >Apply Filters</v-btn
                        >
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-card-title>
          </v-card-item>
        </v-card>
      </div>
      <v-card elevation="0" :style="{ boxShadow }">
        <v-card-item>
          <div class="row">
            <div class="col columnScroll">
              <div v-if="userData" class="half-height">
                <p>ToDO List</p>
                <v-sheet border="info lg" rounded>
                  <VueDraggableNext
                    v-if="Array.isArray(toDoList)"
                    class="dragArea list-group p-4"
                    data-list="to do"
                    :group="{ name: 'shared' }"
                    :list="toDoList"
                    @change="log"
                  >
                    <v-card
                      v-for="task in toDoList"
                      :key="task.id"
                      class="mt-3"
                      elevation="0"
                      :style="{ boxShadow }"
                    >
                      <v-card-item>
                        <v-card-title class="v_card_title_Style">
                          <p>
                            {{ task.Titlu }}
                          </p>
                          <div class="v_card_title_Style">
                            <p>
                              <v-tooltip location="top">
                                <template #activator="{ props }">
                                  <v-btn icon v-bind="props" variant="text">
                                    <v-icon
                                      v-if="task.Prioritate === 'high'"
                                      color="red"
                                      >mdi-chevron-triple-up</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Prioritate === 'medium'"
                                      color="orange"
                                      >mdi-chevron-double-up</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Prioritate === 'low'"
                                      color="green"
                                      >mdi-chevron-up</v-icon
                                    >
                                  </v-btn>
                                </template>
                                <span
                                  >Prioritatea taskului:
                                  {{ task.Prioritate }}</span
                                >
                              </v-tooltip>
                            </p>
                            <p>
                              <v-tooltip location="top">
                                <template #activator="{ props }">
                                  <v-btn icon v-bind="props" variant="text">
                                    <v-icon
                                      v-if="task.Status === 'to do'"
                                      color="info"
                                      >mdi-check-circle-outline</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Status === 'done'"
                                      color="green"
                                      >mdi-check-circle-outline</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Status === 'in progres'"
                                      color="orange"
                                      >mdi-progress-clock</v-icon
                                    >
                                  </v-btn>
                                </template>
                                <span
                                  >Statusul taskului: {{ task.Status }}</span
                                >
                              </v-tooltip>
                            </p>
                          </div>
                        </v-card-title>

                        <v-card-subtitle>
                          {{ task.Descriere }}
                        </v-card-subtitle>
                      </v-card-item>

                      <v-card-text>
                        <div class="v_card_title_Calendar">
                          <v-tooltip location="top">
                            <template #activator="{ props }">
                              <v-btn icon v-bind="props" variant="text">
                                <v-icon
                                  v-if="task?.deadlineLate === 'delayed'"
                                  class="mr-2"
                                  color="red"
                                  >mdi-calendar-alert</v-icon
                                >
                                <v-icon
                                  v-if="task?.deadlineLate === 'today'"
                                  class="mr-2"
                                  color="orange"
                                  >mdi-calendar-clock-outline</v-icon
                                >
                                <v-icon
                                  v-if="task?.deadlineLate === 'less'"
                                  class="mr-2"
                                  color="green"
                                  >mdi-calendar-multiselect-outline</v-icon
                                >
                              </v-btn>
                            </template>
                            <span>Deadline: {{ task.Deadline }}</span>
                          </v-tooltip>
                          <p :class="bgcolor(task?.deadlineLate)">
                            {{ task.Deadline }}
                          </p>
                        </div>

                        <div class="partActions">
                          <div>
                            <p class="comentStyle">
                              {{ task.Etichete }}
                            </p>
                          </div>
                          <div>
                            <v-btn
                              class="mr-3"
                              color="primary"
                              @click="editTask(task)"
                            >
                              Edit
                              <v-icon>mdi-pencil-outline</v-icon></v-btn
                            >
                            <v-btn color="red" @click="deleteTask(task)"
                              >Delete<v-icon>mdi-delete</v-icon></v-btn
                            >
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </VueDraggableNext>
                </v-sheet>
              </div>
            </div>

            <div class="col">
              <div class="col columnScroll">
                <p>In Progress List</p>
                <v-sheet border="warning lg" rounded>
                  <VueDraggableNext
                    v-if="Array.isArray(inProgressList)"
                    class="dragArea list-group p-4"
                    data-list="in progres"
                    :group="{ name: 'shared' }"
                    :list="inProgressList"
                    @change="log"
                  >
                    <v-card
                      v-for="task in inProgressList"
                      :key="task.id"
                      class="mt-3"
                      elevation="0"
                      :style="{ boxShadow }"
                    >
                      <v-card-item>
                        <v-card-title class="v_card_title_Style">
                          <p>
                            {{ task.Titlu }}
                          </p>
                          <div class="v_card_title_Style">
                            <p>
                              <v-tooltip location="top">
                                <template #activator="{ props }">
                                  <v-btn icon v-bind="props" variant="text">
                                    <v-icon
                                      v-if="task.Prioritate === 'high'"
                                      color="red"
                                      >mdi-chevron-triple-up</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Prioritate === 'medium'"
                                      color="orange"
                                      >mdi-chevron-double-up</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Prioritate === 'low'"
                                      color="green"
                                      >mdi-chevron-up</v-icon
                                    >
                                  </v-btn>
                                </template>
                                <span
                                  >Prioritatea taskului:
                                  {{ task.Prioritate }}</span
                                >
                              </v-tooltip>
                            </p>
                            <p>
                              <v-tooltip location="top">
                                <template #activator="{ props }">
                                  <v-btn icon v-bind="props" variant="text">
                                    <v-icon
                                      v-if="task.Status === 'to do'"
                                      color="info"
                                      >mdi-check-circle-outline</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Status === 'done'"
                                      color="green"
                                      >mdi-check-circle-outline</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Status === 'in progres'"
                                      color="orange"
                                      >mdi-progress-clock</v-icon
                                    >
                                  </v-btn>
                                </template>
                                <span
                                  >Statusul taskului: {{ task.Status }}</span
                                >
                              </v-tooltip>
                            </p>
                          </div>
                        </v-card-title>

                        <v-card-subtitle>
                          {{ task.Descriere }}
                        </v-card-subtitle>
                      </v-card-item>

                      <v-card-text>
                        <div class="v_card_title_Calendar">
                          <v-tooltip location="top">
                            <template #activator="{ props }">
                              <v-btn icon v-bind="props" variant="text">
                                <v-icon
                                  v-if="task?.deadlineLate === 'delayed'"
                                  class="mr-2"
                                  color="red"
                                  >mdi-calendar-alert</v-icon
                                >
                                <v-icon
                                  v-if="task?.deadlineLate === 'today'"
                                  class="mr-2"
                                  color="orange"
                                  >mdi-calendar-clock-outline</v-icon
                                >
                                <v-icon
                                  v-if="task?.deadlineLate === 'less'"
                                  class="mr-2"
                                  color="green"
                                  >mdi-calendar-multiselect-outline</v-icon
                                >
                              </v-btn>
                            </template>
                            <span>Deadline: {{ task.Deadline }}</span>
                          </v-tooltip>
                          <p :class="bgcolor(task?.deadlineLate)">
                            {{ task.Deadline }}
                          </p>
                        </div>

                        <div class="partActions">
                          <div>
                            <p class="comentStyle">
                              {{ task.Etichete }}
                            </p>
                          </div>
                          <div>
                            <v-btn
                              class="mr-3"
                              color="primary"
                              @click="editTask(task)"
                            >
                              Edit
                              <v-icon>mdi-pencil-outline</v-icon></v-btn
                            >
                            <v-btn color="red" @click="deleteTask(task)"
                              >Delete<v-icon>mdi-delete</v-icon></v-btn
                            >
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </VueDraggableNext>
                </v-sheet>
              </div>
            </div>

            <div class="col">
              <div class="col columnScroll">
                <p>Done List</p>
                <v-sheet border="success lg" rounded>
                  <VueDraggableNext
                    v-if="Array.isArray(doneList)"
                    class="dragArea list-group p-4"
                    data-list="done"
                    :group="{ name: 'shared' }"
                    :list="doneList"
                    @change="log"
                  >
                    <v-card
                      v-for="task in doneList"
                      :key="task.id"
                      class="mt-3"
                      elevation="0"
                      :style="{ boxShadow }"
                    >
                      <v-card-item>
                        <v-card-title class="v_card_title_Style">
                          <p>
                            {{ task.Titlu }}
                          </p>
                          <div class="v_card_title_Style">
                            <p>
                              <v-tooltip location="top">
                                <template #activator="{ props }">
                                  <v-btn icon v-bind="props" variant="text">
                                    <v-icon
                                      v-if="task.Prioritate === 'high'"
                                      color="red"
                                      >mdi-chevron-triple-up</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Prioritate === 'medium'"
                                      color="orange"
                                      >mdi-chevron-double-up</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Prioritate === 'low'"
                                      color="green"
                                      >mdi-chevron-up</v-icon
                                    >
                                  </v-btn>
                                </template>
                                <span
                                  >Prioritatea taskului:
                                  {{ task.Prioritate }}</span
                                >
                              </v-tooltip>
                            </p>
                            <p>
                              <v-tooltip location="top">
                                <template #activator="{ props }">
                                  <v-btn icon v-bind="props" variant="text">
                                    <v-icon
                                      v-if="task.Status === 'to do'"
                                      color="info"
                                      >mdi-check-circle-outline</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Status === 'done'"
                                      color="green"
                                      >mdi-check-circle-outline</v-icon
                                    >
                                    <v-icon
                                      v-if="task.Status === 'in progres'"
                                      color="orange"
                                      >mdi-progress-clock</v-icon
                                    >
                                  </v-btn>
                                </template>
                                <span
                                  >Statusul taskului: {{ task.Status }}</span
                                >
                              </v-tooltip>
                            </p>
                          </div>
                        </v-card-title>

                        <v-card-subtitle>
                          {{ task.Descriere }}
                        </v-card-subtitle>
                      </v-card-item>

                      <v-card-text>
                        <div class="v_card_title_Calendar">
                          <v-tooltip location="top">
                            <template #activator="{ props }">
                              <v-btn icon v-bind="props" variant="text">
                                <v-icon
                                  v-if="task?.deadlineLate === 'delayed'"
                                  class="mr-2"
                                  color="red"
                                  >mdi-calendar-alert</v-icon
                                >
                                <v-icon
                                  v-if="task?.deadlineLate === 'today'"
                                  class="mr-2"
                                  color="orange"
                                  >mdi-calendar-clock-outline</v-icon
                                >
                                <v-icon
                                  v-if="task?.deadlineLate === 'less'"
                                  class="mr-2"
                                  color="green"
                                  >mdi-calendar-multiselect-outline</v-icon
                                >
                              </v-btn>
                            </template>
                            <span>Deadline: {{ task.Deadline }}</span>
                          </v-tooltip>
                          <p :class="bgcolor(task?.deadlineLate)">
                            {{ task.Deadline }}
                          </p>
                        </div>

                        <div class="partActions">
                          <div>
                            <p class="comentStyle">
                              {{ task.Etichete }}
                            </p>
                          </div>
                          <div>
                            <v-btn
                              class="mr-3"
                              color="primary"
                              @click="editTask(task)"
                            >
                              Edit
                              <v-icon>mdi-pencil-outline</v-icon></v-btn
                            >
                            <v-btn color="red" @click="deleteTask(task)"
                              >Delete<v-icon>mdi-delete</v-icon></v-btn
                            >
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </VueDraggableNext>
                </v-sheet>
              </div>
            </div>
          </div>
        </v-card-item>
      </v-card>
      <div class="mt-2 mb-2">
        <v-card elevation="0" :style="{ boxShadow }">
          <v-card-item>
            <v-card-title class="partActions" style="height: 65px">
              <p>Adauga nou Task</p>
              <v-btn
                class="mr-1"
                color="primary"
                icon
                text
                @click="addNewTask()"
              >
                <v-icon size="25"> mdi-plus </v-icon>
              </v-btn>
            </v-card-title>
          </v-card-item>
        </v-card>
      </div>
    </div>
    <editTaskDialog
      v-if="showEditTaskDialog"
      :selected-task="selectedTask"
      :show-edit-task-dialog="showEditTaskDialog"
      @close-dialog="closeDialog()"
    />
    <addTaskDialog
      v-if="showAddTaskDialog"
      :show-add-task-dialog="showAddTaskDialog"
      @close-dialog="closeDialog()"
    />
  </div>
</template>

<script setup>
//imports
import { computed, ref, watch } from "vue";
import { useUiStore } from "@/stores/app";
import swalAlert from "@/reusables/sweetsAlerts";
import editTaskDialog from "@/components/smallComponents/editTaskDialog.vue";
import addTaskDialog from "@/components/smallComponents/addTaskDialog.vue";
import { VueDraggableNext } from "vue-draggable-next";
import { useTheme } from "vuetify";

const theme = useTheme();

const boxShadow = computed(() => {
  const currentTheme = theme.themes.value[theme.global.name.value];
  return currentTheme?.customStyles?.boxShadow;
});
//values
const uiStore = useUiStore();
const taskList = computed(() => {
  return checkDeadline(uiStore.tasks);
});
const userData = JSON.parse(sessionStorage.getItem("user"));
const showEditTaskDialog = ref(false);
const showAddTaskDialog = ref(false);
const searchTitle = ref("");
const filterPriority = ref("");
const applyFilter = ref(false);
const selectedTask = ref();

const itemsForPriority = ["high", "medium", "low"];

const chooseDate = ref("");
const showDataPicker = ref(false);
const formattedDate = ref("");
const filterStatus = ref("");

//flow draggable between lists

const toDoList = ref([]);
const inProgressList = ref([]);
const doneList = ref([]);

watch(
  () => [taskList.value, searchTitle.value, applyFilter.value],
  () => {
    toDoList.value = taskList.value.filter((task) => {
      const filterStatus = task.Status === "to do";
      const filterTitlu =
        !searchTitle.value.trim() ||
        task.Titlu?.toLowerCase().includes(searchTitle.value.toLowerCase());
      const filterPriorityTask =
        filterPriority.value && applyFilter.value
          ? task.Prioritate === filterPriority.value
          : task;
      const filterDeadlinTask =
        formattedDate.value && applyFilter.value
          ? task.Deadline === formattedDate.value
          : task;
      return (
        filterStatus && filterTitlu && filterPriorityTask && filterDeadlinTask
      );
    });
    inProgressList.value = taskList.value.filter((task) => {
      const filterStatus = task.Status === "in progres";
      const filterTitlu =
        !searchTitle.value.trim() ||
        task.Titlu?.toLowerCase().includes(searchTitle.value.toLowerCase());
      const filterPriorityTask =
        filterPriority.value && applyFilter.value
          ? task.Prioritate === filterPriority.value
          : task;
      const filterDeadlinTask =
        formattedDate.value && applyFilter.value
          ? task.Deadline === formattedDate.value
          : task;
      return (
        filterStatus && filterTitlu && filterPriorityTask && filterDeadlinTask
      );
    });
    doneList.value = taskList.value.filter((task) => {
      const filterStatus = task.Status === "done";
      const filterTitlu =
        !searchTitle.value.trim() ||
        task.Titlu?.toLowerCase().includes(searchTitle.value.toLowerCase());
      const filterPriorityTask =
        filterPriority.value && applyFilter.value
          ? task.Prioritate === filterPriority.value
          : task;
      const filterDeadlinTask =
        formattedDate.value && applyFilter.value
          ? task.Deadline === formattedDate.value
          : task;
      return (
        filterStatus && filterTitlu && filterPriorityTask && filterDeadlinTask
      );
    });
  },
  { immediate: true },
  { deep: true }
);

// flow draggable between lists
function log(event) {
  if (!event || !event.added) return;

  const { added } = event;
  const item = added.element;

  doneList.value.forEach((el) => {
    if (el.id === item.id) {
      el.Status = "done";
      edit(el);
    }
  });
  inProgressList.value.forEach((el) => {
    if (el.id === item.id) {
      el.Status = "in progres";
      edit(el);
    }
  });
  toDoList.value.forEach((el) => {
    if (el.id === item.id) {
      el.Status = "to do";
      edit(el);
    }
  });
}

function accesToDataPicker() {
  showDataPicker.value = !showDataPicker.value;
}
function saveDatePicker() {
  const tempDay = chooseDate.value.getDate();
  const day = tempDay < 10 ? `0${tempDay}` : tempDay;
  const tempMonth = chooseDate.value.getMonth() + 1;
  const month = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
  const year = chooseDate.value.getFullYear();

  formattedDate.value = `${year}-${month}-${day}`;
  closeDatePicker();
}
function closeDatePicker() {
  showDataPicker.value = false;
}

function applyFilters() {
  applyFilter.value = true;
}
function clearFilters() {
  filterStatus.value = "";
  filterPriority.value = "";
  formattedDate.value = "";
  applyFilter.value = false;
}

function getFormattedDateToInsert() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
  return `${formattedDate}`;
}
function checkDeadline(allTasks) {
  return allTasks.map((element) => {
    const deadlineLate = dateDifference(element.Deadline);
    return {
      ...element,
      deadlineLate,
    };
  });
}
function dateDifference(val) {
  const todayYMD = getFormattedDateToInsert();
  if (new Date(val) > new Date(todayYMD)) return "delayed";
  if (new Date(val).getTime() === new Date(todayYMD).getTime()) return "today";
  if (new Date(val) < new Date(todayYMD)) return "less";
}
function bgcolor(value) {
  let nameClass = "rounded-pill";
  if (value === "delayed") return (nameClass = "red rounded-pill");
  if (value === "today") return (nameClass = "orange rounded-pill");
  if (value === "less") return (nameClass = "green rounded-pill");
  return nameClass;
}
function edit(task) {
  uiStore.editTaskElement(task);
  taskList.value = checkDeadline(uiStore.tasks);
}

async function editTask(task) {
  const res = await swalAlert.errorSwalTabWithHtml(
    "Continue to edit this task?",
    "question",
    "Edit",
    "Cancel"
  );
  if (res === true) {
    showEditTaskDialog.value = true;
    selectedTask.value = task;
  } else {
    closeDialog();
  }
}
function closeDialog() {
  showEditTaskDialog.value = false;
  showAddTaskDialog.value = false;
  selectedTask.value = null;
}
async function deleteTask(task) {
  const res = await swalAlert.errorSwalTabWithHtml(
    "Delete this task?",
    "question",
    "Delete",
    "Cancel"
  );
  if (res === true) {
    uiStore.deleteTaskElement(task);
  }
}
function addNewTask() {
  showAddTaskDialog.value = true;
}
</script>

<style scoped>
.v_card_title_Style {
  display: flex;
  justify-content: space-between;
}
.v_card_title_Calendar {
  display: flex;
  align-items: center;
}
.red {
  background-color: #f3a0a0;
  height: 30px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.orange {
  background-color: orange;
  height: 30px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.green {
  background-color: #88fe98;
  height: 30px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.comentStyle {
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.partActions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.datePickerClass {
  z-index: 9999 !important;
}
.columnScroll {
  overflow-y: auto;
  max-height: 700px;
  scrollbar-width: thin;
}
.v-card,
.v-btn {
  transition: none !important;
}
</style>
