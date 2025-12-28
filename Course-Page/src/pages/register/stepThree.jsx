import React from "react"
import { useNavigate } from "react-router-dom"
import { Formik } from "formik"
import { Form ,Field,ErrorMessage} from "formik"
import toast from "react-hot-toast"
import * as Yup from "yup";
import apiClient from "../../hook/interceptor"
const validationSchema=Yup.object({
    Email:Yup.string().required("لطفا ایمیل را وارد کنید"),
  phone:Yup.string().required("لطفا شماره موبایل خود را وارد کنید"),
  pass:Yup.string().required("لطفا  رمز عبور خود را وارد کنید")
  
});

 const stepThree = () => {
    const navigate = useNavigate();



const handleThree =async(Email,phone,pass)=>{
   
  try {
    const RegThree = await apiClient.post(
      "https://sepehracademy.liara.run/Sign/Register",
      {
          gmail: Email,
          phoneNumber: phone,
          password: pass
      }
    );
    
   if (RegThree.data.success === true) {
      const token = RegThree.data.token;
      
      if (token) {
        localStorage.setItem('token', token);
        toast("ثبت نام با موفقیت انجام شد")
        setInterval(()=>{navigate('/authLayout')},1000);
         setTimeout(()=>{window.location.reload()},1500);
      }
    }
      
    } catch (error) { 
    
    toast("خطا در ثبت نام")
  }
};
 
  return (
    <div dir="rtl" className=' m-auto w-[100%] h-[400px] 
    lg:m-[100px 50px] lg:w-[50%] lg:h-[300px]'>
            <div className='text-center m-auto w-[207px] h-[67px] '>
    <p className='m-auto w-[97px] h-[25px] text-[16px] font-medium text-[black]/70  '>خوش اومدی:)</p>
    <h2 className='text-[22px] m-auto w-[207px]  h-[38px]  font-bold '>ورود با حساب کاربری</h2>
    </div>
<Formik initialValues={{
  Email:'',
  phone:'',
  pass:''
}}
onSubmit ={(values)=>{
   
  handleThree(values.Email,values.phone,values.pass)
}}
validationSchema={validationSchema}
>
<Form  className='m-auto  w-[70%] h-[229px]
lg:h-[100%]'>

      <div className="flex items-center w-[100%] h-[15%] mt-[30px]  bg-[#4B4B4B14] rounded-lg">
      <div className="w-[10%] h-[50%] lg:mr-0 mr-2  bg-[url('/Password.png')] bg-no-repeat bg-[position:50%_30%] "></div>
      <Field  className="w-[380px] h-[35px] outline-none "
          type="email"
          placeholder=" ایمیل"
          name="Email"
          id="Email"
        />

        </div>
        <ErrorMessage class="text-[red] text-[0.82rem] mt-[4px] leading-[1.4] flex items-center gap-[6px] animate-fadeIn"
         name="Email"
         component={"p"}
        />
      <div className="flex items-center w-[100%] h-[15%] mt-[30px]  bg-[#4B4B4B14] rounded-lg">
      <div className="w-[10%] h-[50%] lg:mr-0 mr-2  bg-[url('/Password.png')] bg-no-repeat bg-[position:50%_40%] "></div>
      <Field  className="w-[380px] h-[35px] outline-none "
          type="text"
          placeholder=" شماره موبایل"
          name="phone"
          id="phone"
        />
        </div>
        <ErrorMessage class="text-[red] text-[0.82rem] mt-[4px] leading-[1.4] flex items-center gap-[6px] animate-fadeIn"
         name="phone"
         component={"p"}
        />
      <div className="flex items-center w-[100%] h-[15%] mt-[30px]  bg-[#4B4B4B14] rounded-lg">
      <div className="w-[10%] h-[50%] lg:mr-0 mr-2  bg-[url('/Password.png')] bg-no-repeat bg-[position:50%_40%] "></div>
      <Field  className="w-[380px] h-[35px] outline-none "
          type="text"
          placeholder="  رمز عبور شما"
          name="pass"
          id="pass"
        />
        </div>
        <ErrorMessage class="text-[red] text-[0.82rem] mt-[4px] leading-[1.4] flex items-center gap-[6px] animate-fadeIn"
         name="pass"
         component={"p"}
        />
        <button 
         className="mt-[10px] w-[100%] h-[48px] appearance-none !bg-[#3C8B85] !text-white px-4 py-2 rounded-lg"
        type="submit">   تایید
        </button>

</Form>
</Formik>

</div>
  )
}

export default stepThree;