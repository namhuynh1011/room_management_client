import React, { useState } from "react";
import { InputForm, Button } from "../../components";
import Swal from "sweetalert2";
const Contact = () => {
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        desc: ''
    })
    const handleSubmit =()=> {
        Swal.fire(`Cảm ơn ${payload.name ? payload.name : ''}`, 'Phản hồi của bạn đã được gửi thành công!', 'success')
        setPayload({
            name: '',
            phone: '',
            desc: ''
        });
    }
    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold mb-6">Liên Hệ Với Chúng Tôi</h1>
            <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-4 h-fit bg-red-400 rounded-3xl p-4 text-white bg-gradient-to-br from-blue-700 to-cyan-400 ">
                    <h4 className="font-medium ">Thông tin liên Hệ</h4>
                    <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn đã chọn chúng tôi.</span>
                    <span>Điện Thoại: 0374786427.</span>
                    <span>Email: friendhome@gmail.com.</span>
                    <span>Zalo: 0374786427.</span>
                    <span>Viber: 0374786427.</span>
                    <span>Địa Chỉ:  230 Nguyễn Văn Hưởng, Phường Thảo Điền, Tp.Thủ Đức, Tp.Hồ Chí Minh.</span>
                </div>
                <div className="flex-1 bg-white shadow-md rounded-md p-4 mb-6">
                    <h4 className="font-medium text-lg mb-4">Liên Hệ Trực Tiếp</h4>
                    <div className="flex flex-col gap-6">
                        <InputForm
                            label="Họ Tên"
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload="name"
                        />
                        <InputForm
                            label="Số Điện Thoại"
                            value={payload.phone}
                            setValue={setPayload}
                            keyPayload="phone"
                        />
                        <div>
                            <label htmlFor="desc" className="text-sm font-medium text-gray-700">Nội Dung</label>
                            <textarea className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full' id="desc" cols='36' rows='3'
                                value={payload.desc}
                                onChange={e => setPayload(prev => ({ ...prev, desc: e.target.value }))}
                                name="desc"
                            ></textarea>
                        </div>
                        <Button
                            text="Gửi Thông Tin Liên Hệ"
                            bgColor="bg-blue-500"
                            textColor="text-white"
                            fullWidth
                            onClick={handleSubmit}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;