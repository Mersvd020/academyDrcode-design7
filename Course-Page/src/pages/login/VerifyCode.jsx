import { Link  } from "react-router-dom"
import React from "react"
import { Formik } from "formik"
import { Form ,Field,ErrorMessage} from "formik"
import toast from "react-hot-toast"
import * as Yup from "yup";
const validationSchema=Yup.object({
  cod:Yup.string().required("لطفا  کد تایید  را وارد کنید"),
  
});
 const VerifyCode = () => {

  return (
    <div dir="rtl" className=' m-auto w-[600px] h-[400px] 
     lg:m-[100px 50px] lg:w-[50%] lg:h-[300px] '>
    <div className="
    hidden w-[60px] h-[195px]   float-left mt-[70px]
    lg:float-left lg:block lg:bg-[url('/izardLogin.png')] lg:bg-[length:100%_100%] lg:w-[40px] lg:h-[133px]
    "></div>
  <div className=' m-auto w-[207px] h-[67px] '>
<p className='m-auto w-[97px] h-[25px] text-[16px] font-medium text-[black]/70 '>خوش اومدی:)</p>
<h2 className='text-[22px] m-auto w-[207px]  h-[38px] font-bold  '>   کد تایید</h2>
  </div>

  <Formik initialValues={{
    cod:''
  }}
  onSubmit ={(values)=>{
    console.log(values)
  }}
  validationSchema={validationSchema}
  >
<Form className='
m-auto  w-[70%] h-[229px]
lg:h-[100%] '>
   <h2 className=' text-[13px] float-right  h-[38px]  '>    کد تایید به ایمیلتان ارسال شد</h2>
     <div className="flex w-[100%] h-[20%] mt-[30px]  bg-[#4B4B4B14] rounded-lg">
     <div className="w-[10%] h-[100%]  bg-[url('/Password.png')] bg-no-repeat bg-[position:50%_40%] "></div>
     <Field className="w-[380px] h-[35px] outline-none "
         type="text"
         placeholder="  کد تایید"
         name="cod"
         id="cod"
       />
       </div>
<ErrorMessage className="text-[red] text-[0.82rem] mt-[4px] leading-[1.4] flex items-center gap-[6px] animate-fadeIn"
name="cod"
component={"p"}
/>
   <div className=" mt-[10px] w-[25%] h-[10%] ">
   <Link
   to="/authLayout/VerifyCode"
   className="text-[14px] mr-auto cursor-pointer w-[430px] h-[25px] "
 >اراسل دوباره  کد
 </Link>
   </div>
       <button type="submit"  className="w-[100%] h-[48px] appearance-none !bg-[#3C8B85] !text-white px-4 py-2 rounded-lg"> تایید
       </button>
       <button  className="w-[100%] h-[48px] mt-[10px] appearance-none border-2 !border-[#3C8B85] text-[#3C8B85] px-4 py-2 rounded-lg"> تعییر شماره همراه
       </button> 
</Form>

  </Formik>
  </div>
)
}

export default VerifyCode