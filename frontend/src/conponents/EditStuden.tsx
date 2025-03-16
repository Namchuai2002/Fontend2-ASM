import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { IStudent } from '../interface/types'


const Edit = () => {
    const {register,handleSubmit,reset,formState:{errors}} = useForm<IStudent>()
    const params = useParams()
    useEffect (() => {
        (async()=>{
            try{
                const {data} = await axios.get(`http://localhost:3000/students/${params.id}`)
                reset(data);
            }
            catch (error){
                console.log(error);
            }
        })()
    },[])

    const navigate =useNavigate()
    const onSubmit = async (student:IStudent)=>{
        try {
            const {data} = await axios.put(`http://localhost:3000/students/${params.id}`,student)
            alert("Cap nhat thanh cong")
            navigate('/student')
        }catch(error) {
            console.log(error);
        }
    }
    return (
        <div className='max-w-2xl mx-auto py-10'>
        <h1 className='font-bold text-[24px] text-center'>Cập nhật sinh viênviên</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4 [&_input]:border [&_input]:py-1 [&_input]:px-3'>
           <input {...register("name",{required:true})} type='text' placeholder='Tên sinh viên'/>
           {(errors.name) && <span className='text-red-700 text-[12px]'>Tên không được để trống</span>}
           <input {...register("image",{required:true})}  type='text' placeholder='Ảnh sinh viên'/>
           <input {...register("industry",{required:true})}  type='text' placeholder='Nghành học'/>
           {(errors.industry) && <span className='text-red-700 text-[12px]'>Nghành không được để trống</span>}
           <input {...register("birday",{required:true})}  type='date' placeholder='Ngày sinh'/>
            <div className='flex justify-end'>
            <button className='bg-green-900 text-white py-1 px-4 rounded'>Cập nhật</button>
            </div>
        </form>
    </div>
    )
}

export default Edit