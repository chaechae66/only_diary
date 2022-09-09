import Swal from 'sweetalert2'

export const swalAlert = (_icon,_tit,_des) => {
    Swal.fire({
        icon: _icon,
        title: _tit,
        text: _des,
        timer: 3000,
        timerProgressBar: true,
    })
}
