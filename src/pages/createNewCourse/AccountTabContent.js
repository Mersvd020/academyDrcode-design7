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
  FormFeedback,
} from "reactstrap";

const AccountTabContent = ({ data, onDataChange }) => {
  // ** Form
  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Title: data?.Title || "",
      Cost: data?.Cost || "",
      Capacity: data?.Capacity || "",
      MiniDescribe: data?.MiniDescribe || "",
      SessionNumber: data?.SessionNumber || "",
      StartTime: data?.StartTime || "",
      EndTime: data?.EndTime || "",
    },
  });

  // Watch all fields and send to parent
  const watchedFields = watch();

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
            مشخصات دوره
          </CardTitle>
        </CardHeader>

        <CardBody className="py-2 my-25">
          <Form>
            <Row>
              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="Title"
                >
                  نام دوره
                </Label>
                <Controller
                  name="Title"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="Title"
                      placeholder="نام دوره الزامی"
                      invalid={errors.Title && true}
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="Cost"
                >
                  قیمت دوره
                </Label>
                <Controller
                  name="Cost"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="Cost"
                      placeholder="قیمت دوره"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="Capacity"
                >
                  ظرفیت دوره
                </Label>
                <Controller
                  name="Capacity"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="Capacity"
                      placeholder="ظرفیت دوره"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="MiniDescribe"
                >
                  توضیحات مختصر دوره
                </Label>
                <Controller
                  name="MiniDescribe"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="MiniDescribe"
                      placeholder="توضیحات کوتاه"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="12" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="SessionNumber"
                >
                  تعداد جلسات دوره
                </Label>
                <Controller
                  name="SessionNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="SessionNumber"
                      placeholder="تعداد جلسات"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="StartTime"
                >
                  شروع دوره
                </Label>
                <Controller
                  name="StartTime"
                  control={control}
                  render={({ field }) => (
                    <Input id="StartTime" type="date" {...field} />
                  )}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="EndTime"
                >
                  پایان دوره
                </Label>
                <Controller
                  name="EndTime"
                  control={control}
                  render={({ field }) => (
                    <Input id="EndTime" type="date" {...field} />
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

export default AccountTabContent;
