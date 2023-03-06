import React, { useState } from "react";
import styles from "../pages/styles/login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../Routes/path";
import axios from "axios";
import { swalAlert } from "../service/sweetAlert/alert";
import { useDispatch } from "react-redux";
import { user_login } from "../store/userSlice";

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
    try{
      const userFetchData = await axios.post('http://ec2-13-124-30-250.ap-northeast-2.compute.amazonaws.com/podcommon/login/login.php', data)
      const isFetched = userFetchData.data.status;
      const resultMsg = userFetchData.data.message;
      const userInfo = userFetchData.data.userInfo;
      isFetched && swalAlert('success','로그인 성공', resultMsg);
      dispatch(user_login(userInfo));
      navigate('/');
    }catch(e){
      if (axios.isAxiosError(e) && e.response) {
        const message = e.response.data.message;
        swalAlert('error','문제 발생',message);
      } 
    }finally{
      setLoading(false);
    }
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
