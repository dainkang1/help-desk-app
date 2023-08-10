import React, { useState, ChangeEvent, FormEvent } from 'react';
import './formComponent.css';

type FormState = { 
    name: string;
    email: string;
    description: string;
    status:  "New" | "In Progress" | "Resolved";
    id?: string;
};

function generateSemiUniqueId() {
  const timestampPart = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 5);
  return timestampPart + randomPart;
}

const FormComponent = () => {

    const [formData, setFormData] = useState<FormState>({
        name: '',
        email: '',
        description: '',
        status: 'New',
        id: generateSemiUniqueId()
      });
    
      const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();
      
        try {
          const response = await fetch('http://localhost:3001/api/tickets', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          setFormData({
            name: '',
            email: '',
            description: '',
            status: 'New',
            id: generateSemiUniqueId()
          });
    
      
          const responseData = await response.json();
          console.log(responseData, 'responseData');
          alert(responseData)
        } catch (error) {
          alert(error)
          console.error('There was a problem with the fetch operation:');
        }
        console.log(formData, 'formDAta');
      };
      return (
        <form onSubmit={handleSubmit} className="formContainer">
          <div className="inputGroup">
            <label className="inputLabel">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="inputField"
              />
            </label>
          </div>
          <div className="inputGroup">
            <label className="inputLabel">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="inputField"
              />
            </label>
          </div>
          <div className="inputGroup">
            <label className="inputLabel">
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="textareaField"
              ></textarea>
            </label>
          </div>
          <button type="submit" className="submitBtn">Submit</button>
        </form>
      );
}

export default FormComponent;
