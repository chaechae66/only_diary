import { getImgURL, getOtherImgUrl } from "../service/firebase/storage";
import { v4 } from 'uuid';

export default function createGetImg(_isprivate:boolean, _fileInfo:File, _baseUrl:string){    
    const getPath = () => {
        if (_isprivate) {
            return `/diary/private`;
        } else {
            return `/diary/public`;
        }
    };
    
    const otherGetImg = async () => {
        let fileType = _fileInfo.type.slice(6);
        let filePath = `${getPath()}/${v4()}.${fileType}`
        const url = await getOtherImgUrl(filePath,_fileInfo);
        return url;
    }
    
    const baseGetImg = async (_url:string) => {
        const url = await getImgURL(`/initUrl/${_url}`);
        return url;
    }

    const getImg = async () => {
        try{
            const initNum = [1,2,3,4];
            let initUrlArr: string[] = [];
            initNum.forEach((num)=>{
                let initStr = `default_0${num}`
                initUrlArr.push(initStr); 
            })
            let sliceBaseUrl = _baseUrl.slice(20,30);
            if(initUrlArr.includes(sliceBaseUrl)){
                let serverUrl = `diary_${sliceBaseUrl}.jpg`;
                let result = await baseGetImg(serverUrl);
                return result;
            }else{
                return otherGetImg();
            }
        }catch(e){
            console.error(e);
        }
    }

    return getImg();
}