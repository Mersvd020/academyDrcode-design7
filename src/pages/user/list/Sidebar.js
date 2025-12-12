import { useState } from "react";
import Sidebar from "@components/sidebar";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import { Button, Label, FormText, Form, Input } from "reactstrap";
import { addUser, fetchUsers } from "../store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const defaultValues = {
 lastName: "",
 firstName: "",
 gmail: "",
 password: "",
 phoneNumber: "",
 isStudent: false, //boelean
 isTeacher: false //boelean
};

const countryOptions = [
  { label: "استرالیا", value: "Australia" },
  { label: "بنگلادش", value: "Bangladesh" },
  { label: "بلاروس", value: "Belarus" },
  { label: "برزیل", value: "Brazil" },
  { label: "کانادا", value: "Canada" },
  { label: "چین", value: "China" },
  { label: "فرانسه", value: "France" },
  { label: "آلمان", value: "Germany" },
  { label: "هند", value: "India" },
  { label: "اندونزی", value: "Indonesia" },
  { label: "اسرائیل", value: "Israel" },
  { label: "ایتالیا", value: "Italy" },
  { label: "ژاپن", value: "Japan" },
  { label: "کره", value: "Korea" },
  { label: "مکزیک", value: "Mexico" },
  { label: "فیلیپین", value: "Philippines" },
  { label: "روسیه", value: "Russia" },
  { label: "آفریقای جنوبی", value: "South" },
  { label: "تایلند", value: "Thailand" },
  { label: "ترکیه", value: "Turkey" },
  { label: "اوکراین", value: "Ukraine" },
  { label: "امارات متحده عربی", value: "United Arab Emirates" },
  { label: "انگلستان", value: "United Kingdom" },
  { label: "ایالات متحده", value: "United States" },
];

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const dispatch = useDispatch();

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
      const newUserData = {
        lastName: data.lastName,
        firstName: data.firstName,
        gmail: data.gmail,
        password: data.password,
        phoneNumber: data.phoneNumber,
        isStudent: data.isStudent, //boelean
        isTeacher: data.isTeacher //boelean
      };
        console.log("New User Data:", newUserData);
      dispatch(addUser(newUserData))
        .unwrap()
        .then(() => {
          toast.success("کاربر با موفقیت اضافه شد", {
            position: "top-center",
            autoClose: 3000,
          });
          toggleSidebar();
          dispatch(
            fetchUsers({
              page: 1,
              perPage: 10,
            })
          );
          handleSidebarClosed();
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          toast.error("خطا در افزودن کاربر", {
            position: "top-center",
            autoClose: 3000,
          });
        });
    
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    setRole("subscriber");
    setPlan("basic");
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="افزودن کاربر جدید"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="fullName">
            نام <span className="text-danger">*</span>
          </Label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                id="firstName"
                type="text"
                placeholder="احمد محمدی"
                invalid={errors.firstName && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="username">
            نام خانوادگی<span className="text-danger">*</span>
          </Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                id="lastName"
                type="text"
                placeholder="ahmad99"
                invalid={errors.lastName && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            ایمیل <span className="text-danger">*</span>
          </Label>
          <Controller
            name="gmail"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                id="gmail"
                placeholder="ahmad@example.com"
                invalid={errors.gmail && true}
                {...field}
              />
            )}
          />
          <FormText color="muted">
            می‌توانید از حروف، اعداد و نقطه استفاده کنید
          </FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="contact">
            رمز <span className="text-danger">*</span>
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                id="password"
                type="text"
                placeholder="1234"
                invalid={errors.password && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="contact">
            شماره تماس <span className="text-danger">*</span>
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="phoneNumber"
                type="text"
                placeholder="09121234567"
                invalid={errors.phoneNumber && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="contact">
           رول دانشجو<span className="text-danger">*</span>
          </Label>
          <Controller
            name="isStudent"
            control={control}
            render={({ field }) => (
              <Input
                id="isStudent"
                type="checkbox"
                invalid={errors.isStudent && true}
                {...field}
              />
            )}
          />
        </div>
         <div className="mb-1">
          <Label className="form-label" for="contact">
           رول استاد<span className="text-danger">*</span>
          </Label>
          <Controller
            name="isTeacher"
            control={control}
            render={({ field }) => (
              <Input
                id="isTeacher"
                type="checkbox"
                invalid={errors.isTeacher && true}
                {...field}
              />
            )}
          />
        </div>


        <Button type="submit" className="me-1" color="primary">
          ثبت
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          لغو
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
