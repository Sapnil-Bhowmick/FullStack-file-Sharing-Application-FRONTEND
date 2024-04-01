import './share.css';
import React from 'react'
import { UserProfile } from '../Services/api';
import uploadImg from '../Images/upload.png'
import Thumbnail from './Thumbnail';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileLimit = 5

function FileShare() {

    const {
      UploadSingle,
      UploadMultiple,
      DeleteFile,
      UpdateFile,
      LatestFiles,
      filelist,
      setFileList,
      progress,
      isCopied,
      copytext
    } = UserProfile()
  
    const uploadSingleRef = React.useRef()
    const droparea = React.useRef()
    const divRef = React.useRef()
  
  
    console.log('File List : Fileshare' ,filelist )
  
    const [previewurlList, setPreviewurlList] = React.useState([])
    const [uploaderror, setUploadError] = React.useState('')



    const Notification = (filename, message , isSuccess) => {
      // console.log(filename, message)
  
      if (isSuccess){
        toast.success(
          `${filename && filename}:  ${message}`,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          })
      }
      else{
        toast.warn(
          `${message}`,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          })
      }
      
  
    }
  
  
    const onDragLeave = (e) => {
      // console.log("Drag Leave")
      droparea.current.style.backgroundColor = '#0a083c'
    }
  
  
    const onDragOver = (e) => {
      // console.log('Dragging over')
      divRef.current.style.backgroundColo = 'red'
      droparea.current.style.backgroundColor = 'rgb(20, 15, 136)'
      
      e.preventDefault()
    }
  
    const onDrop = (e) => {
      e.preventDefault()
      droparea.current.style.backgroundColor = '#0a083c'
      const files = e.dataTransfer.files
      const items = e.dataTransfer.items
  
  
      // * Some browser genarates files and others items and some both
  
      if (items) {
        // & Converting filelist into array of file objects
        ProcessItems([...items])
      }
      else if (files) {
        // & Converting filelist into array of file objects
        ProcessFiles([...files])
      }
      else if (items && files) {
        // & Converting filelist into array of file objects
        ProcessFiles([...files])
      }
  
  
    }
  
  
    const ProcessItems = (itemsArray) => {
      // * Storing only files in items
      const files = itemsArray
        .filter((item) => item.kind === 'file')
        .map((item) => item.getAsFile())
        .filter((item) => item !== null)
  
      ProcessFiles(files)
  
    }
  
    const ProcessFiles = (filesArray) => {
      // console.log('dragList', filesArray)
      if (filesArray.length > FileLimit) {
        Notification(null , `Cannot Upload more than ${FileLimit} files at a time. Please consider reuploading.` , false)
        return
      }
      else {
        filesArray.forEach((file) =>
          getDownloadLink(file))
      }
  
    }
  
  
    const DomUrlString = (fileobj) => {
      const url = URL.createObjectURL(fileobj)
  
      return url
    }
  
  
    //  ******  Single File Upload  **********   
  
  
  
    const getDownloadLink = async (fileObj) => {
      if (fileObj) {
  
        const url = DomUrlString(fileObj)
        setPreviewurlList((prev) => {
          return [...prev, url]
        })
  
        const data = new FormData()
        data.append("name", fileObj.name)
        data.append("Singlefile", fileObj)
        const response = await UploadSingle(data)
        // console.log('Response', response)
  
      }
      else {
        setUploadError('No File Chosen')
      }
    }
  
    // console.log('previewurllist', previewurlList)
  
    const handleSingleFileUpload = () => {
      uploadSingleRef.current.click()
    }
  
  
    const handleSingleImg = (e) => {
      // & Converting filelist into array of file objects
      const uploadedFilelist = [...e.target.files]
  
      if (uploadedFilelist.length > FileLimit) {
        // console.error(`Please Select ${FileLimit} files at max `)
        Notification(null , `Cannot Upload more than ${FileLimit} files at a time. Please consider reuploading.` , false)
      }
      else {
        uploadedFilelist.forEach((file) => {
          getDownloadLink(file)
        })
      }
  
  
    }
  
  
  
    return (
      <div className="App">
  
  
        <div className='container'>
  
          <div className='single-main'>
            <div className='single-Text'>Upload File</div>
  
            <div
              ref={droparea}
              className='single-uploadarea'
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
            >
              <div ref = {divRef}>
                <div className='single-imgdiv'>
                  <img src={uploadImg} className='single-uploadLogo' />
                </div>
                <div className='single-text'> Drag and Drop file Here or
                  <span
                    className='single-filelink'
                    onClick={() => handleSingleFileUpload()}
                  > Choose File</span>
                </div>
              </div>
            </div>
          </div>
  
  
  
          <div className={`${filelist?.length !== 0 ? 'thumbnail-container' : 'hide-thumbnail-container'} `} >
            {
              filelist && filelist.length !== 0 && filelist.slice(-FileLimit).map((item, index) => (
  
                <Thumbnail
                  key={index}
                  filename={item.filename}
                  downloadLink={item.downloadPath}
                  Previewurl={previewurlList.slice(-FileLimit)[index]}
                  progress={progress}
                  isCopied={isCopied}
                  copytext={copytext}
                  uploaderror={uploaderror}
                  DeleteFile={DeleteFile}
                  UpdateFile={UpdateFile}
                  index={index}
                  filelist={filelist.slice(-FileLimit)}
                  setFileList={setFileList}
                  previewurlList={previewurlList.slice(-FileLimit)}
                  setPreviewurlList={setPreviewurlList}
                  handleSingleFileUpload={handleSingleFileUpload}
                  DomUrlString={DomUrlString}
                  toast={toast}  
                />
  
              ))
            }
          </div>
  
  
          <input
            ref={uploadSingleRef}
            type='file'
            multiple={true}
            className='uploadInp'
            onChange={(e) => handleSingleImg(e)}
          />
        </div>
  
        <ToastContainer />
      </div >
    );
  }

  export default FileShare