// ** React Imports
import { useState, useEffect } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, Button, Spinner, Alert } from 'reactstrap'

// ** Third Party Components
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import axios from 'axios'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'


const columns = [
  {
    name: 'نام گروه',
    sortable: true,
    minWidth: '150px',
    selector: row => row.groupName,
    cell: row => {
      return (
        <div className='d-flex flex-column'>
          <span className='fw-bolder'>{row.groupName || ''}</span>
        
        </div>
      )
    }
  },
  {
    name: 'ظرفیت دوره',
    sortable: true,
    minWidth: '120px',
    center: true,
    selector: row => row.groupCapacity,
    cell: row => {
      return <span>{row.groupCapacity || '0'}</span>
    }
  },
  {
    name: 'ظرفیت گروه',
    sortable: true,
    minWidth: '120px',
    center: true,
    selector: row => row.courseCapacity,
    cell: row => {
      return <span>{row.courseCapacity || '0'}</span>
    }
  },
  {
    name: 'نام استاد',
    sortable: true,
    minWidth: '150px',
    selector: row => row.teacherName,
    cell: row => {
      return <span>{row.teacherName || '-'}</span>
    }
  },
  {
    name: 'نام دوره',
    sortable: true,
    minWidth: '150px',
    selector: row => row.courseName,
    cell: row => {
      return <span>{row.courseName || '-'}</span>
    }
  }
]

const GroupList = ({ courseId,teachId }) => {
  
  const [groupData, setGroupData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
   
  
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true)
        setError(null)
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `https://sepehracademy.liara.run/CourseGroup/GetCourseGroup?TeacherId=${teachId}&CourseId=${courseId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        ) 
        const data = response.data
        setGroupData(data) 
      } catch(error) {
        console.log("grouplistError", error)
        setError('خطا در دریافت اطلاعات گروه‌ها')
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [courseId,teachId])


   console.log("Group Data",groupData);
  return (
    <Card>
      <CardHeader tag='h4'>لیست گروه های دوره</CardHeader>
      
     

      <div className='react-dataTable user-view-account-projects'>
        {loading ? (
          <div className='text-center p-3'>
            <Spinner color='primary' />
            <p className='mt-2'>در حال بارگذاری...</p>
          </div>
        ) : groupData.length === 0 ? (
          <div className='text-center p-3'>
            <p className='text-muted'>هیچ گروهی یافت نشد</p>
          </div>
        ) : (
          <>
            <DataTable
              noHeader
              responsive
              columns={columns}
              data={groupData}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
            />
           
          </>
        )}
      </div>

     
      <div className='p-2'>
        <Button 
          color='primary' 
          block
          className='d-flex align-items-center justify-content-center'
          style={{
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          <Plus size={20} className='me-2' />
          افزودن گروه
        </Button>
      </div>
    </Card>
  )
}

export default GroupList