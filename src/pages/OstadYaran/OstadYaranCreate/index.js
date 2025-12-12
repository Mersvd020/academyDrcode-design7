// ** React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
} from "reactstrap";

import {
  getAssistanceWork,
  createAssistanceWork,
  clearSuccess,
  clearError,
} from "../store";
import { useDispatch, useSelector } from "react-redux";

import { ArrowLeft } from "react-feather";
import toast from "react-hot-toast";

const OstadYaranCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.assistanceWork);

  const [formData, setFormData] = useState({
    worktitle: "",
    workDescribe: "",
    workDate: new Date().toISOString().split("T")[0],
    assistanceId: "",
  });
  const [uniqueAssistants, setUniqueAssistants] = useState([]);

  useEffect(() => {
    dispatch(getAssistanceWork());
  }, [dispatch]);

  useEffect(() => {
    if (store.data && store.data.length > 0) {
      const assistants = store.data.reduce((acc, item) => {
        if (item.assistanceId && item.assistance?.user) {
          const existing = acc.find((a) => a.id === item.assistanceId);
          if (!existing) {
            acc.push({
              id: item.assistanceId,
              name: `${item.assistance.user.fName} ${item.assistance.user.lName}`,
            });
          }
        }
        return acc;
      }, []);
      setUniqueAssistants(assistants);
    }
  }, [store.data]);

  useEffect(() => {
    if (store.success) {
      toast.success("کار با موفقیت ایجاد شد");
      dispatch(clearSuccess());
      navigate("/ostad-yaran");
    }
  }, [store.success, navigate, dispatch]);

  useEffect(() => {
    if (store.error) {
      toast.error(store.error);
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

    if (!formData.worktitle.trim()) {
      toast.error("عنوان کار الزامی است");
      return;
    }

    if (!formData.assistanceId.trim()) {
      toast.error("شناسه استادیار الزامی است");
      return;
    }

    if (!formData.workDate) {
      toast.error("تاریخ الزامی است");
      return;
    }

    const dataToSend = {
      worktitle: formData.worktitle.trim(),
      workDescribe: formData.workDescribe.trim(),
      assistanceId: formData.assistanceId.trim(),
      workDate: new Date(formData.workDate).toISOString(),
    };

    console.log("Submitting data:", dataToSend);
    dispatch(createAssistanceWork(dataToSend));
  };

  const handleCancel = () => {
    navigate("/ostad-yaran");
  };

  const handleReset = () => {
    setFormData({
      worktitle: "",
      workDescribe: "",
      workDate: new Date().toISOString().split("T")[0],
      assistanceId: "",
    });
  };

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">افزودن کار جدید</CardTitle>
      </CardHeader>
      <CardBody className="pt-2">
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
                placeholder="مثال: حل نمونه سوالات"
                value={formData.worktitle}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="assistanceId">
                استادیار <span className="text-danger">*</span>
              </Label>
              {uniqueAssistants.length > 0 ? (
                <Input
                  type="select"
                  id="assistanceId"
                  name="assistanceId"
                  value={formData.assistanceId}
                  onChange={handleChange}
                  required
                >
                  <option value="">انتخاب استادیار</option>
                  {uniqueAssistants.map((assistant) => (
                    <option key={assistant.id} value={assistant.id}>
                      {assistant.name} ({assistant.id})
                    </option>
                  ))}
                </Input>
              ) : (
                <Input
                  type="text"
                  id="assistanceId"
                  name="assistanceId"
                  placeholder="شناسه استادیار را وارد کنید"
                  value={formData.assistanceId}
                  onChange={handleChange}
                  required
                />
              )}
              <small className="text-muted">
                {uniqueAssistants.length > 0
                  ? "یکی از استادیاران موجود را انتخاب کنید"
                  : "شناسه استادیار مورد نظر را وارد کنید"}
              </small>
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
                    در حال ایجاد...
                  </>
                ) : (
                  "ایجاد کار"
                )}
              </Button>
              <Button
                type="button"
                color="secondary"
                outline
                className="me-1"
                onClick={handleReset}
                disabled={store.loading}
              >
                پاک کردن فرم
              </Button>
              <Button
                type="button"
                color="secondary"
                outline
                onClick={handleCancel}
                disabled={store.loading}
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

export default OstadYaranCreate;
