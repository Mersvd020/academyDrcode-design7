// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Badge,
} from "reactstrap";

const CategoryImage = ({ data, onDataChange }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    data?.ImagePreview || data?.Image || ""
  );

  const [icon, setIcon] = useState(null);
  const [iconPreview, setIconPreview] = useState(
    data?.IconPreview || data?.IconAddress || ""
  );

  useEffect(() => {
    if (data?.ImagePreview || data?.Image) {
      setImagePreview(data.ImagePreview || data.Image);
    }
    if (data?.IconPreview || data?.IconAddress) {
      setIconPreview(data.IconPreview || data.IconAddress);
    }
  }, [data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = function () {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        alert("حجم آیکون نباید بیشتر از 1 مگابایت باشد");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("فقط فایل‌های تصویری مجاز هستند");
        return;
      }

      setIcon(file);

      const reader = new FileReader();
      reader.onload = function () {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImgReset = () => {
    setImage(null);
    setImagePreview(data?.Image || "");
  };

  const handleIconReset = () => {
    setIcon(null);
    setIconPreview(data?.IconAddress || "");
  };

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        ImageFile: image,
        ImagePreview: imagePreview,
        IconFile: icon,
        IconPreview: iconPreview,
      });
    }
  }, [image, imagePreview, icon, iconPreview, onDataChange]);

  return (
    <Fragment>
      <Row>
        <Col md="6" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4" style={{ fontSize: "20px" }}>
                تصویر اصلی دسته‌بندی
                {image && (
                  <Badge color="light-success" className="ms-1">
                    تصویر جدید
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>

            <CardBody className="py-2 my-25">
              <div className="d-flex flex-column">
                <div className="mb-2">
                  <img
                    className="rounded"
                    src={
                      imagePreview ||
                      "https://via.placeholder.com/200x150?text=Main+Image"
                    }
                    alt="تصویر دسته‌بندی"
                    height="150"
                    width="200"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="d-flex align-items-end mt-2">
                  <div>
                    <Button
                      tag={Label}
                      className="mb-75 me-75"
                      size="sm"
                      color="primary"
                    >
                      {image ? "تغییر تصویر" : "آپلود تصویر جدید"}
                      <Input
                        type="file"
                        onChange={handleImageChange}
                        hidden
                        accept="image/jpeg,image/png,image/jpg,image/gif"
                      />
                    </Button>

                    <Button
                      className="mb-75"
                      color="secondary"
                      size="sm"
                      outline
                      onClick={handleImgReset}
                      disabled={!image}
                    >
                      بازگردانی
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md="6" sm="12">
          <Card>
            <CardHeader className="border-bottom">
              <CardTitle tag="h4" style={{ fontSize: "20px" }}>
                آیکون دسته‌بندی
                {icon && (
                  <Badge color="light-success" className="ms-1">
                    آیکون جدید
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>

            <CardBody className="py-2 my-25">
              <div className="d-flex flex-column">
                <div className="mb-2">
                  <img
                    className="rounded"
                    src={
                      iconPreview || "https://via.placeholder.com/100?text=Icon"
                    }
                    alt="آیکون دسته‌بندی"
                    height="100"
                    width="100"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="d-flex align-items-end mt-2">
                  <div>
                    <Button
                      tag={Label}
                      className="mb-75 me-75"
                      size="sm"
                      color="primary"
                    >
                      {icon ? "تغییر آیکون" : "آپلود آیکون جدید"}
                      <Input
                        type="file"
                        onChange={handleIconChange}
                        hidden
                        accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                      />
                    </Button>

                    <Button
                      className="mb-75"
                      color="secondary"
                      size="sm"
                      outline
                      onClick={handleIconReset}
                      disabled={!icon}
                    >
                      بازگردانی
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CategoryImage;
