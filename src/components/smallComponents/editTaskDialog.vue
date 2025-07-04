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
      <editRows
        :curr-task="currTask"
        :show-dialog="showDialog"
        @close-dialog="closeDialog()"
      />
    </v-card>
  </app-draggable-dialog>
</template>

<script setup>
  import editRows from '@/components/smallComponents/editRows.vue';

  const props = defineProps(['showEditTaskDialog', 'selectedTask']);
  const showDialog = ref(props.showEditTaskDialog);
  const currTask = ref(props.selectedTask);

  const emit = defineEmits(['closeDialog', 'saveValDatePicker']);

  function closeDialog () {
    emit('closeDialog');
  }
</script>
