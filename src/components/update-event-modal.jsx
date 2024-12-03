import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateEvent } from "../api/eventApi";
import { toast } from "sonner";
import { getImageUrl } from "../utils/get-image";


const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 16); 
  return formattedDate;
};

const UpdateEventModal = ({ isOpen, onClose, eventData, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...eventData,
      date: formatDateForInput(eventData.date), 
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(getImageUrl(eventData.image) || "");

  const onFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("capacity", Number(data.capacity));
      formData.append("date", data.date);
      formData.append("type", data.type);
      formData.append("address", data.address);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      } else {
        formData.append("image", previewImage);
      }

      const updatedEvent = await updateEvent(eventData._id, formData);
      onUpdate(updatedEvent);
      reset();
      onClose();
      toast.success('Event updated');
    } catch (error) {
      console.error("Error updating event", error);
      toast.error("Failed to update the event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    reset(eventData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-auto"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-screen overflow-auto">
        <h2 id="modal-title" className="text-xl font-bold mb-4">Update Event</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onFormSubmit)} encType="multipart/form-data">
          <div className="space-y-4">
            {/* Title */}
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Event Title"
              className="w-full border rounded px-3 py-2"
              {...register("title", { required: "Title is required", minLength: { value: 5, message: "Title must be at least 8 characters long" } })}
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}

            {/* Description */}
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Description"
              className="w-full border rounded px-3 py-2"
              {...register("description", { minLength: { value: 5, message: "Description should be at least 5 characters long" } })}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}

            {/* Capacity */}
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              placeholder="Capacity"
              className="w-full border rounded px-3 py-2"
              {...register("capacity", { required: "Capacity is required", min: { value: 1, message: "Capacity must be at least 1" } })}
            />
            {errors.capacity && <span className="text-red-500">{errors.capacity.message}</span>}

            {/* Date */}
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date and Time</label>
            <input
              type="datetime-local"
              className="w-full border rounded px-3 py-2"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && <span className="text-red-500">{errors.date.message}</span>}

            {/* Event Type */}
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Event Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              {...register("type", { required: "Event Type is required" })}
            >
                <option value="Conference">Conference</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="Meetup">Meetup</option>
                <option value="COMPETITION">Competition</option>
                <option value="TOURNAMENT">Tournament</option>
                <option value="CHARITY">Charity</option>
                <option value="EXHIBITION">Exhibition</option>
            </select>
            {errors.type && <span className="text-red-500">{errors.type.message}</span>}

            {/* Location */}
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              placeholder="Address"
              className="w-full border rounded px-3 py-2"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && <span className="text-red-500">{errors.address.message}</span>}

              {/* Image Upload */}
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Event Image</label>
            {previewImage && <img src={previewImage} alt="Event Preview" className="w-full h-48 object-cover mb-2" />}
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif" 
              className="w-full border rounded px-3 py-2"
              {...register("image", {
                validate: {
                  maxSize: (file) => {
                    if (file[0]?.size > 5 * 1024 * 1024) { 
                      return "File size should be less than 5MB";
                    }
                    return true;
                  }
                }
              })}
              onChange={handleFileChange}
            />
            {errors.image && <span className="text-red-500">{errors.image.message}</span>}
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${
                isSubmitting && "opacity-50 cursor-not-allowed"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal;
