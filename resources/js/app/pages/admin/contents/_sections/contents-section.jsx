import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EyeIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '@/app/pages/components/button';
import Modal from '@/app/pages/components/modal';
import InputLabelComponent from '@/app/pages/components/input-label-component';
import InputTextComponent from '@/app/pages/components/input-text-component';
import InputError from '@/Components/InputError';
import InputTextareaComponent from '@/app/pages/components/input-textarea-component';
import { fetchAllContents, saveContent } from '../_redux/content-thunk';
import store from '@/app/store/store';

export default function ContentsSection() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    file_path: null,
    is_highlight: '0', // Default value for is_highlight
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { contents, loading, error, currentPage, totalPages } = useSelector((state) => state.contents); // Added pagination states

  useEffect(() => {
    dispatch(fetchAllContents(currentPage)); // Fetch contents for the current page
  }, [dispatch, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Open and close modal functions
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setFormData({ title: '', content: '', file_path: null, is_highlight: '0' });
    setErrors({});
  };

  // Input handlers
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? '1' : '0') : value, // Handle checkbox and other inputs
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file_path: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('is_highlight', formData.is_highlight); // Append highlight status
    if (formData.file_path) {
      data.append('file_path', formData.file_path);
    }

    try {
      const result = await store.dispatch(saveContent(data));
      await store.dispatch(fetchAllContents(currentPage)); // Refresh current page after saving
      console.log('Content saved successfully:', result);
      closeModal();
    } catch (error) {
      console.error('Error saving content:', error);
      setErrors(error?.message || {});
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(fetchAllContents(newPage)); // Dispatch fetch with new page
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
          {/* Title Input */}
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

          {/* Content Input */}
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

          {/* Highlight Checkbox */}
          <div className="mb-4">
            <input
              type="checkbox"
              name="is_highlight"
              id="is_highlight"
              value={formData.is_highlight}
              checked={formData.is_highlight === '1'}
              onChange={handleInputChange}
            />{' '}
            Highlight
          </div>

          {/* File Upload */}
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

          {/* Buttons */}
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

      {/* Content List */}
      <div className="overflow-y-auto max-h-[75vh]">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:p-0"
        >
          {contents.map((content) => (
            <li
              key={content.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full space-x-6 p-6">
                <img
                  alt={content.title}
                  src={`/storage/${content.file_path}`}
                  className="h-44 w-40 shrink-0 bg-gray-300 object-cover border-2 border-black rounded-lg"
                />
                <div className="flex flex-col flex-1">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 truncate">
                      {content.title}
                    </h2>
                  </div>
                  <hr />
                  <div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-3 max-w-56 sm:max-w-64">
                      {content.content}
                    </p>
                  </div>
                  <div className="mt-auto flex justify-end">
                    <a href="#" className='flex text-sm text-blue-500 cursor-pointer hover:underline'><EyeIcon className='w-4 h-4' />  Show full details</a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

    </div>
  );
}
