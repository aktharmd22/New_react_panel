import React, { useState, useEffect } from 'react';
import TemplateFetch from './CampaignTemplatecard';
import Cookies from 'js-cookie';

const CampaignTemplates = ({ onSelectTemplate }) => {
    const [templates, setTemplates] = useState([]);
    const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

    useEffect(() => {
        const fetchData = async () => {
            if (userData) {
                try {
                    const response = await fetch('https://ci4backend.smartyuppies.com/Templates/fetchTemplate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            access_token: userData.access_token,
                            app_id: userData.app_id,
                            username: userData.username
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const result = await response.json();
                    setTemplates(result.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [userData]);

    return (
        <div className="container mx-auto p-4">
            <div >
            <h1 className="text-2xl font-bold text-center mb-8 sticky top-0">Templates</h1>
            </div>
            <div className="">
                {templates
                    .filter(template => template.status === "APPROVED")
                    .map((template, index) => (
                        <TemplateFetch
                            key={index}
                            template={template}
                            onSelectTemplate={() => onSelectTemplate(template)} // Ensure onSelectTemplate is called correctly
                        />
                    ))}
            </div>
        </div>
    );
};

export default CampaignTemplates;
