// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const EditNewsCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get category ID from URL

  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [categoryData, setCategoryData] = useState({
    Id: "",
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

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setFetchLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `https://sepehracademy.liara.run/News/GetListNewsCategory`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("edit catData:", response.data);

        const categoryList = response.data.newsCategoryDtos || response.data;
        const data = Array.isArray(categoryList)
          ? categoryList.find((cat) => cat.id == id)
          : response.data;

        if (!data) {
          toast.error("دسته‌بندی مورد نظر یافت نشد");
          setTimeout(() => {
            navigate("/news/categories/list");
          }, 2000);
          return;
        }

        const updatedData = {
          Id: data.id || id,
          CategoryName: data.categoryName || "",
          Image: data.image || "",
          IconAddress: data.iconAddress || "",
          IconName: data.iconName || "",
          GoogleTitle: data.googleTitle || "",
          GoogleDescribe: data.googleDescribe || "",
          ImageFile: null,
          IconFile: null,
          ImagePreview: data.image || null,
          IconPreview: data.iconAddress || null,
        };

        setCategoryData(updatedData);
        setFetchLoading(false);
        toast.success("اطلاعات دسته‌بندی بارگذاری شد");
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error(
          error.response?.data?.message || "خطا در دریافت اطلاعات دسته‌بندی"
        );
        setFetchLoading(false);

        navigate("/news/categories/list");
      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id, navigate]);

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

      if (!categoryData.Id) {
        toast.error("شناسه دسته‌بندی یافت نشد");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("Id", categoryData.Id);

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
      //
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://sepehracademy.liara.run/News/UpdateNewsCategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Category Updated:", response.data);
      toast.success("دسته‌بندی با موفقیت ویرایش شد");

      setTimeout(() => {
        navigate("/news/create-NewsCat");
      }, 1500);
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(error.response?.data?.message || "خطا در ویرایش دسته‌بندی");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Fragment>
        <Breadcrumbs
          title="ویرایش دسته‌بندی اخبار"
          data={[{ title: "دسته‌بندی اخبار" }, { title: "ویرایش دسته‌بندی" }]}
        />
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <Spinner color="primary" size="lg" />
          <p className="mt-2">در حال بارگذاری اطلاعات...</p>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Breadcrumbs
        title="ویرایش دسته‌بندی اخبار"
        data={[{ title: "دسته‌بندی اخبار" }, { title: "ویرایش دسته‌بندی" }]}
      />

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
                    در حال بروزرسانی...
                  </>
                ) : (
                  "بروزرسانی دسته‌بندی"
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

export default EditNewsCategory;
