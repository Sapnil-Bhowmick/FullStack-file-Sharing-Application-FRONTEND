import './share.css';
import React from 'react'
import { UserProfile } from '../Services/api';

import tick from '../Images/tick.png'
import pdflogo from '../Images/pdflogo.png'
import exelogo from '../Images/exelogo.png'
import ziplogo from '../Images/ziplogo.png'
import docxlogo from '../Images/docxlogo.png'
import htmllogo from '../Images/htmllogo.png'
import wavlogo from '../Images/wavlogo.png'
import pptxlogo from '../Images/pptxlogo.png'
import textlogo from '../Images/textlogo.png'
import xlsxlogo from '../Images/xlsxlogo.png'
import movlogo from '../Images/movlogo.png'


const Thumbnail = (props) => {

  const updateRef = React.useRef()
  const [isCopied, setIsCopied] = React.useState(false)


  console.log('File List : Thumbnail', props.filelist)


  const copytext = async (text) => {

    if (window.navigator.clipboard) {

      try {
        await window.navigator.clipboard.writeText(text)
        setIsCopied(true)
      }
      catch (error) {

        alert('Failed to copy text');
      }
    }

    else {

      alert('Clipboard is disbled or Unsupported')
    }

  }





  const copyLink = (link) => {
    copytext(link)
    Notification(props.filename, 'Link has been copied', true)
  }

  const Notification = (filename, message, isSuccess) => {
    // console.log(filename, message)

    if (isSuccess) {
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
    else {
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
      Notification(props.filename, resp.data, true)
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

      console.log('Files after Updating', files)

      props.setFileList([...files])

      setIsCopied(false)


      let PreviewList = props.previewurlList
      // console.log('PreviewList' , PreviewList)
      PreviewList[index] = url
      props.setPreviewurlList([...PreviewList])

      Notification(props.filename, 'File has been Updated', true)
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


  const detectFileType = (filename) => {


    const splitted_arr_length = filename?.split(".").length
    // console.log('name' , splitted_arr_length[])

    const extension = filename.split(".")[splitted_arr_length - 1].toLowerCase()
    return extension

  }


  return (
    <div className='upload-section'>
      <div>
        {
          detectFileType(props.filename) === "exe" ? (<img src={exelogo} />) : (
            detectFileType(props.filename) === "pdf" ? (<img src={pdflogo} />) : (
              detectFileType(props.filename) === "zip" ? (<img src={ziplogo} />) : (
                detectFileType(props.filename) === "docx" ? ((<img src={docxlogo} />)) : (
                  detectFileType(props.filename) === "wav" ? ((<img src={wavlogo} />)) : (
                    detectFileType(props.filename) === "html" ? ((<img src={htmllogo} />)) : (
                      detectFileType(props.filename) === "wav" ? ((<img src={wavlogo} />)) : (
                        detectFileType(props.filename) === "pptx" ? ((<img src={pptxlogo} />)) : (
                          detectFileType(props.filename) === "txt" ? ((<img src={textlogo} />)) : (
                            detectFileType(props.filename) === "xlsx" ? ((<img src={xlsxlogo} />)) :
                              detectFileType(props.filename) === "mov" ? ((<img src={movlogo} />)) : (
                                <object data={props.Previewurl} className='previewImg' ></object>
                              )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        }


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
        <select onChange={(e) => handleDropdown(e)} className='dropdown'>
          <option value="Share" selected>{isCopied ? 'Copied Link' : 'Share Link'} </option>
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


export default Thumbnail