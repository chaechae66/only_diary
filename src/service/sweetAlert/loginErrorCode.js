export const loginErrorCode = (_errorCode) => {
    switch (_errorCode) {
        case 'auth/user-not-found':
            return '이메일 또는 비밀번호 정보가 일치하지 않습니다.';
        case 'auth/wrong-password':
            return '이메일 또는 비밀번호 정보가 일치하지 않습니다.';
        default:
            throw Error (_errorCode + '는 올바른 매개변수가 아닙니다.')
    }
}