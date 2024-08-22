import React, { useEffect, useState } from "react";
import useResponsive from "../../hooks/UseResponsive";
import Banner from "../Banner/Banner";
import InputCustom from "../Input/InputCustom";
import IconSearch from "../icon/IconSearch";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { congViecService } from "../../services/congViec.service";
import { Dropdown } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import useDebounce from "../../hooks/useDebounce";
const FormSearchProduct = () => {
  const navigate = useNavigate();
  const [checkDropDown, setCheckDropDown] = useState(false);
  const [listJobSuggest, setLisstJobSuggest] = useState([
    { key: 1, label: "Hello" },
  ]);
  const [valueSearch, setValueSearch] = useState("");

  const debounceValue = useDebounce(valueSearch, 1500);
  //   const isResponsive = useResponsive({
  //     mobile: 576,
  //     tablet: 992,
  //   });
  //   console.log(isResponsive);

  useEffect(() => {
    // gọi api lấy dữ liệu sản phẩm để gợi ý người dùng
    if (valueSearch) {
      congViecService
        .layCongViecTheoTen(debounceValue)
        .then((res) => {
          const newListJobSuggest = res.data.content
            .slice(0, 4)
            .map((item, index) => {
              return {
                key: index,
                label: (
                  <Link className="flex items-center space-x-4">
                    <img className="h-14 " src={item.congViec.hinhAnh} alt="" />
                    <div>
                      <h4>{item.congViec.tenCongViec}</h4>
                      <p>{item.congViec.giaTien}</p>
                    </div>
                  </Link>
                ),
              };
            });
          setLisstJobSuggest(newListJobSuggest);
          setCheckDropDown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debounceValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(valueSearch);
    navigate(`${pathDefault.listJob}?tenCongViec=${valueSearch}`);
  };

  const handleChange = (event) => {
    setValueSearch(event.target.value);
    // gọi api lấy dữ liệu sản phẩm để gợi ý người dùng
    console.log(debounceValue);
    if (!event.target.value) {
      setCheckDropDown(false);
    }
  };
  return (
    <Dropdown
      menu={{
        items: listJobSuggest,
      }}
      open={checkDropDown}
    >
      <div>
        <form onSubmit={handleSubmit} action="">
          <div className="pl-4 rounded-md border border-gray-400 flex item-center justify-between min-w-[400px]">
            <input
              onChange={handleChange}
              className="flex-1 focus:border-none focus:outline-none"
              type="text"
              placeholder="Vui long nhap vao cong viec can kiem"
              value={valueSearch}
            />
            <button type="submit">
              <IconSearch size={"30px"} color="rgb(156 163 175)" />
            </button>
          </div>
        </form>
      </div>
    </Dropdown>
  );
};

export default FormSearchProduct;
