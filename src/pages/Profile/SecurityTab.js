import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Form,
  Label,
  Input,
  Button,
  Spinner,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'
import { getSecurityInfo, changePassword, editSecurity, clearSuccess, clearError } from './store'
import toast from 'react-hot-toast'

const SecurityTab = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.profile)

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: ''
  })

  const [security, setSecurity] = useState({
    twoStepAuth: false,
    recoveryEmail: '',
    baseUrl: ''
  })

  useEffect(() => {
    dispatch(getSecurityInfo())
  }, [dispatch])

  useEffect(() => {
    if (store.securityInfo) {
      setSecurity({
        twoStepAuth: store.securityInfo.twoStepAuth || false,
        recoveryEmail: store.securityInfo.recoveryEmail || '',
        baseUrl: window.location.origin
      })
    }
  }, [store.securityInfo])

  useEffect(() => {
    if (store.success) {
      toast.success('تغییرات با موفقیت اعمال شد')
      dispatch(clearSuccess())
      setPasswords({ oldPassword: '', newPassword: '' })
    }
  }, [store.success, dispatch])

  useEffect(() => {
    if (store.error) {
      toast.error(store.error?.message || 'خطا در انجام عملیات')
      dispatch(clearError())
    }
  }, [store.error, dispatch])


  const handlePasswordChange = (e) => {
    e.preventDefault()

    if (!passwords.oldPassword || !passwords.newPassword) {
      toast.error('لطفاً تمام فیلدها را پر کنید')
      return
    }

    if (passwords.newPassword.length < 6) {
      toast.error('رمز عبور جدید باید حداقل 6 کاراکتر باشد')
      return
    }

    dispatch(changePassword(passwords))
  }


  const handleSecurityUpdate = (e) => {
    e.preventDefault()
    dispatch(editSecurity(security))
  }

  return (
    <Row>
      <Col md='12' className='mb-3'>
        <Card>
          <CardBody>
            <CardTitle tag='h4'>تغییر رمز عبور</CardTitle>
            <Form onSubmit={handlePasswordChange}>
              <Row>
                <Col md='6' className='mb-1'>
                  <Label for='oldPassword'>رمز عبور فعلی *</Label>
                  <Input
                    id='oldPassword'
                    name='oldPassword'
                    type='password'
                    value={passwords.oldPassword}
                    onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
                    required
                  />
                </Col>
                <Col md='6' className='mb-1'>
                  <Label for='newPassword'>رمز عبور جدید *</Label>
                  <Input
                    id='newPassword'
                    name='newPassword'
                    type='password'
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                    required
                  />
                </Col>
                <Col className='mt-2'>
                  <Button color='primary' type='submit' disabled={store.loading}>
                    {store.loading ? (
                      <>
                        <Spinner size='sm' className='me-50' />
                        در حال تغییر...
                      </>
                    ) : (
                      'تغییر رمز عبور'
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>

      <Col md='12'>
        <Card>
          <CardBody>
            <CardTitle tag='h4'>تنظیمات امنیتی</CardTitle>
            <Form onSubmit={handleSecurityUpdate}>
              <Row>
                <Col md='6' className='mb-1'>
                  <Label for='recoveryEmail'>ایمیل بازیابی</Label>
                  <Input
                    id='recoveryEmail'
                    name='recoveryEmail'
                    type='email'
                    value={security.recoveryEmail}
                    onChange={(e) => setSecurity({...security, recoveryEmail: e.target.value})}
                  />
                </Col>
                <Col md='6' className='mb-1'>
                  <div className='form-check form-switch mt-4'>
                    <Input
                      type='switch'
                      id='twoStepAuth'
                      checked={security.twoStepAuth}
                      onChange={(e) => setSecurity({...security, twoStepAuth: e.target.checked})}
                    />
                    <Label className='form-check-label' for='twoStepAuth'>
                      احراز هویت دو مرحله‌ای
                    </Label>
                  </div>
                </Col>
                <Col className='mt-2'>
                  <Button color='primary' type='submit' disabled={store.loading}>
                    {store.loading ? (
                      <>
                        <Spinner size='sm' className='me-50' />
                        در حال ذخیره...
                      </>
                    ) : (
                      'ذخیره تنظیمات'
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default SecurityTab