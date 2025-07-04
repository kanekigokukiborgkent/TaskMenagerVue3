import { defineStore } from 'pinia';
import listTasks from '@/reusables/listTasks.js';

export const useUiStore = defineStore('ui', {
  state: () => ({
    selectedTab: JSON.parse(localStorage.getItem('tab')) || { tabs: [] },
    tasks: JSON.parse(localStorage.getItem('listTasks')) || listTasks.Tasks,
    userTheme: 'light',
  }),
  actions: {
    setTab (tabValue) {
      if (!this.selectedTab || !Array.isArray(this.selectedTab.tabs)) {
        this.selectedTab = { tabs: [] };
      }

      if (!this.selectedTab.tabs.includes(tabValue)) {
        this.selectedTab.tabs.push(tabValue);
        localStorage.setItem('tab', JSON.stringify(this.selectedTab));
      }
    },
    deleteTab (tabToDelete) {
      if (!this.selectedTab || !Array.isArray(this.selectedTab.tabs)) return;

      this.selectedTab.tabs = this.selectedTab.tabs.filter(
        tab => tab !== tabToDelete,
      );

      if (this.selectedTab.tabs.length === 0) {
        this.selectedTab = { tabs: [] };
        localStorage.removeItem('tab');
      } else {
        localStorage.setItem('tab', JSON.stringify(this.selectedTab));
      }
    },

    setTaskList () {
      if (listTasks.Tasks?.length > 0 && !localStorage.getItem('listTasks')) {
        this.tasks = JSON.parse(JSON.stringify(listTasks.Tasks));
        localStorage.setItem('listTasks', JSON.stringify(listTasks.Tasks));
      }
    },
    deleteTaskList () {
      localStorage.removeItem('listTasks');
    },
    editTaskElement (task) {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...task };

        localStorage.removeItem('listTasks');
        localStorage.setItem('listTasks', JSON.stringify(this.tasks));
      }
    },
    deleteTaskElement (task) {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        localStorage.setItem('listTasks', JSON.stringify(this.tasks));
      }
      if (this.tasks.length === 0) {
        this.deleteTaskList();
      }
    },
    addNewTask (task) {
      this.tasks.push(task);
      localStorage.setItem('listTasks', JSON.stringify(this.tasks));
    },
  },
});
