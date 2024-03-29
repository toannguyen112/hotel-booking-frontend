import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import RoomApi from '../../../api/services/RoomApi';
import { updateStatus } from '../../../app/features/room/roomAction';
import FieldSet from '../../../components/Fields/FieldSet';
import Authenticated from '../../../Layout/Authenticated'
import { useSelector } from "react-redux";

import { pricesData, regionsData, sizesData } from "../../../seeds/data";

function Form() {

  const categories = useSelector((state) => state.room.categories);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [errors, setErrors] = useState({});

  const [images, setImages] = useState([])

  const [prices, setPrices] = useState(pricesData);

  const [sizes, setSizes] = useState(sizesData);

  const [regions, setRegions] = useState(regionsData);

  const [rules, setRules] = useState({
    "name": "required",
    "city_id": "required",
    "category_id": "required",
    "exp_date": "required",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    new RoomApi().show(id).then((res) => {
      const room = res.data.data
      setForm(room)
      setImages(room.images)
    })

    window.scrollTo(0, 0);

  }, []);

  const update = async () => {
    await dispatch(updateStatus(form));
    alert("Cập nhật thành công")
  }

  const [form, setForm] = useState({
    name: "toan",
    category_id: "",
    phone: "",
    city_id: "",
    exp_date: "",
    info: "",
    address: "",
    size: "",
    price: "",
    star: "",
    number_room: "",
    status: "",
  });

  return (
    <Authenticated>
      <div className="font-bold text-[32px] py-[32px]">
        Phòng / Chỉnh sửa /{id}
      </div>
      <div className='grid grid-cols-12 gap-[32px]'>
        <div className='col-span-6'>
          <FieldSet
            updateModelValue={(name) => setForm({ ...form, name })}
            modelValue={form.name}
            field={{
              className: "w-full border-[0.5px] border-black rounded-md  p-[12px] ",
              title: "Tên",
              placeholder: "Tên",
              isRequired: true,
              disable: true,
              fieldName: "name",
              rules: rules,
              errors: errors,
            }}
          />
        </div>
        <div className='col-span-6'>
          <FieldSet
            updateModelValue={(category_id) => setForm({ ...form, category_id })}
            field={{
              disable: true,
              className: "w-full border rounded-md border-black p-[12px]",
              title: "Thể loại",
              typeValue: "id",
              type: "select_single",
              options: categories
            }}
          />
        </div>
        <div className='col-span-6'>
          <FieldSet
            updateModelValue={(city_id) => setForm({ ...form, city_id })}
            field={{
              disable:true,
              typeValue: "id",
              title: "Tỉnh/thành phố",
              type: "select_single",
              options: regions,
            }}
          />
        </div>
        <div className='col-span-6'>
          <FieldSet
            updateModelValue={(exp_date) => setForm({ ...form, exp_date })}
            modelValue={form.exp_date}
            field={{
              className: "w-full border-[0.5px] border-black rounded-md  p-[12px] ",
              title: "Ngày hết hạn",
              type: "date",
              disable: true,
              placeholder: "exp_date",
              isRequired: true,
              fieldName: "exp_date",
              rules: rules,
              errors: errors,
            }}
          />
        </div>
        <div className='col-span-6'>
          <FieldSet
            updateModelValue={(number_room) => setForm({ ...form, number_room })}
            modelValue={form.category_id}
            field={{
              className: "w-full border-[0.5px] border-black rounded-md  p-[12px] ",
              title: "Số phòng",
              type: "number",
              disable: true,
              placeholder: "number_room",
            }}
          />
        </div>
        <div className='col-span-6'>
          <FieldSet
            updateModelValue={(address) => setForm({ ...form, address })}
            modelValue={form.address}
            field={{
              className: "w-full border-[0.5px] border-black rounded-md  p-[12px] ",
              title: "Địa chỉ",
              disable: true,
              placeholder: "address",
            }}
          />
        </div>
        <div className='col-span-6'>
          <FieldSet
            updateModelValue={(price) => setForm({ ...form, price })}
            modelValue={form.price}
            field={{
              className: "w-full border-[0.5px] border-black rounded-md  p-[12px] ",
              title: "Giá",
              type: "number",
              disable: true,
              placeholder: "price",
            }}
          />
        </div>
        <div className='col-span-6'>
          <FieldSet
            updateModelValue={(info) => setForm({ ...form, info })}
            modelValue={form.info}
            field={{
              className: "w-full border-[0.5px] border-black rounded-md  p-[12px] ",
              title: "Số điện thoại",
              type: "number",
              disable: true,
              placeholder: "Phone",
            }}
          />
        </div>
        <div className='col-span-6'>
          <FieldSet
            updateModelValue={(status) => setForm({ ...form, status })}
            modelValue={form.status}
            field={{
              className: "w-full border-[0.5px] border-black rounded-md p-[12px] ",
              typeValue: "string",
              title: "Trạng thái",
              type: "select_single",
              options: [{
                name: "Hoạt động",
                value: "ACTIVE"
              },
              {
                name: "Ẩn",
                value: "INACTIVE"
              }],
            }}
          />
        </div>
        <div className="col-span-6">
          <div>Hình ảnh</div>
          <div className="grid grid-cols-12 md:gap-[32px] gap-[12px]">
            {images.map((image, index) => {
              return (
                <div key={index} className="col-span-4">
                  <img src={image.path} alt={image.filename} className="w-full h-full aspect-square" />
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <button className="btn btn-primary text-[12px] w-[150px]" onClick={() => update()}>
            Cập nhật
          </button>
        </div>
      </div>
    </Authenticated>
  )
}

export default Form