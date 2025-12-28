import React, { useEffect, useState } from "react";
import apiClient from "../../hook/interceptor";

import vect from "../../assets/landPagePic/vect.png";
import vect2 from "../../assets/landPagePic/vect2.png";
import TitleLanding from "./reusableComps/titleLanding";
import NewsCard from "./reusableComps/NewsCard";

const News = ({nightMode}) => {
  const [news, setNews] = useState([]);
  // console.log("newsss",news)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiClient.get(
          "/News?PageNumber=1&RowsOfPage=3&SortingCol=InsertDate&SortType=DESC"
        );

        const items = res.data.news || [];

        setNews(items);
      } catch (err) {
        console.error("Error loading news:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="flex flex-col items-center gap-12 lg:w-[75%] m-auto mb-40 relative">
      <TitleLanding
       nightMode={nightMode}
        title="با هر خبر ، از همه جلوتر"
        image1={vect}
        image2={vect2}
        text="خبر های داغ دریچه ای به دنیای تازه ها"
      />

      <div className="flex lg:flex-row flex-col gap-10 justify-items-center">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            miniDescribe={item.miniDescribe}
            image={item.currentImageAddress || null}
            views={item.currentView}
            rate={item?.newsRate?.avg}
            author={item.addUserFullName}
          
          />
        ))}
      </div>
    </section>
  );
};

export default News;
