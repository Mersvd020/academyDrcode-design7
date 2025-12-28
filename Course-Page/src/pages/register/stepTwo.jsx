import { Link ,useNavigate,useParams } from "react-router-dom"
import React from "react"
import { Formik } from "formik"
import { Form ,Field,ErrorMessage} from "formik"
import toast from "react-hot-toast"
import * as Yup from "yup";
import apiClient from "../../hook/interceptor"
const validationSchema=Yup.object({
  cod:Yup.string().required("لطفا  کد تایید  را وارد کنید"),
  
});
const stepTow = () => {
  const navigate = useNavigate();
  const {emile} = useParams();

  const stepTwo =async(cod)=>{
    try{
       const RegTwo = await apiClient.post("https://sepehracademy.liara.run/Sign/VerifyMessage",{
        gmail : emile,
        verifyCode : cod    
       });

       toast("شماره تلفن،ایمیل و رمز عبور خود را تایین کنید")
       navigate("/Reg/StepThree")
       
    }catch(error){
       toast("کد اشتباه است")
    }
    
 }


  return (
    <div dir="rtl" className=' m-auto w-[400px] h-[400px] 
    lg:m-[100px 50px] lg:w-[50%] lg:h-[300px] '>

 <div className=' text-center m-auto w-[207px] h-[67px] '>
<p className='m-auto w-[97px] h-[25px] text-[16px] font-medium text-[black]/70 '>خوش اومدی:)</p>
<h2 className='text-[22px] m-auto w-[207px]  h-[38px] font-bold '>   کد تایید</h2>
 </div>

 <Formik initialValues={{
   cod:''
 }}
 onSubmit ={(values)=>{
   stepTwo(values.cod);
  // console.log(values.cod);
   
 }}
 validationSchema={validationSchema}
 >
<Form className='
m-auto  w-[70%] h-[229px]
lg:h-[100%] '>
  <h2 className=' text-[13px] float-right  h-[38px]  '>    کد تایید به ایمیلتان ارسال شد</h2>
    <div className="flex items-center  w-[100%] h-[20%] mt-[30px]  bg-[#4B4B4B14] rounded-lg">
    <div className="w-[10%] lg:h-[35%] h-[35%] lg:mr-0 mr-2  bg-[url('/Password.png')] bg-no-repeat bg-[position:50%_40%] "></div>
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
  className="text-[14px] font-medium text-[#9B0EE1] mr-auto cursor-pointer w-[430px] h-[25px] "
>ارسال دوباره کد
</Link>
  </div>
      <button type="submit"  className="w-[100%] h-[48px] appearance-none !bg-[#3C8B85] !text-white px-4 py-2 rounded-lg"> تایید
      </button>
      <button  onClick={()=>navigate("/Reg/stepOwn")} className="w-[100%] h-[48px] mt-[10px] appearance-none border-2 !border-[#3C8B85] text-[#3C8B85] px-4 py-2 rounded-lg"> تعییر ایمیل 
      </button> 
</Form>
    
 </Formik>
 
 </div>
  )
}
export default stepTow;