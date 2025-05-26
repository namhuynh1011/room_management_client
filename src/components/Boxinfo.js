import React, { memo } from 'react';
import anonAvatar from '../assets/anon-avatar.png';
import icons from '../ultils/icons';

const { BsDot, BsTelephoneFill, SiZalo } = icons;


const BoxInfo = ({ userData }) => {
    return (
        <div className="w-full max-w-4xl bg-yellow-600 rounded-md flex flex-col items-center p-4 text-white">
            <img src={anonAvatar} alt="avatar" className="w-16 h-16 object-contain rounded-full mb-2" />
            <h3 className="font-medium text-xl capitalize">{userData?.name}</h3>

            <span className="flex items-center mt-1 mb-3">
                <BsDot color="green" size={30}/>
                <span>Đang hoạt động</span>
            </span>

            <a
                className="bg-[#13BB7B] py-2 mb-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg text-white"
                href={"/"}
            >
                <BsTelephoneFill /> {userData?.phone}
            </a>

            <a
                className="bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg text-blue-600"
                href={`https://zalo.me/${userData?.zalo}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <SiZalo size={28} />

            </a>
        </div>
    );
};

export default memo(BoxInfo);
