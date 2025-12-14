import { Card, CardHeader } from 'reactstrap'
import DataTable from 'react-data-table-component'

import '@styles/react/libs/tables/react-dataTable-component.scss'

const CoursesList = ({ user }) => {

  const reserved1 = user?.courseReserve || []
  const reserved2 = user?.coursesReseves || []  

  const reservedCourses = [...reserved1, ...reserved2]

  const mergedData = reservedCourses.map(c => ({
    title: c.courseName || `دوره ${c.courseId}`,
    courseId: c.courseId,
    groupId: c.courseGroupId || '-',
    status: c.accept ? 'تأیید شده' : 'در انتظار',
    reserveDate: c.insertDate 
      ? new Date(c.insertDate).toLocaleDateString('fa-IR') 
      : '-',
    day: 'نامشخص'
  }))

  const columns = [
    { name: 'نام دوره', selector: row => row.title, sortable: true },
    { name: 'کد دوره', selector: row => row.courseId },
    { name: 'کد گروه', selector: row => row.groupId },
    { name: 'وضعیت', selector: row => row.status },
    { name: 'تاریخ رزرو', selector: row => row.reserveDate },
    { name: 'روز برگزاری', selector: row => row.day }
  ]

  return (
    <Card>
      <CardHeader tag='h4'>لیست دوره‌های کاربر</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={mergedData}
          className='react-dataTable'
          sortIcon={<span style={{ fontSize: '12px' }}>⬇️</span>}
        />
      </div>
    </Card>
  )
}

export default CoursesList