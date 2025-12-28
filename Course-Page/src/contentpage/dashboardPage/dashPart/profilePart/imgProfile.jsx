import React, { useEffect, useState, useRef } from "react";
import Dock from "../../../../assets/dashPic/dock.png";
import Add from "../../../../assets/dashPic/add.png";
import apiClient from "../../../../hook/interceptor";
import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "https://sepehracademy.liara.run";

const ImgProfile = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const uploadRef = useRef();

  const loadImages = async () => {
    try {
      setError(null);
      const res = await apiClient.get(`${BASE_URL}/SharePanel/GetProfileInfo`);

      setImages(res.data.userImage || []);

    } catch (err) {
      console.error("LOAD IMAGE ERROR:", err);
      setError("خطا در بارگذاری تصاویر");
    }
  };
  // console.log("iiii",images)
  const uploadImage = async (file) => {
    try {
      if (!file) return;
      
      setLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append("formFile", file);

      await apiClient.post(
        `${BASE_URL}/SharePanel/AddProfileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      await loadImages();
      
      if (uploadRef.current) {
        uploadRef.current.value = "";
      }
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      setError("خطا در آپلود تصویر");
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imgId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formDatta = new FormData();
      formDatta.append("DeleteEntityId",imgId)
      
      await axios.delete(
        `${BASE_URL}/SharePanel/DeleteProfileImage`,
        {
          data: formDatta,
          headers:{
            'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
          }
        }
      );
       
      await loadImages();
      toast.success("عکس با موفقیت حذف شد")
    } catch (err) {
      console.error("DELETE ERROR:", err);
      toast.error("خطا در حذف عکس")
    } finally {
      setLoading(false);
    }
  };

 const selectImage = async (imgId) => {
 
  try {
    setLoading(true)
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("ImageId", imgId);
    
    const response = await axios.post(
      "https://sepehracademy.liara.run/SharePanel/SelectProfileImage",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
    );
     await loadImages();
    console.log(" موفق", response.data);
    toast.success("تصویر پروفایل با موفقیت تغییر کرد!");
    setTimeout(()=>{window.location.reload()},1500)
  } catch (err) {
    console.error("ERROR:", err);
   toast.success("خطا")
  }finally{
    setLoading(false)
  }
};

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="lg:h-full h-screen flex lg:flex-row-reverse flex-col mt-2 gap-4 p-4">
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg max-w-md">
          <button 
            onClick={() => setError(null)}
            className="absolute top-1 left-2 text-red-700 font-bold text-xl hover:text-red-900"
          >
            ×
          </button>
          <p className="text-sm pr-4">{error}</p>
        </div>
      )}

      <div
        onClick={() => !loading && uploadRef.current.click()}
        className={`lg:w-[24%] w-full h-[24%] lg:h-[30%] border-2 border-dashed 
        items-center flex rounded-[32px] transition-all ${
          loading 
            ? "opacity-50 cursor-not-allowed border-gray-300" 
            : "cursor-pointer hover:border-blue-400 hover:bg-blue-50 border-gray-400"
        }`}
      >
        <img className="m-auto opacity-70" src={Add} alt="آپلود تصویر" />
        <input
          ref={uploadRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => uploadImage(e.target.files[0])}
          disabled={loading}
        />
      </div>

      {images.map((img) => (
        <div
          key={img.id}
          className="relative lg:w-[25%] w-full h-[24%] lg:h-[30%] rounded-[32px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <img
            src={img?.puctureAddress ?? Dock}
            className="w-full h-full object-cover"
            alt="تصویر پروفایل"
          />
          
          {img.currentPic && (
            <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-md">
              ✓ فعال
            </div>
          )}
          
          <button
            onClick={() => !loading && selectImage(img?.id)}
            disabled={loading || img.currentPic}
            className={`absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-xl text-sm shadow-md
              ${loading || img.currentPic ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 active:scale-95"} transition-all`}
          >
            انتخاب
          </button>
          
          <button
            onClick={() => !loading && deleteImage(img.id)}
            disabled={loading}
            className={`absolute bottom-2 right-2 bg-red-600 text-white px-3 py-1 rounded-xl text-sm shadow-md
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700 active:scale-95"} transition-all`}
          >
            حذف
          </button>
        </div>
      ))}

      {!loading && images.length === 0 && (
        <div className="w-full text-center text-gray-500 py-8">
          <p className="text-lg">هنوز تصویری آپلود نشده است</p>
          <p className="text-sm mt-2">برای شروع، یک تصویر آپلود کنید</p>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white px-8 py-6 rounded-lg shadow-xl">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-lg">در حال پردازش...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgProfile