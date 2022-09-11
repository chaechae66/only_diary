export interface User {
    name : string,
    photoURL : string,
    uid : string,
}

export interface Diary {
    createUser : User,
    date : string,
    id :string,
    img :string,
    isprivate :boolean,
    txt :string,
}

export type FetchData = [
    Diary,
]

export interface Diarys {
    myDiary : boolean,
    diaryList : Diary
}

