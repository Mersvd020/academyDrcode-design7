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
import Select from "react-select";
import { Users, TrendingUp } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Redux
import { useDispatch } from "react-redux";
import { updateCourse } from "./store";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
  finished: "light-info",
  Started: "light-success",
};

const courseLevelOptions = [
  { value: 1, label: "مقدماتی" },
  { value: 2, label: "متوسط" },
  { value: 3, label: "پیشرفته" },
];

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedCourse }) => {
  // ** State
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ** Hooks
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
      capacity: "",
      sessionNumber: "",
      courseLvlId: 1,
      teacherId: "",
      cost: "",
      uniqeUrlString: "",
      startTime: "",
      endTime: "",
      googleSchema: "",
      googleTitle: "",
      shortLink: "",
    },
  });

  useEffect(() => {
    if (show && selectedCourse) {
      reset({
        title: selectedCourse?.title || "",
        describe: selectedCourse?.describe || "",
        miniDescribe: selectedCourse?.miniDescribe || "",
        capacity: selectedCourse?.capacity || "",
        sessionNumber: selectedCourse?.sessionNumber || "",
        courseLvlId: selectedCourse?.courseLvlId || 1,
        teacherId: selectedCourse?.teacherId || "",
        cost: selectedCourse?.cost || "",
        uniqeUrlString: selectedCourse?.uniqeUrlString || "",
        startTime: formatDateForInput(selectedCourse?.startTime) || "",
        endTime: formatDateForInput(selectedCourse?.endTime) || "",
        googleSchema: selectedCourse?.googleSchema || "",
        googleTitle: selectedCourse?.googleTitle || "",
        shortLink: selectedCourse?.shortLink || "",
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [show, selectedCourse, reset]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
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
    if (selectedCourse?.imageAddress) {
      return (
        <img
          height="110"
          width="110"
          alt="course-avatar"
          src={selectedCourse.imageAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedCourse?.title || "Course"}
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
      const courseId = selectedCourse?.courseId;

      const courseData = {
        Id: courseId,
        Title: data.title || selectedCourse?.title,
        Describe: data.describe || selectedCourse?.describe || "",
        MiniDescribe: data.miniDescribe || selectedCourse?.miniDescribe || "",
        Capacity: data.capacity
          ? parseInt(data.capacity)
          : selectedCourse?.capacity || 0,
        CourseTypeId: selectedCourse?.courseTypeId || 1,
        SessionNumber:
          data.sessionNumber || selectedCourse?.sessionNumber || "",
        CurrentCoursePaymentNumber:
          selectedCourse?.currentCoursePaymentNumber || 0,
        TremId: selectedCourse?.tremId || 1,
        ClassId: selectedCourse?.classId || 1,
        CourseLvlId:
          parseInt(data.courseLvlId) || selectedCourse?.courseLvlId || 1,
        TeacherId: data.teacherId || selectedCourse?.teacherId || "1",
        Cost: data.cost ? parseFloat(data.cost) : selectedCourse?.cost || 0,
        UniqeUrlString:
          data.uniqeUrlString || selectedCourse?.uniqeUrlString || "",
        StartTime: data.startTime
          ? data.startTime.includes("T")
            ? data.startTime
            : `${data.startTime}T00:00:00`
          : selectedCourse?.startTime,
        EndTime: data.endTime
          ? data.endTime.includes("T")
            ? data.endTime
            : `${data.endTime}T00:00:00`
          : selectedCourse?.endTime,
        GoogleSchema: data.googleSchema || selectedCourse?.googleSchema || "",
        GoogleTitle: data.googleTitle || selectedCourse?.googleTitle || "",
        ShortLink: data.shortLink || selectedCourse?.shortLink || "",
        TumbImageAddress: selectedCourse?.tumbImageAddress || "",
        ImageAddress: selectedCourse?.imageAddress || "",
      };

      if (selectedCourse?.coursePrerequisiteId) {
        courseData.CoursePrerequisiteId = selectedCourse.coursePrerequisiteId;
      }

      if (imageFile) {
        courseData.Image = imageFile;
      }

      const result = await dispatch(updateCourse(courseData));

      console.log("Response:", result);

      if (result.meta.requestStatus === "fulfilled") {
        MySwal.fire({
          icon: "success",
          title: "موفق",
          text: "دوره با موفقیت بروزرسانی شد",
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
            "خطا در بروزرسانی دوره"
        );
      }
    } catch (error) {
      console.error("error:", error);
      MySwal.fire({
        icon: "error",
        title: "خطا",
        text: error.message || "خطا در بروزرسانی دوره",
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
    }
  };

  const handleReset = () => {
    reset({
      title: selectedCourse?.title || "",
      describe: selectedCourse?.describe || "",
      miniDescribe: selectedCourse?.miniDescribe || "",
      capacity: selectedCourse?.capacity || "",
      sessionNumber: selectedCourse?.sessionNumber || "",
      courseLvlId: selectedCourse?.courseLvlId || 1,
      teacherId: selectedCourse?.teacherId || "",
      cost: selectedCourse?.cost || "",
      uniqeUrlString: selectedCourse?.uniqeUrlString || "",
      startTime: formatDateForInput(selectedCourse?.startTime) || "",
      endTime: formatDateForInput(selectedCourse?.endTime) || "",
      googleSchema: selectedCourse?.googleSchema || "",
      googleTitle: selectedCourse?.googleTitle || "",
      shortLink: selectedCourse?.shortLink || "",
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
                  <h4>{selectedCourse?.title || "عنوان دوره"}</h4>
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
                <h4 className="mb-0">
                  {selectedCourse?.reserveUserTotal || 0}
                </h4>
                <small>تعداد رزرو</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-warning" className="rounded p-75">
                <Users className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  {selectedCourse?.courseGroupTotal || 0}
                </h4>
                <small>تعداد گروه</small>
              </div>
            </div>
          </div>

          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {selectedCourse !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام استاد:</span>
                  <span>{selectedCourse.teacherName || "N/A"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام دوره:</span>
                  <span>{selectedCourse.title || "N/A"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت دوره:</span>
                  <Badge
                    className="text-capitalize"
                    color={
                      statusColors[selectedCourse.courseStatusName] ||
                      "light-secondary"
                    }
                  >
                    {selectedCourse.courseStatusName || "N/A"}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">سطح دوره:</span>
                  <span>
                    {courseLevelOptions.find(
                      (o) => o.value === selectedCourse.courseLvlId
                    )?.label || selectedCourse.courseLvlId}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نوع دوره:</span>
                  <span>{selectedCourse.googleTitle || "N/A"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تکنولوژی دوره:</span>
                  <span>{selectedCourse.miniDescribe || "N/A"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">قیمت:</span>
                  <span>
                    {selectedCourse.cost
                      ? `${selectedCourse.cost.toLocaleString()} تومان`
                      : "N/A"}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ظرفیت:</span>
                  <span>{selectedCourse.capacity || "N/A"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شروع دوره:</span>
                  <span>{formatDate(selectedCourse.startTime)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">پایان دوره:</span>
                  <span>{formatDate(selectedCourse.endTime)}</span>
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
            <h1 className="mb-1">ویرایش اطلاعات دوره</h1>
            <p>بروزرسانی اطلاعات دوره</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="title">
                  عنوان دوره *
                </Label>
                <Controller
                  control={control}
                  id="title"
                  name="title"
                  rules={{ required: "عنوان دوره الزامی است" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="title"
                      placeholder="عنوان دوره را وارد کنید"
                      invalid={errors.title && true}
                    />
                  )}
                />
                {errors.title && (
                  <small className="text-danger">{errors.title.message}</small>
                )}
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="googleTitle">
                  نوع دوره
                </Label>
                <Controller
                  control={control}
                  id="googleTitle"
                  name="googleTitle"
                  render={({ field }) => (
                    <Input {...field} id="googleTitle" placeholder="نوع دوره" />
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
                      placeholder="توضیحات کامل دوره را وارد کنید"
                    />
                  )}
                />
              </Col>

              <Col xs={12}>
                <Label className="form-label" for="miniDescribe">
                  توضیحات کوتاه (تکنولوژی)
                </Label>
                <Controller
                  control={control}
                  id="miniDescribe"
                  name="miniDescribe"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="miniDescribe"
                      placeholder="توضیحات کوتاه یا تکنولوژی دوره"
                    />
                  )}
                />
              </Col>

              <Col md={4} xs={12}>
                <Label className="form-label" for="cost">
                  قیمت (تومان) *
                </Label>
                <Controller
                  control={control}
                  id="cost"
                  name="cost"
                  rules={{ required: "قیمت الزامی است" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      id="cost"
                      placeholder="قیمت دوره"
                      invalid={errors.cost && true}
                    />
                  )}
                />
                {errors.cost && (
                  <small className="text-danger">{errors.cost.message}</small>
                )}
              </Col>

              <Col md={4} xs={12}>
                <Label className="form-label" for="capacity">
                  ظرفیت
                </Label>
                <Controller
                  control={control}
                  id="capacity"
                  name="capacity"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      id="capacity"
                      placeholder="ظرفیت دوره"
                    />
                  )}
                />
              </Col>

              <Col md={4} xs={12}>
                <Label className="form-label" for="sessionNumber">
                  تعداد جلسات
                </Label>
                <Controller
                  control={control}
                  id="sessionNumber"
                  name="sessionNumber"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="sessionNumber"
                      placeholder="تعداد جلسات"
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="courseLvlId">
                  سطح دوره *
                </Label>
                <Controller
                  control={control}
                  id="courseLvlId"
                  name="courseLvlId"
                  rules={{ required: "سطح دوره الزامی است" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="courseLvlId"
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                      options={courseLevelOptions}
                      theme={selectThemeColors}
                      value={courseLevelOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(val) => field.onChange(val.value)}
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="teacherId">
                  شناسه استاد *
                </Label>
                <Controller
                  control={control}
                  id="teacherId"
                  name="teacherId"
                  rules={{ required: "شناسه استاد الزامی است" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      id="teacherId"
                      placeholder="شناسه استاد"
                      invalid={errors.teacherId && true}
                    />
                  )}
                />
                {errors.teacherId && (
                  <small className="text-danger">
                    {errors.teacherId.message}
                  </small>
                )}
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="startTime">
                  تاریخ شروع *
                </Label>
                <Controller
                  control={control}
                  id="startTime"
                  name="startTime"
                  rules={{ required: "تاریخ شروع الزامی است" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      id="startTime"
                      invalid={errors.startTime && true}
                    />
                  )}
                />
                {errors.startTime && (
                  <small className="text-danger">
                    {errors.startTime.message}
                  </small>
                )}
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="endTime">
                  تاریخ پایان *
                </Label>
                <Controller
                  control={control}
                  id="endTime"
                  name="endTime"
                  rules={{ required: "تاریخ پایان الزامی است" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      id="endTime"
                      invalid={errors.endTime && true}
                    />
                  )}
                />
                {errors.endTime && (
                  <small className="text-danger">
                    {errors.endTime.message}
                  </small>
                )}
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="uniqeUrlString">
                  لینک یونیک
                </Label>
                <Controller
                  control={control}
                  id="uniqeUrlString"
                  name="uniqeUrlString"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="uniqeUrlString"
                      placeholder="لینک یونیک دوره"
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="shortLink">
                  لینک کوتاه
                </Label>
                <Controller
                  control={control}
                  id="shortLink"
                  name="shortLink"
                  render={({ field }) => (
                    <Input {...field} id="shortLink" placeholder="لینک کوتاه" />
                  )}
                />
              </Col>

              <Col xs={12}>
                <Label className="form-label" for="googleSchema">
                  Google Schema
                </Label>
                <Controller
                  control={control}
                  id="googleSchema"
                  name="googleSchema"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea"
                      rows="2"
                      id="googleSchema"
                      placeholder="Google Schema"
                    />
                  )}
                />
              </Col>

              <Col xs={12}>
                <Label className="form-label" for="image">
                  تصویر دوره
                </Label>
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {(imagePreview || selectedCourse?.imageAddress) && (
                  <div className="mt-1">
                    <img
                      src={imagePreview || selectedCourse?.imageAddress}
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
