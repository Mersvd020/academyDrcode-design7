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

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";

const CreateCourse = () => {
  const navigate = useNavigate();

  // ** States
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  // ** Course Data State
  const [newsData, setNewsData] = useState({
    Title: " ",
    GoogleTitle: " ",
    GoogleDescribe: " ",
    MiniDescribe: " ",
    Describe: " ",
    Keyword: " ",
    IsSlider: false,

    NewsCatregoryId: " ",

    TumbImageAddress: "",
    ImageAddress: "",

    Image: null,
    ImagePreview: null,
  });

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleDataFromTab = (tabData) => {
    setNewsData((prev) => ({
      ...prev,
      ...tabData,
    }));
  };

  const handleNext = () => {
    const currentTab = parseInt(activeTab);
    if (currentTab < 3) {
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

      if (!newsData.Title) {
        toast.error("نام اخبارالزامی است");
        setActiveTab("1");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("Title", newsData.Title);
      formData.append("GoogleTitle", newsData.GoogleTitle || "");
      formData.append("GoogleDescribe", newsData.GoogleDescribe || "");
      formData.append("MiniDescribe", newsData.MiniDescribe || "");
      formData.append("Describe", newsData.Describe || "");
      formData.append("Keyword", newsData.Keyword || "");
      formData.append("IsSlider", newsData.IsSlider || false);

      if (newsData.NewsCatregoryId)
        formData.append("NewsCatregoryId", newsData.NewsCatregoryId || 1);

      formData.append(
        "Image",
        newsData.TumbImageAddress || newsData.ImageAddress || ""
      );

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://sepehracademy.liara.run/News/CreateNews",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Course Created:", response.data);
      toast.success("اخبار با موفقیت ساخته شد");

      setTimeout(() => {
        navigate("/news/list");
      }, 1500);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error(error.response?.data?.message || "خطا در ساخت اخبار");
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
                data={newsData}
                onDataChange={handleDataFromTab}
              />
            </TabPane>

            <TabPane tabId="2">
              <CourseImage data={newsData} onDataChange={handleDataFromTab} />
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

            {activeTab === "2" ? (
              <Button color="success" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-1" />
                    در حال ساخت...
                  </>
                ) : (
                  "ساخت اخبار"
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
