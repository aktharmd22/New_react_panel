import React from 'react';
import { useLocation } from 'react-router-dom';

const CampaignSelect = () => {
  const location = useLocation();
  const { selectedTemplate } = location.state || {};
  const { name, components, language,file} = selectedTemplate || {};

  if (!selectedTemplate) {
    return <div className="text-center text-gray-600 py-8">No template data available</div>;
  }

  return (
    <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-xl bg-white border border-gray-200 my-4 hover:shadow-xl transition-transform duration-300">
      <div className="p-4">
        <h5 className="text-xl font-bold text-gray-900 uppercase text-center mb-2">
          {name} <span className="text-gray-600">({language})</span>
        </h5>

        {components.map((component, index) => (
          <div key={index} className="mb-2">
            {component.type === 'HEADER' && (
              <>
                {component.format === 'IMAGE' && component.example && component.example.header_handle && (
                  <div className="overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                    {component.example.header_handle.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={file ? file :image}
                        alt="Template Header"
                        className="block w-full h-auto"
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                      />
                    ))}
                  </div>
                )}

                {component.format === 'VIDEO' && component.example && component.example.header_handle && (
                  <div className="overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                    {component.example.header_handle.map((videoUrl, vidIndex) => (
                      <video
                        key={vidIndex}
                        controls
                        className="block w-full h-auto"
                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                      >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ))}
                  </div>
                )}
              </>
            )}

            {component.type === 'BODY' && component.text && (
              <div className="text-gray-700 text-sm leading-relaxed">
                {component.text.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            )}

            {component.type === 'BUTTONS' && component.buttons && (
              <div className="mt-2">
                {component.buttons.map((button, btnIndex) => (
                  <button
                    key={btnIndex}
                    className="block w-full px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg shadow-md focus:ring-2 focus:ring-blue-300 hover:bg-gray-100"
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
  );
};

export default CampaignSelect;
