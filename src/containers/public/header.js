import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logowithout3.png'
import { Button, User } from '../../components'
import icons from '../../ultils/icons'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import menuManage from '../../ultils/menuManage'


const { AiOutlinePlusCircle, AiOutlineLogout, BsChevronDown } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [])
    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams.get('page')])

    return (
        <div ref={headerRef} className='w-full bg-white shadow-md'>
            <div className='max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between'>
                {/* Logo */}
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt='logo'
                        className='w-[180px] h-auto object-contain'
                    />
                </Link>

                {/* Right Side - Buttons / User */}
                <div className='flex items-center gap-4'>
                    {/* Chưa đăng nhập */}
                    {!isLoggedIn && (
                        <div className='flex items-center gap-2 text-sm'>
                            <small className='text-gray-600'>FriendHome.com xin chào!</small>
                            <Button
                                text='Đăng nhập'
                                textColor='text-white'
                                bgColor='bg-[#3961fb]'
                                onClick={() => goLogin(false)}
                            />
                            <Button
                                text='Đăng ký'
                                textColor='text-white'
                                bgColor='bg-[#3961fb]'
                                onClick={() => goLogin(true)}
                            />
                        </div>
                    )}

                    {/* Đã đăng nhập */}
                    {isLoggedIn && (
                        <div className='relative flex items-center gap-3'>
                            <User />
                            <Button
                                text='Quản lý tài khoản'
                                textColor='text-white'
                                bgColor='bg-blue-700'
                                px='px-4'
                                IcAfter={BsChevronDown}
                                onClick={() => setIsShowMenu(prev => !prev)}
                            />

                            {/* Dropdown menu */}
                            {isShowMenu && (
                                <div className='absolute top-full right-0 bg-white border shadow-lg rounded-md w-[220px] mt-2 z-50'>
                                    <div className='flex flex-col p-2'>
                                        {menuManage.map(item => (
                                            <Link
                                                key={item.id}
                                                to={item.path}
                                                className='flex items-center gap-2 text-blue-600 px-3 py-2 rounded hover:bg-gray-100'
                                            >
                                                {item.icon}
                                                {item.text}
                                            </Link>
                                        ))}
                                        <button
                                            onClick={() => {
                                                setIsShowMenu(false)
                                                dispatch(actions.logout())
                                            }}
                                            className='flex items-center gap-2 text-red-500 px-3 py-2 hover:bg-gray-100 w-full text-left'
                                        >
                                            <AiOutlineLogout />
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Đăng tin */}
                    <Button
                        text='Đăng tin mới'
                        textColor='text-white'
                        bgColor='bg-secondary2'
                        IcAfter={AiOutlinePlusCircle}
                    />
                </div>
            </div>
        </div>

    )
}

export default Header