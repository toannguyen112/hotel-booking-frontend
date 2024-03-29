import React from 'react'
import Table from '../../../components/Table';
import Authenticated from '../../../Layout/Authenticated'
import { deleteAdmin, getListAdmin } from '../../../app/features/admin/adminAction';
import { useDispatch, useSelector } from 'react-redux';


function Index() {

  const dispatch = useDispatch();

  const admins = useSelector((state) => state.admin.admins);

  const deleteRecord = async (id) => {
    await dispatch(deleteAdmin(id));
    await dispatch(getListAdmin());
  }

  return (
    <Authenticated>
      <section>
        <div className="font-bold text-[32px] py-[32px]">
          Tài khoản
        </div>
        <Table
          deleteRecord={deleteRecord}
          route="/admin/account"
          isCreate={true}
          data={admins}
          columns={[
            { field: "id", label: "id" },
            { field: "name", label: "Tên" },
            { field: "username", label: "Tài khoản" },
            { field: "createdAt", label: "Ngày tạo" },
            { field: "updatedAt", label: "Ngày cập nhật" },
          ]} />
      </section>
    </Authenticated>
  )
}

export default Index