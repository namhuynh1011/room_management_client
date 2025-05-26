import React, { memo, useEffect, useState } from 'react'
import { Select, InputReadOnly } from '../components' // Đảm bảo bạn có InputForm hoặc thay thế bằng thẻ input thường
import { apiGetPublicProvinces, apiGetPublicDistrict, apiGetPublicWards } from '../services'
import { useSelector } from 'react-redux'

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {

    const { dataEdit } = useSelector(state => state.post)

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [reset, setReset] = useState(false)
    const [street, setStreet] = useState('') // ✅ Số nhà/tên đường
    const [wards, setWards] = useState([])
    const [ward, setWard] = useState('')

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(', ')
            let foundProvince = provinces?.length && provinces?.find(item => item.province_name === addressArr[addressArr.length - 1])
            setProvince(foundProvince ? foundProvince.province_id : '')
        }
    }, [provinces, dataEdit])
    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(', ')
            let foundDistrict = districts?.length && districts?.find(item => item.district_name === addressArr[addressArr.length - 2])
            setDistrict(foundDistrict ? foundDistrict.district_id : '')
        }
    }, [districts, dataEdit])
    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(', ')
            let foundWard = wards?.length && wards?.find(item => item.ward_name === addressArr[addressArr.length - 3])
            setWard(foundWard ? foundWard.ward_id : '')
        }
    }, [wards, dataEdit])
    useEffect(() => {
        if (dataEdit?.address) {
            let addressArr = dataEdit.address.split(', ')
            // Nếu có đủ ít nhất 4 phần tử: số nhà, phường, quận, tỉnh
            if (addressArr.length >= 4) {
                setStreet(addressArr.slice(0, addressArr.length - 3).join(', ')) // Gộp lại nếu tên đường có dấu phẩy
            }
        }
    }, [])

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data.results)
            }
        }
        fetchPublicProvince()
    }, [])

    useEffect(() => {
        setDistrict('')
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200) {
                setDistricts(response.data?.results)
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])
    useEffect(() => {
        setWard('')
        const fetchPublicWards = async () => {
            const response = await apiGetPublicWards(district)
            if (response.status === 200) {
                setWards(response.data?.results)
            }
        }
        district && fetchPublicWards()
        !district && setWards([])
    }, [district])
    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${street ? street + ', ' : ''}${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name}, ` : ''}${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
            province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
        }))
    }, [province, district, ward, street])


    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields} type='province'
                        value={province} setValue={setProvince}
                        options={provinces} label='Tỉnh/Thành phố' />
                    <Select
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields} reset={reset}
                        type='district' value={district} setValue={setDistrict}
                        options={districts} label='Quận/Huyện' />
                    <Select
                        type='ward'
                        value={ward}
                        setValue={setWard}
                        options={wards}
                        label='Phường/Xã'
                    />

                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-medium'>Số nhà, tên đường</label>
                    <input
                        type='text'
                        className='border p-2 rounded'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder='VD: 123 Lê Lợi'
                    />
                </div>
                <InputReadOnly
                    label='Địa chỉ chính xác'
                    value={`${street ? street + ', ' : ''}${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name}, ` : ''}${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`}
                />

            </div>
        </div>
    )
}

export default memo(Address)
