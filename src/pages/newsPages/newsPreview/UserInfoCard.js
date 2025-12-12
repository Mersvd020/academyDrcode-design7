// ** React Imports
import { useState, Fragment, useEffect } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import { TrendingUp, Users } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Redux
import { useDispatch } from "react-redux";
import { updateNews } from "./store";

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
  finished: "light-info",
  Started: "light-success",
};

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ SelectedNews, commentN }) => {

  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  const dispatch = useDispatch();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      describe: "",
      miniDescribe: "",
      googleTitle: "",
      googleDescribe: "",
      keyword: "",
      slideNumber: "",
      newsCatregoryId: "",
      active: true,
      isSlider: false,
    },
  });

  useEffect(() => {
    if (show && SelectedNews) {
      reset({
        title: SelectedNews?.title || "",
        describe: SelectedNews?.describe || "",
        miniDescribe: SelectedNews?.miniDescribe || "",
        googleTitle: SelectedNews?.googleTitle || "",
        googleDescribe: SelectedNews?.googleDescribe || "",
        keyword: SelectedNews?.keyword || "",
        slideNumber: SelectedNews?.slideNumber || "",
        newsCatregoryId: SelectedNews?.newsCatregoryId || "",
        active: SelectedNews?.active !== undefined ? SelectedNews.active : true,
        isSlider: SelectedNews?.isSlider || false,
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [show, SelectedNews, reset]);

  const formatDate = (dateString) => {
    if (!dateString) return "....";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderUserImg = () => {
    if (SelectedNews?.currentImageAddress) {
      return (
        <img
          height="110"
          width="110"
          alt="news-avatar"
          src={SelectedNews?.currentImageAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={SelectedNews?.title || "خبر"}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      // console.log('Form Data:', data)
      // console.log('SelectedNews:', SelectedNews)

      const newsData = {
        Id: SelectedNews?.id,
        SlideNumber:
          parseInt(data.slideNumber) || SelectedNews?.slideNumber || 0,
        CurrentImageAddress: SelectedNews?.currentImageAddress || "",
        CurrentImageAddressTumb: SelectedNews?.currentImageAddressTumb || "",
        Active: data.active,
        Title: data.title,
        GoogleTitle: data.googleTitle || "",
        GoogleDescribe: data.googleDescribe || "",
        MiniDescribe: data.miniDescribe || "",
        Describe: data.describe || "",
        Keyword: data.keyword || "",
        IsSlider: data.isSlider,
        NewsCatregoryId:
          parseInt(data.newsCatregoryId) || SelectedNews?.newsCatregoryId || 1,
        Image: imageFile || null,
      };

      // if (imageFile) {
      //   newsData.Image = imageFile
      // }

      // console.log('sendingData:', newsData)

      const result = await dispatch(updateNews(newsData));

      // console.log('response:', result)

      if (result.meta.requestStatus === "fulfilled") {
        MySwal.fire({
          icon: "success",
          title: "موفق",
          text: "اخبار با موفقیت بروزرسانی شد",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        setShow(false);
        setImageFile(null);
        setImagePreview(null);
      } else if (result.meta.requestStatus === "rejected") {
        console.error("api error:", result.error);
        console.error("error details:", result.payload);
        throw new Error(
          result.payload?.message ||
            result.error?.message ||
            "خطا در بروزرسانی اخبار"
        );
      }
    } catch (error) {
      console.error("error:", error);
      MySwal.fire({
        icon: "error",
        title: "خطا",
        text: error.message || "خطا در بروزرسانی اخبار",
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
    }
  };

  const handleReset = () => {
    reset({
      title: SelectedNews?.title || "",
      describe: SelectedNews?.describe || "",
      miniDescribe: SelectedNews?.miniDescribe || "",
      googleTitle: SelectedNews?.googleTitle || "",
      googleDescribe: SelectedNews?.googleDescribe || "",
      keyword: SelectedNews?.keyword || "",
      slideNumber: SelectedNews?.slideNumber || "",
      newsCatregoryId: SelectedNews?.newsCatregoryId || "",
      active: SelectedNews?.active !== undefined ? SelectedNews.active : true,
      isSlider: SelectedNews?.isSlider || false,
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{SelectedNews?.title || "عنوان اخبار"}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-success" className="rounded p-75">
                <TrendingUp className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{SelectedNews?.commentsCount || 0}</h4>
                <small>تعداد کامنت ها</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-warning" className="rounded p-75">
                <Users className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{SelectedNews?.currentView || 0}</h4>
                <small>تعداد بیننده</small>
              </div>
            </div>
          </div>

          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {SelectedNews !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام نویسنده:</span>
                  <span>{SelectedNews.addUserFullName || "...."}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">عنوان اخبار:</span>
                  <span>{SelectedNews.title || "...."}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت اخبار:</span>
                  <Badge
                    className="text-capitalize"
                    color={
                      statusColors[SelectedNews.courseStatusName] ||
                      "light-secondary"
                    }
                  >
                    {SelectedNews.active ? "فعال" : "غیر فعال"}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">توضیحات اخبار:</span>
                  <span>{SelectedNews.describe || "...."}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">عنوان گوگل اخبار:</span>
                  <span>{SelectedNews.googleTitle || "...."}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">توضیح کوتاه:</span>
                  <span>{SelectedNews.miniDescribe || "...."}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">اسلایدر:</span>
                  <Badge
                    color={
                      SelectedNews.isSlider
                        ? "light-success"
                        : "light-secondary"
                    }
                  >
                    {SelectedNews.isSlider ? "بله" : "خیر"}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شماره اسلاید:</span>
                  <span>{SelectedNews.slideNumber || "...."}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تاریخ نشر:</span>
                  <span>{formatDate(SelectedNews.insertDate)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">آخرین ابدیت:</span>
                  <span>{formatDate(SelectedNews.updateDate)}</span>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">ویرایش اطلاعات اخبار</h1>
            <p>بروزرسانی اطلاعات اخبار</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="title">
                  عنوان اخبار *
                </Label>
                <Controller
                  control={control}
                  id="title"
                  name="title"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="title"
                      placeholder="عنوان اخبار را وارد کنید"
                      invalid={errors.title && true}
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="googleTitle">
                  عنوان گوگل
                </Label>
                <Controller
                  control={control}
                  id="googleTitle"
                  name="googleTitle"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="googleTitle"
                      placeholder="عنوان گوگل"
                      invalid={errors.googleTitle && true}
                    />
                  )}
                />
              </Col>

              <Col xs={12}>
                <Label className="form-label" for="describe">
                  توضیحات کامل
                </Label>
                <Controller
                  control={control}
                  id="describe"
                  name="describe"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      id="describe"
                      rows="3"
                      placeholder="توضیحات کامل اخبار را وارد کنید"
                      invalid={errors.describe && true}
                    />
                  )}
                />
              </Col>

              <Col xs={12}>
                <Label className="form-label" for="miniDescribe">
                  توضیحات کوتاه
                </Label>
                <Controller
                  control={control}
                  id="miniDescribe"
                  name="miniDescribe"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="miniDescribe"
                      placeholder="توضیحات کوتاه اخبار"
                      invalid={errors.miniDescribe && true}
                    />
                  )}
                />
              </Col>

              <Col xs={12}>
                <Label className="form-label" for="googleDescribe">
                  توضیحات گوگل
                </Label>
                <Controller
                  control={control}
                  id="googleDescribe"
                  name="googleDescribe"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      rows="2"
                      id="googleDescribe"
                      placeholder="توضیحات گوگل"
                      invalid={errors.googleDescribe && true}
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="keyword">
                  کلمات کلیدی
                </Label>
                <Controller
                  control={control}
                  id="keyword"
                  name="keyword"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="keyword"
                      placeholder="کلمات کلیدی را با کاما جدا کنید"
                      invalid={errors.keyword && true}
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="newsCatregoryId">
                  شناسه دسته بندی *
                </Label>
                <Controller
                  control={control}
                  id="newsCatregoryId"
                  name="newsCatregoryId"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      id="newsCatregoryId"
                      placeholder="شناسه دسته بندی"
                      invalid={errors.newsCatregoryId && true}
                    />
                  )}
                />
              </Col>

              <Col md={4} xs={12}>
                <Label className="form-label" for="slideNumber">
                  شماره اسلاید
                </Label>
                <Controller
                  control={control}
                  id="slideNumber"
                  name="slideNumber"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      id="slideNumber"
                      placeholder="شماره اسلاید"
                      invalid={errors.slideNumber && true}
                    />
                  )}
                />
              </Col>

              <Col md={4} xs={12}>
                <Label className="form-label" for="active">
                  وضعیت
                </Label>
                <Controller
                  control={control}
                  id="active"
                  name="active"
                  render={({ field }) => (
                    <div className="form-check form-switch mt-1">
                      <Input
                        type="switch"
                        id="active"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <Label className="form-check-label" for="active">
                        {field.value ? "فعال" : "غیرفعال"}
                      </Label>
                    </div>
                  )}
                />
              </Col>

              <Col md={4} xs={12}>
                <Label className="form-label" for="isSlider">
                  نمایش در اسلایدر
                </Label>
                <Controller
                  control={control}
                  id="isSlider"
                  name="isSlider"
                  render={({ field }) => (
                    <div className="form-check form-switch mt-1">
                      <Input
                        type="switch"
                        id="isSlider"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <Label className="form-check-label" for="isSlider">
                        {field.value ? "بله" : "خیر"}
                      </Label>
                    </div>
                  )}
                />
              </Col>

              <Col xs={12}>
                <Label className="form-label" for="image">
                  تصویر اخبار
                </Label>
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {(imagePreview || SelectedNews?.currentImageAddress) && (
                  <div className="mt-1">
                    <img
                      src={imagePreview || SelectedNews?.currentImageAddress}
                      alt="preview"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                      className="rounded"
                    />
                  </div>
                )}
              </Col>

              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ذخیره تغییرات
                </Button>

                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  انصراف
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
