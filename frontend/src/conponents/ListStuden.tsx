import { useEffect, useState } from 'react'
import { IStudent } from '../interface/types'
import axios from 'axios'
import { Link } from 'react-router-dom'

const List = () => {
    const [students, setStudents] = useState<IStudent[]>([])
    useEffect(() => {
    (async ()=> {
        try{
            const {data} = await axios.get(`http://localhost:3000/students`)
            setStudents(data)
        }catch (error){
           console.log(error);
        }
    })()
    }, [])
    const DelStudent = async (id:number | string)=>{
        try{
            if( confirm("Bạn thật sự muốn xóa?"))
            {
                await axios.delete(`http://localhost:3000/students/${id}`)
                const newStudents = students.filter(item => item.id !== id)
                alert("Xoa thanh cong")
                setStudents(newStudents)   
        }} catch (error) {
                console.log(error);
            }
    }

    return (
        <div className='max-w-2xl mx-auto'>
    <h1 className='font-bold text-[24px] text-center mt-4'>Danh sách sản phẩm</h1>
    <table className='border w-full [&_td]:border [&_th]:border mt-6'>
        <thead>
            <tr>
                <th>STT</th>
                <th>Ảnh sinh viên</th>
                <th>Tên sinh viên</th>
                <th>Nghành học</th>
                <th>Ngày sinh</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr >
                {
                    students.map((item, index) => (
                <td key={item.id}>
                <td>{index+1}</td>
                <td><img src={item.image} width={90} /></td>
                <td>{item.name}</td>
                <td>{item.industry}</td>
                <td>{item.birday}</td>
                <td>
                    <Link className='bg-green-800 px-3 py-1 rounded-sm text-white mr-2' to={`/student/${item.id}`}>Sửa</Link>
                    <button onClick={() => DelStudent(item.id)} className='bg-red-800 px-3 py-1 rounded-sm text-white'>Xóa</button>
                </td>
                        </td>
                    ))
                }
            </tr>
        </tbody>
    </table>
    </div>
    )
}

export default List