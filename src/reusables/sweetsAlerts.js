import Swal from 'sweetalert2';

export default {
  errorSwalTabWithHtml (text, icon, messageConfirmBtn, messageCancelBtn) {
    return Swal.fire({
      title: text,
      icon,
      showCancelButton: true,
      confirmButtonText: messageConfirmBtn,
      confirmButtonColor: '3085d6',
      cancelButtonText: messageCancelBtn,
      cancelButtonColor: 'red',
    }).then(result => {
      if (result.isConfirmed) {
        return true;
      } else return false;
    });
  },
};
