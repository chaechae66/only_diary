import Swal, { SweetAlertOptions } from 'sweetalert2'
type iconType = 'success' | 'error' | 'warning' | 'info' | 'question';

export const swalAlert = (_icon:iconType,_tit:string,_des:string)=> {
    Swal.fire({
        icon: _icon,
        title: _tit,
        text: _des,
        timer: 3000,
        timerProgressBar: true,
    } as SweetAlertOptions)
}
