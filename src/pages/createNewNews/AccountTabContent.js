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
      Cost: data?.GoogleTitle || "",
      Capacity: data?.GoogleDescribe || "",
      MiniDescribe: data?.MiniDescribe || "",
      SessionNumber: data?.Describe || "",
      StartTime: data?.Keyword || "",
      EndTime: data?.IsSlider || "",
      EndTime: data?.NewsCatregoryId || "",
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
            مشخصات اخبار
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
                  عنوان اخبار
                </Label>
                <Controller
                  name="Title"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="Title"
                      placeholder="نام اخبار را وارد کنید"
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
                  for="Title"
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
                  for="Title"
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
                      placeholder="توضیحات گوگل وارد کنید"
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
                  for="MiniDescribe"
                >
                  توضیح کوتاه
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
              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="MiniDescribe"
                >
                  توضیحات مختصر
                </Label>
                <Controller
                  name="Describe"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="Describe"
                      type="textarea"
                      placeholder="توضیح مختصر"
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
                  keyword
                </Label>
                <Controller
                  name="Keyword"
                  control={control}
                  render={({ field }) => (
                    <Input id="Keyword" placeholder="keyword" {...field} />
                  )}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="MiniDescribe"
                >
                  isSlider
                </Label>
                <Controller
                  name="IsSlider"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="IsSlider"
                      type="checkbox"
                      placeholder="isSlider"
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label
                  className="form-label"
                  style={{ fontSize: "15px" }}
                  for="Describe"
                >
                  نوع دسته بندی اخبار
                </Label>
                <Controller
                  name="NewsCatregoryId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="NewsCatregoryId"
                      rows="3"
                      placeholder="عدد دسته بندی را وارد کنید"
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
