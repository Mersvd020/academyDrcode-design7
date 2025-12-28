import { Link ,useNavigate } from "react-router-dom"
import React from "react"
import { Formik } from "formik"
import apiClient from "../../hook/interceptor"
import { Form ,Field,ErrorMessage} from "formik"
import { useContext } from "react"
import { AuthContext } from "../../hook/authContext"
import toast from "react-hot-toast"

import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import {login} from "../../API/auth"
import { useDispatch,useSelector } from "react-redux"
import { loginSuccess } from "../../store/authSlice"

import * as Yup from "yup";
const validationSchema=Yup.object({
  emile:Yup.string().required("لطفا ایمیل  را وارد کنید"),
  pass:Yup.string().required("لطفا  رمز ورود را وارد کنید")
  
});
const EmileLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const loginMutation = useMutation({
       mutationFn:login,
       onSuccess:(data)=>{
        console.log("login Data",data);
        dispatch(
         loginSuccess({
            phoneNumber:data.phoneNumber,
            id:data.id,
            role:data.roles,
            token:data.token
          })
        )
    
        toast.success("به دکتر تل خوش آمدید!😍");
        setInterval(()=>{navigate("/")},1000);
        setTimeout(()=>{window.location.reload();navigate("/")},1500);
       },
       onError:(error)=>{
          console.log("login Error",error);
          if(error.response.status=400)toast.error("ایمیل یا رمز عبور اشتباه است")
          else{toast.error("خطا در لاگین")}  
       }
    })

  const handleLogin = async (emile,pass,rememberMee) => {
        loginMutation.mutate({
           email: emile,
           password: pass,
           rememberMe: rememberMee
        })
       

  }

   
  return (
    <div dir="rtl" className=' m-auto w-[390px] h-[400px]
     lg:m-[100px 50px] lg:w-[50%] lg:h-[300px] 
    '>
    <div className="hidden w-[60px] h-[183px]   border-0 float-left mt-[70px]
    lg:float-left lg:block lg:bg-[url('/wizardLogin.png')] lg:bg-[length:100%_100%] lg:w-[40px] lg:h-[133px]
    "></div>
<div className=' flex-items-center m-auto w-[207px] h-[67px] '>
<p className='m-auto w-[97px] h-[25px] text-[16px] font-medium text-[black]/70  '>خوش اومدی:)</p>
<h2 className='text-[22px] m-auto w-[207px]  h-[38px] font-bold  '>ورود با حساب کاربری</h2>
</div>
<Formik 
initialValues={{
  emile:'',
  pass:'',
  remember: false,
}}
onSubmit ={(values)=>{
    handleLogin(values.emile,values.pass,values.remember);
}}
validationSchema={validationSchema}
>
<Form className='
m-auto  w-[70%] h-[229px]
lg:h-[100%] '>
  <div className="
  float-right w-[130px] h-[25px]">
   
 <span className="text-[14px] text-right cursor-pointer w-[430px] h-[25px]">ورود با 
     <Link to="/authLayout/PhoneLogin"><span className=" pr-3 font-medium text-[#9B0EE1]">شماره همراه</span> </Link></span>
  
    </div>
    <div className="flex items-center w-[100%] h-[20%] mt-[30px]  bg-[#4B4B4B14] rounded-lg">
    <div className="w-[10%] h-[50%] lg:mr-0 mr-2  bg-[url('/Message.png')] bg-no-repeat bg-[position:50%_30%] "></div>
    <Field className="w-[380px] h-[35px] outline-none "
        type="email"
        placeholder=" ایمیل"
        name="emile"
        id="emile"

      />
      </div>
      <ErrorMessage class="text-[red] text-[0.82rem] mt-[4px] leading-[1.4] flex items-center gap-[6px] animate-fadeIn"
      name="emile"
       component={"p"}
              />
    <div className="flex items-center w-[100%] h-[20%] mt-[30px]  bg-[#4B4B4B14] rounded-lg">
    <div className="w-[10%] h-[50%] lg:mr-0 mr-2  bg-[url('/Password.png')] bg-no-repeat bg-[position:50%_40%] "></div>
    <Field className="w-[380px] h-[35px] outline-none "
        type="text"
        placeholder=" رمز ورود"
        name="pass"
        id="pass"
      />
    
      </div>
       <ErrorMessage class="text-[red] text-[0.82rem] mt-[4px] leading-[1.4] flex items-center gap-[6px] animate-fadeIn"
      name="pass"
       component={"p"}
              /> 
  <div className=" mt-[10px] w-[100%] h-[10%] ">
  <Field className=" float-right w-[16px] h-[16px]  "
        type="checkbox"
        id="remember"
        name="remember"
        
      />
      <label className=" float-right text-[12px] mr-1" id="remember">مرا به خاطر بسپار</label>
       <Link to={"/ress"} className="float-left cursor-pointer text-[#9B0EE1] underline">فراموشی رمز</Link>
  </div>
      <button  className="w-[100%] h-[48px] appearance-none !bg-[#3C8B85] !text-white px-4 py-2 rounded-lg"
      type="submit"> 
      ورود به حساب کاربری </button>
      <div className="mx-auto  mt-[10px] flex w-[422px] h-[22px] ">
      <p>حساب کاربری نداری؟</p>
     <Link to="/Reg" className="cursor-pointer text-[#9B0EE1] mr-2">ثبت نام</Link>
    </div> 
</Form>


</Formik>

</div>
     
  )
}

export default EmileLogin;