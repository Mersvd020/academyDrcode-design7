import { useState, useEffect } from "react";
import Sidebar from "@components/sidebar";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Label } from "reactstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser, fetchUsers } from "../store";
const defaultValues = {
  firstName: "",
  lastName: "",
  gmail: "",
  password: "",
  phoneNumber: "",
  isStudent: false,
  isTeacher: false
};

const axiosInstance = axios.create({
  baseURL: "https://sepehracademy.liara.run/User/",
  headers: {
    "Content-Type": "application/json"
  }
  
});

const SidebarNewUsers = ({ open, toggleSidebar, editUser }) => {
  const dispatch = useDispatch();
  const isEditMode = Boolean(editUser);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  useEffect(() => {
    if (editUser) {
      setValue("firstName", editUser.fName || "");
      setValue("lastName", editUser.lName || "");
      setValue("gmail", editUser.gmail || editUser.userName || "");
      setValue("phoneNumber", editUser.phoneNumber || "");
      setValue("isStudent", !!editUser.isStudent);
      setValue("isTeacher", !!editUser.isTecher);
    }
  }, [editUser, setValue]);

  const buildUpdatePayload = (formData, editUser) => ({
    ...editUser,

    fName: formData.firstName,
    lName: formData.lastName,
    gmail: formData.gmail,
    phoneNumber: formData.phoneNumber,
    isStudent: formData.isStudent,
    isTecher: formData.isTeacher,

    roles: editUser.roles ?? [],
    courses: editUser.courses ?? [],
    coursesReseves: editUser.coursesReseves ?? [],
    active: editUser.active ?? true,
    isDelete: editUser.isDelete ?? false
  });

  const onSubmit = async (data) => {
    try {
       
      if (editUser) {
        const editPayload = {
          id: editUser.id,
          firstName: data.firstName,
          lastName: data.lastName,
          gmail: data.gmail,
          phoneNumber: data.phoneNumber,
          isStudent: data.isStudent,
          isTeacher: data.isTeacher,
        };
  
        await axios.put(
          "https://sepehracademy.liara.run/User/UpdateUser",
          editPayload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        toast.success("کاربر با موفقیت ویرایش شد");
        toggleSidebar();
        dispatch(fetchUsers({ page: 1, perPage: 10 }));
      }
  
    
      else {
        const newUserData = {
          lastName: data.lastName,
          firstName: data.firstName,
          gmail: data.gmail,
          password: data.password,
          phoneNumber: data.phoneNumber,
          isStudent: data.isStudent,
          isTeacher: data.isTeacher,
        };
  
        dispatch(addUser(newUserData))
          .unwrap()
          .then((res) => {
            if (res?.success === false) {
              toast.error(res.message || "کاربر وجود دارد");
              return;
            }
  
            toast.success("کاربر با موفقیت اضافه شد");
            toggleSidebar();
            dispatch(fetchUsers({ page: 1, perPage: 10 }));
          })
          .catch(() => {
            toast.error("   کاربر وجود دارد");
          });
      }
    } catch (error) {
      console.error(error);
      toast.error("خطای غیرمنتظره");
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید"}
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>نام</Label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <Input {...field} />}
        />

        <Label className="mt-1">نام خانوادگی</Label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <Input {...field} />}
        />

        <Label className="mt-1">ایمیل</Label>
        <Controller
          name="gmail"
          control={control}
          render={({ field }) => <Input {...field} />}
        />

        {!isEditMode && (
          <>
            <Label className="mt-1">رمز عبور</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </>
        )}

        <Label className="mt-1">شماره تماس</Label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => <Input {...field} />}
        />

        <div className="mt-1">
          <Label>
            <Controller
              name="isStudent"
              control={control}
              render={({ field }) => (
                <Input type="checkbox" {...field} />
              )}
            />{" "}
            دانشجو
          </Label>
        </div>

        <div>
          <Label>
            <Controller
              name="isTeacher"
              control={control}
              render={({ field }) => (
                <Input type="checkbox" {...field} />
              )}
            />{" "}
            استاد
          </Label>
        </div>

        <Button color="primary" className="mt-2" type="submit">
          ثبت
        </Button>
        <Button
          color="secondary"
          outline
          className="mt-2 ms-1"
          onClick={toggleSidebar}
        >
          لغو
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;