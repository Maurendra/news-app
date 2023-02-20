import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import queryString from "query-string";
import NewsApiRepositories from "../../config/data/repositories/NewsApiRepositories";
import NYRepositories from "../../config/data/repositories/NYRepositories";
import TheGuardianRepositories from "../../config/data/repositories/TheGuardianRepositories";
import Loading from "../../components/Loading";
import dayjs from "dayjs";
import { type } from "@testing-library/user-event/dist/type";

export default () => {
  const { search } = useLocation();
  const [categories, setCategories] = useState([
    '#GenZMemilih', 'Tech', 'Sport', 'Business', 'Hype', 'Korea', 'News', 'Life', 'Health', 'Community'
  ])
  const [type, setType] = useState(queryString.parse(search)?.type ?? "ny")
  const [newsApi, setNewsApi] = useState([])
  const [newsNY, setNewsNY] = useState([])
  const [newsGuardian, setNewsGuardian] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState(queryString.parse(search)?.q ?? "")

  const onTypeChanged = async e => {
    setType(e.target.value)
    await getData(e.target.value, query)
  }

  const onQueryKeyDown = async e => {
    if (e.keyCode == 13 || e.code == "Enter") {
      await getData(null, query)
    }
  }

  const onSubmitSearch = async() => {
    console.log(query, "q");
    await getData(null, query)
  }

  const getNewsApiOrg = async query => {
    console.log("test na");
    const resp = await NewsApiRepositories.getNews("q="+(query??"news"))
    if (!resp.error) {
      setNewsApi(resp.data?.articles || [])
    }
  };

  const getNYTimes = async query => {
    console.log("test ny");
    const resp = await NYRepositories.getNews("q="+query)
    console.log(resp);
    if (!resp.error) {
      setNewsNY(resp.data?.response?.docs || [])
    }
  };

  const getTheGuardian = async query => {
    console.log("test g");
    const resp = await TheGuardianRepositories.getTopHeadline("q="+query)
    if (!resp.error) {
      setNewsGuardian(resp.data?.response?.results || [])
    }
  };

  const getData = async(selectedType = null, query = "") => {
    let newType = selectedType ?? type;
    setIsLoading(true)
    switch (newType) {
      case "ny":
        await getNYTimes(query)
        break;

      case "na":
        await getNewsApiOrg(query)
        break

      case "guardian":
        await getTheGuardian(query)
        break
    
      default:
        break;
    }
    console.log("done");
    setIsLoading(false)
  }

  const renderData = () => {
    switch (type) {
      case "ny":
        return renderNy()

      case "na":
        return renderNewsApi()

      case "guardian":
        return renderGuardian()
    }
  }

  const renderNy = () => {
    console.log(newsNY, "hmm");
    return (
      newsNY?.map((news, idx)=>(
        <div className="my-2" key={`news-${idx}-ny`}>
          <a href={news.web_url} target="_blank">
            <div className="flex space-x-5 py-2 w-full cursor-pointer">
              <div className="w-[10rem] lg:w-[20rem] max-w-[10rem] lg:max-w-[20rem] min-w-[10rem] lg:min-w-[20rem]">
                <img 
                  className="w-full col-span-2 object-cover rounded-md h-40"
                  src={news.urlToImage ?? "default-news.jpeg"}
                />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-semibold">
                  {news.pub_date ? dayjs(news.pub_date).format("DD-MM-YYYY | HH:mm") : "-"}
                </p>
                <p className="text-gray-900 text-lg lg:text-2xl font-semibold mt-2 hover:text-red-500">
                  {news.headline?.main}
                </p>
              </div>
            </div>
          </a>
        </div>
      ))
    )
  }

  const renderGuardian = () => {
    return (
      newsGuardian?.map((news, idxG)=>(
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
      ))
    )
  }

  const renderNewsApi = () => {
    return (
      newsApi?.map((news, idxNA)=>(
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
      ))
    )
  }

  useEffect(() => {
    getData(type, query)
  }, [])

  useEffect(() => {
    setQuery(queryString.parse(search)?.q ?? "")
    getData(queryString.parse(search)?.type ?? "ny", queryString.parse(search)?.q ?? "")
  }, [search])
  return (
    <div>
      <div className="bg-white mx-2 lg:mx-40">
        <div className="border-b border-r border-l flex items-center text-xs lg:text-sm">
            <div className="py-2 px-4 border-r">
              <p className="text-red-500">
                Search
              </p>
            </div>
            <div className="flex flex-1">
              {/* <p className="text-gray-500">
                Amnesty Internasional Tak Setuju Sambo Divonis Mati: Ketinggalan Zaman
              </p> */}
              <input type="text" class="py-2 px-4 flex flex-1 focus:outline-0" placeholder="Search here..." value={query} onChange={(e) => {setQuery(e.target.value)}} onKeyDown={onQueryKeyDown}></input>
            </div>
            <div className="py-2 px-4 border-l flex space-x-3 cursor-pointer" onClick={onSubmitSearch}>
              <p className="text-red-500">
                <FaSearch/>
              </p>
            </div>
        </div>
        <div className="py-2 block lg:flex space-x-5">
          <div className="w-full lg:w-1/4 border h-fit">
            <div className="px-4 py-2 bg-red-500">
              <p className="text-white">
                Filter
              </p>
            </div>
            <div className="px-4 py-2">
              <div className="my-2">
                <p>
                  Source
                </p>
                <div className="text-sm">
                  <div className="flex space-x-3">
                    <input type="radio" value="ny" name="source" onChange={onTypeChanged} checked={type == "ny"} /> 
                    <p>New York Times</p>
                  </div>
                  <div className="flex space-x-3">
                    <input type="radio" value="guardian" name="source" onChange={onTypeChanged} checked={type == "guardian"} /> 
                    <p>The Guardian</p>
                  </div>
                  <div className="flex space-x-3">
                    <input type="radio" value="na" name="source" onChange={onTypeChanged} checked={type == "na"} /> 
                    <p>News API Org</p>
                  </div>
                </div>
              </div>
              {/* <div className="my-2">
                <p>
                  Category
                </p>
                <div className="text-sm">
                  <div className="flex space-x-3">
                    <input type="radio" value="ny" name="category" /> 
                    <p>New York Times</p>
                  </div>
                  <div className="flex space-x-3">
                    <input type="radio" value="tg" name="category" /> 
                    <p>The Guardian</p>
                  </div>
                  <div className="flex space-x-3">
                    <input type="radio" value="na" name="category" /> 
                    <p>News API Org</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <Loading />
            ) : 
              renderData()
            }
          </div>
        </div>
      </div>
    </div>
  );
};
