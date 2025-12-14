import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  Card, 
  CardBody, 
  Row, 
  Col, 
  Badge, 
  Spinner,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'
import { getMyCoursesComments, getMyNewsComments } from './store'
import { Calendar, MessageSquare } from 'react-feather'

const MyCommentsTab = () => {
  const dispatch = useDispatch()
  const { coursesComments, newsComments, loading } = useSelector(state => state.profile)
  const [activeTab, setActiveTab] = useState('1')

  useEffect(() => {
    dispatch(getMyCoursesComments())
    dispatch(getMyNewsComments())
  }, [dispatch])

  if (loading) {
    return <div className='text-center p-5'><Spinner color='primary' /></div>
  }

  const courseCommentsList = coursesComments?.myCommentsDtos || []
  const newsCommentsList = newsComments?.myNewsCommetDtos || []

  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={activeTab === '1'}
            onClick={() => setActiveTab('1')}
            style={{ cursor: 'pointer' }}
          >
            نظرات دوره‌ها ({courseCommentsList.length})
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={activeTab === '2'}
            onClick={() => setActiveTab('2')}
            style={{ cursor: 'pointer' }}
          >
            نظرات اخبار ({newsCommentsList.length})
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab} className='mt-2'>

        <TabPane tabId='1'>
          <Row>
            {courseCommentsList.length > 0 ? (
              courseCommentsList.map(comment => (
                <Col key={comment.id} md='6' className='mb-2'>
                  <Card>
                    <CardBody>
                      <div className='d-flex justify-content-between align-items-start mb-2'>
                        <h6>{comment.title}</h6>
                        <Badge color={comment.accept ? 'success' : 'warning'} pill>
                          {comment.accept ? 'تایید شده' : 'در انتظار'}
                        </Badge>
                      </div>
                      <p className='text-muted small'>{comment.describe}</p>
                      <div className='d-flex justify-content-between align-items-center mt-2'>
                        <small className='text-muted'>
                          <MessageSquare size={12} className='me-50' />
                          دوره: {comment.courseTitle}
                        </small>
                        <small className='text-muted'>
                          <Calendar size={12} className='me-50' />
                          {new Date(comment.insertDate).toLocaleDateString('fa-IR')}
                        </small>
                      </div>
                      <div className='mt-2'>
                        <small>👍 {comment.likeCount} | 👎 {comment.disslikeCount}</small>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <div className='text-center p-5'>
                  <p className='text-muted'>هیچ نظری برای دوره‌ها ثبت نکرده‌اید</p>
                </div>
              </Col>
            )}
          </Row>
        </TabPane>

        <TabPane tabId='2'>
          <Row>
            {newsCommentsList.length > 0 ? (
              newsCommentsList.map(comment => (
                <Col key={comment.id} md='6' className='mb-2'>
                  <Card>
                    <CardBody>
                      <h6 className='mb-2'>{comment.title}</h6>
                      <p className='text-muted small'>{comment.describe}</p>
                      <small className='text-muted'>
                        <Calendar size={12} className='me-50' />
                        {new Date(comment.inserDate).toLocaleDateString('fa-IR')}
                      </small>
                    </CardBody>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <div className='text-center p-5'>
                  <p className='text-muted'>هیچ نظری برای اخبار ثبت نکرده‌اید</p>
                </div>
              </Col>
            )}
          </Row>
        </TabPane>
      </TabContent>
    </>
  )
}

export default MyCommentsTab