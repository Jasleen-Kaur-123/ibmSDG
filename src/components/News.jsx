



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import { Pagination, Stack } from '@mui/material';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      const fetchNews = async () => {
        try {
          const apiKey = '6372363b03ed4eca80e52282511b7738'; 
          const keywords = "sustainable development goals";
          const response = await axios.get(`https://newsapi.org/v2/everything?q=${keywords}&apiKey=${apiKey}&pageSize=20`);
          setArticles(response.data.articles);
          console.log(response.data.articles);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      };
  
      fetchNews();
    }, []);

    const newsPerPage = 7;

    const paginate = (event, value) => {
      setCurrentPage(value);
    }
  
    const lastIndexOfNews = currentPage * newsPerPage;
    const firstIndexOfNews = lastIndexOfNews - newsPerPage;
  
    const currentNews = articles.slice(firstIndexOfNews, lastIndexOfNews);

    if (!articles.length) {
      return <div>Loading...</div>;
    }

    const colors = ['#F31D38', '#4C9F38', '#C5192D', '#FF2C1E', '#30B2E5', '#F6C609', '#A21942', '#FB6431', '#DA146A',
      '#FD9D24', '#BF8B2E', '#FEF3D0', '#0A97D9', '#56C02B', '#00689D', '#19486A'];

    return (
      <div className='py-12 w-full h-full overflow-x-hidden relative'>

        <div className='text-3xl w-full h-[20rem] absolute top-0 right-0 center font-bold bg-[#3F7E44] text-center text-white'>
          <p className='news-heading mt-20'>The Most Recent News Articles Concerning Sustainable Development Goals.</p>
          <div className=' text-white'> 
            <ul className='flex gap-5 text-sm font-normal absolute top-72 left-10'>
              <li className='items-center'>Latest News</li>
              <li className='items-center'> Top News</li>
              <li className='items-center'> Sustainable Development Goals</li>
              <li className='items-center'> Trending 20</li>
            </ul>
          </div>
        </div>

        <div className='flex justify-center w-[100%] mx-auto mt-[25%]'>
          <div className='w-[80%]'>
            {currentNews.map((item, index) => (
              <div
                key={index}
                style={{ border: `4px solid ${colors[index % colors.length]}` }}
                onClick={() => window.open(item.url, '_blank')}
                className='bg-white cursor-pointer rounded-md mt-10'
              >
                <NewsCard news={item} index={firstIndexOfNews+index} /> 
              </div>
            ))}
          </div>
        </div>

        <Stack mt="100px" alignItems="center" justifyContent="center" width="100%">
          {articles.length > newsPerPage && (
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(articles.length / newsPerPage)}
              page={currentPage}
              onChange={paginate}
              size="large"
            />
          )}
        </Stack>
      </div>
    );
};

export default News;
