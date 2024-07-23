import React from 'react';
import Form from 'react-bootstrap/Form';


interface CategorySelectProps {
  categories: { id: string; name: string }[];
  onChange: (category: { id: string; name: string }) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ categories, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategoryId = e.target.value;
      const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
      if (selectedCategory) {
        onChange(selectedCategory);
      }
    };
  
    return (
      
      

<Form.Select onChange={handleChange} aria-label="Default select example">
{categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
</Form.Select>
);
    
  };

export default CategorySelect;