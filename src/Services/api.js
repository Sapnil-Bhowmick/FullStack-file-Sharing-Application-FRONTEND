


import React, {
    createContext,
    useState,
    useContext,
    useEffect
} from "react";
import Configs from '../Config/config'
import axios from "axios";


const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [progress , setProgress] = useState({started: false , upload_per: 0})
    const [filelist , setFileList] = useState([])
    // const [isCopied , setIsCopied] = useState(false)


    const UploadSingle = async (filedata) => {

        // console.log('data', filedata)

        setProgress((prev) => {
            return {...prev , started: true}
        } )

        try {
            const resp = await axios.post(Configs.Api_URL + Configs.Upload_SingleImage, filedata,

                {
                    onUploadProgress: (ProgressEvent) => {
                        let uploadProgress =  Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                        setProgress((prev) => {
                            return {...prev , upload_per: uploadProgress}
                        } )
                    },


                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },

                })

            // setIsCopied(false)
            setFileList((prev) => {
                return [...prev , resp.data]
            })
            return resp.data
        }
        catch (error) {
            console.error("Error while calling the api : ", error.message)
        }
    }




    const UploadMultiple = async (filearr) => {
        // console.log('data', filearr)

        try {
            const resp = await axios.post(Configs.Api_URL + Configs.Upload_MultipleImages, filearr,

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },

                })

            // setIsCopied(false)
            return resp.data
        }
        catch (error) {
            console.error("Error while calling the api : ", error.message)
        }
    }




    const DeleteFile = async(fileid) => {
        
        try{
            const resp = await axios.delete(Configs.Api_URL + "/" + fileid)
            return resp
        }
        catch(error){
            console.error("Error while calling the api : ", error.message)
        }

    }


    const UpdateFile = async(fileid , arg) => {

        // console.log(fileid , arg)
        
        try{
            const resp = await axios.put(Configs.Api_URL + "/" + fileid , arg , 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })

            return resp
        }
        catch(error){
            console.error("Error while calling the api : ", error.message)
        }

    }


    const LatestFiles = async() => {
        try{
            const resp = await axios.get(Configs.Api_URL + Configs.Latest_Docs)

            console.log("Latest Docs" , resp)
        }
        catch(error){
            console.error("Error while calling the api : ", error.message)
        }

    }



    return (
        <UserContext.Provider
            value={{
                UploadSingle,
                UploadMultiple,
                DeleteFile,
                UpdateFile,
                LatestFiles,
                filelist,
                setFileList,
                progress,
                // isCopied,
                // setIsCopied
            }}
        >
            {children}

        </UserContext.Provider>
    )
}


function UserProfile() {
    const context = useContext(UserContext)
    return context
}


export { UserContext, UserProvider, UserProfile }


