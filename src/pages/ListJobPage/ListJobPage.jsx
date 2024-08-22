import React, { useEffect, useState } from "react";
import { congViecService } from "../../services/congViec.service";
import { useSearchParams } from "react-router-dom";

const ListJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [listJob, setListJob] = useState([]);
  useEffect(() => {
    let tenCongViec = searchParam.get("tenCongViec");
    congViecService
      .layCongViecTheoTen(tenCongViec)
      .then((res) => {
        console.log(res);
        setListJob(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    congViecService.layCongViecTheoTen();
  }, [searchParam.get("tenCongViec")]);
  const renderListJob = () => {
    <div className=" grid grid-cols-4 gap-10">
      {listJob.map((item, index) => {
        console.log(item);
        return (
          <div className="border border-gray-300">
            <img className="w-full" src={item.congViec.hinhAnh} alt="" />
            <div className="px-3">
              <div className="flex items-center mt-2 space-x-5 ">
                <img
                  className="w-10 h-10 rounded-full"
                  src={item.avatar}
                  alt=""
                />
                <div>
                  <h4>{item.tenNguoiTao}</h4>
                  <p>Level 2</p>
                </div>
              </div>
              <h3>{item.congViec.tenCongViec}</h3>
              <div className="space-x-2">
                <i className="fa-solid fa-star text-yellow-500" />

                <span className="text-yellow-500">
                  {item.congViec.saoCongViec}
                </span>
                <span className="text-gray-400">({item.congViec.danhGia})</span>
              </div>
              <div className="flex items-center justify-between border-t border-t-gray-300">
                <i className="fa-solid fa-heart"></i>
                <div className="space-x-3">
                  <span className="uppercase">Starting at </span>{" "}
                  <span>${item.congViec.giaTien}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>;
  };

  return (
    <div className=" grid grid-cols-4 gap-10">
      {listJob.map((item, index) => {
        console.log(item);
        return (
          <div className="border border-gray-300">
            <img className="w-full" src={item.congViec.hinhAnh} alt="" />
            <div className="px-3">
              <div className="flex items-center mt-2 space-x-5 ">
                <img
                  className="w-10 h-10 rounded-full"
                  src={item.avatar}
                  alt=""
                />
                <div>
                  <h4>{item.tenNguoiTao}</h4>
                  <p>Level 2</p>
                </div>
              </div>
              <h3>{item.congViec.tenCongViec}</h3>
              <div className="space-x-2">
                <i className="fa-solid fa-star text-yellow-500" />

                <span className="text-yellow-500">
                  {item.congViec.saoCongViec}
                </span>
                <span className="text-gray-400">({item.congViec.danhGia})</span>
              </div>
              <div className="flex items-center justify-between border-t border-t-gray-300">
                <i className="fa-solid fa-heart"></i>
                <div className="space-x-3">
                  <span className="uppercase">Starting at </span>{" "}
                  <span>${item.congViec.giaTien}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListJobPage;
