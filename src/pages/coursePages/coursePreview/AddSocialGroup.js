// ** React Imports
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
} from "reactstrap";

// ** Third Party Components
import { ArrowLeft, Save } from "react-feather";
import axios from "axios";
import toast from "react-hot-toast";

const AddSocialGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;

  // ** States
  const [formData, setFormData] = useState({
    groupName: "",
    groupLink: "",
    courseId: courseId || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ** Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ** Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.groupName.trim()) {
      setError("نام گروه الزامی است");
      return;
    }
    if (!formData.groupLink.trim()) {
      setError("لینک گروه الزامی است");
      return;
    }
    if (!formData.courseId) {
      setError("شناسه دوره الزامی است");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      await axios.post(
        "https://sepehracademy.liara.run/CourseSocialGroup",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("گروه با موفقیت اضافه شد");
      navigate(`/course/preview/${formData.courseId}`);
    } catch (error) {
      console.log("Add error:", error);
      setError(
        error.response?.data?.message || "خطا در افزودن گروه اجتماعی"
      );
      toast.error("خطا در افزودن گروه");
    } finally {
      setLoading(false);
    }
  };

  // ** Handle Cancel
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Card>
      <CardHeader className="border-bottom">
        <h4 className="mb-0">افزودن گروه اجتماعی</h4>
      </CardHeader>
      <CardBody>
        {error && (
          <Alert color="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label for="groupName">
                  نام گروه <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  id="groupName"
                  name="groupName"
                  placeholder="نام گروه را وارد کنید"
                  value={formData.groupName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label for="groupLink">
                  لینک گروه <span className="text-danger">*</span>
                </Label>
                <Input
                  type="url"
                  id="groupLink"
                  name="groupLink"
                  placeholder="https://t.me/example"
                  value={formData.groupLink}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label for="courseId">
                  شناسه دوره <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  id="courseId"
                  name="courseId"
                  placeholder="UUID دوره را وارد کنید"
                  value={formData.courseId}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  color="primary"
                  disabled={loading}
                  className="d-flex align-items-center"
                >
                  {loading ? (
                    <Spinner size="sm" className="me-1" />
                  ) : (
                    <Save size={16} className="me-1" />
                  )}
                  ذخیره
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  outline
                  onClick={handleCancel}
                  disabled={loading}
                  className="d-flex align-items-center"
                >
                  <ArrowLeft size={16} className="me-1" />
                  انصراف
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddSocialGroup;