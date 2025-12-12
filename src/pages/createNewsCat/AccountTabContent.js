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
      CategoryName: data?.CategoryName || "",
      Image: data?.Image || "",
      IconAddress: data?.IconAddress || "",
      IconName: data?.IconName || "",
      GoogleTitle: data?.GoogleTitle || "",
      GoogleDescribe: data?.GoogleDescribe || "",
    },
  });

 
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
            مشخصات دسته‌بندی اخبار
          </CardTitle>
        </CardHeader>

        <CardBody className="py-2 my-25">
          <Form>
            <Row>
              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="CategoryName"
                >
                  نام دسته‌بندی
                </Label>
                <Controller
                  name="CategoryName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="CategoryName"
                      placeholder="نام دسته‌بندی را وارد کنید"
                      invalid={errors.CategoryName && true}
                      {...field}
                    />
                  )}
                />
                {errors.CategoryName && (
                  <FormFeedback>نام دسته‌بندی الزامی است</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="IconName"
                >
                  نام آیکون
                </Label>
                <Controller
                  name="IconName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="IconName"
                      placeholder="نام آیکون را وارد کنید"
                      invalid={errors.IconName && true}
                      {...field}
                    />
                  )}
                />
                {errors.IconName && (
                  <FormFeedback>نام آیکون الزامی است</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="GoogleTitle"
                >
                  عنوان گوگل
                </Label>
                <Controller
                  name="GoogleTitle"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="GoogleTitle"
                      placeholder="عنوان گوگل را وارد کنید"
                      invalid={errors.GoogleTitle && true}
                      {...field}
                    />
                  )}
                />
                {errors.GoogleTitle && (
                  <FormFeedback>عنوان گوگل الزامی است</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="GoogleDescribe"
                >
                  توضیحات google <span>{"(google describe)"}</span>
                </Label>
                <Controller
                  name="GoogleDescribe"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="GoogleDescribe"
                      type="textarea"
                      rows="3"
                      placeholder="توضیحات گوگل را وارد کنید"
                      invalid={errors.GoogleDescribe && true}
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

export default AccountTabContent;
