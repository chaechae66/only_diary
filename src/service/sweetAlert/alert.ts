import Swal, { SweetAlertOptions } from 'sweetalert2'

export const swalAlert = (_icon:string,_tit:string,_des:string)=> {
    Swal.fire({
        icon: _icon,
        title: _tit,
        text: _des,
        timer: 3000,
        timerProgressBar: true,
    } as SweetAlertOptions)
}
