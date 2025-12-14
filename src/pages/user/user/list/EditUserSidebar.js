import { useEffect } from "react";
import Sidebar from "@components/sidebar";
import { useForm, Controller } from "react-hook-form";
import { Button, Label, Form, Input } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://sepehracademy.liara.run/User/",
  headers: {
    "Content-Type": "application/json",
  },
});

const defaultFormValues = {
  firstName: "",
  lastName: "",
  gmail: "",
  phoneNumber: "",
  isStudent: false,
  isTeacher: false, 
};

const EditUserSidebar = ({ open, toggleSidebar, user, onSuccess }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: defaultFormValues });

  useEffect(() => {
    if (user && open) {
      setValue("firstName", user.fName || "");
      setValue("lastName", user.lName || "");
      setValue("gmail", user.gmail || user.userName || "");
      setValue("phoneNumber", user.phoneNumber || "");
      setValue("isStudent", !!user.isStudent);
      setValue("isTeacher", !!user.isTecher || !!user.isTeacher); 
    } else if (!open) {
      reset(defaultFormValues);
    }
  }, [user, open, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        id: user.id,
        fName: data.firstName,
        lName: data.lastName,
        phoneNumber: data.phoneNumber,
        isStudent: data.isStudent,
        isTeacher: data.isTeacher
      };
  
      console.log(" FINAL PAYLOA:", payload);
  
      await axiosInstance.put("UpdateUser", payload);
  
      toast.success("ویرایش کاربر با موفقیت انجام شد");
      toggleSidebar();
      onSuccess?.();
    } catch (error) {
      console.error(" Edit error:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "خطا در ویرایش کاربر"
      );
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="ویرایش کاربر"
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

        <Label className="mt-1">شماره تماس</Label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => <Input {...field} />}
        />

        <div className="mt-2">
          <Label>
            <Controller
              name="isStudent"
              control={control}
              render={({ field }) => (
                <Input type="checkbox" {...field} checked={field.value} />
              )}
            />{" "}
            دانشجو
          </Label>
        </div>

        <div className="mt-1">
          <Label>
            <Controller
              name="isTeacher"
              control={control}
              render={({ field }) => (
                <Input type="checkbox" {...field} checked={field.value} />
              )}
            />{" "}
            استاد
          </Label>
        </div>

        <div className="mt-2 d-flex gap-1">
          <Button color="primary" type="submit">
            ذخیره
          </Button>
          <Button color="secondary" outline onClick={toggleSidebar}>
            لغو
          </Button>
        </div>

      </Form>
    </Sidebar>
  );
};

export default EditUserSidebar;