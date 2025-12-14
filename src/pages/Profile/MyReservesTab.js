import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, Badge, Spinner } from 'reactstrap'
import { getMyCoursesReserve } from './store'
import { Calendar, User } from 'react-feather'

const MyReservesTab = () => {
  const dispatch = useDispatch()
  const { coursesReserve, loading } = useSelector(state => state.profile)

  useEffect(() => {
    dispatch(getMyCoursesReserve())
  }, [dispatch])

  if (loading) {
    return <div className='text-center p-5'><Spinner color='primary' /></div>
  }

  const reserves = coursesReserve || []

  return (
    <Row>
      {reserves.length > 0 ? (
        reserves.map(reserve => (
          <Col key={reserve.id} md='6' className='mb-3'>
            <Card>
             
                <img 
                onError={(e) => (e.currentTarget.src = "/Img.png")}
                  src={reserve.image || "/Img.png"} 
                  alt={reserve.courseName}
                  style={{ 
                    height: '200px', 
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
              
              <CardBody>
                <div className='d-flex justify-content-between align-items-start mb-2'>
                  <h5 className='mb-0'>{reserve.courseName}</h5>
                  <Badge color={reserve.accept ? 'success' : 'warning'} pill>
                    {reserve.accept ? 'تایید شده' : 'در انتظار تایید'}
                  </Badge>
                </div>

                <div className='mb-1'>
                  <User size={14} className='me-50' />
                  <span className='text-muted'>مدرس: {reserve.teacher}</span>
                </div>

                <div className='mb-1'>
                  <Calendar size={14} className='me-50' />
                  <span className='text-muted'>
                    شروع: {new Date(reserve.startDate).toLocaleDateString('fa-IR')}
                  </span>
                </div>

                <div className='mb-1'>
                  <Calendar size={14} className='me-50' />
                  <span className='text-muted'>
                    پایان: {new Date(reserve.endDate).toLocaleDateString('fa-IR')}
                  </span>
                </div>

                <div className='mt-2'>
                  <small className='text-muted'>
                    تاریخ رزرو: {new Date(reserve.insertDate).toLocaleDateString('fa-IR')}
                  </small>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          <div className='text-center p-5'>
            <p className='text-muted'>هیچ دوره رزرو شده‌ای یافت نشد</p>
          </div>
        </Col>
      )}
    </Row>
  )
}

export default MyReservesTab