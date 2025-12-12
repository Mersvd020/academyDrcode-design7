import { Fragment } from 'react'
import { Card, CardBody, Row, Col, Badge } from 'reactstrap'
import Avatar from '@components/avatar'

const UserInfoCard = ({ selectedUser }) => {

  if (!selectedUser) return null

  const {
    fName,
    lName,
    userName,
    gmail,
    phoneNumber,
    active,
    gender,
    userAbout,
    linkdinProfile,
    telegramLink,
    homeAdderess,
    nationalCode,
    birthDay,
    roles,
    profileCompletionPercentage,
    currentPictureAddress
  } = selectedUser

  const fullName = `${fName} ${lName}`

  const roleBadges = roles?.map((r, i) => (
    <Badge key={i} color='primary' className='me-50'>
      {r.roleName === 'admin' ? 'ادمین' :
       r.roleName === 'teacher' ? 'استاد' :
       r.roleName === 'student' ? 'دانشجو' : r.roleName}
    </Badge>
  ))

  return (
    <Fragment>
      <Card>
        <CardBody>

          <div className='d-flex flex-column align-items-center'>
            {currentPictureAddress ? (
              <img
                src={currentPictureAddress}
                alt='avatar'
                height='110'
                width='110'
                className='rounded mb-1'
              />
            ) : (
              <Avatar
                initials
                content={fullName}
                color='light-primary'
                style={{ height: '110px', width: '110px', fontSize: '36px' }}
                className='rounded mb-1'
              />
            )}

            <h4 className='mt-1 mb-0'>{fullName}</h4>
            <div>{roleBadges}</div>
          </div>

          <h4 className='fw-bolder border-bottom pb-50 mt-2 mb-1'>اطلاعات کاربر</h4>

          <ul className='list-unstyled'>
            <li className='mb-75'>
              <span className='fw-bolder me-25'>نام کاربری:</span>
              <span>{userName}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>ایمیل:</span>
              <span>{gmail}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>شماره تماس:</span>
              <span>{phoneNumber}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>وضعیت:</span>
              <Badge color={active ? 'success' : 'danger'}>
                {active ? 'فعال' : 'غیرفعال'}
              </Badge>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>جنسیت:</span>
              <span>{gender ? 'مرد' : 'زن'}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>آدرس:</span>
              <span>{homeAdderess || '-'}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>کد ملی:</span>
              <span>{nationalCode}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>تاریخ تولد:</span>
              <span>{birthDay?.slice(0, 10)}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>درباره کاربر:</span>
              <span>{userAbout || '—'}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>لینکدین:</span>
              <span>{linkdinProfile || '-'}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>تلگرام:</span>
              <span>{telegramLink || '-'}</span>
            </li>

            <li className='mb-75'>
              <span className='fw-bolder me-25'>درصد تکمیل پروفایل:</span>
              <Badge color='info'>{profileCompletionPercentage}%</Badge>
            </li>
          </ul>

        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard