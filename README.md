## SnapShot of the Application
___

![snapshot](https://github.com/Sapnil-Bhowmick/FullStack-file-Sharing-Application-FRONTEND/assets/118714419/8768474f-bb6c-4d06-af9c-a5c310c2986e)

## ShareMe - 4 step process
___

* Upload the required File
* The File will be processed generating the download link 
* Share the generated link to download the File



## ShareMe - A File Sharing Application 
___

* It is a fast and flexible file sharing application where users can upload files of **any type and size**, from documents and presentations to photos and videos. Say goodbye to the constraints of traditional file sharing methods - no more worrying about attachment limits or file compatibility issues. **ShareMe** ensures that your files are perfectly uploaded and readily accessible for sharing.


## About The Project
___
* **This is a full-stack fast and Flexible File sharing application with dynamic and real-time functionality.**

## Project Features
___

* Users can Upload as many files as they want and of any size. There is no restrictions on the file size , no of times a file gets downloaded and on the no of files a user can upload.


* A drag & drop area has been made for users to drag and drop multiple files at once. Users can also click on **Choose File** and either upload single or multiple files. 

* On uploading a file the download section will pop-up which has **4 visible properties** 
  - A real time preview of the uploaded file (For any video, image, audio)
  - The name of the uploaded file
  - Progress Bar : It shows the real-time upload progress of the file at any time. When the uploading of the entire file is successful and complete, a tick mark will be shown indicating successful upload.
  - A Dropdown
    + **Share Link**: Select this option to copy the download link and share with anyone

    + **Update File**: Users can update any of the required files by choosing any file from the local machine and can see in real-time the new download link , name, preview and status bar immediately being populated.

    + **Delete File**: After sharing the link and once the required file has been downloaded, users can delete that file from the database if they want. The specific file will be immediately deleted permanently from DB. The deleted file won't be visible anymore in the list of uploads in the  download section of UI.


* When a video or audio file is uploaded or updated, in the preview autoplay will occur, which the user can pause or play as desired.

* Users can also upload a single folder containing files by clicking on **Choose Folder**. Make sure that the number of files within that folder is not greater than 5 since users can Upload at most 5 files **at once** 

## ShareMe - Notifications 

* Notification is provided for any of the successful operation choosen from dropdown along with the file name being updated , deleted or whose download link has been copied.

* Users **won't** be able to upload more than 5 files **all at once** through drag & drop or using "Choose File" link. A notification would pop up in such a case 

* Users can Upload at most 5 files **at once** (if needed)



* > ## *At max 5 latest files uploaded will be displayed in UI*

## Supported File Formats

* **All image files**
* **Video files**
* **Audio files**

## Specific Supported File Formats

*  **.exe**
*  **.pdf**
*  **.zip**
*  **.docx**
*  **.wav**
*  **.html**
*  **.pptx**
*  **.txt**
*  **.xlsx**
*  **.mov**



## More Features That could be added
___

* Authentication can be implemented
* Email feature can be implemented for directly mailing the links -- **(Easy)**
* Groups and Contacts Lists can be created which will help in gaining in productivity for recurring transfers.




  
