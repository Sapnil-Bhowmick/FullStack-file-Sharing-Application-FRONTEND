import React from 'react'
import './Home.css'
import tick from '../Images/tick.png'
import uploadlogo from '../Images/uploadlogo.png'
import sharelogo from '../Images/sharelogo.png'
import processinglogo from '../Images/processinglogo.png'
import morelogo from '../Images/morelogo.png'
import FileShare from './FileShare'



const Home = () => {
    return (
        <div className='Main'>
            <div className='wrapper'>

                <div className='text-upload-div'>

                    <div className='text-div'>

                        <div className='application-name'>
                            ShareMe
                        </div>

                        <div className='upload-text'>
                            Upload & Share your files.
                        </div>

                        <div className='desc'>
                            Discover the file sharing solution with ShareMe. Effortlessly transfer files of any size securely and swiftly.
                            Try ShareMe today and revolutionize your sharing journey!"
                        </div>

                        <div className='desc1'>
                            With ShareMe, users can upload files of any type and size, from documents and presentations to photos and videos.
                            Say goodbye to the constraints of traditional file sharing methods - no more worrying about attachment limits or
                            file compatibility issues. ShareMe ensures that your files are perfectly uploaded and readily accessible for
                            sharing.
                        </div>

                        <div className='desc2'>
                            One of the standout features of ShareMe is its real-time updates. Users can seamlessly update and delete files,
                            with changes reflected instantly. Whether you're fine-tuning a document or replacing an outdated file,
                            ShareMe makes the process effortless and efficient. Say goodbye to cumbersome manual updates and hello
                            to seamless file management.
                        </div>



                    </div>

                    <div className='upload-div'>
                        <FileShare />
                    </div>

                </div>

                <div className='workingsteps-div'>
                    <div className='question'>
                        How it works?
                    </div>

                    <div className='steps'>
                        <div className='step1'>
                            <div className='step1-div'>
                                <img src={uploadlogo} className='step-logo' />
                                <div className='step-no'>
                                    1
                                </div>
                            </div>

                            <div className='step-text-div'>
                                <div className='step-name'> Upload </div>
                                <div className='step-desc'> Simply Select or drag & drop file in the desired zone. Either select single or multiple files </div>
                            </div>
                        </div>

                        <div className='step1'>
                            <div className='step1-div'>
                                <img src={processinglogo} className='step-logo' />
                                <div className='step-no'>
                                    2
                                </div>
                            </div>

                            <div className='step-text-div'>
                                <div className='step-name'> Process </div>
                                <div className='step-desc'> Wait till your files are uploaded to the server</div>
                            </div>
                        </div>

                        <div className='step1'>
                            <div className='step1-div'>
                                <img src={sharelogo} className='step-logo' />
                                <div className='step-no'>
                                    3
                                </div>
                            </div>

                            <div className='step-text-div'>
                                <div className='step-name'> Share </div>
                                <div className='step-desc'> Simply share the download link with anyone </div>
                            </div>
                        </div>

                        <div className='step1'>
                            <div className='step1-div'>
                                <img src={morelogo} className='step-logo' />
                                <div className='step-no'>
                                    4
                                </div>
                            </div>

                            <div className='step-text-div'>
                                <div className='step-name'> Update & Delete </div>
                                <div className='step-desc'> Update and Delete individual files at ease </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
