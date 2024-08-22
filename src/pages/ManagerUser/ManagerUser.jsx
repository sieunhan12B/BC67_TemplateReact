import React, { useContext, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../redux/nguoiDungSlice";
import { NotificationContext } from "../../App";
import { nguoiDungService } from "../../services/nguoiDung.service";

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];
const ManagerUser = () => {
  const { handleNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const { listUser } = useSelector((state) => state.nguoiDungSlice);
  console.log(listUser);
  useEffect(() => {
    dispatch(getValueUserApi());
  }, [listUser.length]);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => {
        return <img className="h-14" src={text} />;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (text) => {
        return <Tag color={text ? "blue" : "cyan"}>{text ? "Nam" : "Nữ"}</Tag>;
      },
    },
    //USER ADMIN
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => (
        <Tag color={text == "ADMIN" ? "geekblue-inverse" : "lime-inverse"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size={"middle"} className="space-x-3">
          <button
            onClick={() => {
              nguoiDungService
                .deleteUser(record.id)
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  dispatch(getValueUserApi());
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  dispatch(getValueUserApi());
                });
            }}
            className="bg-red-500 text-white py-2 px-5 rounded-md
            hover:bg-red-500/90 duration-300"
          >
            {" "}
            Xóa
          </button>
          <button className="bg-yellow-500 text-white py-2 px-5 rounded-md hover:bg-yellow-500/90 duration-300">
            Sửa
          </button>{" "}
        </Space>
      ),
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  return <Table columns={columns} dataSource={listUser} />;
};
export default ManagerUser;
//THực hiện tạo một service dùng quản lí các api về người dùng
//Cáu hình một phương thức đùng để xóa người dùng trong hệ thống(khi gọi tới phương thức cần truyên id của người dùng đang muốn xóa )
