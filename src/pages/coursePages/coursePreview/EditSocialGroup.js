import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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

import { ArrowLeft, Save } from "react-feather";
import axios from "axios";
import toast from "react-hot-toast";

const EditSocialGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  const groupFromState = location.state?.group;
  const courseId = location.state?.courseId;
  const [formData, setFormData] = useState({
    groupName: "",
    groupLink: "",
    courseId: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (groupFromState) {
      setFormData({
        groupName: groupFromState.groupName || "",
        groupLink: groupFromState.groupLink || "",
        courseId: groupFromState.courseId || courseId || "",
        id: groupFromState.id || id,
      });
    } else if (id) {
      fetchGroupData();
    }
  }, [groupFromState, id, courseId]);

  const fetchGroupData = async () => {
    try {
      setFetchingData(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://sepehracademy.liara.run/CourseSocialGroup/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setFormData({
        groupName: data.groupName || "",
        groupLink: data.groupLink || "",
        courseId: data.courseId || "",
        id: data.id || id,
      });
    } catch (error) {
      console.log("Fetch error:", error);
      setError("خطا در دریافت اطلاعات گروه");
      toast.error("خطا در دریافت اطلاعات گروه");
    } finally {
      setFetchingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    if (!formData.id) {
      setError("شناسه گروه الزامی است");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      await axios.put(
        `https://sepehracademy.liara.run/CourseSocialGroup`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("گروه با موفقیت ویرایش شد");
      navigate(`/course/preview/${formData.courseId}`);
    } catch (error) {
      console.log("Update error:", error);
      setError(
        error.response?.data?.message || "خطا در ویرایش گروه اجتماعی"
      );
      toast.error("خطا در ویرایش گروه");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/course/preview/${formData.courseId}`);
  };

  if (fetchingData) {
    return (
      <Card>
        <CardBody>
          <div className="text-center p-3">
            <Spinner color="primary" />
            <p className="mt-2">در حال بارگذاری...</p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-bottom">
        <h4 className="mb-0">ویرایش گروه اجتماعی</h4>
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
              <FormGroup>
                <Label for="id">شناسه گروه</Label>
                <Input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  disabled
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
                  ذخیره تغییرات
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

export default EditSocialGroup;