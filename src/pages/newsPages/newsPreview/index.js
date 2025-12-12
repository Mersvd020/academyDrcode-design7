// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import Tab from "./Tabs"
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/base/pages/app-invoice.scss'
import '@styles/react/apps/app-users.scss'






const InvoicePreview = () => {
 
  const {id} = useParams();

  const [SelectedNews, setData] = useState([])
  const [commentN, setComment] = useState([])
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  

  useEffect(() => {

    const fetchCourseId = async()=>{
      
      try{
        const token = localStorage.getItem("token")
     const response = await axios.get(`https://sepehracademy.liara.run/News/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
     );
     const DatA = await response.data.detailsNewsDto;
     const CommentNum = await response.data;
      setData(DatA);
      setComment(CommentNum)
     }
    catch(error){
      console.log("error",error)
    }
    
  }
    fetchCourseId();

  }, [id])

 console.log("Data",SelectedNews);

 const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  
  return SelectedNews !== null ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>

          <UserInfoCard SelectedNews={SelectedNews} commentN={commentN} />
        </Col>

        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <Tab active={active} courseId={id} SelectedNews={SelectedNews} teacherId={SelectedNews?.teacherId} toggleTab={toggleTab} />
        </Col>
      </Row>

    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}

export default InvoicePreview
