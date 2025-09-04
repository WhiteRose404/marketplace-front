"use client";

// TODO: fix the types: hardcoded to any

import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Plus,
  Minus,
  Check,
  AlertCircle,
  ChevronDown,
  Image as ImageIcon,
  Trash2,
  Package,
  MapPin
} from 'lucide-react';

type ErrorsProduct = any;

const ProductCreationForm = ({ isOpen, onClose, onSubmit, namedCategories, vendorLocations }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, SetImages] = useState<{
    name: string,
    type: string,
    size: number,
    data: any
  }[]>([]);


  // location id
  const [locationId, setLocationId] = useState(vendorLocations.length > 0 ? vendorLocations[0].id : '');
  // Form data state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'published',
    weight: '',
    length: '',
    width: '',
    height: '',
    options: [{ title: 'Color', values: [''] }],
    // row_images: [],
    variants: [{
      title: '',
      prices: [{ currency_code: 'mad', amount: '' }],
      manage_inventory: true,
      options: { 'Color': '' },
      sku: '',
      barcode: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      // inventory_quantity: '', // Back to the original simple approach
      // location_id: vendorLocations[0]?.id || '' // Simplified location handling
    }],
  });

  const [errors, setErrors] = useState<ErrorsProduct>({});

  const categories = namedCategories;

  const currencies = [
    { code: 'mad', symbol: 'MAD', name: 'Moroccan Dirham' },
    { code: 'eur', symbol: '€', name: 'Euro' },
    { code: 'usd', symbol: '$', name: 'US Dollar' }
  ];

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateStep = (step: number) => {
    const newErrors: ErrorsProduct = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Product name is required';
      if (!formData.category) newErrors.category = 'Category is required';
    }

    if (step === 2) {
      // Validate options
      formData.options.forEach((option, optionIndex) => {
        if (!option.title.trim()) {
          newErrors[`option_${optionIndex}_title`] = 'Option name is required';
        }
        option.values.forEach((value, valueIndex) => {
          if (!value.trim()) {
            newErrors[`option_${optionIndex}_value_${valueIndex}`] = 'Option value is required';
          }
        });
      });

      // Validate variants
      formData.variants.forEach((variant, index) => {
        if (!variant.prices[0].amount) {
          newErrors[`variant_${index}_price`] = 'Price is required';
        }
        if (variant.manage_inventory) {
          // if (!variant.inventory_quantity || parseInt(variant.inventory_quantity) < 0) {
          //   newErrors[`variant_${index}_inventory`] = 'Valid inventory quantity is required';
          // }
          // if (vendorLocations.length > 0 && !variant.location_id) {
          //   newErrors[`variant_${index}_location`] = 'Inventory location is required';
          // }
        }
        formData.options.forEach((option) => {
          if (!variant.options[option.title]) {
            newErrors[`variant_${index}_option_${option.title}`] = `${option.title} is required`;
          }
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const addOption = () => {
    const newOption = { title: '', values: [''] };
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, newOption]
    }));
  };

  const updateOption = (index: number, field: string, value: any) => {
    const newOptions = [...formData.options];
    newOptions[index][field] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const addOptionValue = (optionIndex: number) => {
    const newOptions = [...formData.options];
    newOptions[optionIndex].values.push('');
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  // 1. Function to convert file to base64
  const fileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // 2. Update handleImageChange to convert files to base64
  const handleImageChange = async (e: any) => {
    const files = Array.from(e.target.files);

    // Validate files
    const validFiles = files.filter((file: any) => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

      if (!isValidType) {
        alert(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large (max 10MB)`);
        return false;
      }

      return true;
    });

    try {
      // Convert files to base64 with metadata
      const base64Images = await Promise.all(
        validFiles.map(async (file: any) => {
          const base64 = await fileToBase64(file);
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64 // This includes "data:image/jpeg;base64,..." prefix
          };
        })
      );

      // Store base64 data in formData
      SetImages(prev => prev.concat(base64Images));

    } catch (error) {
      console.error('Error converting images to base64:', error);
      alert('Failed to process images. Please try again.');
    }
  };

  const removeImage = (index: number) => {
    SetImages(prev => (prev.filter((_, i) => i !== index)));
  }

  const updateOptionValue = (optionIndex: number, valueIndex: number, value: any) => {
    const newOptions = [...formData.options];
    newOptions[optionIndex].values[valueIndex] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const removeOptionValue = (optionIndex: number, valueIndex: number) => {
    const newOptions = [...formData.options];
    newOptions[optionIndex].values.splice(valueIndex, 1);
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const generateVariants = () => {
    const combinations: any[] = [];
    const optionValues = formData.options.map(opt => opt.values.filter(v => v.trim()));

    const generateCombos = (current: any, remaining: any) => {
      if (remaining.length === 0) {
        combinations.push(current);
        return;
      }

      const [first, ...rest] = remaining;
      first.forEach((value: any) => {
        generateCombos([...current, value], rest);
      });
    };

    if (optionValues.every(values => values.length > 0)) {
      generateCombos([], optionValues);
    }

    const variants = combinations.map((combo, index) => {
      const options = {};
      formData.options.forEach((option, i) => {
        options[option.title] = combo[i];
      });

      return {
        title: `${formData.title} - ${combo.join(', ')}`,
        prices: [{ currency_code: 'mad', amount: '' }],
        manage_inventory: true,
        allow_backorder: false,
        options,
        sku: '',
        barcode: '',
        weight: formData.weight || '',
        length: formData.length || '',
        width: formData.width || '',
        height: formData.height || '',
        // inventory_quantity: '',
        // location_id: vendorLocations[0]?.id || ''
      };
    });

    setFormData(prev => ({ ...prev, variants }));
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const newVariants = [...formData.variants];
    if (field === 'price') {
      newVariants[index].prices[0].amount = value;
    } else if (field === 'currency') {
      newVariants[index].prices[0].currency_code = value;
    } else {
      newVariants[index][field] = value;
    }
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsSubmitting(true);

    // Back to the original simple approach - let backend handle the complexity
    const submitData = {
      title: formData.title,
      description: formData.description || undefined,
      status: formData.status,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      length: formData.length ? parseFloat(formData.length) : undefined,
      width: formData.width ? parseFloat(formData.width) : undefined,
      height: formData.height ? parseFloat(formData.height) : undefined,
      // this is not compatible with the datatype defined in the backend
      // row_images: formData.row_images || [],

      options: formData.options.map(opt => ({
        title: opt.title,
        values: opt.values.filter(v => v.trim())
      })),

      variants: formData.variants.map(variant => ({
        title: variant.title || formData.title,
        sku: variant.sku || undefined,
        barcode: variant.barcode || undefined,
        weight: variant.weight ? parseFloat(variant.weight) : undefined,
        length: variant.length ? parseFloat(variant.length) : undefined,
        width: variant.width ? parseFloat(variant.width) : undefined,
        height: variant.height ? parseFloat(variant.height) : undefined,
        manage_inventory: variant.manage_inventory,
        allow_backorder: variant.allow_backorder,
        options: variant.options,
        prices: [{
          currency_code: variant.prices[0].currency_code,
          amount: parseFloat(variant.prices[0].amount)
        }],
        // Keep it simple - pass inventory data directly
        // inventory_quantity: variant.manage_inventory ? parseInt(variant.inventory_quantity) : undefined,
        // location_id: variant.manage_inventory ? variant.location_id : undefined
      }))
    };

    console.log("sending from the front endpoitn the following", submitData)

    try {
      await onSubmit({
        product: submitData,
        row_images: images,
        location_id: locationId
      });
      // Reset form
      // setFormData({
      //   title: '',
      //   description: '',
      //   category: '',
      //   status: 'published',
      //   weight: '',
      //   length: '',
      //   width: '',
      //   height: '',
      //   options: [{ title: 'Color', values: [''] }],
      //   variants: [{
      //     title: '',
      //     prices: [{ currency_code: 'mad', amount: '' }],
      //     manage_inventory: true,
      //     options: { 'Color': '' },
      //     sku: '',
      //     barcode: '',
      //     weight: '',
      //     length: '',
      //     width: '',
      //     height: '',
      //     inventory: '',
      //     location_id: vendorLocations[0]?.id || ''
      //   }],
      // });
      // setCurrentStep(1);
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter product name"
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all ${errors.title ? 'border-red-300 bg-red-50' : 'border-stone-200'
            }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your product..."
          rows={4}
          className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Category *
        </label>
        <div className="relative">
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all appearance-none ${errors.category ? 'border-red-300 bg-red-50' : 'border-stone-200'
              }`}
          >
            <option value="">Select category</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
        </div>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-3">
          Product Dimensions (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-stone-600 mb-1">Weight (g)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              placeholder="500"
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-600 mb-1">Length (cm)</label>
            <input
              type="number"
              value={formData.length}
              onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
              placeholder="10"
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-600 mb-1">Width (cm)</label>
            <input
              type="number"
              value={formData.width}
              onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
              placeholder="5"
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-600 mb-1">Height (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
              placeholder="2"
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Product Images
        </label>

        {/* File Input */}
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-stone-300 border-dashed rounded-xl cursor-pointer hover:bg-stone-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-stone-400" />
            <p className="text-sm text-stone-600">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-stone-400">PNG, JPG up to 10MB</p>
          </div>
          <input
            onChange={handleImageChange}
            type="file"
            className="hidden"
            multiple
            accept="image/*"
          />
        </label>

        {/* Preview Selected Images */}
        {images && images.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-stone-700 mb-2">
              Selected Images ({images.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((imageData: any, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageData.data} // Use base64 data directly
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-stone-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded truncate">
                      {imageData.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-stone-900">Product Options</h3>
          <button
            onClick={addOption}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Option
          </button>
        </div>

        {formData.options.map((option, optionIndex) => (
          <div key={optionIndex} className="border border-stone-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-4 mb-3">
              <input
                type="text"
                value={option.title}
                onChange={(e) => updateOption(optionIndex, 'title', e.target.value)}
                placeholder="Option name (e.g., Color, Size)"
                className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 ${errors[`option_${optionIndex}_title`] ? 'border-red-300' : 'border-stone-200'
                  }`}
              />
              {formData.options.length > 1 && (
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    options: prev.options.filter((_, i) => i !== optionIndex)
                  }))}
                  className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {errors[`option_${optionIndex}_title`] && (
              <p className="mb-2 text-sm text-red-600">{errors[`option_${optionIndex}_title`]}</p>
            )}

            <div className="space-y-2">
              {option.values.map((value, valueIndex) => (
                <div key={valueIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateOptionValue(optionIndex, valueIndex, e.target.value)}
                    placeholder="Option value"
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 ${errors[`option_${optionIndex}_value_${valueIndex}`] ? 'border-red-300' : 'border-stone-200'
                      }`}
                  />
                  <button
                    onClick={() => addOptionValue(optionIndex)}
                    className="p-2 text-amber-600 hover:text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  {option.values.length > 1 && (
                    <button
                      onClick={() => removeOptionValue(optionIndex, valueIndex)}
                      className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={generateVariants}
          className="w-full py-3 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors font-medium"
        >
          Generate Product Variants
        </button>
      </div>

      {formData.variants.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Product Variants ({formData.variants.length})
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {formData.variants.map((variant, index) => (
              <div key={index} className="border border-stone-200 rounded-xl p-4 bg-stone-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Variant Name
                    </label>
                    <input
                      type="text"
                      value={variant.title}
                      onChange={(e) => updateVariant(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                      placeholder="e.g., SHIRT-RED-L"
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Price *
                    </label>
                    <div className="flex">
                      <select
                        value={variant.prices[0].currency_code}
                        onChange={(e) => updateVariant(index, 'currency', e.target.value)}
                        className="px-3 py-2 border border-r-0 border-stone-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 bg-stone-50"
                      >
                        {currencies.map(curr => (
                          <option key={curr.code} value={curr.code}>{curr.code.toUpperCase()}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={variant.prices[0].amount}
                        onChange={(e) => updateVariant(index, 'price', e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        className={`flex-1 px-3 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 ${errors[`variant_${index}_price`] ? 'border-red-300' : 'border-stone-200'
                          }`}
                      />
                    </div>
                    {errors[`variant_${index}_price`] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`variant_${index}_price`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Barcode
                    </label>
                    <input
                      type="text"
                      value={variant.barcode}
                      onChange={(e) => updateVariant(index, 'barcode', e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center">
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={variant.manage_inventory}
                          onChange={(e) => updateVariant(index, 'manage_inventory', e.target.checked)}
                          className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                        />
                        <span className="text-sm font-medium text-stone-700">Manage Inventory</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer mt-2">
                        <input
                          type="checkbox"
                          checked={variant.allow_backorder}
                          onChange={(e) => updateVariant(index, 'allow_backorder', e.target.checked)}
                          disabled={!variant.manage_inventory}
                          className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500 disabled:opacity-50"
                        />
                        <span className="text-sm text-stone-600">Allow Backorders</span>
                      </label>
                    </div>
                  </div>
                </div>

                {variant.manage_inventory && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    {/* <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        <Package className="w-4 h-4 inline mr-1" />
                        Initial Stock Quantity *
                      </label>
                      <input
                        type="number"
                        value={variant.inventory_quantity}
                        onChange={(e) => updateVariant(index, 'inventory_quantity', e.target.value)}
                        placeholder="0"
                        min="0"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 ${
                          errors[`variant_${index}_inventory`] ? 'border-red-300' : 'border-stone-200'
                        }`}
                      />
                      {errors[`variant_${index}_inventory`] && (
                        <p className="mt-1 text-xs text-red-600">{errors[`variant_${index}_inventory`]}</p>
                      )}
                    </div> */}

                    {vendorLocations.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Inventory Location *
                        </label>
                        <select
                          value={locationId}
                          onChange={(e) => updateVariant(index, 'location_id', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 ${errors[`variant_${index}_location`] ? 'border-red-300' : 'border-stone-200'
                            }`}
                        >
                          <option value="">Select location</option>
                          {vendorLocations.map((location: any) => (
                            <option key={location.id} value={location.id}>
                              {location.name}
                            </option>
                          ))}
                        </select>
                        {errors[`variant_${index}_location`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`variant_${index}_location`]}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-3 bg-white rounded-lg border border-stone-200">
                  <p className="text-sm text-stone-600 mb-2">Product Options:</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(variant.options).map(([key, value]) => (
                      <span key={key} className="px-2 py-1 bg-stone-100 rounded-md text-sm font-medium">
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-xl p-6">
        <h3 className="text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          Review Your Product
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-stone-900 mb-2">Basic Information</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-stone-600 font-medium">Name:</span> {formData.title}</p>
                <p><span className="text-stone-600 font-medium">Category:</span> {formData.category}</p>
                <p><span className="text-stone-600 font-medium">Status:</span>
                  <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                    {formData.status}
                  </span>
                </p>
                {formData.description && (
                  <p><span className="text-stone-600 font-medium">Description:</span> {formData.description}</p>
                )}
                {(formData.weight || formData.length || formData.width || formData.height) && (
                  <div>
                    <span className="text-stone-600 font-medium">Dimensions:</span>
                    <div className="ml-2 text-xs text-stone-500">
                      {formData.weight && `Weight: ${formData.weight}g `}
                      {formData.length && `L: ${formData.length}cm `}
                      {formData.width && `W: ${formData.width}cm `}
                      {formData.height && `H: ${formData.height}cm`}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-stone-900 mb-2">Product Options</h4>
              <div className="space-y-2">
                {formData.options.map((option, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-stone-600 font-medium">{option.title}:</span>
                    <span className="ml-2">{option.values.filter(v => v.trim()).join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-stone-900 mb-2 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Variants ({formData.variants.length})
            </h4>
            <div className="space-y-3 text-sm max-h-60 overflow-y-auto">
              {formData.variants.map((variant, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-stone-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-wrap gap-1">
                      {Object.values(variant.options).map((value, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                          {value}
                        </span>
                      ))}
                    </div>
                    <span className="font-semibold text-stone-900">
                      {variant.prices[0].amount} {variant.prices[0].currency_code.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-stone-500 space-y-1">
                    {variant.sku && <p>SKU: {variant.sku}</p>}
                    {/* {variant.manage_inventory && (
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>Stock: {variant.inventory_quantity} units</span>
                        {variant.allow_backorder && (
                          <span className="text-amber-600">(Backorders allowed)</span>
                        )}
                      </div>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Ready to publish?</p>
              <p className="text-sm text-amber-700">
                Your product will be live and available for purchase immediately after creation.
                {formData.variants.some(v => v.manage_inventory) &&
                  " Inventory levels will be automatically tracked for managed variants."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'
          }`}
        onClick={onClose}
      />

      <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto transition-all duration-500 transform mx-4 ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}>

        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl z-10 border-b border-stone-100">
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-xl font-semibold text-stone-900">Add New Product</h2>
              <p className="text-sm text-stone-600 mt-1">
                Step {currentStep} of 3 - {
                  currentStep === 1 ? 'Basic Information' :
                    currentStep === 2 ? 'Options & Inventory' : 'Review & Publish'
                }
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-xl transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pb-4">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step < currentStep ? 'bg-green-500 text-white shadow-lg' :
                    step === currentStep ? 'bg-amber-500 text-white shadow-lg' :
                      'bg-stone-200 text-stone-600'
                    }`}>
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 rounded-full transition-all ${step < currentStep ? 'bg-green-500' : 'bg-stone-200'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-t from-stone-50 to-transparent rounded-b-3xl">
          <div className="flex items-center justify-between p-6 border-t border-stone-100 bg-stone-50">
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 font-medium transition-colors flex items-center gap-2"
                >
                  <ChevronDown className="w-4 h-4 rotate-90" />
                  Previous
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 font-medium transition-colors"
              >
                Cancel
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all font-medium shadow-lg flex items-center gap-2"
                >
                  Next
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      Create Product
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreationForm;