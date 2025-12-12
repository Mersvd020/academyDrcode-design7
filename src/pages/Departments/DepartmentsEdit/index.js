// ** React Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import {
  Card,
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
  getDepartments,
  updateDepartment,
  clearSuccess,
  clearError,
} from "../store";
import { useDispatch, useSelector } from "react-redux";

import { ArrowLeft } from "react-feather";
import toast from "react-hot-toast";

const DepartmentsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.departments);

  const [formData, setFormData] = useState({
    depName: "",
    buildingId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!store.data || store.data.length === 0) {
      dispatch(getDepartments());
    }
  }, [dispatch]);

  useEffect(() => {
    if (store.data && store.data.length > 0) {
      let item = store.data.find((dept) => dept.id === id);

      if (!item) {
        item = store.data.find((dept) => String(dept.id) === String(id));
      }

      if (!item) {
        item = store.data.find((dept) => dept.id === Number(id));
      }

      console.log("Looking for ID:", id);
      console.log("Available departments:", store.data);
      console.log("Found item:", item);

      if (item) {
        setFormData({
          depName: item.depName || "",
          buildingId: item.buildingId || "",
        });
        setLoading(false);
      } else {
        toast.error("دپارتمان مورد نظر یافت نشد");

        console.error(
          "Department not found. Available IDs:",
          store.data.map((d) => d.id)
        );
      }
    }
  }, [store.data, id]);

  useEffect(() => {
    if (store.success) {
      toast.success("دپارتمان با موفقیت بروزرسانی شد");
      dispatch(clearSuccess());
      navigate("/departments");
    }
  }, [store.success, navigate, dispatch]);

  useEffect(() => {
    if (store.error) {
      const errorMsg =
        typeof store.error === "string"
          ? store.error
          : store.error?.message || "خطا در بروزرسانی دپارتمان";
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

    if (!formData.depName.trim()) {
      toast.error("نام دپارتمان الزامی است");
      return;
    }

    if (!formData.buildingId.trim()) {
      toast.error("شناسه ساختمان الزامی است");
      return;
    }

    const dataToSend = {
      id: Number(id), // Convert to number as per Postman format
      depName: formData.depName.trim(),
      buildingId: formData.buildingId.trim(),
    };

    console.log("Updating department:", dataToSend);
    dispatch(updateDepartment({ id, departmentData: dataToSend }));
  };

  const handleCancel = () => {
    navigate("/departments");
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
    <div>
      <div className="text-center mb-3">
        <h1
          className="text-primary"
          style={{ fontSize: "2.5rem", fontWeight: "bold" }}
        >
          ویرایش دپارتمان
        </h1>
      </div>

      <Card>
        <CardBody className="pt-2">
          {store.error && (
            <Alert color="danger">
              <div className="alert-body">{store.error}</div>
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6" className="mb-2">
                <Label className="form-label" for="depName">
                  نام دپارتمان <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  id="depName"
                  name="depName"
                  placeholder="مثال: react"
                  value={formData.depName}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "8px", padding: "10px" }}
                />
              </Col>

              <Col md="6" className="mb-2">
                <Label className="form-label" for="buildingId">
                  شناسه ساختمان <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  id="buildingId"
                  name="buildingId"
                  placeholder="مثال: xuITopwexmBoWVYP-HVZ6"
                  value={formData.buildingId}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "8px", padding: "10px" }}
                />
              </Col>

              <Col className="mt-3 d-flex gap-2">
                <Button
                  type="submit"
                  color="primary"
                  disabled={store.loading}
                  style={{ borderRadius: "10px", padding: "10px 30px" }}
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
                  disabled={store.loading}
                  style={{ borderRadius: "10px", padding: "10px 30px" }}
                >
                  <ArrowLeft size={14} className="me-50" />
                  بازگشت
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default DepartmentsEdit;
