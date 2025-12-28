import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "../../../../hook/interceptor";
import axios from "axios";
import toast from "react-hot-toast"

const Information = () => {
  const [initialValues, setInitialValues] = useState(null);
  const [userInfo,setUserInfo] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
    try {
      const res = await apiClient.get("https://sepehracademy.liara.run/SharePanel/GetProfileInfo");
      const data = res.data;
      setUserInfo(data);

    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
   }
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    fName: Yup.string().required("ضروری"),
    lName: Yup.string().required("ضروری"),
    phoneNumber: Yup.string().required("ضروری"),
    nationalCode: Yup.string().required("ضروری"),
    birthDay: Yup.string().required("ضروری"),
    gender: Yup.string().required("ضروری"),
    email: Yup.string().email("ایمیل نامعتبر است").required("ضروری"),
    homeAdderess: Yup.string().required("ضروری"),
  });


  const handleSubmit = async (fName,lName,userAbout,phoneNumber,nationalCode,birthDay,gender,email,homeAdderess) => {
  try {

    const token = localStorage.getItem('token');

    const formData = new FormData();

    formData.append("FName", fName);
    formData.append("LName", lName);
    formData.append("UserAbout", userAbout);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("NationalCode", nationalCode);
    formData.append("HomeAdderess", homeAdderess);
    formData.append("Email", email);
    formData.append("Gender", gender);
     formData.append("BirthDay", birthDay);
   
    const res = await axios.put("https://sepehracademy.liara.run/SharePanel/UpdateProfileInfo", formData,
       {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    console.log("UPDATED!", res.data);
    toast.success("آپدیت با موفقیت انجام شد");
    setTimeout(()=>{window.location.reload()},1500)

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    toast.error("خطا در آپدیت");
  }
};


  return (
    <div className="lg:h-full h-screen flex text-[12px] flex-row gap-2 pt-2 flex-wrap">

      <Formik
        initialValues={{
        fName: userInfo.fName || "" ,
        lName: userInfo.lName || "" ,
        userAbout: userInfo.userAbout || "",
        phoneNumber: userInfo.phoneNumber || "",
        nationalCode: userInfo.nationalCode || "" ,
        birthDay: userInfo.birthDay ? userInfo.birthDay.split("T")[0]:"",
        gender: userInfo.gender ? "true" : "false",
        email: userInfo.email || "" ,
        homeAdderess: userInfo.homeAdderess || "" ,
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}

        onSubmit={(values)=>{
           handleSubmit(values.fName,values.lName,values.userAbout,values.phoneNumber,values.nationalCode,
            values.birthDay,values.gender,values.email,values.homeAdderess
           )
          
        }}
      >
        <Form className="flex flex-row flex-wrap gap-2 w-full">

          <Field
            name="fName"
            id="fName"
            placeholder="نام"
            className="bg-[#F5F5F5] rounded-[8px] indent-3 w-[45%] h-[9%]"
          />
          <ErrorMessage name="fName" className="text-red-500 text-xs" component="div" />

          <Field
            name="lName"
            id="lName"
            placeholder="نام خانوادگی"
            className="bg-[#F5F5F5] rounded-[8px] indent-3 w-[45%] h-[9%]"
          />
          <ErrorMessage name="lName" component="div" className="text-red-500 text-xs" />

          <Field
            type="textarea"
            name="userAbout"
            id="userAbout"
            placeholder="درباره من"
            className="bg-[#F5F5F5] rounded-[8px] indent-3 w-full h-[20%]"
          />

          <Field
            name="phoneNumber"
            id="phoneNumber"
            placeholder="شماره همراه"
            className="bg-[#F5F5F5] rounded-[8px] indent-3 w-[45%] h-[9%]"
          />
          <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs" />

          <Field
            name="nationalCode"
            id="nationalCode"
            placeholder="کد ملی"
            className="bg-[#F5F5F5] rounded-[8px] indent-3 w-[45%] h-[9%]"
          />
          <ErrorMessage name="nationalCode" component="div" className="text-red-500 text-xs" />
          <Field
            name="birthDay"
            id="birthDay"
            type="date"
            className="bg-[#F5F5F5] rounded-[8px] indent-3 w-[45%] h-[9%]"
          />
          <ErrorMessage name="birthDay" component="div" className="text-red-500 text-xs" />

          
          <div className="flex items-center gap-4 bg-[#F5F5F5] rounded-[8px] w-[45%] h-[9%] px-2">
            جنسیت:
            <label className="flex items-center gap-1">
              <Field type="radio" name="gender" value="true" />
              مرد
            </label>

            <label className="flex items-center gap-1">
              <Field type="radio" name="gender" value="false" />
              زن
            </label>
          </div>

          <Field
            name="email"
            id="email"
            placeholder="ایمیل"
            className="bg-[#F5F5F5] rounded-[8px] indent-3 w-full h-[9%]"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />

          <Field
            name="homeAdderess"
            id="homeAdderess"
            type="textarea"
            placeholder="آدرس سکونت"
            className="bg-[#F5F5F5] rounded-[8px] indent-3 w-full h-[20%]"
          />


          <button
            type="submit"
            className="w-[150px] bg-[#9B0EE1] rounded-[8px] text-white font-medium text-[13px] h-[45px] mb-2"
          >
            اعمال تغییرات
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Information;