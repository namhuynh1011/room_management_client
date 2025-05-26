import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost } from "../../components"
import { use } from "react";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";
const ManagePost = () => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false)
    const { postOfCurrent, dataEdit } = useSelector(state => state.post)
    const [updateData, setUpdateData] = useState(false)
    const [posts, setPosts] = useState([])
    const [status, setStatus] = useState('')
    useEffect(() => {
        !dataEdit && dispatch(actions.getPostsLimitAdmin())
    }, [dataEdit, updateData])

    useEffect(() => {
        setPosts(postOfCurrent)
    }, [postOfCurrent])

    useEffect(() => {
        !dataEdit && setIsEdit(false)
    }, [dataEdit])

    const chẹckStatus = (dateString) => moment(dateString, process.env.REACT_APP_FORMAT_DATE).isAfter(new Date().toDateString())

    const handleDeletePost = async (postId) => {
        const response = await apiDeletePost(postId)
        if(response?.data.err ===-0){
            setUpdateData(pev => !pev)
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Xóa Thất Bại',
                text: response?.data.message,
            })
        }   
    }

    useEffect(() => {
        if(status === 1){
            const activePost = postOfCurrent.filter(item => chẹckStatus(item?.overviews?.expired.split(' ')[2]))
            setPosts(activePost)
        }else if(status === 2){
            const expiredPost = postOfCurrent.filter(item => !chẹckStatus(item?.overviews?.expired.split(' ')[2]))
            setPosts(expiredPost)
        }else if(!status){
            setPosts(postOfCurrent)
        }
    },[status])
    return (
        <div className="flex flex-col gap-6">
            <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Quản Lý Tin Đăng</h1>
                <select onChange={e =>  setStatus(+e.target.value)} value={status} className="outline-none border p-2 border-gray-200 rounded-md">
                    <option value='0'>Lọc Theo Trạng Thái</option>
                    <option value='1'>Đang Hoạt Động</option>
                    <option value='2'>Hết Hạn</option>
                </select>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className="flex w-full bg-blue-200 font-medium">
                        <th className="border flex-1 p-2">Mã Tin</th>
                        <th className="border flex-1 p-2">Ảnh Đại Diện</th>
                        <th className="border flex-1 p-2">Tiêu Đề</th>
                        <th className="border flex-1 p-2">Giá</th>
                        <th className="border flex-1 p-2">Ngày Bắt Đầu</th>
                        <th className="border flex-1 p-2">Ngày Hết Hạn</th>
                        <th className="border flex-1 p-2">Trạng Thái</th>
                        <th className="border flex-1 p-2">Thao Tác</th>

                    </tr>
                </thead>
                <tbody>
                    {posts?.length > 0 ? (
                        posts.map(item => (
                            <tr className="flex item-center h-16" key={item.id}>
                                <td className="border px-2 flex-1 h-full flex justify-center items-center">{item?.overviews?.code}</td>
                                <td className="border px-2 flex-1 h-full flex justify-center items-center">
                                    <img
                                        src={JSON.parse(item?.images?.image || '[]')[0] || ''}
                                        alt="avatar-post"
                                        className="w-10 h-10 object-cover rounded-md"
                                    />
                                </td>
                                <td className="border px-2 flex-1 h-full flex justify-center items-center">{`${item.title?.slice(0, 40)}...`}</td>
                                <td className="border px-2 flex-1 h-full flex justify-center items-center">{item?.attributes?.price}</td>
                                <td className="border px-2 flex-1 h-full flex justify-center items-center">{item?.overviews?.created}</td>
                                <td className="border px-2 flex-1 h-full flex justify-center items-center">{item?.overviews?.expired}</td>
                                <td className="border px-2 flex-1 h-full flex justify-center items-center">{chẹckStatus(item?.overviews?.expired.split(' ')[2]) ? "Đang Hoạt Động" : "Hết Hạn"}</td>
                                <td className="border px-2 flex-1 h-full flex justify-center items-center gap-4">
                                    <Button text="Sửa" bgColor="bg-green-600" textColor="text-white"
                                        onClick={() => {
                                            dispatch(actions.editData(item))
                                            setIsEdit(true)
                                        }} />
                                    <Button text="Xóa"
                                        bgColor="bg-orange-600"
                                        textColor="text-white"
                                        onClick={() => {
                                            handleDeletePost(item.id)
                                        }}
                                    />

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="p-4 text-center" colSpan="7">Không có tin đăng nào</td>
                        </tr>
                    )}

                </tbody>
            </table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
        </div>
    );
}

export default ManagePost;