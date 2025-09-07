import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions'
import { BoxInfo,  RelatedPost, Slider } from '../../components'
import icons from '../../ultils/icons'

const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, BsHash } = icons

const DetailPost = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)


    useEffect(() => {
        postId && dispatch(getPostsLimit({ id: postId }))
    }, [postId,dispatch] )

    

    const formatDate = (dateString) => {
    try {
        if (!dateString) return 'Không rõ';
        // Tìm phần ngày tháng năm theo định dạng dd/mm/yyyy
        const dateMatch = dateString.match(/(\d{2}\/\d{2}\/\d{4})/);
        if (!dateMatch) return 'Không rõ';
        const [day, month, year] = dateMatch[1].split('/');
        // Tạo đối tượng Date (lưu ý: tháng trong JS tính từ 0-11)
        const date = new Date(year, month - 1, day);
        if (isNaN(date.getTime())) return 'Không rõ';
        // Chỉ trả về ngày/tháng/năm theo định dạng vi-VN
        return date.toLocaleDateString('vi-VN');
    } catch {
        return 'Không rõ';
    }
}

    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%]  '>
                <Slider images={posts?.[0]?.images?.image && JSON.parse(posts[0].images.image)} />

                <div className='bg-white rounded-md shadow-md pd-4'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-bold text-red-600'>{posts[0]?.title}</h2>
                        <div className='flex items-center gap-2'>
                            <span> Chuyên muc: </span>
                            <span className='text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer'> {posts[0]?.overviews?.area} </span>

                        </div>
                        <div className='flex items-center gap-2'>
                            <HiLocationMarker color='#2563eb' />
                            <span>{posts[0]?.address} </span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='flex items-center gap-1'>
                                <TbReportMoney />
                                <span className='font-semibold text-lg text-green-600'>{posts[0]?.attributes?.price} </span>
                            </span>

                            <span className='flex items-center gap-1'>
                                <RiCrop2Line />
                                <span className=''>{posts[0]?.attributes?.acreage} </span>
                            </span>

                            <span className='flex items-center gap-1'>
                                <BsStopwatch />
                                <span className=''>{posts[0]?.attributes?.published} </span>
                            </span>

                            <span className='flex items-center gap-1'>
                                <BsHash />
                                <span className=''>{posts[0]?.attributes?.hashtag} </span>
                            </span>

                        </div>
                        <div className='mt-8'>
                            <h3 className='font-semibold text-xl my-4'>Thông tin mô tả </h3>
                            <div className='flex flex-col gap-2'>
                                {posts[0]?.description && JSON.parse(posts[0]?.description)?.map((item, index) => {
                                    return (
                                        <span key={index}>{item} </span>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='mt-8'>
                            <h3 className='font-semibold text-xl my-4'>Đặc điểm tin đăng</h3>
                            <table>
                                <tbody>
                                    <tr className="border">
                                        <td className="p-2 border font-medium w-[30%]">Mã tin</td>
                                        <td className="p-2 border">{posts[0]?.overviews?.code}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="p-2 border font-medium">Khu vực</td>
                                        <td className="p-2 border">{posts[0]?.overviews?.area}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="p-2 border font-medium">Loại tin rao</td>
                                        <td className="p-2 border">{posts[0]?.overviews?.type}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="p-2 border font-medium">Đối tượng</td>
                                        <td className="p-2 border">{posts[0]?.overviews?.target}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="p-2 border font-medium">Gói tin</td>
                                        <td className="p-2 border">{posts[0]?.overviews?.bonus}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="p-2 border font-medium">Ngày đăng</td>
                                      <td className="p-2 border">{formatDate(posts[0]?.overviews?.created)}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="p-2 border font-medium">Ngày hết hạn</td>
                                     <td className="p-2 border">{formatDate(posts[0]?.overviews?.expired)}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>


                        <div className='mt-8'>
                            <h3 className='font-semibold text-xl my-4'>Thông tin liên hệ</h3>
                            <table>
                                <tbody>
                                    <tr className="border">
                                        <td className="p-2 border font-medium w-[30%]">Liên hệ</td>
                                        <td className="p-2 border">{posts[0]?.user?.name}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="p-2 border font-medium">Điện thoại</td>
                                        <td className="p-2 border">{posts[0]?.user?.phone}</td>
                                    </tr>
                                    <tr className="border">
                                        <td className="p-2 border font-medium">Zalo</td>
                                        <td className="p-2 border" 
                                        href={`https://zalo.me/${posts[0]?.user?.zalo}`}>{posts[0]?.user?.zalo}</td>
                                    </tr>

                                </tbody>

                            </table>
                        </div>

                    </div>
               

                

                </div>

            </div>
            <div className='w-[30%] flex flex-col gap-8'>
                <BoxInfo userData={posts[0]?.user} />
                <RelatedPost />
                <RelatedPost  newPost/>
            </div>
        </div>
    )
}

export default DetailPost