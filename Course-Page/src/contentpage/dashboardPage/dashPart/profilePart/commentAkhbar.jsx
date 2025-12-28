import React, { useEffect, useState } from 'react'
import apiClient from '../../../../hook/interceptor'
import CommentImg from "../../../../assets/icon/comment.png"

const CommentAkhbar = ({ newsId }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await apiClient.get(`/SharePanel/GetMyNewsComments`);
        const allComments = res.data.myNewsCommetDtos || [];
        
        const filteredComments = newsId 
          ? allComments.filter(comment => comment.newsId === newsId)
          : allComments;
        
        setReplies(filteredComments);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReplies();
  }, [newsId]);

  if (loading) {
    return <div className="text-center p-4">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center font-extrabold p-4 text-red-500">خطا در بارگذاری لطفا صحفه را رفرش کنید</div>;
  }

  return (
    <div className="w-full h-full flex flex-col border-t-1 border-neutral-400">
      <span className="w-full mb-2 font-semibold">اخبار و مقالات</span>
      <div className="w-full flex-1 overflow-y-auto" dir="ltr">
        {replies.length === 0 ? (
          <p className="text-center p-4" dir="rtl">هیچ نظری وجود ندارد</p>
        ) : (
          replies.map((reply) => (
            <div key={reply.id} className="bg-gray-50 rounded-[25px] p-4 border border-[gray]/50 m-2" dir="rtl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                  <img className="w-full h-full rounded-full" src={CommentImg} alt="User" />
                  {/* <span className="text-sm font-bold text-blue-600">
                    {reply.userId}
                  </span> */}
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>
                    <h4 className="font-medium text-gray-800">{reply.title}</h4>
                    <p className="text-xs text-gray-500">کاربر #{reply.userId}</p>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    {new Date(reply.inserDate).toLocaleDateString('fa-IR')}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm pr-2">{reply.describe}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentAkhbar