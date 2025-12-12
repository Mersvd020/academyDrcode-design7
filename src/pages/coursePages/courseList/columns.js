// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { deleteCourse, setExpireCourse,activeCourse } from '../store'

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Trash,
  Download,
  MoreVertical,
  BookOpen,
  Calendar,
  DollarSign,
  Save,
  Info,
  PieChart,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  EyeOff,
  Delete,
  CloudOff
} from 'react-feather'

// ** Vars
const courseStatusObj = {
  Active: { color: 'light-success', icon: CheckCircle },
  Inactive: { color: 'light-secondary', icon: EyeOff },
  Expired: { color: 'light-danger', icon: Info }
}

// ** renders teacher column
const renderTeacher = row => {
  const teacher = row.teacher || {}
  
  if (teacher.currentPictureAddress) {
    return (
      <Avatar 
        className='me-50' 
        img={teacher.currentPictureAddress} 
        width='32' 
        height='32' 
      />
    )
  } else {
    const teacherName = `${teacher.fName || ''} ${teacher.lName || ''}`.trim() || 'استاد'
    return (
      <Avatar 
        color='light-primary' 
        className='me-50' 
        content={teacherName} 
        initials 
      />
    )
  }
}

// ** Table columns
export const columns = [
  {
    name: 'شناسه',
    sortable: true,
    sortField: 'courseId',
    minWidth: '100px',
    selector: row => row.courseId, 
    cell: row => (
      <Link to={`/apps/course/preview/${row.courseId}`}>
        {`#${row.courseId.substring(0, 8)}`}
      </Link>
    )
  },
  {
    sortable: true,
    minWidth: '102px',
    sortField: 'isActive',
    name: <BookOpen size={14} />,
    cell: row => {
      let status = 'Inactive'
      if (row.isActive && !row.isExpire) {
        status = 'Active'
      } else if (row.isExpire) {
        status = 'Expired'
      }
      
      const color = courseStatusObj[status]?.color || 'light-secondary'
      const Icon = courseStatusObj[status]?.icon || BookOpen
      
      return (
        <Fragment key={`status-${row.courseId}`}>
          <Avatar color={color} icon={<Icon size={15} />} id={`av-tooltip-${row.courseId}`} />
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.courseId}`}>
            <span className='fw-bold'>وضعیت: {status === 'Active' ? 'فعال' : status === 'Expired' ? 'منقضی' : 'غیرفعال'}</span>
          </UncontrolledTooltip>
        </Fragment>
      )
    }
  },
  {
    name: 'عنوان دوره',
    sortable: true,
    minWidth: '250px',
    sortField: 'title',
    selector: row => row.title, 
    cell: row => {
      return (
        <div className='d-flex flex-column'>
          <h6 className='user-name text-truncate mb-0'>{row.title}</h6>
          <small className='text-truncate text-muted mb-0'>{row.miniDescribe || 'بدون توضیحات'}</small>
        </div>
      )
    }
  },
  {
    name: 'مدرس',
    sortable: true,
    minWidth: '250px',
    sortField: 'teacher.fName',
    selector: row => row.fullName,  
    cell: row => {
      const teacher = row.teacher || {}
      const name = row.fullName || `${teacher.fName || ''} ${teacher.lName || ''}`.trim() || 'نامشخص'
      const email = teacher.gmail || teacher.userName || '-'
      
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderTeacher(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{name}</h6>
            <small className='text-truncate text-muted mb-0'>{email}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'هزینه',
    sortable: true,
    minWidth: '120px',
    sortField: 'cost',
    selector: row => row.cost,  
    cell: row => <span>{row.cost?.toLocaleString('fa-IR') || 0} تومان</span>
  },
  {
    sortable: true,
    minWidth: '150px',
    name: 'تاریخ شروع',
    sortField: 'startTime',
    selector: row => row.startTime,  
    cell: row => {
      const date = new Date(row.startTime)
      return date.toLocaleDateString('fa-IR')
    }
  },
  {
    sortable: true,
    name: 'ظرفیت',
    minWidth: '100px',
    sortField: 'capacity',
    selector: row => row.capacity,  
    cell: row => {
      return (
        <Badge color='light-info' pill>
          {row.capacity} نفر
        </Badge>
      )
    }
  },
  {
    name: 'عملیات',
    minWidth: '110px',
    cell: row => {
      let activing = true
      let status = 'Inactive'
      
      if (row.isActive && !row.isExpire) {
        status = 'Active'
        activing = false
      } else if (!row.isActive) {
        activing = true
      } else if (row.isExpire) {
        status = 'Expired'
      }
      
      if (row.isDelete) {
        status = 'Deleted'
      }
      //  console.log("rowId:", row.courseId)
      const isExpired = row.isExpire
      
      return (
        <div className='column-action d-flex align-items-center'>
          <Link to={`/course/preview/${row.courseId}`} id={`pw-tooltip-${row.courseId}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.courseId}`}>
            مشاهده دوره
          </UncontrolledTooltip>
         
          <UncontrolledDropdown>
            <DropdownToggle tag='span'>
              <MoreVertical size={17} className='cursor-pointer' />
            </DropdownToggle>
            
            <DropdownMenu end>
               
              <DropdownItem 
                tag={Link} 
                
                className='w-100'
                 onClick={e => {
                  e.preventDefault()
                  store.dispatch(deleteCourse({ Id: row.courseId, activing }))
                }}
              >
                <Trash size={14} className='me-50' />
                <span className='align-middle'>
                  {status === 'Deleted' ? 'بازگرداندن دوره' : 'حذف دوره'}
                </span>
              </DropdownItem>
              
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={e => {
                  e.preventDefault()
                  store.dispatch(setExpireCourse({ 
                    Id: row.courseId, 
                    expire: !isExpired 
                  }))
                }}
              >
                <CloudOff size={14} className='me-50' />
                <span className='align-middle'>
                  {status === 'Expired' ? 'غیر منقضی کردن دوره' : 'منقضی کردن دوره'}
                </span>
              </DropdownItem>

              <DropdownItem 
                tag='a' 
                href='/' 
                className='w-100' 
                onClick={e => {
                  e.preventDefault()
                  store.dispatch(activeCourse({ Id: row.courseId, activing }))
                }}
              >
                <Delete size={14} className='me-50' />
                <span className='align-middle'>
                  {status === 'Active' ? 'غیر فعال کردن' : 'فعال کردن'}
                </span>
              </DropdownItem>
              
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]