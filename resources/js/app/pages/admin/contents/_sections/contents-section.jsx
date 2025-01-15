import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '@/app/pages/components/button';
import Modal from '@/app/pages/components/modal';
import InputLabelComponent from '@/app/pages/components/input-label-component';
import InputTextComponent from '@/app/pages/components/input-text-component';
import InputError from '@/Components/InputError';
import InputTextareaComponent from '@/app/pages/components/input-textarea-component';
import { saveContent } from '../_redux/content-thunk';

export default function ContentsSection() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', file_path: null });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // Open and close modal functions
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setFormData({ title: '', content: '', file_path: null });
    setErrors({});
  };

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file_path: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.file_path) {
      data.append('file_path', formData.file_path);
    }
  
    try {
      const result = await dispatch(saveContent(data)).unwrap();
      console.log('Content saved successfully:', result); // Debugging
      closeModal();
    } catch (error) {
      console.error('Error saving content:', error); // Debugging
      setErrors(error || {});
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Contents</h2>
        <Button
          type="button"
          variant="primary"
          size="md"
          icon={<PlusIcon className="h-5 w-5" />}
          onClick={openModal}
        >
          Add Content
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} width="w-1/4">
        <h2 className="text-xl font-semibold mb-4">Add New Content</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputLabelComponent htmlFor="title" labelText="Title" />
            <InputTextComponent
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <InputLabelComponent htmlFor="content" labelText="Content" />
            <InputTextareaComponent
              id="content"
              name="content"
              required
              value={formData.content}
              onChange={handleInputChange}
            />
            {errors?.content && <InputError message={errors.content} className="mt-2" />}
          </div>

          <div className="mb-4">
            <InputLabelComponent htmlFor="file_path" labelText="Thumbnail" />
            <input
              id="file_path"
              name="file_path"
              type="file"
              required
              onChange={handleFileChange}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="submit" variant="primary" size="md">
              Save
            </Button>
            <Button type="button" variant="danger" size="md" onClick={closeModal}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
