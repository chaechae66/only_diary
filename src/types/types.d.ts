export interface User {
    name : string,
    photoURL : string,
    uid : string,
}

export interface DiaryElem {
    createUser : User,
    date : string,
    id :string,
    img :string,
    isprivate :boolean,
    txt :string,
}

export interface CurrentUser {
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
