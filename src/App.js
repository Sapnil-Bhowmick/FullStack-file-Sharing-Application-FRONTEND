
import './App.css';
import React from 'react'
import { UserProfile } from './Services/api';
import uploadImg from './Images/upload.png'
import tick from './Images/tick.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileLimit = 5

function App() {

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
    droparea.current.style.backgroundColor = '#fff'
  }


  const onDragOver = (e) => {
    // console.log('Dragging over')
    droparea.current.style.backgroundColor = 'red'
    e.preventDefault()
  }

  const onDrop = (e) => {
    e.preventDefault()
    droparea.current.style.backgroundColor = '#fff'
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
            <div>
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



        <div div className={`${filelist?.length !== 0 ? 'thumbnail-container' : 'hide-thumbnail-container'} `} >
          {
            filelist && filelist.length !== 0 && filelist.map((item, index) => (

              <Thumbnail
                key={index}
                filename={item.filename}
                downloadLink={item.downloadPath}
                Previewurl={previewurlList[index]}
                progress={progress}
                isCopied={isCopied}
                copytext={copytext}
                uploaderror={uploaderror}
                DeleteFile={DeleteFile}
                UpdateFile={UpdateFile}
                index={index}
                filelist={filelist}
                setFileList={setFileList}
                previewurlList={previewurlList}
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

export default App;




const Thumbnail = (props) => {

  const updateRef = React.useRef()

  const copyLink = (link) => {
    props.copytext(link)
    Notification(props.filename, 'Link has been copied' , true)
  }

  const Notification = (filename, message , isSuccess) => {
    // console.log(filename, message)

    if (isSuccess){
      props.toast.success(
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
      console.log("In Warn")
      props.toast.warn(
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


  const handleDelete = async (Thumbnail_index) => {

    const fileId = props.downloadLink.split("/")[3]

    const resp = await props.DeleteFile(fileId)
    if (resp && resp.status === 200) {
      const List = props.filelist.filter((item, index) => index !== Thumbnail_index)
      props.setFileList([...List])

      const previewList = props.previewurlList.filter((item, index) => index !== Thumbnail_index)
      props.setPreviewurlList([...previewList])
      Notification(props.filename, resp.data , true)
    }
  }


  const handleUpdate = () => {
    updateRef.current.click()
  }

  const UpdateSingleImg = async (e, index) => {
    const fileId = props.downloadLink.split("/")[3]
    const file = e.target.files[0]
    const url = props.DomUrlString(file)

    const data = new FormData()
    data.append("Singlefile", file)
    const resp = await props.UpdateFile(fileId, data)

    if (resp.status === 200) {
      let files = props.filelist
      files[index] = resp.data
      props.setFileList([...files])


      let PreviewList = props.previewurlList
      // console.log('PreviewList' , PreviewList)
      PreviewList[index] = url
      props.setPreviewurlList([...PreviewList])

      Notification(props.filename, 'File has been Updated' , true)
    }


  }


  const handleDropdown = (e) => {
    const value = e.target.value
    if (value === "Share") {
      copyLink(props.downloadLink)
    }
    else if (value === "Update") {
      handleUpdate(props.index)
    }
    else if (value === "Delete") {
      handleDelete(props.index)
    }
  }


  return (
    <div className='upload-section'>
      <div>
        <object data={props.Previewurl} className='previewImg' ></object>
      </div>

      <div className='filename'>
        {props.filename?.length > 20 ? props.filename.substring(0, 20) : props.filename}
      </div>

      <div className='progressbar'>
        {
          props.progress.started && (
            <div className='progress-div'>
              <div className='progressMain'>
                <div className='progresschild' style={{ width: props.progress.upload_per }}>
                </div>
              </div>
              {
                props.progress.upload_per === 100 && (
                  <div className='tick'>
                    <img src={tick} />
                  </div>
                )
              }
            </div>



          )
        }


      </div>



      <div>
        <select onChange={(e) => handleDropdown(e)}>
          <option value="Share" selected>{props.isCopied ? 'Copied Link' : 'Share Link'} </option>
          <option value="Update">Update File</option>
          <option value="Delete" >Delete File</option>
        </select>
      </div>




      <input
        ref={updateRef}
        type='file'
        multiple={false}
        className='uploadInp'
        onChange={(e) => UpdateSingleImg(e, props.index)}
      />

    </div >
  )
}