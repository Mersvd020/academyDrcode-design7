// ** React Imports
import { Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

// ** Third Party Components
import Select from "react-select";

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

// ** Utils
import { selectThemeColors } from "@utils";

const languageOptions = [
  { value: "1", label: "مبتدی" },
  { value: "2", label: "متوسط" },
  { value: "3", label: "پیشرفته" },
];

const CourseFeature = ({ data, onDataChange }) => {
  // ** Form
  const { control, watch, setValue } = useForm({
    defaultValues: {
      Describe: data?.Describe || "",
      CourseTypeId: data?.CourseTypeId || "",
      CourseLvlId: data?.CourseLvlId || "",
      ClassId: data?.ClassId || "",
      TeacherId: data?.TeacherId || "",
      TremId: data?.TremId || "",
    },
  });

  // Watch all fields
  const watchedFields = watch();

  // Send data to parent whenever fields change
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
            ویژگی‌های دوره
          </CardTitle>
        </CardHeader>

        <CardBody className="py-2 my-25">
          <Form>
            <Row>
              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="Describe"
                >
                  توضیحات کامل دوره
                </Label>
                <Controller
                  name="Describe"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="textarea"
                      id="Describe"
                      rows="3"
                      placeholder="توضیحات کامل دوره"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="CourseLvlId"
                >
                  سطح برگذاری دوره
                </Label>
                <Controller
                  name="CourseLvlId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="CourseLvlId"
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                      options={languageOptions}
                      theme={selectThemeColors}
                      placeholder="انتخاب سطح"
                      value={languageOptions.find(
                        (opt) => opt.value === field.value
                      )}
                      onChange={(option) => field.onChange(option.value)}
                    />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="CourseTypeId"
                >
                  نوع دوره
                </Label>
                <Controller
                  name="CourseTypeId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="CourseTypeId"
                      placeholder="نوع دوره(ایدی)"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="ClassId"
                >
                  نام کلاس
                </Label>
                <Controller
                  name="ClassId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="ClassId"
                      placeholder="نام کلاس (ایدی)"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="TeacherId"
                >
                  انتخاب معلم
                </Label>
                <Controller
                  name="TeacherId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="TeacherId"
                      placeholder="معلم(ایدی)"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="TremId"
                >
                  ترم دوره
                </Label>
                <Controller
                  name="TremId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="TremId"
                      placeholder="ترم دوره(ایدی)"
                      {...field}
                    />
                  )}
                />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CourseFeature;
