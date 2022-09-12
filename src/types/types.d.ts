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

export interface FetchData extends Array<Diary>{}

interface CurrentUser {
    uid : string,
    email : string,
    emailVerified: boolean,
    displayName : string,
    isAnonymous : boolean,
    photoURL : string,
}

export interface User {
    currentUser?: CurrentUser,
    isLoading : boolean,
}
