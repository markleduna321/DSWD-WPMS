import InputLabelComponent from '@/app/pages/components/input-label-component';
import InputTextComponent from '@/app/pages/components/input-text-component';
import InputTextareaComponent from '@/app/pages/components/input-textarea-component';
import Modal from '@/app/pages/components/modal';
import { EyeIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { get_content_by_id_thunk } from '../_redux/content-thunk';
import { updateContentThunk } from '../_redux/content-thunk';

export default function EditContentSection({ contentId }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contentData, setContentData] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const dispatch = useDispatch();

  const openModal = async () => {
    try {
      const result = await dispatch(get_content_by_id_thunk(contentId));
      setContentData(result);
      setFormData({ title: result.title, content: result.content }); // Populate form data with fetched data
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setContentData(null);
    setFormData({ title: '', content: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        id: contentId,
        title: formData.title,
        content: formData.content,
      };
      await dispatch(updateContentThunk(updatedData)); // Dispatch update thunk
      closeModal();
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  return (
    <div>
      <a
        href="#"
        onClick={openModal}
        className="flex text-sm text-blue-500 cursor-pointer hover:underline"
      >
        <EyeIcon className="w-4 h-4" /> Show full details
      </a>

      {isModalOpen && contentData && (
        <Modal isOpen={isModalOpen} onClose={closeModal} width="w-1/4">
          <h1>Edit Content</h1>
          <div className="mb-4">
            <InputLabelComponent label="Title" />
            <InputTextComponent
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <InputLabelComponent label="Content" />
            <InputTextareaComponent
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <InputLabelComponent label="Thumbnail" />
            {contentData.file_path && (
              <img
                src={`/storage/${contentData.file_path}`}
                alt="Thumbnail"
                className="w-[500px] h-[500px] rounded-md"
              />
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="rounded-md bg-green-500 p-2 text-white"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="rounded-md bg-red-500 p-2 text-white"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
