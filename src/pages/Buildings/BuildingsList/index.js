import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Card, CardBody, Button, Input, Row, Col, Badge } from "reactstrap";

import { getBuildings, toggleBuildingStatus } from "../store";
import { useDispatch, useSelector } from "react-redux";

import { Plus, Edit, Power, MapPin } from "react-feather";
import toast from "react-hot-toast";

import "@styles/react/libs/tables/react-dataTable-component.scss";

const BuildingsList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.buildings);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getBuildings());
  }, [dispatch]);

  const handleToggleStatus = (building) => {
    const action = building.active ? "غیرفعال" : "فعال";
    if (window.confirm(`آیا از ${action} کردن این ساختمان اطمینان دارید؟`)) {
      dispatch(
        toggleBuildingStatus({
          id: building.id,
          buildingData: {
            buildingName: building.buildingName,
            floor: building.floor,
            latitude: building.latitude,
            longitude: building.longitude,
            active: building.active,
          },
        })
      );
      toast.success(`ساختمان با موفقیت ${action} شد`);
    }
  };

  const filteredBuildings = store.data.filter((building) =>
    building.buildingName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!store) {
    return (
      <Card>
        <CardBody className="p-3 text-center">
          <h4 className="text-danger">خطا: Redux Store پیکربندی نشده است</h4>
          <p>لطفاً reducer را به store اضافه کنید</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="buildings-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button
          color="success"
          tag={Link}
          to="/buildings/create"
          style={{ borderRadius: "10px", padding: "10px 25px" }}
        >
          <Plus size={16} className="me-50" />
          افزودن ساختمان جدید
        </Button>

        <Input
          type="text"
          placeholder="جستجو بر اساس نام ساختمان..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px", borderRadius: "8px" }}
        />
      </div>

      {store.loading ? (
        <div className="text-center p-5">در حال بارگذاری...</div>
      ) : (
        <Row>
          {filteredBuildings.length > 0 ? (
            filteredBuildings.map((building, index) => (
              <Col key={building.id} md="6" lg="6" className="mb-3">
                <Card
                  style={{ borderRadius: "15px", border: "1px solid #e0e0e0" }}
                >
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "#FFA500",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <Power size={24} />
                        </div>
                        <div>
                          <h5 className="mb-0">{building.buildingName}</h5>
                          <Badge
                            color={building.active ? "success" : "secondary"}
                            pill
                          >
                            {building.active ? "فعال" : "غیرفعال"}
                          </Badge>
                        </div>
                      </div>

                      <div className="d-flex gap-1">
                        <Button
                          color="info"
                          size="sm"
                          tag={Link}
                          to={`/buildings/edit/${building.id}`}
                          style={{
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            padding: "0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#00d4ff",
                            border: "none",
                          }}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          color={building.active ? "warning" : "success"}
                          size="sm"
                          onClick={() => handleToggleStatus(building)}
                          style={{
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            padding: "0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: building.active
                              ? "#FFA500"
                              : "#28a745",
                            border: "none",
                          }}
                        >
                          <Power size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-2">
                      <p className="mb-1">
                        <strong>تاریخ کار:</strong> Invalid Date
                      </p>
                      <p className="mb-1">
                        <strong>طبقه:</strong> {building.floor}
                      </p>
                      <p className="mb-0 d-flex align-items-center">
                        <MapPin size={14} className="me-50" />
                        <strong>موقعیت:</strong>
                        <span className="ms-1">
                          {building.latitude}, {building.longitude}
                        </span>
                      </p>
                    </div>

                    <div className="text-end">
                      <span
                        style={{
                          fontSize: "2rem",
                          fontWeight: "bold",
                          color: "#6c757d",
                        }}
                      >
                        #{index + 1}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card>
                <CardBody className="text-center p-5">
                  هیچ ساختمانی یافت نشد
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default BuildingsList;
