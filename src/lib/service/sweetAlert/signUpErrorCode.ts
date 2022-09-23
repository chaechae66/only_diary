export const signUpErrorCode = (_errorCode: string) => {
    switch (_errorCode) {
        case 'auth/email-already-in-use':
            return '이미 존재하는 email 입니다.';
        default:
            throw Error (_errorCode + '는 올바른 매개변수가 아닙니다.')
    }
}