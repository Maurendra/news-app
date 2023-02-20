import { useState, useContext, useEffect } from "react";
import { FaSearch, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import UserRepositories from "../config/data/repositories/UserRepositories";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../contexts/AuthContext";

export default () => {
  const [categories, setCategories] = useState([
    'Tech', 'Sport', 'Business', 'Hype', 'Korea', 'News', 'Life', 'Health', 'Community'
  ])
  const navigate = useNavigate();
  const { auth, setAuth, deleteAuth } = useContext(AuthContext)
  const [openModalSignUp, setOpenModalSignUp] = useState(false)
  const [usernameRegistration, setUsernameRegistration] = useState("")
  const [passwordRegistration, setPasswordRegistration] = useState("")
  const [openModalSignIn, setOpenModalSignIn] = useState(false)
  const [usernameLogin, setUsernameLogin] = useState("")
  const [passwordLogin, setPasswordLogin] = useState("")

  const onChangeUsernameRegistration = e => {
    setUsernameRegistration(e.target.value)
  }
  
  const onChangePasswordRegistration = e => {
    setPasswordRegistration(e.target.value)
  }
  
  const onChangeUsernameLogin = e => {
    setUsernameLogin(e.target.value)
  }
  
  const onChangePasswordLogin = e => {
    setPasswordLogin(e.target.value)
  }

  const goToHomePage = () => {
    navigate("/")
  }

  const goToList = (q = "") => {
    navigate(`/list?type=ny&q=${q}`)
  }
  
  const onRegister = async () => {
    let payload = {
      username: usernameRegistration,
      password: passwordRegistration
    }
    const resp = await UserRepositories.register(payload)
    if (!resp.error) {
      toast("Register successful")
      setUsernameRegistration("")
      setPasswordRegistration("")
      setOpenModalSignUp(false)
    }
  }

  const onLogin = async () => {
    let payload = {
      username: usernameLogin,
      password: passwordLogin
    }
    const resp = await UserRepositories.login(payload)
    if (!resp.error) {
      setAuth(resp.data)
      toast("Login successful")
      setUsernameLogin("")
      setPasswordLogin("")
      setOpenModalSignIn(false)
    }
  }

  const onLogout = () => {
    deleteAuth()
  }
  return (
    <div>
      <ToastContainer />
      <div className="bg-white px-2 lg:px-40 border-b border-gray-200 py-2">
        <div className="flex items-center justify-between space-x-5 py-4">
          <p className="text-red-500 font-bold text-2xl cursor-pointer" onClick={goToHomePage}>
            News
            <span className="text-gray-900">
              App
            </span>
          </p>
          {/* <div className="flex-1 flex justify-end pr-20">
            <FaSearch/>
          </div> */}
          <div className="flex items-center space-x-3">
            {!auth ? (
              <>
                <div className="border-2 border-red-500 px-4 py-2 rounded-md cursor-pointer" onClick={()=>setOpenModalSignUp(true)}>
                  <p className="text-red-500 font-bold text-sm">
                    Sign Up
                  </p>
                </div>
                <div className="border-2 border-red-500 px-4 py-2 rounded-md cursor-pointer" onClick={()=>setOpenModalSignIn(true)}>
                  <p className="text-red-500 font-bold text-sm">
                    Sign In
                  </p>
                </div>
              </>
            ) : (
              <div className="border-2 border-red-500 px-4 py-2 rounded-md cursor-pointer" onClick={onLogout}>
                <p className="text-red-500 font-bold text-sm">
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2 md:space-x-8 py-2 font-bold uppercase overflow-auto text-xs lg:text-lg">
          {categories?.map((category, idxCategory)=>(
            <p className="cursor-pointer hover:text-red-500" key={`category-${idxCategory}`} onClick={() => goToList(category)}>
              {category}
            </p>
          ))}
        </div>
      </div>
      
      {openModalSignUp && (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center">
          <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Sign Up
                      </h3>
                      <button type="button" onClick={()=>setOpenModalSignUp(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <p>
                        Username
                      </p>
                      
                      <input type="text" value={usernameRegistration} onChange={onChangeUsernameRegistration}  className="py-2 px-4 flex flex-1 border-slate-200 border-2 rounded-md w-full" placeholder="Username"></input>
                    </div>
                    <div className="space-y-2">
                      <p>
                        Password
                      </p>
                      
                      <input type="password" value={passwordRegistration} onChange={onChangePasswordRegistration} className="py-2 px-4 flex flex-1 border-slate-200 border-2 rounded-md w-full"></input>
                    </div>
                  </div>
                  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button onClick={onRegister} data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                      <button onClick={()=>setOpenModalSignUp(false)} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                  </div>
              </div>
          </div>
        </div>
      )}

      {openModalSignIn && (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center">
          <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Sign In
                      </h3>
                      <button type="button" onClick={()=>setOpenModalSignIn(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <p>
                        Username
                      </p>
                      
                      <input type="text" value={usernameLogin} onChange={onChangeUsernameLogin}  className="py-2 px-4 flex flex-1 border-slate-200 border-2 rounded-md w-full" placeholder="Username"></input>
                    </div>
                    <div className="space-y-2">
                      <p>
                        Password
                      </p>
                      
                      <input type="password" value={passwordLogin} onChange={onChangePasswordLogin} className="py-2 px-4 flex flex-1 border-slate-200 border-2 rounded-md w-full"></input>
                    </div>
                  </div>
                  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button onClick={onLogin} data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                      <button onClick={()=>setOpenModalSignIn(false)} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                  </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};
