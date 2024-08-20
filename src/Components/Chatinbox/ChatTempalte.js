import React from 'react';

const TemplateFetch = ({ template, onSelectTemplate }) => {
    const { name, components, language } = template;

    const handleClick = () => {
        onSelectTemplate(template); // Call the onSelectTemplate function with the template object
    };

    return (
        <div className="max-w-lg mx-auto rounded-lg  text-balance shadow-xl bg-white border border-gray-200 my-4 hover:shadow-xl transition-transform duration-300">
            <input
                type="radio"
                name="options"
                value={template}
                onClick={handleClick} // Handle click event to select template
                className="ml-2"
                required
            />
            <div className="p-6 text-balance">
                <h5 style={{ wordWrap: 'break-word' }} className="text-md  text-gray-900 uppercase text-center text-balance mb-4">  {name}<span className='text-black p-3 '>({language})</span></h5>
                <hr className='mb-4 h-2 text-black'/>
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
                                            className="mx-auto rounded-lg mb-2 border-gray-200 border-solid border  object-cover shadow-xl"
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
                                            className="mx-auto rounded-lg mb-2 shadow-md"
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
                            <div key={index} className="text-gray-700 text-sm leading-relaxed">
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
                                        className="w-full mb-2 px-6 py-2 text-sm font-medium text-white  bg-green-700 border-gray-200 border shadow-lg rounded-lg focus:ring-4 focus:ring-blue-300 hover:bg-gray-100"
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
