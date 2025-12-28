import { useNavigate, useParams } from "react-router-dom"
import React from "react"
import { Formik } from "formik"
import { Form, Field, ErrorMessage } from "formik"
import toast from "react-hot-toast"
import * as Yup from "yup"
import apiClient from "../../hook/interceptor"


const validationSchema = Yup.object({
    email: Yup.string()
        .email("لطفا ایمیل معتبر وارد کنید")
        .required("لطفا ایمیل را وارد کنید"),
    newpass: Yup.string()
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
        .required("لطفا رمز جدید را وارد کنید"),
})

const stepTowres = () => {
    const navigate = useNavigate()
    const { code } = useParams()
  
    const stepTowres = async (email, newpass) => {
        try {   
            console.log("work", { email, newpass, code })
            
            const response = await apiClient.post(
                "https://sepehracademy.liara.run/Sign/Reset",
                {
                    gmail: email,  // حالا email درست پاس داده میشه
                    newPassword: newpass,
                    resetValue: code,
                }
            )
            
            console.log("Response:", response) 
            
            if (response.data) {
                toast.success("اطلاعات شما با موفقیت ثبت شد")
                setTimeout(() => {
                    navigate("/authLayout")
                }, 1500)
            } else {
                toast.error("خطا در تغییر رمز عبور")
            }
        } catch (error) {
            console.error("Error details:", error.response?.data || error)
            toast.error(error.response?.data?.message || "خطا در تغییر رمز عبور")
        }
    }

    return (
   <div dir="rtl" className='lg:mt-[80px] mt-[180px] flex flex-col items-center text-center lg:m-auto lg:w-[500px] h-[80%] w-full bg-white rounded-t-[50px] lg:shadow-md inset-shadow-sm lg:rounded-lg'>
      <div className='m-auto mt-[50px] w-[207px] h-[67px]'>
          <p className='m-auto mt-[50px] w-[97px] h-[25px] text-[16px] font-medium text-[black]/70'>رمز جدید</p>
          <h2 className='text-[22px] m-auto w-[207px] h-[38px] font-bold'>فراموش رمز عبور</h2>
      </div>
              
      <Formik 
          initialValues={{
              email: '',
              newpass: ''
          }}
          onSubmit={(values, { setSubmitting }) => {
              console.log("Form values:", values)
              stepTowres(values.email, values.newpass)
              setSubmitting(false)
          }}
          validationSchema={validationSchema}
      >
          {({ isSubmitting }) => (
              <Form className='m-auto w-[70%] h-[50%]'>
                       
     <div className="flex items-center w-[100%] h-[20%] mt-[30px] bg-[#4B4B4B14] rounded-lg">
         <div className="w-[10%] h-[50%] lg:mr-0 mr-2 bg-[url('/Message.png')] bg-no-repeat bg-[position:50%_40%]"></div>
         <Field 
             className="w-[380px] h-[35px] outline-none bg-transparent"
             type="email"
             placeholder="ایمیل"
             name="email"
             id="email"
         />
     </div>
    
      <ErrorMessage 
          className="text-[red] text-[0.82rem] mt-[4px] leading-[1.4] flex items-center gap-[6px] animate-fadeIn"
          name="email"
          component="p"
      />
      
      
      <div className="flex items-center w-[100%] h-[20%] mt-[30px] bg-[#4B4B4B14] rounded-lg">
          <div className="w-[10%] h-[50%] lg:mr-0 mr-2 bg-[url('/Lock.png')] bg-no-repeat bg-[position:50%_40%]"></div>
          <Field 
              className="w-[380px] h-[35px] outline-none bg-transparent"
              type="password"  /* تصحیح: password نه text */
              placeholder="رمز جدید"
              name="newpass"
              id="newpass"
          />
      </div>
      <ErrorMessage 
          className="text-[red] text-[0.82rem] mt-[4px] leading-[1.4] flex items-center gap-[6px] animate-fadeIn"
          name="newpass"
          component="p"
      />
  
      <button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-[20px] w-[100%] h-[48px] appearance-none !bg-[#3C8B85] !text-white px-4 py-2 rounded-lg hover:bg-[#2d6b66] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
          {isSubmitting ? "در حال ارسال..." : "تایید"}
      </button>
         </Form>
         )}
     </Formik>
   </div>
  )
}

export default stepTowres