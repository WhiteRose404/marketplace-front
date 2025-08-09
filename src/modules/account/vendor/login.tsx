"use client"

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Store, 
  Image,
  ArrowRight,
  Check,
  Star,
  TrendingUp,
  Users,
  Palette,
  Heart,
  Globe
} from 'lucide-react';

const VendorPortal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    storeName: '',
    storeDescription: '',
    location: '',
    category: '',
    website: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "When.ma helped me reach customers across MENA I never could before",
      author: "Amina Taleb",
      business: "Atlas Ceramics",
      revenue: "+340% sales growth"
    },
    {
      text: "The platform's premium feel attracts quality customers who value craftsmanship",
      author: "Youssef Benali",
      business: "Marrakech Leather",
      revenue: "2,000+ happy customers"
    },
    {
      text: "Simple tools, beautiful storefront, and amazing support team",
      author: "Fatima Zahra",
      business: "Desert Rose Jewelry",
      revenue: "Featured creator program"
    }
  ];

  const categories = [
    'Fashion & Accessories',
    'Home & Living',
    'Art & Collectibles',
    'Jewelry',
    'Beauty & Personal Care',
    'Electronics & Gadgets',
    'Handmade Crafts',
    'Other'
  ];

  const benefits = [
    { icon: TrendingUp, title: 'Reach MENA Markets', desc: 'Access customers across Morocco, Tunisia, Algeria and beyond' },
    { icon: Star, title: 'Premium Positioning', desc: 'Your products showcased in a luxury marketplace environment' },
    { icon: Users, title: 'Growing Community', desc: 'Join 500+ successful creators already selling on When' },
    { icon: Palette, title: 'Beautiful Storefronts', desc: 'Professional product pages that convert browsers to buyers' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!isLogin) {
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.storeName) newErrors.storeName = 'Store name is required';
      if (!formData.category) newErrors.category = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle authentication logic here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex">
      
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className={`w-full max-w-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header */}
          <div className="text-center mb-8">
            <a href="/" className="inline-block mb-6">
              <span className="text-3xl font-light text-stone-900">when</span>
            </a>
            <h1 className="text-2xl font-light text-stone-900 mb-2">
              {isLogin ? 'Welcome back, creator' : 'Join the When community'}
            </h1>
            <p className="text-stone-600">
              {isLogin 
                ? 'Sign in to manage your store and connect with customers' 
                : 'Start your journey as a creator and reach MENA audiences'
              }
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-stone-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                isLogin ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                !isLogin ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <div onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Info (Register only) */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                      errors.firstName ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-amber-400'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                      errors.lastName ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-amber-400'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                    errors.email ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-amber-400'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={`w-full pl-10 pr-12 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                    errors.password ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-amber-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5 text-stone-400" /> : 
                    <Eye className="h-5 w-5 text-stone-400" />
                  }
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                      errors.confirmPassword ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-amber-400'
                    }`}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Store Info (Register only) */}
            {!isLogin && (
              <>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Store className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleInputChange}
                      placeholder="Store name"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                        errors.storeName ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-amber-400'
                      }`}
                    />
                  </div>
                  {errors.storeName && <p className="text-red-500 text-xs mt-1">{errors.storeName}</p>}
                </div>

                <div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                      errors.category ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-amber-400'
                    }`}
                  >
                    <option value="">Select your category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+212 6XX XXX XXX"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <a href="/forgot-password" className="text-sm text-amber-600 hover:text-amber-700 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-stone-900 text-white py-3 rounded-xl hover:bg-stone-800 transition-all font-medium flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Sign In' : 'Create Store'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-stone-50 via-white to-amber-50/30 text-stone-500">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Auth */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-stone-200 rounded-xl hover:border-amber-400 hover:bg-stone-50 transition-all text-sm font-medium">
                <div className="w-5 h-5 bg-blue-600 rounded"></div>
                Facebook
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 border border-stone-200 rounded-xl hover:border-amber-400 hover:bg-stone-50 transition-all text-sm font-medium">
                <div className="w-5 h-5 bg-red-500 rounded"></div>
                Google
              </button>
            </div>

            {/* Terms (Register only) */}
            {!isLogin && (
              <p className="text-xs text-stone-500 text-center leading-relaxed">
                By creating an account, you agree to our{' '}
                <a href="/terms" className="text-amber-600 hover:text-amber-700">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-amber-600 hover:text-amber-700">Privacy Policy</a>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Benefits & Testimonials */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0 0 0-8 0-8s8 0 8 0 0 8 0 8-8 0-8 0Z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 flex flex-col justify-center p-12 space-y-12">
          
          {/* Success Stats */}
          <div className="space-y-8">
            <h2 className="text-3xl font-light">
              {isLogin ? 'Welcome back to your creative space' : 'Join MENA\'s premier creative marketplace'}
            </h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-light mb-1">500+</div>
                <div className="text-amber-200 text-sm">Active creators</div>
              </div>
              <div>
                <div className="text-3xl font-light mb-1">10K+</div>
                <div className="text-amber-200 text-sm">Monthly buyers</div>
              </div>
              <div>
                <div className="text-3xl font-light mb-1">92%</div>
                <div className="text-amber-200 text-sm">Creator satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-light mb-1">24h</div>
                <div className="text-amber-200 text-sm">Average response</div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          {!isLogin && (
            <div className="space-y-6">
              <h3 className="text-xl font-light mb-6">Why creators choose When</h3>
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mt-1">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{title}</h4>
                    <p className="text-stone-300 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rotating Testimonials */}
          <div className="space-y-6">
            <div className="h-32">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute transition-all duration-700 ${
                    currentTestimonial === index 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <blockquote className="text-lg font-light italic mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-amber-200 text-sm">{testimonial.business}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium text-sm">{testimonial.revenue}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial Dots */}
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentTestimonial === index ? 'bg-amber-400 w-8' : 'bg-stone-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-8 w-16 h-16 bg-amber-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/3 left-8 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default VendorPortal;
