import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import background from '../../assests/undraw_Add_tasks_re_s5yj.png'; // Import your background image
import CampaignSend from './CampaignSend';
import { message } from 'antd';

const CampaignSelect = () => {
  const location = useLocation();
  const { selectedTemplate, formData, userData } = location.state || {};
  const { name, components, language } = selectedTemplate || {};
  console.log("formData", formData  );
  const [file, setFile] = useState(null);
  const [base64File, setBase64File] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [selectValues, setSelecttValues] = useState({});
  const [button, setButton] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showButton, setShowButton] = useState(false);

  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null);
  console.log("user", selectedTemplate);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(URL.createObjectURL(selectedFile));
        setBase64File(reader.result.split(',')[1]); // Get the base64 part of the result
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDateButtonClick = () => {
    setShowButton(!showButton);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleInputChange = (e, key) => {
    setInputValues({ ...inputValues, [key]: e.target.value });
  };

  const handleSelectChange = (e, key) => {
    setSelecttValues({ ...selectValues, [key]: e.target.value });
  };

  const handleSubmit = async () => {
    const input = {
      username: userData.username,
      access_token: userData.access_token,
      phone_number_id: userData.phone_number_id,
      campaign_name: formData.campaignName,
      owner_name: formData.campaignOwner,
      mobile_numbers: formData.group ? formData.group :formData.audience ,
      template_name: name,
      language_code: language,
      iscatalogue: button === true ? "true" : "false",
      date_time: selectedDate, // Use the selected date here
      variable1: inputValues,
      googleSheetapikey:formData.googleSheetApiKey,
      spreadsheetname:formData.spreadsheetName,
      googleSheetid:formData.googleSheetId,
      columnvariable1: selectValues,
      uploadedfileurl: base64File ?? " "
    };
    console.log('Data to be sent:', input);
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/Campaign/postCampaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        message.error('failed to send the data ');
        throw new Error('Network response was not ok');
      }
      message.success('Add sucess fully');
      const result = await response.json();
      console.log('Success:', result);
     
      // Handle success (e.g., show a success message, navigate to another page, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  useEffect(() => {
    if (components.some(component => component.type === 'BUTTONS')) {
      setButton(true);
    }
  }, [components]);

  if (!selectedTemplate) {
    return <div className="text-center text-gray-600 py-8">No template data available</div>;
  }

  return (
    <div className="bg-white">
      <div className="flex justify-center  mb-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 mt-4  text-white bg-green-600 px-[50px] rounded hover:bg-green-700"
        >
          SendNow
        </button>
        <button
          onClick={handleDateButtonClick}
          className="px-4 py-2 mt-4 ml-5 text-white bg-green-600  px-[50px] rounded hover:bg-green-700"
        >
         Schedule
        </button>
       {showButton && ( <input
          className='border-2 border-solid border-green-600 ml-10 rounded-lg text-sm text-green-500 focus:ring-green-700 focus:outline-none'
          type="date"
          ref={dateInputRef}
          value={selectedDate}
          onChange={handleDateChange}
        
        />)}
      </div>

      <div className="flex flex-col md:flex-row lg:ml-20">
        <div className="max-w-lg mx-auto md:w-1/2 rounded-lg overflow-hidden shadow-xl bg-white border border-gray-200 my-4 hover:shadow-xl transition-transform duration-300">
          <div className="p-6">
            <h5 className="text-xl font-bold text-gray-900 uppercase text-center mb-4">
              {name} <span className="text-gray-600">({language})</span>
            </h5>

            {components.map((component, index) => (
              <div key={index} className="mb-4">
                {component.type === 'HEADER' && (
                  <>
                    {component.format === 'IMAGE' && (
                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                        {file ? (
                          <img
                            src={file}
                            alt="Selected Image"
                            className="block w-full h-auto"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                          />
                        ) : (
                          <>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              ref={fileInputRef}
                              style={{ display: 'none' }}
                            />
                            <div
                              className="cursor-pointer"
                              onClick={handleIconClick}
                              style={{
                                width: '100%',
                                height: '200px',
                                backgroundImage: `url(${file || background})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                              }}
                            />
                          </>
                        )}
                      </div>
                    )}

                    {component.format === 'VIDEO' && (
                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                        {file ? (
                          <video
                            controls
                            className="block w-full h-auto"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                          >
                            <source src={file} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <>
                            <input
                              type="file"
                              accept="video/mp4"
                              onChange={handleFileChange}
                              ref={fileInputRef}
                              style={{ display: 'none' }}
                            />
                            <div
                              className="cursor-pointer"
                              onClick={handleIconClick}
                              style={{
                                width: '100%',
                                height: '200px',
                                backgroundImage: `url(${background})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                              }}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}

                {component.type === 'BODY' && component.text && (
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {component.text.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex}>
                        {line.split(/(\{\{.*?\}\})/g).map((part, partIndex) =>
                          part.match(/\{\{.*?\}\}/) ? (
                            <div key={partIndex} className="inline-block mx-1 mb-2">
                              <input
                                type="text"
                                value={inputValues[part] || ''}
                                onChange={(e) => handleInputChange(e, part)}
                                className="border border-gray-300 rounded p-1"
                              />
                              <select
                                value={selectValues[part] || ''}
                                onChange={(e) => handleSelectChange(e, part)}
                                className="ml-1 border border-gray-300 rounded p-1"
                              >
                                <option value="">Select</option>
                                {/* Add your options here */}
                                <option value="name">name</option>
                                <option value="phone_number">phone_number</option>
                                <option value="name">name</option>
                                <option value="email">email</option>
                                <option value="country">country</option>
                                <option value="column1">column1</option>
                                <option value="column2">column2</option>
                                <option value="column3">column3</option>
                                <option value="column4">column4</option>
                                <option value="column5">column5</option>
                                <option value="column6">column6</option>
                                <option value="column7">column7</option>
                                <option value="column8">column8</option>
                                <option value="column10">column10</option>
                                <option value="column11">column11</option>
                                <option value="column13">column13</option>
                                <option value="column14">column14</option>
                                <option value="column15">column15</option>
                                <option value="column16">column16</option>
                                <option value="column17">column17</option>
                                <option value="column18">column18</option>
                                <option value="column19">column19</option>
                                <option value="column20">column20</option>
                              </select>
                            </div>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    ))}
                  </div>
                )}

                {component.type === 'BUTTONS' && component.buttons && (
                  <div className="mt-4">
                    {component.buttons.map((button, btnIndex) => (
                      <button
                        key={btnIndex}
                        className="w-full mb-2 px-6 py-2 text-sm font-medium bg-white border-gray-200 border shadow-lg rounded-lg focus:ring-4 focus:ring-blue-300 hover:bg-gray-100"
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-14 mx-auto md:w-1/2 my-4">
          <CampaignSend />
        </div>
      </div>
    </div>
  );
};

export default CampaignSelect;
