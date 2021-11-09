import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styles from '../pages/styles/signUp.module.css'
import { writeUserData } from '../service/firebase/database';
import { createdUser, updateUserInfo } from '../service/firebase/emailLogin';
import { getImgURL } from '../service/firebase/storage';
import { swalAlert } from '../service/sweetAlert/alret';

const SignUp = () => {
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const passwordValue = watch("password");

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const user = await createdUser(data.email, data.password);
            const defaultUrl = await getImgURL("defaultImg/diary_default_img.png");
            await updateUserInfo(data.name, defaultUrl);
            writeUserData(
              user.user.uid,
              user.user.displayName,
              user.user.photoURL
            );
            swalAlert('success','회원가입 완료','Only Diary의 가족이 된 걸 환영합니다. 로그인 되었습니다.');
            history.push('/');
            setLoading(false);
        } catch (err) {
            alert(`${err}`);
        }
    };

    return (
        <section className={`bodyWrap ${styles.wrap}`}>
            <div className={styles.signUp}>
                <h2 className={styles.title}>회원가입</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("email", {
                    required: true,
                    pattern: {
                        value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    },
                    })}
                    type="text"
                    className={styles.input}
                    placeholder="이메일"
                />
                {errors.email && errors.email.type === "required" && (
                    <span className={styles.error}>기재해주세요</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                    <span className={styles.error}>
                    이메일 양식에 맞게 작성해주세요
                    </span>
                )}
                <input
                    {...register("name", {
                    required: true,
                    maxLength: 5,
                    pattern: { value: /^[가-힣]+$/ },
                    })}
                    type="text"
                    className={styles.input}
                    placeholder="이름"
                />
                {errors.name && errors.name.type === "required" && (
                    <span className={styles.error}>기재해주세요</span>
                )}
                {errors.name && errors.name.type === "pattern" && (
                    <span className={styles.error}>
                    이름은 자음,모음만을 제외한 한글로만 입력할 수 있습니다
                    </span>
                )}
                {errors.name && errors.name.type === "maxLength" && (
                    <span className={styles.error}>최대 5글자 입력 가능합니다.</span>
                )}
                <input
                    {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: {
                        value:
                        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+])/,
                    },
                    })}
                    type="password"
                    className={`${styles.input}`}
                    placeholder="비밀번호"
                />
                {errors.password && errors.password.type === "required" && (
                    <span className={styles.error}>기재해주세요</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                    <span className={styles.error}>6글자 이상 입력하세요</span>
                )}
                {errors.password && errors.password.type === "pattern" && (
                    <span className={styles.error}>
                    비밀번호는 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.
                    </span>
                )}
                <input
                    {...register("password_confirm", {
                    required: true,
                    validate: (value) => value === passwordValue,
                    })}
                    type="password"
                    className={styles.input}
                    placeholder="비밀번호 확인"
                />
                {errors.password_confirm &&
                    errors.password_confirm.type === "required" && (
                    <span className={styles.error}>기재해주세요</span>
                    )}
                {errors.password_confirm &&
                    errors.password_confirm.type === "validate" && (
                    <span className={styles.error}>비밀번호와 일치하지 않습니다</span>
                    )}
                <button type="submit" className={styles.loginBtn} disabled={loading}>
                    회원가입
                </button>
                </form>
                <Link to="/login">
                    <p className={styles.login}>
                        아이디가 있다면...
                    </p>
                </Link>
            </div>
        </section>
    )
}

export default SignUp
