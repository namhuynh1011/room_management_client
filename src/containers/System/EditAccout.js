import React, { useState } from "react";
import { InputReadOnly, InputFormV2, Button } from "../../components";
import anonavatar from "../../assets/anon-avatar.png"
import { useSelector } from "react-redux";
import { apiUploadImages, apiUpdateUser } from "../../services";
import { fileToBase64 } from "../../ultils/Common/toBase64";
const EditAccount = () => {
    const [invalidFields, setInvalidFields] = useState([]);
    const { currentData } = useSelector(state => state.user);
    const [payload, setPayload] = useState({
        name: currentData?.name || '',
        // avatar: currentData?.avatar,
        fbUrl: currentData?.fbUrl || '',
        zalo: currentData?.zalo || ''
    })
    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload)
        console.log(response)
    }
    const handleUpLoadFile = async (e) => {
        const imageBase64 = await fileToBase64(e.target.files[0])
        setPayload(prev => ({ ...prev, avatar: imageBase64 }))
    }
    return (
        <div className="flex flex-col h-full items-center">
            <h1 className='text-3xl w-full text-start font-medium py-4 border-b border-gray-200'>Chỉnh Sửa Thông Tin Cá Nhân</h1>
            <div className="w-3/5 flex items-center justify-center flex-auto">
                <div className=' py-6 flex flex-col gap-4 w-full'>
                    <InputReadOnly
                        direction='flex-row'
                        label="Mã Thành Viên"
                        value={`#${currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}` || ''} />
                    <InputReadOnly
                        direction='flex-row'
                        label="Số Điện Thoại"
                        editPhone
                        value={currentData?.phone} />

                    <InputFormV2
                        value={payload?.name}
                        name='name'
                        setValue={setPayload}
                        direction="flex-row"
                        
                        label="Tên Hiển Thị"
                    />
                    <InputFormV2
                        name='zalo'
                        setValue={setPayload}
                        direction="flex-row"
                        
                        label="Zalo"
                        value={payload.zalo} />
                    <InputFormV2
                        name='fbUrl'
                        setValue={setPayload}
                        direction="flex-row"
                        
                        label="Facebook"
                        value={payload.fbUrl} />

                    <div className="flex">
                        <label className="w-48 flex-none " htmlFor="password">Mật Khẩu</label>
                        <small className="flex-auto text-blue-500 h-12 cursor-pointer">Đổi Mật Khẩu</small>
                    </div>
                    <div className="flex mb-6">
                        <labbel className="w-48 flex-none" htmlFor="avatar">Ảnh Đại Diện</labbel>
                        <div>
                            <img src={anonavatar} alt="avatar" className="w-32 h-32 rounded-full object-cover" />
                            <input onChange={handleUpLoadFile} type="file" className="appearance-none my-4" id="avatar"></input>
                            
                        </div>
                    </div>
                    <Button
                        text="Lưu Thay Đổi"
                        bgColor="bg-blue-500"
                        textColor="text-white"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditAccount;