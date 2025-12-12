// ** React Imports
import { useState, useEffect, useRef } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { createBuilding, clearSuccess, clearError } from "../store";
import { useDispatch, useSelector } from "react-redux";

import { X,Plus } from "react-feather";
import toast from "react-hot-toast";

const BuildingsCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.buildings);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [formData, setFormData] = useState({
    buildingName: "",
    floor: 1,
    latitude: "35.6892",
    longitude: "51.3890",
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen && !mapRef.current) {
      const loadMap = async () => {
        if (!document.getElementById("leaflet-css")) {
          const link = document.createElement("link");
          link.id = "leaflet-css";
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        }

        if (!window.L) {
          await new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            script.onload = resolve;
            document.head.appendChild(script);
          });
        }

        const L = window.L;
        const map = L.map("map").setView(
          [Number(formData.latitude), Number(formData.longitude)],
          13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        const marker = L.marker(
          [Number(formData.latitude), Number(formData.longitude)],
          {
            draggable: true,
          }
        ).addTo(map);

        marker.on("dragend", function (e) {
          const position = e.target.getLatLng();
          setFormData((prev) => ({
            ...prev,
            latitude: position.lat.toFixed(6),
            longitude: position.lng.toFixed(6),
          }));
        });

        map.on("click", function (e) {
          marker.setLatLng(e.latlng);
          setFormData((prev) => ({
            ...prev,
            latitude: e.latlng.lat.toFixed(6),
            longitude: e.latlng.lng.toFixed(6),
          }));
        });

        mapRef.current = map;
        markerRef.current = marker;
      };

      loadMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [modalOpen]);

  useEffect(() => {
    if (store.success) {
      toast.success("ساختمان با موفقیت ایجاد شد");
      dispatch(clearSuccess());
      navigate("/buildings");
    }
  }, [store.success, navigate, dispatch]);

  useEffect(() => {
    if (store.error) {
      const errorMsg =
        typeof store.error === "string"
          ? store.error
          : store.error?.message || "خطا در ایجاد ساختمان";
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

    if (!formData.buildingName.trim()) {
      toast.error("نام ساختمان الزامی است");
      return;
    }

    if (formData.floor < 1) {
      toast.error("تعداد طبقات باید حداقل 1 باشد");
      return;
    }

    const dataToSend = {
      buildingName: formData.buildingName.trim(),
      floor: Number(formData.floor),
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    console.log("Submitting data:", dataToSend);
    dispatch(createBuilding(dataToSend));
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        size="lg"
        style={{ maxWidth: "600px" }}
      >
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          افزودن ساختمان جدید
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="12" className="mb-2">
                <Label className="form-label" for="buildingName">
                  نام ساختمان: <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleChange}
                  required
                />
              </Col>

              <Col md="12" className="mb-2">
                <Label className="form-label" for="floor">
                  تاریخ کار:
                </Label>
                <Input type="date" id="workDate" name="workDate" />
              </Col>

              <Col md="12" className="mb-2">
                <Label className="form-label" for="floor">
                  طبقه: <span className="text-danger">*</span>
                </Label>
                <Input
                  type="number"
                  id="floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </Col>

              <Col md="12" className="mb-2">
                <Label className="form-label">انتخاب موقعیت روی نقشه:</Label>
                <div
                  id="map"
                  style={{
                    height: "300px",
                    width: "100%",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                ></div>
                <small className="text-muted d-block mt-1">
                  روی نقشه کلیک کنید یا نشانگر را بکشید
                </small>
              </Col>

              <Col md="6" className="mb-2">
                <Label className="form-label" for="latitude">
                  عرض جغرافیایی:
                </Label>
                <Input
                  type="text"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  readOnly
                />
              </Col>

              <Col md="6" className="mb-2">
                <Label className="form-label" for="longitude">
                  طول جغرافیایی:
                </Label>
                <Input
                  type="text"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  readOnly
                />
              </Col>

              <Col className="mt-3 d-flex justify-content-end gap-2">
                <Button
                  type="button"
                  color="secondary"
                  outline
                  onClick={() => setModalOpen(false)}
                >
                  <X size={14} className="me-50" />
                  بستن
                </Button>
                <Button type="submit" color="primary" disabled={store.loading}>
                  {store.loading ? (
                    <>
                      <Spinner size="sm" className="me-50" />
                      در حال ایجاد...
                    </>
                  ) : (
                    "ایجاد ساختمان"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>

      <Button color="success" onClick={() => setModalOpen(true)}>
        <Plus size={16} className="me-50" />
        افزودن ساختمان جدید
      </Button>
    </div>
  );
};

export default BuildingsCreate;
