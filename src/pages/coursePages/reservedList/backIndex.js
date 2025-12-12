// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card } from 'reactstrap'

// ** Store & Actions
import { getReservedData } from './store'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ handleFilter, value, handlePerPage, rowsPerPage }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center me-2'>
            <label htmlFor='rows-per-page'>نمایش</label>
            <Input
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              className='form-control ms-50 pe-3'
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
          </div>
          <Button tag={Link} to='/apps/invoice/add' color='primary'>
            افزودن دوره
          </Button>
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>جستجو</label>
            <Input
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='جستجوی دوره'
            />
          </div>
          <Input className='w-auto' type='select' value={statusValue} onChange={handleStatusValue}>
            <option value=''>انتخاب وضعیت</option>
            <option value='active'>فعال</option>
            <option value='inactive'>غیرفعال</option>
            <option value='expired'>منقضی شده</option>
          </Input>
        </Col>
      </Row>
    </div>
  )
}

const ReserveList = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.appCourseReserve)

  // ** States
   const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    dispatch(getReservedData())
  }, [dispatch])

  
  useEffect(() => {
    console.log('Store state:', store)
    console.log('Store.data:', store?.data)
    console.log('Store.allData:', store?.allData)
    console.log('Store.total:', store?.total)
  }, [store])

  const handleFilter = val => {
    setValue(val)
    setCurrentPage(1)
  }

  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
    setCurrentPage(1)
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  const dataToRender = () => {
   
    if (!store || !store.allData || !Array.isArray(store.allData)) {
      console.log('Store or allData is not available')
      return []
    }

    let filteredData = store.allData

    
    if (value) {
      filteredData = filteredData.filter(reserve => {
        const searchLower = value.toLowerCase()
        return (
          reserve.courseName?.toLowerCase().includes(searchLower) ||
          reserve.studentName?.toLowerCase().includes(searchLower) ||
          reserve.reserveId?.toLowerCase().includes(searchLower)
        )
      })
    }

    return filteredData
  }

  const CustomPagination = () => {
    const filteredData = dataToRender()
    const count = Math.ceil(filteredData.length / rowsPerPage)

    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const getPaginatedData = () => {
    const filteredData = dataToRender()
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    return filteredData.slice(startIndex, endIndex)
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='card-header'>
          <h4 className='card-title'>لیست رزروهای دوره</h4>
          <small className='text-muted'>
            تعداد کل: {store?.total || 0}
          </small>
        </div>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
            subHeader={true}
            columns={columns}
            responsive={true}
            data={getPaginatedData()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default ReserveList