import React from "react";

const InputCustom = ({
  contentLable,
  placeHolder,
  name,
  value,
  onChange,
  type = "text",
  classWrapper = "",
  onBlur,
  error,
  touched,
}) => {
  return (
    <div className={classWrapper}>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {contentLable}
      </label>
      <input
        onBlur={onBlur}
        type={type}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
          error && touched ? "border-red-500" : "border-blue-900"
        }`}
        placeholder={placeHolder}
        name={name}
        onChange={onChange}
        value={value}
      />
      {/* viết toán tử điều kiện để kiểm tra nếu như mà error với touched được truyền vào thi mới hiện thẻ p dùng thông báo lỗi  */}
      {error && touched && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputCustom;
