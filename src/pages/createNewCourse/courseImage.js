// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Reactstrap Imports
import {
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

const CourseImage = ({ data, onDataChange }) => {
  // ** States
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(data?.ImagePreview || "");

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

  const handleImgReset = () => {
    setImage(null);
    setImagePreview("");
  };

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        Image: image,
        ImagePreview: imagePreview,
      });
    }
  }, [image, imagePreview, onDataChange]);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4" style={{ fontSize: "20px" }}>
            تصویر دوره
          </CardTitle>
        </CardHeader>

        <CardBody className="py-2 my-25">
          <div className="d-flex">
            <div className="me-25">
              <img
                className="rounded me-50"
                src={imagePreview || "222.png"}
                alt="تصویر دوره"
                height="150"
                width="150"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="d-flex align-items-end mt-75 ms-1">
              <div>
                <Button
                  tag={Label}
                  className="mb-75 me-75"
                  size="sm"
                  color="primary"
                >
                  آپلود تصویر
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
                  disabled={!imagePreview}
                >
                  حذف
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CourseImage;
