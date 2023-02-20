import { useState, useContext, useEffect } from "react";
import { FaSearch, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Provider from "../../config/data/Provider";
import { useNavigate } from "react-router-dom";
import NewsApiRepositories from "../../config/data/repositories/NewsApiRepositories";
import NYRepositories from "../../config/data/repositories/NYRepositories";
import TheGuardianRepositories from "../../config/data/repositories/TheGuardianRepositories";
import dayjs from "dayjs";
import Loading from "../../components/Loading";

export default () => {
  const [newsApi, setNewsApi] = useState([])
  const [newsNY, setNewsNY] = useState([])
  const [newsGuardian, setNewsGuardian] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const [trendingNews, setTrendingNews] = useState([])

  const getNewsApiOrg = async query => {
    const resp = await NewsApiRepositories.getTopHeadline()
    if (!resp.error) {
      setNewsApi(resp.data?.articles || [])
    }
    console.log(resp, "na");
  };

  const getNYTimes = async query => {
    const resp = await NYRepositories.getTopHeadline()
    if (!resp.error) {
      setNewsNY(resp.data?.results || [])
    }
    console.log(resp, "ny");
  };

  const getTheGuardian = async query => {
    const resp = await TheGuardianRepositories.getTopHeadline()
    if (!resp.error) {
      setNewsGuardian(resp.data?.response?.results || [])
    }
    console.log(resp, "tg");
  };

  const getData = async () => {
    setIsLoading(true)
    await getNewsApiOrg()
    await getNYTimes()
    await getTheGuardian()
    setIsLoading(false)
  }

  const goToList = (type = "ny") => {
    navigate("/list?type="+type)
  }

  useEffect(()=>{
    getData()
  }, [])
  return (
    <div>
      <div className="bg-white mx-2 lg:mx-40">
        <div className="border-b border-r border-l flex items-center text-xs lg:text-sm">
            <div className="py-2 px-4 border-r">
              <p className="text-red-500">
                Trending
              </p>
            </div>
            <div className="py-2 px-4 flex flex-1">
              <p className="text-gray-500">
                For a Stable, Strong Core, Forget About Crunches
              </p>
            </div>
            <div className="py-2 px-4 border-l flex space-x-3">
              <p className="text-red-500">
                <FaAngleLeft/>
              </p>
              <p className="text-red-500">
                <FaAngleRight/>
              </p>
            </div>
        </div>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="py-2 border-b">
                <div className="flex space-x-3 items-center mt-10">
                  <div className="h-1 bg-gray-900 flex flex-1">
                  </div>
                  <p className="font-bold text-3xl text-gray-900">
                    New York Times
                  </p>
                  <div className="h-1 bg-gray-900 flex flex-1">
                  </div>
                </div>
                {newsNY?.map((news, idx)=>{
                  if (idx < 5) {
                    return (
                      <div className="my-2" key={`news-${idx}-ny`}>
                        <a href={news.url} target="_blank">
                          <div className="flex space-x-5 py-2 w-full cursor-pointer">
                            <div className="w-[10rem] lg:w-[20rem] max-w-[10rem] lg:max-w-[20rem] min-w-[10rem] lg:min-w-[20rem]">
                              <img 
                                className="w-full col-span-2 object-cover rounded-md h-40"
                                src={news.urlToImage ?? "default-news.jpeg"}
                              />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 font-semibold">
                                {news.published_date ? dayjs(news.published_date).format("DD-MM-YYYY | HH:mm") : "-"}
                              </p>
                              <p className="text-gray-900 text-lg lg:text-2xl font-semibold mt-2 hover:text-red-500">
                                {news.title}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    )
                  }
                })}
                <div className="my-2">
                  <div className="px-4 py-2 border border-red-500 text-red-500 cursor-pointer rounded-md w-fit" onClick={() => { goToList("ny") }}>
                    See all
                  </div>
                </div>
              </div>
              <div className="py-2 border-b">
                <div className="flex space-x-3 items-center mt-10">
                  <div className="h-1 bg-gray-900 flex flex-1">
                  </div>
                  <p className="font-bold text-3xl text-gray-900">
                    The Guardian
                  </p>
                  <div className="h-1 bg-gray-900 flex flex-1">
                  </div>
                </div>
                {newsGuardian?.map((news, idxG)=>{
                  if (idxG < 5) {
                    return (
                      <div className="my-2" key={`news-${idxG}-g`}>
                        <a href={news.webUrl} target="_blank">
                          <div className="flex space-x-5 py-2 w-full cursor-pointer">
                            <div className="w-[10rem] lg:w-[20rem] max-w-[10rem] lg:max-w-[20rem] min-w-[10rem] lg:min-w-[20rem]">
                              <img 
                                className="w-full col-span-2 object-cover rounded-md h-40"
                                src={news.urlToImage ?? "default-news.jpeg"}
                              />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 font-semibold">
                                {news.webPublicationDate ? dayjs(news.webPublicationDate).format("DD-MM-YYYY | HH:mm") : "-"}
                              </p>
                              <p className="text-gray-900 text-lg lg:text-2xl font-semibold mt-2 hover:text-red-500">
                                {news.webTitle}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    )
                  }
                })}
                <div className="my-2">
                  <div className="px-4 py-2 border border-red-500 text-red-500 cursor-pointer rounded-md w-fit" onClick={() => { goToList("guardian") }}>
                    See all
                  </div>
                </div>
              </div>
              <div className="py-2 border-b">
                <div className="flex space-x-3 items-center mt-10">
                  <div className="h-1 bg-gray-900 flex flex-1">
                  </div>
                  <p className="font-bold text-3xl text-gray-900">
                    NewsAPI.org
                  </p>
                  <div className="h-1 bg-gray-900 flex flex-1">
                  </div>
                </div>
                {newsApi?.map((news, idxNA)=>{
                  if (idxNA < 5) {
                    return (
                      <div className="my-2" key={`news-${idxNA}-na`}>
                        <a href={news.url} target="_blank">
                          <div className="flex space-x-5 py-2 w-full cursor-pointer">
                            <div className="w-[10rem] lg:w-[20rem] max-w-[10rem] lg:max-w-[20rem] min-w-[10rem] lg:min-w-[20rem]">
                              <img 
                                className="w-full col-span-2 object-cover rounded-md h-40"
                                src={news.urlToImage}
                              />
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 font-semibold">
                                {news.publishedAt ? dayjs(news.publishedAt).format("DD-MM-YYYY | HH:mm") : "-"}
                              </p>
                              <p className="text-gray-900 text-lg lg:text-2xl font-semibold mt-2 hover:text-red-500">
                                {news.title}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    )
                  }
                })}
                <div className="my-2">
                  <div className="px-4 py-2 border border-red-500 text-red-500 cursor-pointer rounded-md w-fit" onClick={() => { goToList("na") }}>
                    See all
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
