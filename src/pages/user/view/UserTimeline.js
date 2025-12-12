// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'

// ** Images
import pdf from '@src/assets/images/icons/file-icons/pdf.png'
import ceo from '@src/assets/images/portrait/small/avatar-s-7.jpg'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Timeline Data (FARSI)
const data = [
  {
    title: 'ورود کاربر',
    content: 'ورود کاربر در ساعت ۲:۱۲ بعد از ظهر',
    meta: '۱۲ دقیقه پیش'
  },
  {
    title: 'جلسه با استاد',
    content: 'جلسه پروژه React   ۱۰:۱۵ صبح',
    meta: '۴۵ دقیقه پیش',
    color: 'warning',
    customContent: (
      <div className='d-flex align-items-center mb-50'>
        <Avatar img={ceo} imgHeight={38} imgWidth={38} />
        <div className='ms-50'>
          <h6 className='mb-0'>لئونا واتکینز (مشتری)</h6>
          <span>مدیرعامل Pixinvent</span>
        </div>
      </div>
    )
  },
  {
    title: 'ایجاد پروژه جدید React برای مشتری',
    content: 'افزودن فایل‌ها به پوشه طراحی جدید',
    meta: '۲ روز پیش',
    color: 'info'
  },
  {
    title: 'ایجاد فاکتور برای مشتری',
    content: 'ساخت فاکتورهای جدید و ارسال به لئونا واتکینز',
    meta: '۱۲ دقیقه پیش',
    color: 'danger',
    customContent: (
      <div className='d-flex align-items-center'>
        <img className='me-1' src={pdf} alt='pdf' height='23' />
        <h6 className='mb-0'>invoice.pdf</h6>
      </div>
    )
  }
]

const UserTimeline = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>تاریخچه فعالیت کاربر</CardTitle>
      </CardHeader>
      <CardBody className='pt-1'>
        <Timeline data={data} className='ms-50' />
      </CardBody>
    </Card>
  )
}

export default UserTimeline