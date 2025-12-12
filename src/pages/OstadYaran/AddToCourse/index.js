// ** React Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  Spinner,
  Row,
  Col,
  Alert,
} from "reactstrap";

import {
  getAssistanceWork,
  createCourseAssistance,
  clearSuccess,
  clearError,
} from "../store";
import { useDispatch, useSelector } from "react-redux";

import { ArrowLeft, BookOpen, User } from "react-feather";
import toast from "react-hot-toast";

const AddToCourse = () => {
  const { assistanceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.assistanceWork);

  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    assistanceName: "",
  });
  const [assistantInfo, setAssistantInfo] = useState(null);

  useEffect(() => {
    if (!store.data || store.data.length === 0) {
      dispatch(getAssistanceWork());
    }
  }, [dispatch]);

  useEffect(() => {
    if (store.data && store.data.length > 0 && assistanceId) {
      const work = store.data.find(
        (item) => item.assistanceId === assistanceId
      );
      if (work?.assistance?.user) {
        const fullName = `${work.assistance.user.fName} ${work.assistance.user.lName}`;
        setAssistantInfo({
          id: assistanceId,
          name: fullName,
        });
        setFormData((prev) => ({
          ...prev,
          assistanceName: fullName,
        }));
      }
    }
  }, [store.data, assistanceId]);

  useEffect(() => {
    if (store.success) {
      toast.success("استادیار با موفقیت به دوره اضافه شد");
      dispatch(clearSuccess());
      navigate("/ostad-yaran");
    }
  }, [store.success, navigate, dispatch]);

  useEffect(() => {
    if (store.error) {
      const errorMsg =
        typeof store.error === "string"
          ? store.error
          : store.error?.message || "خطا در افزودن به دوره";
      toast.error(errorMsg);
      dispatch(clearError());
    }
  }, [store.error, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseId.trim()) {
      toast.error("شناسه دوره الزامی است");
      return;
    }

    if (!formData.courseName.trim()) {
      toast.error("نام دوره الزامی است");
      return;
    }

    const dataToSend = {
      courseId: formData.courseId.trim(),
      courseName: formData.courseName.trim(),
      assistanceName: formData.assistanceName.trim(),
      userId: 10, // You might need to get this from auth context
      inserDate: new Date().toISOString(),
    };

    console.log("Submitting data:", dataToSend);
    dispatch(createCourseAssistance(dataToSend));
  };

  const handleCancel = () => {
    navigate("/ostad-yaran");
  };

  const handleReset = () => {
    setFormData({
      courseId: "",
      courseName: "",
      assistanceName: assistantInfo?.name || "",
    });
  };

  if (!assistantInfo && store.data.length > 0) {
    return (
      <Card>
        <CardBody className="text-center p-5">
          <Alert color="warning">استادیار مورد نظر یافت نشد</Alert>
          <Button color="primary" onClick={() => navigate("/ostad-yaran")}>
            بازگشت به لیست
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">افزودن استادیار به دوره</CardTitle>
      </CardHeader>
      <CardBody className="pt-2">
        {assistantInfo && (
          <Alert color="info" className="mb-3">
            <div className="alert-body">
              <User size={16} className="me-50" />
              <strong>استادیار:</strong> {assistantInfo.name}
            </div>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="courseId">
                شناسه دوره <span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                id="courseId"
                name="courseId"
                placeholder="مثال: t5"
                value={formData.courseId}
                onChange={handleChange}
                required
              />
              <small className="text-muted">شناسه دوره را وارد کنید</small>
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="courseName">
                نام دوره <span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                id="courseName"
                name="courseName"
                placeholder="مثال: vue js"
                value={formData.courseName}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md="12" className="mb-1">
              <Label className="form-label" for="assistanceName">
                نام استادیار
              </Label>
              <Input
                type="text"
                id="assistanceName"
                name="assistanceName"
                value={formData.assistanceName}
                onChange={handleChange}
                disabled
              />
              <small className="text-muted">
                نام استادیار به صورت خودکار تکمیل شده است
              </small>
            </Col>

            <Col className="mt-2">
              <Button
                type="submit"
                color="primary"
                className="me-1"
                disabled={store.assistanceLoading}
              >
                {store.assistanceLoading ? (
                  <>
                    <Spinner size="sm" className="me-50" />
                    در حال افزودن...
                  </>
                ) : (
                  <>
                    <BookOpen size={14} className="me-50" />
                    افزودن به دوره
                  </>
                )}
              </Button>
              <Button
                type="button"
                color="secondary"
                outline
                className="me-1"
                onClick={handleReset}
                disabled={store.assistanceLoading}
              >
                پاک کردن فرم
              </Button>
              <Button
                type="button"
                color="secondary"
                outline
                onClick={handleCancel}
                disabled={store.assistanceLoading}
              >
                <ArrowLeft size={14} className="me-50" />
                بازگشت
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddToCourse;
