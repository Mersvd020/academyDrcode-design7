// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { activeCourse } from './store'


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


const courseStatusObj = {
  Active: { color: 'light-success', icon: CheckCircle },
  Inactive: { color: 'light-secondary', icon: EyeOff },
  Expired: { color: 'light-danger', icon: Info }
}


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


export const columns = [

   {
    name: 'عنوان اخبار',
    sortable: true,
    minWidth: '300px',
    sortField: 'title',
    selector: row => row.title, 
    cell: row => {
      return (
        <div className='d-flex flex-column'>
          <h6 className='user-name text-truncate mb-0'>{row.title}</h6>
        </div>
      )
    }
  },
 
  {
    name: 'دسته بندی',
    sortable: true,
    minWidth: '300px',
    sortField: 'title',
    selector: row => row.newsCatregoryName, 
    cell: row => {
      return (
        <div className='d-flex flex-column'>
          <h6 className='user-name text-truncate mb-0'>{row.newsCatregoryName}</h6>
        </div>
      )
    }
  },
  {
    sortable: true,
    minWidth: '150px',
    name: 'آخرین ابدیت',
    sortField: 'startTime',
    selector: row => row.insertDate,  
    cell: row => {
      const date = new Date(row.insertDate)
      return date.toLocaleDateString('fa-IR')
    }
  },
  {
    sortable: true,
    name: 'تعداد بازدید',
    minWidth: '100px',
    sortField: 'capacity',
    selector: row => row.currentView,  
    cell: row => {
      return (
        <Badge color='light-info' pill>
          {row.currentView} نفر
        </Badge>
      )
    }
  },
   {
    sortable: true,
    minWidth: '102px',
    sortField: 'isActive',
    name: "وضیعت",
    cell: row => {
      let status = 'Inactive'
      if (row.active) {
        status = 'Active'
      } else{
        status = 'Inactive'
      }
      
      const color = courseStatusObj[status]?.color || 'light-secondary'
      const Icon = courseStatusObj[status]?.icon || BookOpen
      
      return (
        <Fragment key={`status-${row.id}`}>
          <Avatar color={color} icon={<Icon size={15} />} id={`av-tooltip-${row.id}`} />
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>وضعیت: {status === 'Active' ? 'فعال' : status === 'Expired' ? 'منقضی' : 'غیرفعال'}</span>
          </UncontrolledTooltip>
        </Fragment>
      )
    }
  },
 
  {
    name: 'عملیات',
    minWidth: '110px',
    cell: row => {
       let status = 'Inactive'
       let activing = true
      if (row.active) {
        status = 'Active'
        activing = false
      } else{
        status = 'Inactive'
        activing = true
      }
      
      return(
      <div className='column-action d-flex align-items-center'>
       
           <Link to={`/news/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
            مشاهده دوره
          </UncontrolledTooltip>
       
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          
          <DropdownMenu end>
          


            <DropdownItem tag='a' href='/' className='w-100' 
            onClick={e => {
                e.preventDefault()
                store.dispatch(activeCourse({ Id: row.id, activing }))
              }}
              >

              <Delete size={14} className='me-50' />
              <span className='align-middle'>{status === 'Active' ? 'غیر فعال کردن' :'فعال کردن'}</span>
            </DropdownItem>
            
          </DropdownMenu>
          
        </UncontrolledDropdown>
        
      </div>
     )
   }
  }
]