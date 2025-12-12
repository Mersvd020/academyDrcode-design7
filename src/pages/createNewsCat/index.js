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
import CategoryImage from "./courseImage";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";

const CreateNewsCategory = () => {
  const navigate = useNavigate();

  // ** States
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  const [categoryData, setCategoryData] = useState({
    CategoryName: "",
    Image: "",
    IconAddress: "",
    IconName: "",
    GoogleTitle: "",
    GoogleDescribe: "",

    ImageFile: null,
    IconFile: null,
    ImagePreview: null,
    IconPreview: null,
  });

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleDataFromTab = (tabData) => {
    setCategoryData((prev) => ({
      ...prev,
      ...tabData,
    }));
  };

  const handleNext = () => {
    const currentTab = parseInt(activeTab);
    if (currentTab < 2) {
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

      if (!categoryData.CategoryName) {
        toast.error("نام دسته‌بندی الزامی است");
        setActiveTab("1");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("CategoryName", categoryData.CategoryName);
      formData.append("GoogleTitle", categoryData.GoogleTitle || "");
      formData.append("GoogleDescribe", categoryData.GoogleDescribe || "");
      formData.append("IconName", categoryData.IconName || "");

      if (categoryData.ImageFile) {
        formData.append("Image", categoryData.ImageFile);
      } else if (categoryData.Image) {
        formData.append("Image", categoryData.Image);
      }

      if (categoryData.IconFile) {
        formData.append("IconAddress", categoryData.IconFile);
      } else if (categoryData.IconAddress) {
        formData.append("IconAddress", categoryData.IconAddress);
      }

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://sepehracademy.liara.run/News/CreateNewsCategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Category Created:", response.data);
      toast.success("دسته‌بندی با موفقیت ساخته شد");

      navigate("/news/catlist");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(error.response?.data?.message || "خطا در ساخت دسته‌بندی");
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
                data={categoryData}
                onDataChange={handleDataFromTab}
              />
            </TabPane>

            <TabPane tabId="2">
              <CategoryImage
                data={categoryData}
                onDataChange={handleDataFromTab}
              />
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
                  "ساخت دسته‌بندی"
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

export default CreateNewsCategory;
