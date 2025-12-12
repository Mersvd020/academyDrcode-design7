import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Button, Badge } from 'reactstrap'
import Select from 'react-select'
import axios from 'axios'
import { selectThemeColors } from '@utils'


import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserRolesManager = ({ userId, roles }) => {
  const [loading, setLoading] = useState(false)
  const [userRoles, setUserRoles] = useState(roles ? roles.map(Number) : [])
  const [selectedRoleToAdd, setSelectedRoleToAdd] = useState(null)

  useEffect(() => {
  
    setUserRoles(roles ? roles.map(Number) : [])
  }, [roles])

  const roleToastColors = {
    1: 'error',      
    2: 'info',      
    3: 'success',    
    4: 'warning'     
  }

  const availableRolesOptions = [
    { value: 1, label: 'ادمین' },
    { value: 2, label: 'استاد' },
    { value: 3, label: 'دانشجو' },
    { value: 4, label: 'سوپر ادمین' }
  ]

  const addRole = async (roleId) => {
    try {
      setLoading(true)

      const numericRoleId = Number(roleId)
      const numericUserId = Number(userId)

    
      if (userRoles.includes(numericRoleId)) {
        const roleName = availableRolesOptions.find(opt => opt.value === numericRoleId)?.label;
        toast.info(`کاربر در حال حاضر نقش "${roleName}" را دارد.`, {
          theme: 'colored',
          type: 'info'
        });
        setLoading(false); 
        return; 
      }


      const response = await axios.post(
        `https://sepehracademy.liara.run/User/AddUserAccess?Enable=true`,
        { roleId: numericRoleId, userId: numericUserId }
      )

   
      toast.success('نقش با موفقیت اضافه شد', {
        theme: 'colored',
        type: roleToastColors[numericRoleId]
      })

      setUserRoles(prev => [...prev, numericRoleId])
      setSelectedRoleToAdd(null)

    } catch (err) {
      toast.error(
        err?.response?.data?.message || '  شما به نقش دست رسی ندارید',
        { theme: 'colored' }
      )
    } finally {
      setLoading(false)
    }
  }

  const currentUserRolesDisplay = availableRolesOptions.filter(role =>
    userRoles.includes(role.value)
  )

  const isAddButtonDisabled =
    !selectedRoleToAdd || 
    userRoles.includes(selectedRoleToAdd.value) || 
    loading 

  return (
    <Card className='mt-2'>
      <CardHeader tag='h4'>مدیریت نقش‌ها</CardHeader>

      <CardBody>
        <div className='d-flex align-items-center mb-3'>
          <div style={{ flexGrow: 1, marginRight: '10px' }}>
            <Select
              id='role-select-to-add'
              isClearable={true}
              className='react-select'
              classNamePrefix='select'
              options={availableRolesOptions}
              theme={selectThemeColors}
              value={selectedRoleToAdd}
              onChange={selectedOption => setSelectedRoleToAdd(selectedOption)}
              placeholder='یک نقش انتخاب کنید...'
              isDisabled={loading}
              menuPortalTarget={document.body}
              menuPosition='fixed'
            />
          </div>

          <Button
            color='primary'
            onClick={() => addRole(selectedRoleToAdd.value)}
            disabled={isAddButtonDisabled}
          >
            افزودن نقش
          </Button>
        </div>

        <h5 className='mt-2 mb-1'>نقش‌های فعلی کاربر:</h5>

        {currentUserRolesDisplay.length > 0 && (
          <div>
            {currentUserRolesDisplay.map(role => (
              <Badge key={role.value} color='light-success' className='me-1 mb-1'>
                {role.label} (فعال)
              </Badge>
            ))}
          </div>
        )}

      </CardBody>
    </Card>
  )
}

export default UserRolesManager