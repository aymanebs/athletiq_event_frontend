import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateParticipant } from "../api/participantApi";
import { toast } from "sonner";

const UpdateParticipantModal = ({id,participant, isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await updateParticipant(id,participant._id, data); 
      onSubmit(response); 
      reset(); 
      onClose();
      toast.success('Participant updated succesfully'); 
    } catch (error) {
      console.error("Error updating participant", error);
      toast.error("Error updating participant");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-4">Update Participant</h2>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-4">
            {/* Fullname */}
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              defaultValue={participant.fullname}
              placeholder="Full Name"
              className="w-full border rounded px-3 py-2"
              {...register("fullname", {
                required: "Full Name is required",
                minLength: { value: 5, message: "Fullname must be at least 5 characters long" }
              })}
            />
            {errors.fullname && <span className="text-red-500">{errors.fullname.message}</span>}

            {/* Email */}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              defaultValue={participant.email}
              placeholder="Email"
              className="w-full border rounded px-3 py-2"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Entered value does not match email format" }
              })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}

            {/* Phone Number */}
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              defaultValue={participant.phone}
              placeholder="Phone"
              className="w-full border rounded px-3 py-2"
              {...register("phone")}
            />
            {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              onClick={() => {
                reset();
                onClose();
              }}
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
              {isSubmitting ? "Updating..." : "Update Participant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateParticipantModal;
