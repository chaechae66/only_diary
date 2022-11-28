import { getImgURL, getOtherImgUrl } from "../service/firebase/storage";
import { v4 } from 'uuid';
import { swalAlert } from "../service/sweetAlert/alert";

export default function createGetImg(_isprivate:boolean, _fileInfo:File, _baseUrl:string){    
    const getPath = () => {
        return _isprivate ? `/diary/private` : `/diary/public`
    };

    const getImg = async () => {
        try{
            if(_baseUrl.includes("diary_default")){
                const serverUrl = `${_baseUrl.slice(14,30)}.jpg`;
                return await getImgURL(`/initUrl/${serverUrl}`);
            }else{
                let fileType = _fileInfo.type.slice(6);
                let filePath = `${getPath()}/${v4()}.${fileType}`
                return await getOtherImgUrl(filePath,_fileInfo);
            }
        }catch(e){  
            const result = (e as Error).message;
            swalAlert("warning", "서버 오류", result);
        }
    }

    return getImg();
}