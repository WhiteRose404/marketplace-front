"use client";

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
  Trash2
} from 'lucide-react';

// type ErrosProduct = {
//     title?: string,
//     description?: string,
//     category?: string,
//     images?: string[],
//     options?: { title?: string, values?: string[] }[],
//     variants?: {
//         title?: string,
//         prices?: { currency_code?: string, amount?: string }[],
//         manage_inventory?: boolean,
//         options?: any,
//         sku?: string,
//         inventory?: string
//     }[]
// }
type ErrosProduct = any


const ProductCreationForm = ({ isOpen, onClose, onSubmit, namedCategories }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'published',
    // images: [],
    options: [{ title: 'Color', values: [''] }],
    variants: [{
      title: '',
      prices: [{ currency_code: 'mad', amount: '' }],
      manage_inventory: false,
      options: { 'Color': '' },
      sku: '',
      inventory: ''
    }],
  });

  const [errors, setErrors] = useState<ErrosProduct>({});
  const [previewMode, setPreviewMode] = useState(false);

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
    const newErrors: ErrosProduct = {};
    
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Product name is required';
      if (!formData.category) newErrors.category = 'Category is required';
    }
    
    if (step === 2) {
      // Validate options and variants
      formData.variants.forEach((variant, index) => {
        if (!variant.prices[0].amount) {
          newErrors[`variant_${index}_price`] = 'Price is required';
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
        manage_inventory: false,
        options,
        sku: '',
        inventory: ''
      };
    });
    
    setFormData(prev => ({ ...prev, variants }));
  };

  const updateVariant = (index: number, field, value) => {
    const newVariants = [...formData.variants];
    if (field === 'price') {
      newVariants[index].prices[0].amount = value;
    } else {
      newVariants[index][field] = value;
    }
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  // const handleImageUpload = async (e: { target: { files: FileList}}) => {
  //   const files = Array.from(e.target.files);
  //   console.log("butes", files, formData)
  //   // In real implementation, you'd upload these to your storage
  //   // not much
  //   const imageUrls = files.map(file => URL.createObjectURL(file))
  //   setFormData((prev: any) => ({
  //     ...prev,
  //     images: [...prev.images, ...imageUrls]
  //   }));
  // };

  // const removeImage = (index: number) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     images: prev.images.filter((_, i) => i !== index)
  //   }));
  // };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    
    setIsSubmitting(true);
    
    // Transform data to match your backend format
    const submitData = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      options: formData.options.map(opt => ({
        title: opt.title,
        values: opt.values.filter(v => v.trim())
      })),
      // images: formData.images,
      variants: formData.variants.map(variant => ({
        title: variant.title || formData.title,
        prices: [{
          currency_code: variant.prices[0].currency_code,
          amount: parseFloat(variant.prices[0].amount)
        }],
        manage_inventory: variant.manage_inventory,
        options: variant.options
      }))
    };
    
    try {
      await onSubmit(submitData);
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
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all ${
            errors.title ? 'border-red-300 bg-red-50' : 'border-stone-200'
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
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all appearance-none ${
              errors.category ? 'border-red-300 bg-red-50' : 'border-stone-200'
            }`}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
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
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Product Images
        </label>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* {formData.images.map((image, index) => ( */}
          {[].map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                // onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-stone-300 border-dashed rounded-xl cursor-pointer hover:bg-stone-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-stone-400" />
            <p className="text-sm text-stone-600">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-stone-400">PNG, JPG up to 10MB</p>
          </div>
          <input 
            type="file" className="hidden" multiple accept="image/*" 
            // onChange={handleImageUpload} 
          />
        </label>
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
                className="flex-1 px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
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
            
            <div className="space-y-2">
              {option.values.map((value, valueIndex) => (
                <div key={valueIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateOptionValue(optionIndex, valueIndex, e.target.value)}
                    placeholder="Option value"
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
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
          <h3 className="text-lg font-medium text-stone-900 mb-4">Product Variants</h3>
          <div className="space-y-4">
            {formData.variants.map((variant, index) => (
              <div key={index} className="border border-stone-200 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      Price (MAD) *
                    </label>
                    <input
                      type="number"
                      value={variant.prices[0].amount}
                      onChange={(e) => updateVariant(index, 'price', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 ${
                        errors[`variant_${index}_price`] ? 'border-red-300' : 'border-stone-200'
                      }`}
                    />
                    {errors[`variant_${index}_price`] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`variant_${index}_price`]}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                    />
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-stone-50 rounded-lg">
                  <p className="text-sm text-stone-600 mb-2">Options:</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(variant.options).map(([key, value]) => (
                      <span key={key} className="px-2 py-1 bg-white rounded-md text-sm">
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
      <div className="bg-stone-50 rounded-xl p-6">
        <h3 className="text-lg font-medium text-stone-900 mb-4">Review Your Product</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-stone-900 mb-2">Basic Information</h4>
            <div className="space-y-2 text-sm">
              <p><span className="text-stone-600">Name:</span> {formData.title}</p>
              <p><span className="text-stone-600">Category:</span> {formData.category}</p>
              <p><span className="text-stone-600">Status:</span> {formData.status}</p>
              {formData.description && (
                <p><span className="text-stone-600">Description:</span> {formData.description}</p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-stone-900 mb-2">Variants ({formData.variants.length})</h4>
            <div className="space-y-2 text-sm max-h-40 overflow-y-auto">
              {formData.variants.map((variant, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-stone-200 last:border-b-0">
                  <span>{Object.values(variant.options).join(', ')}</span>
                  <span className="font-medium">{variant.prices[0].amount} MAD</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Ready to publish?</p>
              <p className="text-sm text-amber-700">
                Your product will be live and available for purchase immediately after creation.
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
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-500 transform mx-4 ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-medium text-stone-900">Add New Product</h2>
            <p className="text-sm text-stone-600 mt-1">
              Step {currentStep} of 3 - {
                currentStep === 1 ? 'Basic Information' :
                currentStep === 2 ? 'Options & Variants' : 'Review & Publish'
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
        <div className="px-6 py-4 border-b border-stone-100">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step < currentStep ? 'bg-green-500 text-white' :
                  step === currentStep ? 'bg-amber-500 text-white' :
                  'bg-stone-200 text-stone-600'
                }`}>
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all ${
                    step < currentStep ? 'bg-green-500' : 'bg-stone-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-stone-100 bg-stone-50">
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 font-medium transition-colors"
              >
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
                className="px-6 py-2 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all font-medium"
              >
                Next
              </button>
            ) : (
              <button
                onClick={()=>{
                    handleSubmit();
                    setFormData({
                        title: '',
                        description: '',
                        category: '',
                        status: 'published',
                        images: [],
                        options: [{ title: 'Color', values: [''] }],
                        variants: [{
                            title: '',
                            prices: [{ currency_code: 'mad', amount: '' }],
                            manage_inventory: false,
                            options: { 'Color': '' },
                            sku: '',
                            inventory: ''
                        }],
                    });
                }}
                disabled={isSubmitting}
                className="px-6 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Product'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreationForm;