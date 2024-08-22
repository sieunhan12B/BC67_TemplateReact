import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../components/Input/InputCustom";
import { Input } from "antd";
import { Select, Space } from "antd";
import { skillService } from "../../services/skill.service";
import { nguoiDungService } from "../../services/nguoiDung.service";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}
const CreatUser = () => {
  const [listSkill, setListSkill] = useState([]);
  const [step, setStep] = useState(0);
  const [errorImage, setErrorImage] = useState("");
  const [userValue, setUserValue] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    skill: [""],
    certification: [""],
  });
  const [uploadImage, setUploadImage] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const handleChange = (value) => {
    console.log(value);
  };
  const { user } = useSelector((state) => state.authSlice);
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    // console.log(value);
    // console.log(name);
    setUserValue({ ...userValue, [name]: value });
  };
  const handleSubmitAvatar = (event) => {
    event.preventDefault();
    let formData = new FormData();
    if (uploadImage) {
      formData.append("formFile", uploadImage.image);
      nguoiDungService
        .uploadAvatar(user.token, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleSubmitFormCreateUser = (event) => {
    event.preventDefault();
    console.log(userValue);
    nguoiDungService
      .createUser(userValue)
      .then((res) => {
        console.log(res);
        // day nguoi tao toi trang Upload hinh anh
        // setStep(step + 1);
        setIsActive(false);
        // su dung useContext de lay phuong thuc thong bao thanh cong
      })
      .catch((err) => {
        console.log(err);
        // su dung useContext de lay phuong thuc thong bao loi hien thi
      });
  };

  const renderLayoutForm = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmitFormCreateUser} action="">
            <InputCustom
              onChange={handleChangeValue}
              name={"name"}
              contentLable={"name"}
            />
            <InputCustom
              name={"email"}
              onChange={handleChangeValue}
              contentLable={"Email"}
            />
            <InputCustom
              name={"phone"}
              onChange={handleChangeValue}
              contentLable={"Phone"}
            />
            <InputCustom
              name={"password"}
              onChange={handleChangeValue}
              contentLable={"Passwword"}
              type="password"
            />
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor=""
              >
                Ngay sinh{" "}
              </label>
              <input
                type="date"
                value={userValue.birthday.split("-").reverse().join("-")}
                onChange={(event) => {
                  // const arrrDate = event.target.value
                  //   .split("-")
                  //   .reverse()
                  //   .join("-");
                  const [year, month, day] = event.target.value.split("-");

                  let valueDate = `${day}-${month}-${year}`;
                  console.log(`${day}-${month}-${year}`);
                  setUserValue({ ...userValue, birthday: valueDate });
                }}
              />
            </div>
            <div classname="max-w-sm mx-auto">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select an option
              </label>
              <select
                onChange={handleChangeValue}
                name="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="false">Nu</option>
                <option value="true">Nam</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Chon skill
              </label>
              <Select
                // onChange={handleChange}
                onChange={(value, option) => {
                  console.log(value);
                  // console.log(option);
                  setUserValue({ ...userValue, skill: value });
                }}
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                options={listSkill}
              />
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Chon certification
              </label>
              <Select
                onChange={(value, option) => {
                  console.log(value);
                  // console.log(option);
                  setUserValue({ ...userValue, certification: value });
                }}
                // onChange={handleChange}
                mode="tags"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                tokenSeparators={[","]}
              />
            </div>
            <div classname="max-w-sm mx-auto">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Chon role
              </label>
              <select
                onChange={handleChangeValue}
                name="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="admin">ADMIN</option>
                <option value="user">USER</option>
              </select>
            </div>
            <div className="py-5">
              <button
                type="submit"
                className="px-5 py-2 bg-black text-white rounded-md"
              >
                Tao nguoi dung{" "}
              </button>
            </div>
          </form>
        );
      case 0:
        return (
          <div>
            <form onSubmit={handleSubmitAvatar} action="">
              <h2>Upload hinh anh cho nguoi dung</h2>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor=""
                >
                  Ngay sinh{" "}
                </label>
                <input
                  accept=" image/jpeg image/png"
                  onChange={(event) => {
                    // kiem tra dung luong ghinh,neu llon hon 10mb thi thong bao loi va khong nhan hinh anh
                    console.log(event.target.files[0]);
                    const image = event.target.files[0];
                    if (image) {
                      if (image.size > 1024 * 1024) {
                        setErrorImage("HInh vuot qua dung luong cho phep");

                        return;
                      }
                      const imageUrl = URL.createObjectURL(image);
                      console.log(imageUrl);
                      setUploadImage({ image, imageUrl });
                      setErrorImage("");
                    }
                  }}
                  type="file"
                />
                <p className="text-red-500 ">{errorImage} </p>
                <img
                  src={uploadImage?.imageUrl}
                  class="img-fluid rounded-top w-32"
                  alt=""
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-600 text-white rounded-md"
                >
                  Upload hinh anh{" "}
                </button>
              </div>
            </form>
          </div>
        );
    }
  };
  useEffect(() => {
    skillService
      .getAllSkill()
      .then((res) => {
        console.log(res);
        const newListSkill = res.data.content.map((skill, index) => {
          return {
            label: skill.tenSkill,
            value: skill.tenSkill,
          };
        });
        setListSkill(newListSkill);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(userValue);
  return (
    <div>
      <h2 className="font-semibold text-3xl py-5">
        {" "}
        Form tạo người dùng trong hệ thống
      </h2>
      {renderLayoutForm()}

      <button
        disabled={isActive}
        onClick={() => {
          setStep(step + 1);
        }}
        className={`py-2 px-5 bg-black text-white rounded  mt-5 ${
          isActive ? "cursor-not-allowed bg-black-700" : ""
        }`}
      >
        CHuyen toi buoc tiep theo{" "}
      </button>
    </div>
  );
};

export default CreatUser;
