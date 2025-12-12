// ** Reactstrap Imports
import { Card, CardHeader } from 'reactstrap'
import DataTable from 'react-data-table-component'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CoursesList = ({ user }) => {
  // استخراج دوره‌ها
  const studentCourses = user?.courseStudent || []
  const reservedCourses = user?.courseReserve || []

  // تبدیل داده به یک آرایه قابل نمایش
  const mergedData = [
    ...studentCourses.map(c => ({
      title: `دوره ${c.courseId}`,
      courseId: c.courseId,
      groupId: c.courseGroupId,
      status: 'دانشجو',
      reserveDate: '-',
      day: 'نامشخص'
    })),
    ...reservedCourses.map(c => ({
      title: c.courseName || `دوره ${c.courseId}`,
      courseId: c.courseId,
      groupId: '-',
      status: c.accept ? 'تأیید شده' : 'در انتظار',
      reserveDate: new Date(c.reserverDate).toLocaleDateString('fa-IR'),
      day: 'نامشخص'
    }))
  ]

  // ستون‌ها
  const columns = [
    {
      name: 'نام دوره',
      selector: row => row.title,
      sortable: true
    },
    {
      name: 'کد دوره',
      selector: row => row.courseId
    },
    {
      name: 'کد گروه',
      selector: row => row.groupId
    },
    {
      name: 'وضعیت',
      selector: row => row.status
    },
    {
      name: 'تاریخ رزرو',
      selector: row => row.reserveDate
    },
    {
      name: 'روز برگزاری',
      selector: row => row.day
    }
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