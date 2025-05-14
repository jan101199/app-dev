'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import clsx from 'clsx';

const AddressPicker = dynamic(() => import('../../components/AddressPicker'), { ssr: false });

const nameRegex = /^[A-Za-z\s]+$/;

const schema = z.object({
  firstName: z.string().min(2, 'First name is too short').regex(nameRegex, 'Only letters allowed'),
  lastName: z.string().min(2, 'Last name is too short').regex(nameRegex, 'Only letters allowed'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10,}$/, 'Phone must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log('Validated:', data);

    setTimeout(() => {
      setLoading(false);
      alert('Registration successful!');
    }, 2000);
  };

  const inputClass = (error?: any, readOnly = false) =>
    clsx(
      'w-full border p-2 rounded-md focus:outline-none focus:ring-2',
      readOnly && 'bg-gray-50',
      error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-400'
    );

    return (
      <div className="p-8 max-w-2xl mx-auto bg-white backdrop-blur-lg shadow-lg rounded-xl">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">Register</h1>
    
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                {...register('firstName')}
                placeholder="e.g., Juan"
                className={clsx(inputClass(errors.firstName), 'text-black')}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                {...register('lastName')}
                placeholder="e.g., Dela Cruz"
                className={clsx(inputClass(errors.lastName), 'text-black')}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
          </div>
    
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              {...register('email')}
              placeholder="e.g., example@email.com"
              className={clsx(inputClass(errors.email), 'text-black')}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
    
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              {...register('phone')}
              placeholder="e.g., 09123456789"
              className={clsx(inputClass(errors.phone), 'text-black')}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
    
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selected Address</label>
            <input
              {...register('address')}
              value={selectedAddress}
              readOnly
              placeholder="Select from map"
              className={clsx(inputClass(errors.address, true), 'text-black')}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
    
          {/* Toggle Map */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowMap(prev => !prev)}
              className="text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-md transition-all duration-200"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
    
          {/* Map Picker */}
          {showMap && (
            <div className="mt-4 transition-all duration-300">
              <AddressPicker
                onSelect={(address: string) => {
                  setSelectedAddress(address);
                  setValue('address', address, { shouldValidate: true });
                }}
              />
            </div>
          )}
    
          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              disabled={loading}
              className={clsx(
                'w-full text-white px-6 py-3 rounded-md font-medium text-lg transition duration-300',
                loading
                  ? 'bg-blue-600 opacity-50 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
    
            <a href="/login" className="text-blue-600 hover:underline text-sm">
              Already have an account? Login
            </a>
          </div>
    
        </form>
      </div>
    );
    
}
