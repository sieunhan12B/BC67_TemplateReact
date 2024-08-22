import React, { useContext } from "react";
import InputCustom from "../../components/Input/InputCustom";
import signInAnimation from "./../../assets/animation/signInAnimation.json";
import * as yup from "yup";

import { useLottie } from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { notiValication } from "../../common/notiValication";
import { useFormik } from "formik";
import { pathDefault } from "../../common/path";
import { NotificationContext } from "../../App";
import { authService } from "../../services/auth.service";
import { setLocalStorage } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setValueUser } from "../../redux/authSlice";

const LoginPage = () => {
  //NV1:thực hiện khai báo formik trong loginPage và thực hiện xử lí lấy dữ liệu người dùng khi bấm đăng nhập
  //NV2:Thực hiện validation dữ liệu của 2 input thông qua thứ nhất :2 input đều phải nhập dữ liệu,input email kiểm tra dữ liệu có phải email,còn input mật khẩu kiểm tra tối thiểu 6 và tối đa 10 ký tự
  //NV3:THực hiện tạo một phương thức mới trong authService quản lí đăng nhập
  //NV4:Thực hiện sử dụng phương thức vừa tạo kết hợp dữ liệu người dùng để gửi cho BE kiểm tra và nhận kết quả
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      //   values.gender = values.gender = "Nam" ? true : false;
      try {
        const result = await authService.signIn(values);
        // B1 Luu tru du lieu xuong local
        setLocalStorage("user", result.data.content);
        // B2 Chuyen huong nguoi dung

        dispatch(setValueUser(result.data.content));
        handleNotification(
          "Chuc mung dang nhap thanh cong,ban se duoc chuyen huong ve trang chu",
          "success"
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(result);
      } catch (error) {
        console.log(error);
        handleNotification(error.response.data.content, "error");
      }

      //   authService
      //     .signIn({
      //       ...values,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //       // B1:Thuc hien thong bao cho nguoi dung
      //       handleNotification(
      //         "Chuc mung dang nhap thanh cong,ban se duoc chuyen huong ve trang chu",
      //         "success"
      //       );
      //       setTimeout(() => {
      //         navigate(pathDefault.homePage);
      //       }, 2000);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       handleNotification(err.response.data.content, "error");
      //     });
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required(notiValication.empty)
        .email(notiValication.email),
      password: yup
        .string()
        .required(notiValication.empty)

        .min(6, notiValication.min(6))
        .max(10, notiValication.max(10)),
    }),
  });
  const options = {
    animationData: signInAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  return (
    <div className="container">
      <div className="loginPage_content h-screen flex items-center">
        <div className="loginPage_img w-1/2">{View}</div>
        <div className="loginPage_form w-1/2">
          <form onSubmit={handleSubmit} className="space-y-5" action="">
            <h1 className="font-medium text-4xl text-center">
              Giao diện đăng nhập
            </h1>
            <InputCustom
              contentLable="Email"
              placeHolder={"Vui lòng nhập email"}
              name={"email"}
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              touched={touched.email}
              error={errors.email}
            />
            <InputCustom
              contentLable={"Password"}
              name="password"
              placeHolder={"Vui lòng nhập password"}
              type="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              touched={touched.password}
              error={errors.password}
            />
            <button
              type="submit"
              className="inline-block w-full px-5 bg-black text-white rounded-lg py-3"
            >
              Đăng nhập
            </button>
            <Link
              to={pathDefault.register}
              className="text-blue-600 mb-5 hover:underline inline-block"
            >
              {" "}
              chứa có tài khoản phải không? bấm vào đây để đăng kí{" "}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
