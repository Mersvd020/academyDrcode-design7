import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Spinner, Row, Col } from 'reactstrap'
import {
  addProfileImage,
  selectProfileImage,
  deleteProfileImage,
  clearSuccess,
  clearError
} from './store'
import toast from 'react-hot-toast'
import { Upload, Trash2, Check, Plus } from 'react-feather'

const BASE_URL = 'https://sepehracademy.liara.run'

const ProfilePicturesTab = () => {
  const dispatch = useDispatch()
  const { profileInfo, success, error } = useSelector(state => state.profile)
  const fileInputRef = useRef(null)

  const [uploading, setUploading] = useState(false)


  useEffect(() => {
    if (success) {
      toast.success('عملیات با موفقیت انجام شد')
      dispatch(clearSuccess())
      setUploading(false)
    }
  }, [success, dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
      setUploading(false)
    }
  }, [error, dispatch])

  const getImageUrl = (url) => {
    if (!url) return '/images/avatar-placeholder.png'
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://')
    }

    if (!url.startsWith('http')) {
      return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`
    }

    return url
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return


    const formData = new FormData()
    formData.append('formFile', file)

    setUploading(true)
    dispatch(addProfileImage(formData))
  }

  const handleSelectImage = (imageId) => {
    dispatch(selectProfileImage(imageId))
  }

  const handleDeleteImage = (imageId) => {
      dispatch(deleteProfileImage(imageId))
  }

  const images = profileInfo?.userImage || []
  const currentImageUrl = getImageUrl(profileInfo?.currentPictureAddress)

  return (
    <div>
      <Row>
        <Col lg='3' md='4' sm='6' className='mb-3'>
          <div
            onClick={() => fileInputRef.current?.click()}
            className='upload-card'
            style={{
              height: 250,
              border: '2px dashed #7367f0',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#f8f9fa'
            }}
          >
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />

            {uploading ? (
              <>
                <Spinner color='primary' />
                <p className='mt-1 text-muted'>در حال آپلود...</p>
              </>
            ) : (
              <>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: '#7367f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10
                  }}
                >
                  <Plus size={30} color='white' />
                </div>
                <h6 className='text-primary'>آپلود تصویر</h6>
              </>
            )}
          </div>
        </Col>
        {images.map(image => {
          const imageUrl = getImageUrl(image.puctureAddress)
          const isCurrent = imageUrl === currentImageUrl

          return (
            <Col key={image.id} lg='3' md='4' sm='6' className='mb-3'>
              <div
                style={{
                  position: 'relative',
                  height: 250,
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: isCurrent
                    ? '3px solid #28a745'
                    : '2px solid #ddd'
                }}
              >
                <img
                  src={imageUrl}
                  alt='Profile'
                  loading='lazy'
                  onError={(e) => {
                    e.currentTarget.src = '/images/avatar-placeholder.png'
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {isCurrent && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: '#28a745',
                      borderRadius: '50%',
                      padding: 8,
                      color: '#fff'
                    }}
                  >
                    <Check size={18} />
                  </div>
                )}

                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 10
                  }}
                >
                  {!isCurrent && (
                    <Button
                      color='success'
                      size='sm'
                      onClick={() => handleSelectImage(image.id)}
                    >
                      <Check size={14} className='me-50' />
                      انتخاب
                    </Button>
                  )}

                  <Button
                    color='danger'
                    size='sm'
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 size={14} className='me-50' />
                    حذف
                  </Button>
                </div>
              </div>
            </Col>
          )
        })}
        {images.length === 0 && (
          <Col lg='9'>
            <div
              style={{
                height: 250,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ddd',
                borderRadius: 12,
                backgroundColor: '#f8f9fa'
              }}
            >
              <div className='text-center'>
                <Upload size={48} className='text-muted mb-2' />
                <p className='text-muted mb-0'>هنوز تصویری آپلود نکرده‌اید</p>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default ProfilePicturesTab