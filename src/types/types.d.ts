export interface DiaryUser {
    name : string,
    photoURL : string,
    uid : string,
}

export interface CurrentUser {
   user_seqno : string,
   email : string,
   name : string,
   photoURL? : string
}

export interface User {
    currentUser?: CurrentUser,
    isLoading : boolean,
}

export interface EventType {
    diaryId : string,
    likeyUser : {
        name : string,
        photoURL : string,
        uid : string
    },
    timeStamp : number
}

export interface DiaryElem {
    createUser : DiaryUser,
    date : string,
    id :string,
    img :string,
    isprivate :boolean,
    txt :string,
}

export interface EventType {
    diaryId : string,
    likeyUser : DiaryUser
    uid : string,
    timeStamp : number
}