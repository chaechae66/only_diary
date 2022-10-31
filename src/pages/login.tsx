import React, { useState } from "react";
import styles from "../pages/styles/login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/service/firebase/emailLogin";
import { user_login } from "../store/userSlice";
import { swalAlert } from "../lib/service/sweetAlert/alert";
import { loginErrorCode } from "../lib/service/sweetAlert/loginErrorCode";
import { PATH } from "../Routes/path";

const Login = () => {
  interface FormData {
    email: string;
    password: string;
  }
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setLoading(true);
        dispatch(user_login(userCredential.user));
        navigate(`${PATH.BASE}`);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(true);
        const msg = loginErrorCode(e.code);
        swalAlert("warning", "로그인 일치 안함", msg);
        setLoading(false);
      });
  };

  return (
    <section className={`bodyWrap ${styles.wrap}`}>
      <div className={styles.login}>
        <h2 className={styles.title}>로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", {
              required: true,
              pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            })}
            name='email'
            placeholder='이메일'
            className={styles.input}
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
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+])/,
            })}
            name='password'
            type='password'
            placeholder='비밀번호'
            className={styles.input}
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
          <button className={styles.loginBtn} disabled={loading}>
            로그인
          </button>
        </form>
        <Link to={`${PATH.SIGNUP}`}>
          <p className={styles.signUp}>아이디가 없다면...</p>
        </Link>
      </div>
    </section>
  );
};

export default Login;
