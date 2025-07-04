<template>
  <div
    v-show="isOpen"
    ref="modalOverlay"
    class="modal-overlay"
    role="document"
    :style="{ zIndex: calculatedZIndex }"
    tabindex="0"
    @click="closeDialog"
  >
    <div ref="dialogContent" class="modal__wraper" :style="modalWraperStyles">
      <div
        class="modal__header"
        :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
        @mousedown="startDragging"
        @mouseup="stopDragging"
      >
        <slot name="header"> Dialog Title </slot>
      </div>
      <div class="modal__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppDraggableDialog',

    props: {
      value: {
        type: Boolean,
        default: () => true,
      },

      persistent: {
        type: Boolean,
        default: () => false,
      },

      maxWidth: {
        type: String,
        default: () => 'auto',
      },
      height: {
        type: String,
        default: () => 'auto',
      },
    },

    // activated() {
    //   this.isOpen = true;
    // },

    data () {
      return {
        zIndex: 0,
        isOpen: this.value,

        isDragging: false,
        initialMouseX: 0,
        initialMouseY: 0,
        dialogTop: 0,
        dialogLeft: 0,

        dialogOffsetX: 0,
        dialogOffsetY: 0,
      };
    },
    computed: {
      modalWraperStyles () {
        return {
          zIndex: this.zIndex + 1,
          top: this.dialogTop + 'px',
          left: this.dialogLeft + 'px',
          'max-width': this.maxWidth,
          width: this.maxWidth,
          height: this.height,
        };
      },
      calculatedZIndex () {
        this.setMaxZIndex();
        return this.zIndex + 1;
      },
    },

    watch: {
      value (newVal) {
        this.isOpen = newVal;
      },

      isOpen (newVal) {
        this.$emit('close');
        this.$emit('input', newVal);
      },
    },

    created () {
    //this.centerDialog(); // Centrează dialogul la crearea componentei
    },

    activated () {
      if (this.isOpen && this.$refs.dialogContent) {
        this.centerDialog();
      }
    },

    mounted () {
      if (this.isOpen) {
        this.centerDialog(); // Centrează dialogul la montarea componentei
        window.addEventListener('resize', this.centerDialog);
      }

      this.setMaxZIndex();
    },

    beforeUnmount () {
      window.removeEventListener('resize', this.centerDialog);
      document.removeEventListener('mousemove', this.handleDragging);
      document.removeEventListener('mouseup', this.stopDragging);
    },

    methods: {
      setMaxZIndex () {
        const elements = document.getElementsByTagName('*');

        let maxZIndex = 0;
        const sweetZindex = 1060;

        for (let i = 0; i < elements.length; i++) {
          const zIndex = parseInt(
            window.getComputedStyle(elements[i]).zIndex,
            10,
          );

          if (zIndex && zIndex > maxZIndex && zIndex !== sweetZindex) {
            maxZIndex = zIndex;
          }
        }

        // Restrict the maximum zIndex to 9999
        this.zIndex = Math.min(maxZIndex + 1, 9990);
      },

      closeDialog (event) {
        const overlayClick = event.target === this.$refs.modalOverlay;

        if (!overlayClick) {
          return;
        }

        if (this.persistent) {
          this.persistentAnimation();
        } else {
          this.isOpen = false;
        }
      },

      startDragging (event) {
        event.preventDefault();

        this.isDragging = true;
        this.initialMouseX = event.clientX;
        this.initialMouseY = event.clientY;

        this.dialogOffsetX = this.dialogLeft - this.initialMouseX;
        this.dialogOffsetY = this.dialogTop - this.initialMouseY;

        document.addEventListener('mousemove', this.handleDragging);
        document.addEventListener('mouseup', this.stopDragging);
      },

      handleDragging (event) {
        if (this.isDragging) {
          const dialogWidth = this.$refs.dialogContent.clientWidth;
          const dialogHeight = this.$refs.dialogContent.clientHeight;
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;

          const minDialogLeft = -dialogWidth / 2;
          const maxDialogLeft = screenWidth - dialogWidth / 2;
          const minDialogTop = 0;
          const maxDialogTop = screenHeight - dialogHeight / 4;

          this.dialogLeft = Math.max(
            minDialogLeft,
            Math.min(event.clientX + this.dialogOffsetX, maxDialogLeft),
          );

          this.dialogTop = Math.max(
            minDialogTop,
            Math.min(event.clientY + this.dialogOffsetY, maxDialogTop),
          );
        }
      },

      stopDragging () {
        document.removeEventListener('mousemove', this.handleDragging);
        document.removeEventListener('mouseup', this.stopDragging);

        this.isDragging = false;
      },

      centerDialog () {
        this.isDragging = true;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const dialogWidth = this.$refs.dialogContent.clientWidth;
        const dialogHeight = this.$refs.dialogContent.clientHeight;

        this.dialogLeft = (screenWidth - dialogWidth) / 2;
        this.dialogTop = (screenHeight - dialogHeight) / 2;

        this.isDragging = false;
      },

      persistentAnimation () {
        if (this.isDragging) return;

        this.$refs.dialogContent.classList.add('dialog__animated');
        this.$refs.dialogContent.style.userSelect = 'none';

        setTimeout(() => {
          this.$refs.dialogContent.classList.remove('dialog__animated');
        }, 100);
      },
    },
  };
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);

  // user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  border-radius: inherit;
  .modal__wraper {
    position: absolute;
    background: white;
    border-radius: 15px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    display: flex;
    flex-direction: column;
    .modal__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 15px;
      border-bottom: 1px dashed #dbe3f0;

      user-select: none;
    }

    .modal__content {
      padding: 5px;
      flex-grow: 1;
    }
  }
}

.dialog__animated {
  -webkit-animation-duration: 0.15s;
  animation-duration: 0.15s;
  -webkit-animation-name: animate-dialog;
  animation-name: animate-dialog;
  -webkit-animation-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  animation-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);

  // user-select: none;
}

@keyframes animate-dialog {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 0.3s;
}

.modal-slide-enter,
.modal-slide-leave-to {
  transform: translateX(-100%);
}
</style>
