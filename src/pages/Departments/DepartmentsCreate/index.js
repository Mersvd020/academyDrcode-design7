// ** React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
} from "reactstrap";

import {
  getDepartments,
  createDepartment,
  clearSuccess,
  clearError,
} from "../store";
import { useDispatch, useSelector } from "react-redux";

import { ArrowLeft } from "react-feather";
import toast from "react-hot-toast";

const DepartmentsCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.departments);

  const [formData, setFormData] = useState({
    depName: "",
    buildingId: "",
  });
  const [uniqueBuildings, setUniqueBuildings] = useState([]);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (store.data && store.data.length > 0) {
      const buildings = store.data.reduce((acc, item) => {
        if (item.buildingId && item.buildingName) {
          const existing = acc.find((b) => b.id === item.buildingId);
          if (!existing) {
            acc.push({
              id: item.buildingId,
              name: item.buildingName,
            });
          }
        }
        return acc;
      }, []);
      setUniqueBuildings(buildings);
      console.log("Available buildings:", buildings);
    }
  }, [store.data]);

  useEffect(() => {
    if (store.success) {
      toast.success("دپارتمان با موفقیت ایجاد شد");
      dispatch(clearSuccess());
      navigate("/departments");
    }
  }, [store.success, navigate, dispatch]);

  useEffect(() => {
    if (store.error) {
      const errorMsg =
        typeof store.error === "string"
          ? store.error
          : store.error?.message || "خطا در ایجاد دپارتمان";
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
      toast.error("لطفاً یک ساختمان انتخاب کنید");
      return;
    }

    const dataToSend = {
      depName: formData.depName.trim(),
      buildingId: formData.buildingId.trim(),
    };

    console.log("Submitting data:", dataToSend);
    dispatch(createDepartment(dataToSend));
  };

  const handleCancel = () => {
    navigate("/departments");
  };

  const handleReset = () => {
    setFormData({
      depName: "",
      buildingId: "",
    });
  };

  return (
    <div>
      <div className="text-center mb-3">
        <h1
          className="text-primary"
          style={{ fontSize: "2.5rem", fontWeight: "bold" }}
        >
          افزودن دپارتمان جدید
        </h1>
      </div>

      <Card>
        <CardBody className="pt-2">
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
                  ساختمان <span className="text-danger">*</span>
                </Label>
                {uniqueBuildings.length > 0 ? (
                  <Input
                    type="select"
                    id="buildingId"
                    name="buildingId"
                    value={formData.buildingId}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px", padding: "10px" }}
                  >
                    <option value="">انتخاب ساختمان</option>
                    {uniqueBuildings.map((building) => (
                      <option key={building.id} value={building.id}>
                        {building.name}
                      </option>
                    ))}
                  </Input>
                ) : (
                  <Input
                    type="text"
                    id="buildingId"
                    name="buildingId"
                    placeholder="شناسه ساختمان را وارد کنید"
                    value={formData.buildingId}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "8px", padding: "10px" }}
                  />
                )}
                <small className="text-muted">
                  {uniqueBuildings.length > 0
                    ? "یکی از ساختمان‌های موجود را انتخاب کنید"
                    : "در حال بارگذاری ساختمان‌ها..."}
                </small>
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
                      در حال ایجاد...
                    </>
                  ) : (
                    "ایجاد دپارتمان"
                  )}
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  outline
                  onClick={handleReset}
                  disabled={store.loading}
                  style={{ borderRadius: "10px", padding: "10px 30px" }}
                >
                  پاک کردن فرم
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

export default DepartmentsCreate;
