import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, Row, Col, Badge, Spinner } from 'reactstrap'
import { getMyFavoriteNews } from './store'
import { Calendar, User } from 'react-feather'

const FavoriteNewsTab = () => {
  const dispatch = useDispatch()
  const { favoriteNews, loading } = useSelector(state => state.profile)

  useEffect(() => {
    dispatch(getMyFavoriteNews())
  }, [dispatch])

  if (loading) {
    return (
      <div className='text-center p-5'>
        <Spinner color='primary' />
      </div>
    )
  }

  const news = favoriteNews?.myFavoriteNews || []

  return (
    <Row>
      {news.length > 0 ? (
        news.map(item => (
          <Col key={item.id} md='4' className='mb-3'>
            <Card>
             
                <img 
                onError={(e) => (e.currentTarget.src = "/Img.png")}
                  src={item.currentImageAddressTumb || "/Img.png"} 
                  alt={item.title}
                  style={{ 
                    height: '200px', 
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
              
              <CardBody>
                <h5 className='mb-2'>{item.title}</h5>
                <p 
                  className='text-muted' 
                  style={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {item.news?.miniDescribe}
                </p>
                <div className='mb-1'>
                  <User size={14} className='me-50' />
                  <span className='text-muted'>نویسنده: {item.auther}</span>
                </div>
                <div className='mb-2'>
                  <Calendar size={14} className='me-50' />
                  <span className='text-muted'>
                    {new Date(item.news?.insertDate).toLocaleDateString('fa-IR')}
                  </span>
                </div>
                <Badge color='info' pill>خبر علاقه‌مندی</Badge>
              </CardBody>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          <div className='text-center p-5'>
            <p className='text-muted'>هیچ خبر علاقه‌مندی یافت نشد</p>
          </div>
        </Col>
      )}
    </Row>
  )
}

export default FavoriteNewsTab