import { AppDraggableDialog } from '@/reusables/components/smallComponents/index';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component(AppDraggableDialog.name, AppDraggableDialog);
  },
};

export default GlobalComponents;
