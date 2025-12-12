import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


import UserInfoCard from './UserInfoCard'
import UserTimeline from './UserTimeline'
import UserProjectsList from './UserProjectsList'
import UserRolesManager from './UserRolesManager' 


import { fetchUserDetails } from '../store'


import { Row, Col } from 'reactstrap'
import '@styles/react/apps/app-users.scss'

const UserView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { selectedUser, loading, error } = useSelector(state => state.users)

  useEffect(() => {
    if (id) dispatch(fetchUserDetails(parseInt(id)))
  }, [dispatch, id])

  if (loading) return <div className='p-3 text-center'>در حال بارگذاری...</div>
  if (error) return <div className='p-3 text-center text-danger'>خطا در دریافت کاربر: {error}</div>
  if (!selectedUser) return <div className='p-3 text-center'>هیچ کاربری یافت نشد</div>

  return (
    <div className="content-wrapper">     
      <div className="content-header row"></div>
      <div className="content-body">
        <div className='app-user-view'>
          <Row>
            <Col xl='4' lg='5' md='5'>
              <UserInfoCard selectedUser={selectedUser} />
              
              {selectedUser && ( 
                <UserRolesManager
                  userId={selectedUser.id}
                
                  roles={selectedUser.roles ? selectedUser.roles.map(r => r.roleId) : []}
                />
              )}
            </Col>
            <Col xl='8' lg='7' md='7'>
              <UserTimeline />
              <UserProjectsList />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default UserView