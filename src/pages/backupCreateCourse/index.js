// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane,Button } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import Breadcrumbs from '@components/breadcrumbs'
// import BillingTabContent from './BillingTabContent'
import AccountTabContent from './AccountTabContent'
import CourseImage from './courseImage'
import CourseFeature from "./courseFeature"
// import SecurityTabContent from './SecurityTabContent'
// import ConnectionsTabContent from './ConnectionsTabContent'
// import NotificationsTabContent from './NotificationsTabContent'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('1')
  const [data, setData] = useState([])

  const toggleTab = tab => {
    setActiveTab(tab)
  }
 
   
  




  return (
    <Fragment>
      <Breadcrumbs title='Account Settings' data={[{ title: 'Pages' }, { title: 'Account Settings' }]} />
      {data !== null ? (
        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <AccountTabContent data={data.general} />
              </TabPane>
              <TabPane tabId='2'>
                <CourseFeature />
              </TabPane>
              <TabPane tabId='3'>
                {/* <BillingTabContent /> */}
              </TabPane>
              <TabPane tabId='4'>
                {/* <NotificationsTabContent /> */}
              </TabPane>
              <TabPane tabId='5'>
                <CourseImage />
              </TabPane>
            </TabContent>

            <Col style={{display:"flex",justifyContent:"space-between"}} >
                <Button   color='primary'>
                  قبلی
                </Button>
                <Button color='primary'>
                  بعدی
                </Button>
                
              </Col>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default AccountSettings
