import React from 'react';

const TemplateFetch = ({ template }) => {
  const { name, components, language } = template;
  return (
    <div className="max-w-full mx-auto mb-12 font-poppins h-full rounded-lg shadow-xl bg-white border border-gray-300 border-solid my-4 hover:shadow-xl transition-transform duration-300">
      <div className="p-6">
        <h5 style={{ wordWrap: 'break-word' }} className="text-xl text-gray-900 uppercase text-center mb-4">
          {name} <span className="text-black p-3">({language})</span>
        </h5>

        {components.map((component, index) => {
          if (component.type === 'HEADER') {
            if (component.format === 'IMAGE' && component.example && component.example.header_handle) {
              return (
                <div key={index} className="mb-4">
                  {component.example.header_handle.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt="Template Header"
                      className="mx-auto rounded-lg mb-2 border-gray-200 border-solid border shadow-xl object-cover"
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                  ))}
                </div>
              );
            } else if (component.format === 'VIDEO' && component.example && component.example.header_handle) {
              const videoUrls = component.example.header_handle;
              return (
                <div key={index} className="mb-4">
                  {videoUrls.map((videoUrl, vidIndex) => (
                    <video
                      key={vidIndex}
                      controls
                      className="mx-auto rounded-lg mb-2 shadow-md object-cover"
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              );
            }
            else if (component.format === 'DOCUMENT' && component.example && component.example.header_handle) {
              const videoUrls = component.example.header_handle;
              return (
                <div key={index} className="mb-4">
                  {videoUrls.map((videoUrl, vidIndex) => (
                    <iframe
                    id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="300"
                    height="300"
                    src={videoUrl}>
                  </iframe>
                  ))}
                </div>
              );
            }
          } else if (component.type === 'BODY' && component.text) {
            return (
              <div key={index} style={{ wordWrap: 'break-word' }} className="text-gray-700 font-poppins leading-relaxed">
                {component.text.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            );
          } else if (component.type === 'BUTTONS' && component.buttons) {
            return (
              <div key={index} className="mt-4">
                {component.buttons.map((button, btnIndex) => (
                  <button
                    key={btnIndex}
                    className="w-full mb-2 px-6 py-4 text-white font-poppins bg-green-700 border-gray-200 border shadow-lg rounded-lg focus:ring-4 focus:ring-blue-300 hover:bg-green-800 sm:px-4 sm:py-2"
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TemplateFetch;
