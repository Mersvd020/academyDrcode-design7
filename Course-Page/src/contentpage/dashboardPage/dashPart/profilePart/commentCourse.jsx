import React, { useState, useEffect } from 'react'
import CommentImg from "../../../../assets/icon/comment.png"
import apiClient from '../../../../hook/interceptor'

const CommentCourse = () => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await apiClient.get("/SharePanel/GetMyCoursesComments");
        const allComments = res.data.myCommentsDtos || [];

        const normalized = allComments.map(comment => ({
          id: comment.id,
          author: comment.author,
          text: comment.describe,
          date: comment.insertDate,
        }));

        setReplies(normalized);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchReplies();
  }, []);

  return (
    <div className="w-full border-b border-[#eee] flex flex-col h-[50%]">
      <span className="w-full font-semibold mb-2">دوره ها</span>

      <div className="w-full my-scroll overflow-y-auto" dir="ltr">
        {replies.length === 0 ? (
          <p className="text-center p-4" dir="rtl">هیچ نظری وجود ندارد</p>
        ) : (
          replies.map((reply) => (
            <div key={reply.id} className="bg-gray-50 rounded-[25px] p-4 border border-[gray]/50 m-2" dir="rtl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full overflow-hidden">
                  <img className="w-full h-full" src={CommentImg} alt="User" />
                </div>
                <div className="flex flex-row justify-between w-full">
                  <h4 className="font-medium text-gray-800">{reply.author}</h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {new Date(reply.date).toLocaleDateString('fa-IR')}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm pr-2">{reply.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentCourse