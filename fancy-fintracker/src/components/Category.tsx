import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import './Category.css';

interface Category {
  id: string;
  name: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({ id: "", name: ""});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setError("");
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Token is missing");

      const response = await axiosInstance.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(response.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    setError("");
    try {
      if (!newCategory.name.trim()) {
        setError("Category name is required");
        return;
      }

      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axiosInstance.post("/categories", newCategory, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(response.data.message || "Category created successfully!");
      fetchCategories();
    
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Failed to create category");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    setError("");
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      await axiosInstance.delete(`/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category");
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="category-container">
      <h2 className="category-heading">Manage Categories</h2>

      {/* Category Creation Form */}
      <div className="category-form">
        <h3 className="category-subheading">Create New Category</h3>
        <div>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="category-input"
          />

          <button onClick={handleCreateCategory} className="category-button">
            Create Category
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Categories List */}
      <div className="categories-list">
        <h3 className="category-subheading">Your Categories</h3>
        {categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="categories-list-item">
                { <div>
                  <span>{category.name}</span>
                </div> }
                <button onClick={() => handleDeleteCategory(category.id)} className="delete-button category-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Category;
