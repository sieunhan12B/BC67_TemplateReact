import React, { useContext } from "react";
import InputCustom from "../Input/InputCustom";
import { DatePicker } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { notiValication } from "../../common/notiValication";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";

const FormRegister = () => {
  const notificationValue = useContext(NotificationContext);
  console.log(notificationValue);
  // NV1,thực hiện bóc tách ra các thuộc tính values,errors,handleChange,hangBlur,handleSubmit,touched để setup vào các field của form
  //NV2, thực hiện khai báo các initialValues sẽ có cho forrmik và thực hiện kiểm tra nhập dữ liệu vào xem onsubmit có lấy được dữ liệu tất cả form hay không
  //NV3, thực hiện xử lí validation cho các field của form đang có (validation tùy ý )
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
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    onSubmit: (values) => {
      console.log(values);
      //   values.gender = values.gender = "Nam" ? true : false;
      authService
        .signUp({
          ...values,
          gender: values.gender == "Nam" ? true : false,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          notificationValue.handleNotification(err.response.data.content);
        });
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required(notiValication.empty)
        .matches(/^[a-zA-Z\s]+$/, "Vui lòng nhập tên không chứa số "),
      email: yup
        .string()
        .required(notiValication.empty)
        .email(notiValication.email),
      password: yup
        .string()
        .required(notiValication.empty)
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
          "Vui lòng nhập ít nhât 1 chữ cái viết hoa và số "
        ),
      phone: yup
        .string()
        .required(notiValication.empty)
        .matches(/^(0|84)[2-9]\d{8}$/, "Vui lòng nhập đúng định dáng"),
      birthday: yup.string().required(notiValication.empty),
      gender: yup.string().required(notiValication.empty),
    }),
  });
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <h1>Form đăng kí </h1>
      <form onSubmit={handleSubmit} action="">
        <div className="flex flex-wrap ">
          <InputCustom
            contentLable={"Họ tên "}
            name="name"
            placeHolder="Vui lòng nhập tên"
            classWrapper="w-1/2 p-3"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            touched={touched.name}
            error={errors.name}
          />
          <InputCustom
            contentLable={"Email"}
            name="email"
            placeHolder={"Vui lòng nhập email"}
            classWrapper="w-1/2 p-3"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            touched={touched.email}
            error={errors.email}
          />
          <InputCustom
            contentLable={"Mật khẩu"}
            name={"password"}
            placeHolder={"Vui lòng nhập mật khẩu "}
            classWrapper="w-full p-3"
            type="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            touched={touched.password}
            error={errors.password}
          />
          <InputCustom
            contentLable={"Số điện thoại"}
            name={"phone"}
            placeHolder={"Vui lòng nhập số điện thoại "}
            classWrapper="w-1/3 p-3"
            onChange={handleChange}
            value={values.phone}
            onBlur={handleBlur}
            touched={touched.phone}
            error={errors.phone}
          />
          <div className="w-1/3 p-3">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Ngày sinh
            </label>
            <DatePicker
              format={"DD-MM-YYYY"}
              onChange={(dayjs, dateString) => {
                setFieldValue("birthday", dateString);
              }}
              className="w-full"
            />
            {errors.birthday && touched.birthday ? (
              <p className="text-red-500"> {errors.birthday} </p>
            ) : null}
          </div>
          <div className="w-1/3 p-3">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Giới tính{" "}
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="gender"
              onChange={handleChange}
            >
              <option value={""}>Vui lòng chọn giới tính </option>
              <option value="Name">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
            {errors.gender && touched.gender ? (
              <p className="text-red-500"> {errors.gender} </p>
            ) : null}
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="py-3 px-6 bg-black text-white rounded-md w-full"
            >
              Đăng kí{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
