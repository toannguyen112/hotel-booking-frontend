import React, { useEffect, useState } from "react";
import FieldSet from "../components/Fields/FieldSet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import { sizesData, regionsData } from "../seeds/data";
import { useDispatch } from "react-redux";
import { createRoom } from "../app/features/room/roomAction";
import { useNavigate } from "react-router-dom";
import { Form } from 'antd';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useSelector } from "react-redux";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function PostRoom() {

  const [regions, setRegions] = useState(regionsData);

  const [form, setForm] = useState({
    name: "",
    info: "",
    phone: null,
    category_id: 1,
    city_id: 1,
    address: "",
    size: 0,
    number_room: 0,
    lat: 0,
    lng: 0,
    type_room: "",
  });

  const [sizes, setSizes] = useState(sizesData)

  const [files, setFiles] = useState([])

  const [imageFiles, setImageFiles] = useState([]);

  const categories = useSelector((state) => state.room.categories);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const uploadFile = async () => {
    if (!form.name) return alert("Tên không được bỏ trống")

    const formData = new FormData();
    for (const image of files) {
      formData.append('files', image);
    }

    formData.append("data", JSON.stringify(form));
    formData.append("files", files);

    await dispatch(createRoom(formData));
    alert("Đăng tin thành công đợi xin đợi Admin duyệt");
    navigate({
      pathname: '/tenant/rooms',
    });
  }

  return (
    <div>
      <Header />
      <Slider />
      <section className="container py-[32px]">
        <div className="flex justify-center text-[28px] text-center my-[32px] font-bold">Đăng tin</div>
        <Form onFinish={uploadFile}>
          <div className="grid grid-cols-12 md:gap-[32px]">
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(name) => setForm({ ...form, name })}
                field={{
                  className: "w-full border rounded-md border-black p-[12px]",
                  title: "Tiêu đề",
                  placeholder: "Tiêu đề",
                }}
              />
            </div>
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(phone) => setForm({ ...form, phone })}
                field={{
                  type: "number",
                  className: "w-full border rounded-md border-black p-[12px]",
                  title: "Số điện thoại",
                  placeholder: "Số điện thoại",
                }}
              />
            </div>
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(address) => setForm({ ...form, address })}
                field={{
                  className: "w-full border rounded-md border-black p-[12px]",
                  title: "Địa chỉ",
                  placeholder: "Địa chỉ",
                }}
              />
            </div>
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(price) => setForm({ ...form, price })}
                field={{
                  className: "w-full border rounded-md border-black p-[12px]",
                  title: "Giá",
                  type: "number",
                  placeholder: "Giá",
                }}
              />
            </div>

            <div className="col-span-4">
              <FieldSet
                updateModelValue={(number_room) => setForm({ ...form, number_room })}
                field={{
                  className: "w-full border rounded-md border-black p-[12px]",
                  title: "Số lượng phòng",
                  type: "number",
                  placeholder: "Số lượng phòng",
                }}
              />
            </div>
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(size) => setForm({ ...form, size })}
                field={{
                  className: "w-full border rounded-md border-black p-[12px]",
                  title: "Diện tích",
                  type: "select_single",
                  options: sizes
                }}
              />
            </div>
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(category_id) => setForm({ ...form, category_id })}
                field={{
                  className: "w-full border rounded-md border-black p-[12px]",
                  title: "Thể loại",
                  typeValue: "id",
                  type: "select_single",
                  options: categories
                }}
              />
            </div>
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(lat) => setForm({ ...form, lat })}
                field={{
                  className: "w-full border rounded-md border-black p-[12px]",
                  title: "Tung độ",
                  type: "number",
                  placeholder: "Tung độ",
                }}
              />
            </div>
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(lng) => setForm({ ...form, lng })}
                field={{
                  className: "w-full border rounded-md border-black p-[12px]",
                  title: "Vĩ độ",
                  type: "number",
                  placeholder: "Vĩ độ",
                }}
              />
            </div>
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(city_id) => setForm({ ...form, city_id })}
                field={{
                  typeValue: "id",
                  title: "Tỉnh/thành phố",
                  type: "select_single",
                  options: regions,
                }}
              />
            </div>
            <div className="col-span-4">
              <FieldSet
                updateModelValue={(info) => setForm({ ...form, info })}
                field={{
                  className: "border-black p-[12px] border w-full rounded-md",
                  title: "Mô tả",
                  type: 'textarea',
                  placeholder: "Mô tả",
                }}
              />
            </div>
            <div className="col-span-4 space-y-3">
              <FilePond
                files={files}
                allowMultiple={true}
                maxFiles={3}
                name="files"
                onupdatefiles={fileItems => {
                  const images = fileItems.map(fileItem => fileItem.file);
                  setFiles(images)
                }}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
            </div>
            <div className="col-span-full flex justify-end">
              <button type="submit" className="btn btn-secondary">
                Đăng tin
              </button>
            </div>
          </div>
        </Form>
      </section >
      <Footer />
    </div >
  );
}

export default PostRoom;
