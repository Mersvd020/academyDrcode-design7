import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col
} from 'reactstrap'

import { getProfileInfo } from './store'
import ProfileInfoTab from './ProfileInfoTab'
import ProfilePicturesTab from './ProfilePicturesTab'
import SecurityTab from './SecurityTab'
import FavoriteCoursesTab from './FavoriteCoursesTab'
import FavoriteNewsTab from './FavoriteNewsTab'
import MyCommentsTab from './MyCommentsTab'
import MyReservesTab from './MyReservesTab'

import { User, Shield, Heart, MessageSquare, Calendar, Image } from 'react-feather'

const Profile = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.profile)

  const [activeTab, setActiveTab] = useState('1')

  useEffect(() => {
    dispatch(getProfileInfo())
  }, [dispatch])

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/80'
    if (url.includes('localhost:300')) {
      return url.replace('localhost:300', 'sepehracademy.liara.run')
    }
    if (!url.startsWith('http')) {
      return `https://sepehracademy.liara.run${url.startsWith('/') ? '' : '/'}${url}`
    }
    return url
  }

  return (
    <div className='profile-wrapper'>
      <Row>
        <Col xs='12'>
          <Card>
            <CardBody>
              <div className='d-flex align-items-center mb-3'>
                <div 
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginLeft: '20px'
                  }}
                >
                  <img 
                    src={store.profileInfo?.currentPictureAddress || 'https://via.placeholder.com/80'} 
                    alt='Profile'
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 className='mb-0'>
                    {store.profileInfo?.fName} {store.profileInfo?.lName}
                  </h3>
                  <p className='text-muted mb-0'>@{store.profileInfo?.userName}</p>
                  <small className='text-success'>
                    تکمیل پروفایل: {store.profileInfo?.profileCompletionPercentage}%
                  </small>
                </div>
              </div>

              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={activeTab === '1'}
                    onClick={() => toggle('1')}
                    style={{ cursor: 'pointer' }}
                  >
                    <User size={16} className='me-50' />
                    اطلاعات پروفایل
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === '2'}
                    onClick={() => toggle('2')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image size={16} className='me-50' />
                    عکس پروفایل
                  </NavLink>
                </NavItem>

                {/* <NavItem>
                  <NavLink
                    active={activeTab === '3'}
                    onClick={() => toggle('3')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Shield size={16} className='me-50' />
                    امنیت
                  </NavLink>
                </NavItem> */}

                <NavItem>
                  <NavLink
                    active={activeTab === '3'}
                    onClick={() => toggle('3')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Heart size={16} className='me-50' />
                    دوره‌های علاقه‌مندی
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === '4'}
                    onClick={() => toggle('4')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Heart size={16} className='me-50' />
                    اخبار علاقه‌مندی
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === '5'}
                    onClick={() => toggle('5')}
                    style={{ cursor: 'pointer' }}
                  >
                    <MessageSquare size={16} className='me-50' />
                    نظرات من
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === '6'}
                    onClick={() => toggle('6')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Calendar size={16} className='me-50' />
                    دوره‌های رزرو شده
                  </NavLink>
                </NavItem>
              </Nav>

             
              <TabContent activeTab={activeTab} className='mt-2'>
                <TabPane tabId='1'>
                  <ProfileInfoTab />
                </TabPane>
                <TabPane tabId='2'>
                  <ProfilePicturesTab />
                </TabPane>
                {/* <TabPane tabId='3'>
                  <SecurityTab />
                </TabPane> */}
                <TabPane tabId='3'>
                  <FavoriteCoursesTab />
                </TabPane>
                <TabPane tabId='4'>
                  <FavoriteNewsTab />
                </TabPane>
                <TabPane tabId='5'>
                  <MyCommentsTab />
                </TabPane>
                <TabPane tabId='6'>
                  <MyReservesTab />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Profile