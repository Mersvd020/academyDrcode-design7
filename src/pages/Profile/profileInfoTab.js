import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Form,
  Label,
  Input,
  Button,
  Spinner,
  Row,
  Col
} from 'reactstrap'
import { updateProfileInfo, clearSuccess, clearError } from './store'
import toast from 'react-hot-toast'

const ProfileInfoTab = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.profile)

  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    userName: '',
    phoneNumber: '',
    gmail: '',
    nationalCode: '',
    gender: true,
    birthDay: '',
    homeAdderess: '',
    userAbout: '',
    linkdinProfile: '',
    telegramLink: '',
    latitude: '',
    longitude: ''
  })

  useEffect(() => {
    if (store.profileInfo) {
      setFormData({
        fName: store.profileInfo.fName || '',
        lName: store.profileInfo.lName || '',
        userName: store.profileInfo.userName || '',
        phoneNumber: store.profileInfo.phoneNumber || '',
        gmail: store.profileInfo.gmail || '',
        nationalCode: store.profileInfo.nationalCode || '',
        gender: store.profileInfo.gender || true,
        birthDay: store.profileInfo.birthDay ? new Date(store.profileInfo.birthDay).toISOString().split('T')[0] : '',
        homeAdderess: store.profileInfo.homeAdderess || '',
        userAbout: store.profileInfo.userAbout || '',
        linkdinProfile: store.profileInfo.linkdinProfile || '',
        telegramLink: store.profileInfo.telegramLink || '',
        latitude: store.profileInfo.latitude || '',
        longitude: store.profileInfo.longitude || ''
      })
    }
  }, [store.profileInfo])

  useEffect(() => {
    if (store.success) {
      toast.success('پروفایل با موفقیت بروزرسانی شد')
      dispatch(clearSuccess())
    }
  }, [store.success, dispatch])

  useEffect(() => {
    if (store.error) {
      toast.error(store.error?.message || 'خطا در بروزرسانی')
      dispatch(clearError())
    }
  }, [store.error, dispatch])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'select-one' ? value === 'true' : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const dataToSend = {
      ...formData,
      birthDay: formData.birthDay ? new Date(formData.birthDay).toISOString() : null
    }

    dispatch(updateProfileInfo(dataToSend))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md='6' className='mb-1'>
          <Label for='fName'>نام *</Label>
          <Input
            id='fName'
            name='fName'
            value={formData.fName}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='lName'>نام خانوادگی *</Label>
          <Input
            id='lName'
            name='lName'
            value={formData.lName}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='userName'>نام کاربری</Label>
          <Input
            id='userName'
            name='userName'
            value={formData.userName}
            onChange={handleChange}
            disabled
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='phoneNumber'>شماره تلفن</Label>
          <Input
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='gmail'>ایمیل</Label>
          <Input
            id='gmail'
            name='gmail'
            type='email'
            value={formData.gmail}
            onChange={handleChange}
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='nationalCode'>کد ملی</Label>
          <Input
            id='nationalCode'
            name='nationalCode'
            value={formData.nationalCode}
            onChange={handleChange}
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='birthDay'>تاریخ تولد</Label>
          <Input
            id='birthDay'
            name='birthDay'
            type='date'
            value={formData.birthDay}
            onChange={handleChange}
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='gender'>جنسیت</Label>
          <Input
            id='gender'
            name='gender'
            type='select'
            value={formData.gender}
            onChange={handleChange}
          >
            <option value={true}>مرد</option>
            <option value={false}>زن</option>
          </Input>
        </Col>
        <Col md='12' className='mb-1'>
          <Label for='homeAdderess'>آدرس</Label>
          <Input
            id='homeAdderess'
            name='homeAdderess'
            type='textarea'
            rows='2'
            value={formData.homeAdderess}
            onChange={handleChange}
          />
        </Col>
        <Col md='12' className='mb-1'>
          <Label for='userAbout'>درباره من</Label>
          <Input
            id='userAbout'
            name='userAbout'
            type='textarea'
            rows='3'
            value={formData.userAbout}
            onChange={handleChange}
          />
        </Col>
        {/* <Col md='6' className='mb-1'>
          <Label for='linkdinProfile'>لینکدین</Label>
          <Input
            id='linkdinProfile'
            name='linkdinProfile'
            value={formData.linkdinProfile}
            onChange={handleChange}
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='telegramLink'>تلگرام</Label>
          <Input
            id='telegramLink'
            name='telegramLink'
            value={formData.telegramLink}
            onChange={handleChange}
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='latitude'>عرض جغرافیایی</Label>
          <Input
            id='latitude'
            name='latitude'
            value={formData.latitude}
            onChange={handleChange}
          />
        </Col>
        <Col md='6' className='mb-1'>
          <Label for='longitude'>طول جغرافیایی</Label>
          <Input
            id='longitude'
            name='longitude'
            value={formData.longitude}
            onChange={handleChange}
          />
        </Col> */}
        <Col className='mt-2'>
          <Button color='primary' type='submit' disabled={store.loading}>
            {store.loading ? (
              <>
                <Spinner size='sm' className='me-50' />
                در حال بروزرسانی...
              </>
            ) : (
              'بروزرسانی پروفایل'
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default ProfileInfoTab