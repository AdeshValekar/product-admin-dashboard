export const validateProduct = (formData) => {
    const errors = {};

    if (!formData.title || formData.title.trim() === "") {
        errors.title = "Title is required";
    }

    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
        errors.price = "Price must be a positive number";
    }

    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0) {
        errors.stock = "Stock must be 0 or greater";
    }

    if (!formData.category || formData.category.trim() === "") {
        errors.category = "Category is required";
    }

    return errors;
};