import { UserRegister } from '../interface/types'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const {register,handleSubmit,formState:{errors}} = useForm<UserRegister>()
    const navigate = useNavigate()
    const onSubmit = async (user:UserRegister)=>{
    try{
        const {data} = await axios.post('http://localhost:3000/register',user)
        alert("Dang ki thanh cong")
        navigate('/student')
    }catch ( error:any){
        console.log(error.response.data)
    }
    }
    return(
        <div className='max-w-2xl mx-auto py-10'>
        <h1 className='font-bold text-[24px] text-center'>Đăng ký</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 [&_input]:border [&_input]:py-1 [&_input]:px-3'>
           <input {...register("name")}  type='text' placeholder='Họ tên'/>           
           <input {...register("email",{required:true,pattern:/^\S+@+(\S+\.)+[a-zA-Z]{2,6}$/})} type='text' placeholder='Email'/>
           {(errors.email) && <span className='text-red-700 text-[12px]'>Email phải đúng định dạng</span>}
           <input {...register("phone")} type='text' placeholder='Số điện thoại'/>
           <input {...register("password")} type='text' placeholder='Mật khẩu'/>
            <div className='flex justify-end'>
            <button className='bg-green-900 text-white py-1 px-4 rounded'>Đăng ký</button>
            </div>
        </form>
    </div>
    )
}


export default Register