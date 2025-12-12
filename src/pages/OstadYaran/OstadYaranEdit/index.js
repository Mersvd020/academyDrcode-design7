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
  Alert,
  Row,
  Col,
} from "reactstrap";

import { getAssistanceWork, updateAssistanceWork } from "../store";
import { useDispatch, useSelector } from "react-redux";

import { ArrowLeft } from "react-feather";
import toast from "react-hot-toast";

const OstadYaranEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.assistanceWork);

  const [formData, setFormData] = useState({
    worktitle: "",
    workDescribe: "",
    workDate: "",
    assistanceId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!store.data || store.data.length === 0) {
      dispatch(getAssistanceWork());
    }
  }, [dispatch]);

  useEffect(() => {
    if (store.data && store.data.length > 0) {
      const item = store.data.find((work) => work.id === id);
      if (item) {
        setFormData({
          worktitle: item.worktitle || "",
          workDescribe: item.workDescribe || "",
          workDate: item.workDate
            ? new Date(item.workDate).toISOString().split("T")[0]
            : "",
          assistanceId: item.assistanceId || "",
        });
        setLoading(false);
      } else {
        toast.error("کار مورد نظر یافت نشد");
        navigate("/ostad-yaran");
      }
    }
  }, [store.data, id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.worktitle.trim()) {
      toast.error("عنوان کار الزامی است");
      return;
    }

    try {
      const result = await dispatch(
        updateAssistanceWork({
          id,
          workData: {
            ...formData,
            workDate: new Date(formData.workDate).toISOString(),
          },
        })
      );

      if (result.type === "assistanceWork/updateAssistanceWork/fulfilled") {
        toast.success("کار با موفقیت بروزرسانی شد");
        navigate("/ostad-yaran");
      } else {
        toast.error("خطا در بروزرسانی کار");
      }
    } catch (error) {
      toast.error("خطا در بروزرسانی کار");
    }
  };

  const handleCancel = () => {
    navigate("/ostad-yaran");
  };

  if (loading || !store.data) {
    return (
      <Card>
        <CardBody className="text-center p-5">
          <Spinner color="primary" />
          <p className="mt-2">در حال بارگذاری...</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">ویرایش کار استادیار</CardTitle>
      </CardHeader>
      <CardBody className="pt-2">
        {store.error && (
          <Alert color="danger">
            <div className="alert-body">{store.error}</div>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="worktitle">
                عنوان کار <span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                id="worktitle"
                name="worktitle"
                placeholder="عنوان کار را وارد کنید"
                value={formData.worktitle}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="workDate">
                تاریخ <span className="text-danger">*</span>
              </Label>
              <Input
                type="date"
                id="workDate"
                name="workDate"
                value={formData.workDate}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="assistanceId">
                شناسه استادیار
              </Label>
              <Input
                type="text"
                id="assistanceId"
                name="assistanceId"
                placeholder="شناسه استادیار"
                value={formData.assistanceId}
                onChange={handleChange}
                disabled
              />
            </Col>

            <Col md="12" className="mb-1">
              <Label className="form-label" for="workDescribe">
                توضیحات
              </Label>
              <Input
                type="textarea"
                id="workDescribe"
                name="workDescribe"
                rows="4"
                placeholder="توضیحات کار را وارد کنید"
                value={formData.workDescribe}
                onChange={handleChange}
              />
            </Col>

            <Col className="mt-2">
              <Button
                type="submit"
                color="primary"
                className="me-1"
                disabled={store.loading}
              >
                {store.loading ? (
                  <>
                    <Spinner size="sm" className="me-50" />
                    در حال بروزرسانی...
                  </>
                ) : (
                  "بروزرسانی"
                )}
              </Button>
              <Button
                type="button"
                color="secondary"
                outline
                onClick={handleCancel}
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

export default OstadYaranEdit;
