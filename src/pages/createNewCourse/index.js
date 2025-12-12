// ** React Imports
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Third Party Components
import axios from "axios";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane, Button, Spinner } from "reactstrap";

// ** Demo Components
import Tabs from "./Tabs";
import Breadcrumbs from "@components/breadcrumbs";
import AccountTabContent from "./AccountTabContent";
import CourseImage from "./courseImage";
import CourseFeature from "./courseFeature";
import CourseAdvanced from "./CourseAdvanced";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";

const CreateCourse = () => {
  const navigate = useNavigate();

  // ** States
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  // ** Course Data State
  const [courseData, setCourseData] = useState({
    Title: "",
    Cost: "",
    Capacity: "",
    MiniDescribe: "",
    Describe: "",
    SessionNumber: "",
    StartTime: "",
    EndTime: "",

    CourseTypeId: "",
    TremId: "",
    ClassId: "",
    CourseLvlId: "",
    TeacherId: "",

    CurrentCoursePaymentNumber: 0,
    UniqeUrlString: "",
    GoogleSchema: "",
    GoogleTitle: "",
    CoursePrerequisiteId: "",
    ShortLink: "",
    TumbImageAddress: "",
    ImageAddress: "",

    Image: null,
    ImagePreview: null,
  });

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleDataFromTab = (tabData) => {
    setCourseData((prev) => ({
      ...prev,
      ...tabData,
    }));
  };

  const handleNext = () => {
    const currentTab = parseInt(activeTab);
    if (currentTab < 5) {
      setActiveTab((currentTab + 1).toString());
    }
  };

  const handlePrevious = () => {
    const currentTab = parseInt(activeTab);
    if (currentTab > 1) {
      setActiveTab((currentTab - 1).toString());
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!courseData.Title) {
        toast.error("نام دوره الزامی است");
        setActiveTab("1");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("Title", courseData.Title);
      formData.append("Cost", courseData.Cost || 0);
      formData.append("Capacity", courseData.Capacity || 0);
      formData.append("MiniDescribe", courseData.MiniDescribe || "");
      formData.append("Describe", courseData.Describe || "");
      formData.append("SessionNumber", courseData.SessionNumber || "");
      formData.append(
        "StartTime",
        courseData.StartTime || new Date().toISOString()
      );
      formData.append(
        "EndTime",
        courseData.EndTime || new Date().toISOString()
      );

      if (courseData.CourseTypeId)
        formData.append("CourseTypeId", courseData.CourseTypeId);
      if (courseData.TremId) formData.append("TremId", courseData.TremId);
      if (courseData.ClassId) formData.append("ClassId", courseData.ClassId);
      if (courseData.CourseLvlId)
        formData.append("CourseLvlId", courseData.CourseLvlId);
      if (courseData.TeacherId)
        formData.append("TeacherId", courseData.TeacherId);

      formData.append(
        "CurrentCoursePaymentNumber",
        courseData.CurrentCoursePaymentNumber || "0"
      );
      formData.append(
        "UniqeUrlString",
        courseData.UniqeUrlString ||
          courseData.Title.replace(/\s+/g, "-").toLowerCase()
      );
      formData.append("GoogleSchema", courseData.GoogleSchema || "");
      formData.append(
        "GoogleTitle",
        courseData.GoogleTitle || courseData.Title
      );
      formData.append(
        "CoursePrerequisiteId",
        courseData.CoursePrerequisiteId || ""
      );
      formData.append("ShortLink", courseData.ShortLink || "");
      formData.append("TumbImageAddress", courseData.TumbImageAddress || "");
      formData.append("ImageAddress", courseData.ImageAddress || "");

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://sepehracademy.liara.run/Course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Course Created:", response.data);
      toast.success("دوره با موفقیت ساخته شد");

      setTimeout(() => {
        navigate("/course/list");
      }, 1500);
    } catch (error) {
      console.error("error create course:", error);
      toast.error("خطا در ساخت دوره");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col xs={12}>
          <Tabs className="mb-2" activeTab={activeTab} toggleTab={toggleTab} />

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <AccountTabContent
                data={courseData}
                onDataChange={handleDataFromTab}
              />
            </TabPane>

            <TabPane tabId="2">
              <CourseFeature
                data={courseData}
                onDataChange={handleDataFromTab}
              />
            </TabPane>

            <TabPane tabId="3">
              <CourseAdvanced
                data={courseData}
                onDataChange={handleDataFromTab}
              />
            </TabPane>

            <TabPane tabId="4">
              <CourseImage data={courseData} onDataChange={handleDataFromTab} />
            </TabPane>
          </TabContent>

          <Col className="d-flex justify-content-between mt-3">
            <Button
              color="primary"
              onClick={handlePrevious}
              disabled={activeTab === "1" || loading}
            >
              قبلی
            </Button>

            {activeTab === "5" ? (
              <Button color="success" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-1" />
                    در حال ساخت...
                  </>
                ) : (
                  "ساخت دوره"
                )}
              </Button>
            ) : (
              <Button color="primary" onClick={handleNext} disabled={loading}>
                بعدی
              </Button>
            )}
          </Col>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CreateCourse;
