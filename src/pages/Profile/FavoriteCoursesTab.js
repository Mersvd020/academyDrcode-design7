import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, Badge, Spinner } from 'reactstrap'
import { getMyFavoriteCourses } from './store'
import { Calendar, DollarSign, User } from 'react-feather'

const FavoriteCoursesTab = () => {
  const dispatch = useDispatch()
  const { favoriteCourses, loading } = useSelector(state => state.profile)

  useEffect(() => {
    dispatch(getMyFavoriteCourses())
  }, [dispatch])

  if (loading) {
    return <div className='text-center p-5'><Spinner color='primary' /></div>
  }

  const courses = favoriteCourses?.favoriteCourseDto || []

  return (
    <Row>
      {courses.length > 0 ? (
        courses.map(course => (
          <Col key={course.id} md='4' className='mb-3'>
            <Card>
                <img 
                onError={(e) => (e.currentTarget.src = "/Img.png")}
                  src={course.imageAddress || "/Img.png"} 
                  alt={course.courseTitle}
                  style={{ 
                    height: '200px', 
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
              
              <CardBody>
                <h5 className='mb-2'>{course.courseTitle}</h5>
                <div className='mb-1'>
                  <User size={14} className='me-50' />
                  <span className='text-muted'>مدرس: {course.teacheName}</span>
                </div>
                <div className='mb-1'>
                  <DollarSign size={14} className='me-50' />
                  <span className='text-muted'>قیمت: {course.cost?.toLocaleString()} تومان</span>
                </div>
                <div className='mb-2'>
                  <Calendar size={14} className='me-50' />
                  <span className='text-muted'>
                    {new Date(course.lastUpdate).toLocaleDateString('fa-IR')}
                  </span>
                </div>
                <Badge color='success' pill>علاقه‌مندی</Badge>
              </CardBody>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          <div className='text-center p-5'>
            <p className='text-muted'>هیچ دوره علاقه‌مندی یافت نشد</p>
          </div>
        </Col>
      )}
    </Row>
  )
}

export default FavoriteCoursesTab