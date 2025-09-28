// src/app/admin/customers/customers.tsx
import React from "react";
import CustomersForm from "@/components/AdminPage/CustomersForm";

type Customer = {
  name: string;
  email: string;
  phone: string;
};

export default async function CustomersContainer() {
  // Mock data
  const customers: Customer[] = [
    { name: "Trần Văn A", email: "tranvanA@gmail.com", phone: "123-456-7890" },
    { name: "Trần Văn B", email: "tranvanB@gmail.com", phone: "308-222-9696" },
    {
      name: "Nguyễn Ngọc N",
      email: "nguyenngocN@gmail.com",
      phone: "770-989-6720",
    },
    {
      name: "Đặng Hiệp K",
      email: "danghiepK@gmail.com",
      phone: "689-677-2073",
    },
    { name: "Hà Như L", email: "hanhuL@gmail.com", phone: "778-002-4781" },
  ];

  return <CustomersForm customers={customers} />;
}
