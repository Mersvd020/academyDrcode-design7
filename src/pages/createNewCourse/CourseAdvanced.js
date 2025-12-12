// ** React Imports
import { Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

const CourseAdvanced = ({ data, onDataChange }) => {
  // ** Form
  const { control, watch } = useForm({
    defaultValues: {
      UniqeUrlString: data?.UniqeUrlString || "",
      GoogleTitle: data?.GoogleTitle || "",
      GoogleSchema: data?.GoogleSchema || "",
      ShortLink: data?.ShortLink || "",
    },
  });

  // Watch all fields
  const watchedFields = watch();

  // Send data to parent
  useEffect(() => {
    if (onDataChange) {
      onDataChange(watchedFields);
    }
  }, [watchedFields, onDataChange]);

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4" style={{ fontSize: "20px" }}>
            تنظیمات پیشرفته
          </CardTitle>
        </CardHeader>

        <CardBody className="py-2 my-25">
          <Form>
            <Row>
              <Col sm="12" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="UniqeUrlString"
                >
                  آدرس URL منحصر به فرد{" "}
                  <span className="text-muted">{"اختیاری"}</span>
                </Label>
                <Controller
                  name="UniqeUrlString"
                  control={control}
                  render={({ field }) => (
                    <Input id="UniqeUrlString" {...field} />
                  )}
                />
              </Col>

              <Col sm="12" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="GoogleTitle"
                >
                  عنوان Google
                </Label>
                <Controller
                  name="GoogleTitle"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="GoogleTitle"
                      placeholder="عنوان گوگل"
                      maxLength="60"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="12" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="GoogleSchema"
                >
                  Google Schema
                </Label>
                <Controller
                  name="GoogleSchema"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="textarea"
                      id="GoogleSchema"
                      rows="6"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="12" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="ShortLink"
                >
                  لینک کوتاه <span className="text-muted">{"اختیاری"}</span>
                </Label>
                <Controller
                  name="ShortLink"
                  control={control}
                  render={({ field }) => <Input id="ShortLink" {...field} />}
                />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CourseAdvanced;
