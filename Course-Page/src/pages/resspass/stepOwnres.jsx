import {useNavigate  } from "react-router-dom"
import React from "react"
import { Formik } from "formik"
import { Form ,Field,ErrorMessage} from "formik"
import toast from "react-hot-toast"
import * as Yup from "yup";
import apiClient from "../../hook/interceptor"


const validationSchema=Yup.object({
  email:Yup.string().required("لطفا  ایمیل خود را وارد کنید"),
  
});
const stepOwnres = () => {
  const navigate = useNavigate();


 const stepOwn =async(emile)=>{
    try{  
          const response= await apiClient.post(
            "https://sepehracademy.liara.run/Sign/ForgetPassword",
            { email: emile ,
               baseUrl: `${window.location.origin}/ress/stepTowres`
            }
          );

          console.log(response)
          if(response.data.success){
            toast.success("لینک برای ایمیل شما ارسال شد")
            // navigate("stepTowres")
          }
    else{ toast.info("کاربر یافت نشد")} 
        }catch(error){
       if(error.response.data.success===false){toast.error("کاربر یافت نشد")}
       console.log(error)
       toast.success("خطا")
        }


 }





  return (
        <div dir="rtl" className=' lg:mt-[80px] mt-[180px] flex flex-col items-center text-center lg:m-auto lg:w-[500px] h-[80%] lg:h-[330px] w-full   bg-white rounded-t-[50px] lg:shadow-md inset-shadow-sm lg:rounded-lg '>

      <div className='  m-auto  mt-[50px] w-[207px] h-[67px] '>
    <p className='m-auto mt-[50px]  w-[97px] h-[25px] text-[16px] font-medium text-[black]/70 '> بازیابی</p>
    <h2 className='text-[22px] m-auto w-[207px]  h-[38px] font-bold  '>    فراموش رمز عبور</h2>
      </div>
    
      <Formik initialValues={{
        email:''
      }}
      onSubmit ={(values)=>{
         stepOwn(values.email);
      }}
      validationSchema={validationSchema}
      >
    <Form className='
    m-auto  w-[70%] h-[129px] 
    lg:h-[50%] '>
         <div className="flex items-center w-[100%] lg:h-[25%] h-[30%] mt-[30px]  bg-[#4B4B4B14] rounded-lg">
         <div className="w-[10%] h-[50%] lg:mr-0 mr-2  bg-[url('/Message.png')] bg-no-repeat bg-[position:50%_40%] "></div>
         <Field className=" w-[380px] h-[45px] outline-none "
             type="email"
             placeholder="   ایمیل"
             name="email"
             id="email"
           />
           </div>
    <ErrorMessage className="text-[red] text-[0.82rem] mt-[4px] leading-[1.4] flex items-center gap-[6px] animate-fadeIn"
    name="email"
    component={"p"}
    />

           <button type="submit"  className="mt-[20px] w-[100%] h-[48px] appearance-none !bg-[#3C8B85] !text-white px-4 py-2 rounded-lg"> تایید
           </button>
    </Form>
    
      </Formik>
      </div>
    )
    }

export default stepOwnres