'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// SVG Icons
const ChartPieIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);

const InboxIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 012.25 2.25v4.5A2.25 2.25 0 0118 21H6a2.25 2.25 0 01-2.25-2.25v-4.5a2.25 2.25 0 012.25-2.25zM6 7.5l6-6 6 6m-6-6v12" />
  </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.188.904zM19.006 5.005L18.5 8l-.5-2.995L15 4.5l3-1 1-3 1 3 2.995.5-2.995 1z" />
  </svg>
);

const DiamondIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75l-8.25-8.25L12 3l8.25 10.5-8.25 8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18.75M3.75 13.5H20.25M12 3l4.5 10.5M12 3L7.5 13.5M12 21.75l4.5-8.25M12 21.75L7.5 13.5" />
  </svg>
);

const CogIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
  </svg>
);

const TrashIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const EditIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const PlusIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function AdminPanel() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState('overview');
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [diamonds, setDiamonds] = useState([]);
  const [settings, setSettings] = useState({
    whatsappNumber: '',
    instagramLink: '',
    facebookLink: '',
    email: '',
    address: '',
    mapLink: '',
    heroHeadline: '',
    heroSubheadline: '',
    heroImages: []
  });

  // Loading States
  const [dataLoading, setDataLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '...' }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Search/Filters
  const [inquirySearch, setInquirySearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [diamondSearch, setDiamondSearch] = useState('');

  // CRUD Form Modals / States
  const [productForm, setProductForm] = useState(null); // null, 'add', or { ...product }
  const [diamondForm, setDiamondForm] = useState(null); // null, 'add', or { ...diamond }

  // 1. Auth check on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/login');
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          fetchDashboardData();
        }
      } catch (err) {
        console.error('Error checking auth:', err);
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  // 2. Fetch dashboard resources
  const fetchDashboardData = async () => {
    setDataLoading(true);
    try {
      const inqRes = await fetch(`/api/inquiries?t=${Date.now()}`);
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData);
      }

      const prodRes = await fetch(`/api/products?t=${Date.now()}`);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }

      const diaRes = await fetch(`/api/diamonds?t=${Date.now()}`);
      if (diaRes.ok) {
        const diaData = await diaRes.json();
        setDiamonds(diaData);
      }

      const setRes = await fetch('/api/inquiries?type=settings');
      if (setRes.ok) {
        const setData = await setRes.json();
        setSettings(setData);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  // 3. Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAuthenticated(true);
        fetchDashboardData();
      } else {
        setLoginError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setLoginError('A network error occurred.');
    } finally {
      setLoginLoading(false);
    }
  };

  // 4. Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
      setAuthenticated(false);
      setLoginPassword('');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  // 5. Delete handlers
  const handleDeleteInquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(inquiries.filter(i => i.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteDiamond = async (id) => {
    if (!confirm('Are you sure you want to delete this diamond record?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/diamonds?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDiamonds(diamonds.filter(d => d.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Save handlers
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          images: Array.isArray(productForm.images)
            ? productForm.images.map(s => s.trim()).filter(Boolean)
            : typeof productForm.images === 'string'
              ? productForm.images.split(',').map(s => s.trim()).filter(Boolean)
              : [],
          alloys: typeof productForm.alloys === 'string'
            ? productForm.alloys.split(',').map(s => s.trim()).filter(Boolean)
            : productForm.alloys,
        })
      });

      if (res.ok) {
        setProductForm(null);
        fetchDashboardData();
        showNotification('Product saved successfully!', 'success');
      } else {
        const errData = await res.json();
        showNotification(errData.error || 'Failed to save product', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Error saving product', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDiamondSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch('/api/diamonds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diamondForm)
      });

      if (res.ok) {
        setDiamondForm(null);
        fetchDashboardData();
        showNotification('Diamond specification saved successfully!', 'success');
      } else {
        const errData = await res.json();
        showNotification(errData.error || 'Failed to save diamond', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Error saving diamond', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settingsUpdate: true,
          settings
        })
      });

      if (res.ok) {
        showNotification('Settings updated successfully!', 'success');
      } else {
        showNotification('Failed to update settings', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Error updating settings', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const toggleProductActive = async (product) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          active: product.active === false ? true : false
        })
      });

      if (res.ok) {
        fetchDashboardData();
        showNotification(`Product status updated to ${product.active === false ? 'Active' : 'Inactive'}`, 'success');
      } else {
        showNotification('Failed to toggle product status', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Error updating status', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const toggleDiamondActive = async (diamond) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/diamonds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...diamond,
          active: diamond.active === false ? true : false
        })
      });

      if (res.ok) {
        fetchDashboardData();
        showNotification(`Diamond status updated to ${diamond.active === false ? 'Active' : 'Inactive'}`, 'success');
      } else {
        showNotification('Failed to toggle diamond status', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Error updating status', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.success) {
          uploadedUrls.push(data.url);
          showNotification(`${file.name} uploaded successfully!`, 'success');
        } else {
          showNotification(`Failed to upload ${file.name}: ${data.error || 'Unknown error'}`, 'error');
        }
      } catch (err) {
        console.error(err);
        showNotification(`Network error uploading ${file.name}`, 'error');
      }
    }

    if (uploadedUrls.length > 0) {
      setProductForm((prev) => ({
        ...prev,
        images: [...(prev.images || []).filter(Boolean), ...uploadedUrls],
      }));
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleImageDelete = async (urlIndex, url) => {
    if (!confirm('Are you sure you want to delete this image from the server?')) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/upload?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        const newImages = productForm.images.filter((_, idx) => idx !== urlIndex);
        setProductForm({ ...productForm, images: newImages });
        showNotification('Image deleted successfully!', 'success');
      } else {
        showNotification(data.error || 'Failed to delete file from server', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Network error deleting image', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleHeroImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.success) {
          uploadedUrls.push(data.url);
          showNotification(`${file.name} uploaded successfully!`, 'success');
        } else {
          showNotification(`Failed to upload ${file.name}: ${data.error || 'Unknown error'}`, 'error');
        }
      } catch (err) {
        console.error(err);
        showNotification(`Network error uploading ${file.name}`, 'error');
      }
    }

    if (uploadedUrls.length > 0) {
      setSettings((prev) => ({
        ...prev,
        heroImages: [...(prev.heroImages || []).filter(Boolean), ...uploadedUrls],
      }));
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleHeroImageDelete = async (urlIndex, url) => {
    if (!confirm('Are you sure you want to delete this image from the server?')) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/upload?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setSettings((prev) => ({
          ...prev,
          heroImages: (prev.heroImages || []).filter((_, idx) => idx !== urlIndex),
        }));
        showNotification('Hero image deleted successfully!', 'success');
      } else {
        setSettings((prev) => ({
          ...prev,
          heroImages: (prev.heroImages || []).filter((_, idx) => idx !== urlIndex),
        }));
        showNotification('Image reference removed.', 'success');
      }
    } catch (err) {
      console.error(err);
      showNotification('Error deleting image', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Filter lists
  const filteredInquiries = inquiries.filter(inq => {
    const s = inquirySearch.toLowerCase();
    return (
      inq.name.toLowerCase().includes(s) ||
      inq.email.toLowerCase().includes(s) ||
      (inq.message && inq.message.toLowerCase().includes(s)) ||
      (inq.itemId && inq.itemId.toLowerCase().includes(s))
    );
  });

  const filteredProducts = products.filter(p => {
    const s = productSearch.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(s) || p.category.toLowerCase().includes(s);
    const matchesCategory = productCategoryFilter === 'All' || p.category.toLowerCase() === productCategoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const filteredDiamonds = diamonds.filter(d => {
    const s = diamondSearch.toLowerCase();
    return (
      d.certificateNumber.toLowerCase().includes(s) ||
      d.shape.toLowerCase().includes(s) ||
      d.color.toLowerCase().includes(s) ||
      d.clarity.toLowerCase().includes(s)
    );
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block">Loading Atelier Control...</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!authenticated) {
    return (
      <div className="min-h-[85vh] bg-brand-cream flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-brand-ivory border border-brand-charcoal/5 rounded-[4px] shadow-lg p-8 relative overflow-hidden">
          {/* Subtle line decorations */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-gold/40 via-brand-gold to-brand-gold/40" />
          
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.35em] text-brand-gold font-semibold mb-2 block">
              Staff Portal
            </span>
            <h1 className="font-display text-3xl text-brand-charcoal font-light">
              Aurion Atelier Access
            </h1>
            <p className="text-xs text-brand-slate mt-2 tracking-wider">Please authenticate to manage jewelry catalogs.</p>
            <div className="w-12 h-[1px] bg-brand-gold/30 mx-auto mt-4" />
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="pass" className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">
                Atelier Password
              </label>
              <input
                type="password"
                id="pass"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-all placeholder-brand-slate/40"
                placeholder="Enter password..."
              />
            </div>

            {loginError && (
              <div className="text-xs text-red-700 bg-red-500/10 border border-red-500/10 p-3 rounded-[2px]">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-brand-charcoal hover:bg-brand-gold text-white text-xs uppercase tracking-widest py-3.5 transition-colors duration-300 rounded-[2px] cursor-pointer font-semibold shadow-sm hover:shadow"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // REDESIGNED ADMIN DASHBOARD LAYOUT
  // -------------------------------------------------------------
  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartPieIcon },
    { id: 'inquiries', name: 'Inquiries', icon: InboxIcon, badge: inquiries.length },
    { id: 'products', name: 'Products', icon: SparklesIcon, badge: products.length },
    { id: 'diamonds', name: 'Diamonds', icon: DiamondIcon, badge: diamonds.length },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ];

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal flex flex-col md:flex-row font-sans">
      
      {/* Side Navigation Sidebar */}
      <aside className="w-full md:w-64 bg-brand-ivory border-b md:border-b-0 md:border-r border-brand-charcoal/5 flex flex-col shrink-0">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-brand-charcoal/5 flex flex-row items-center justify-between md:flex-col md:items-start md:space-y-2">
          <div>
            <span className="font-display text-xl tracking-widest text-brand-charcoal font-semibold">
              AURION JEWELS
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold block font-medium">
              Atelier Workspace
            </span>
          </div>
          
          <div className="flex flex-row md:flex-col items-center md:items-stretch gap-2 md:mt-4 w-fit md:w-full">
            <Link
              href="/"
              className="text-[10px] text-center uppercase tracking-widest text-brand-gold border border-brand-gold/30 hover:bg-brand-gold hover:text-white px-3 py-1.5 transition-all rounded-[2px] cursor-pointer block font-semibold"
            >
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="text-[10px] uppercase tracking-widest text-red-600 hover:text-brand-charcoal border border-red-600/20 hover:border-brand-charcoal/20 px-3 py-1.5 transition-all rounded-[2px] cursor-pointer block"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-[3px] text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer whitespace-nowrap w-full text-left ${
                  isActive
                    ? 'bg-brand-sand text-brand-gold border-l-2 border-brand-gold font-bold'
                    : 'text-brand-slate hover:bg-brand-sand/50 hover:text-brand-charcoal'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-gold' : 'text-brand-slate'}`} />
                <span className="flex-grow">{tab.name}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-brand-gold text-white font-mono' : 'bg-brand-sand text-brand-slate font-mono'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Dynamic Action Sync Indicator */}
        {actionLoading && (
          <div className="fixed top-4 right-4 z-50 bg-brand-charcoal text-brand-gold border border-brand-gold/20 shadow-md px-4 py-2.5 rounded-[2px] flex items-center space-x-2">
            <div className="w-3.5 h-3.5 border border-brand-gold border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">Atelier Syncing...</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-display text-3xl text-brand-charcoal font-light">Atelier Overview</h1>
              <p className="text-xs text-brand-slate tracking-widest uppercase mt-1">Real-time statistics & quick actions</p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Card 1: Inquiries */}
              <div onClick={() => setActiveTab('inquiries')} className="bg-brand-ivory border border-brand-charcoal/5 p-6 rounded-[3px] shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
                <div className="absolute right-4 top-4 text-brand-gold/15 group-hover:text-brand-gold/25 transition-colors">
                  <InboxIcon className="w-12 h-12" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-brand-slate font-semibold block">Inquiries</span>
                <span className="font-display text-4xl text-brand-charcoal font-light block mt-2">{inquiries.length}</span>
                <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider block mt-2">Active Leads →</span>
              </div>

              {/* Card 2: Products */}
              <div onClick={() => setActiveTab('products')} className="bg-brand-ivory border border-brand-charcoal/5 p-6 rounded-[3px] shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
                <div className="absolute right-4 top-4 text-brand-gold/15 group-hover:text-brand-gold/25 transition-colors">
                  <SparklesIcon className="w-12 h-12" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-brand-slate font-semibold block">Product Catalog</span>
                <span className="font-display text-4xl text-brand-charcoal font-light block mt-2">{products.length}</span>
                <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider block mt-2">Manage Masterpieces →</span>
              </div>

              {/* Card 3: Diamonds */}
              <div onClick={() => setActiveTab('diamonds')} className="bg-brand-ivory border border-brand-charcoal/5 p-6 rounded-[3px] shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
                <div className="absolute right-4 top-4 text-brand-gold/15 group-hover:text-brand-gold/25 transition-colors">
                  <DiamondIcon className="w-12 h-12" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-brand-slate font-semibold block">Certified Diamonds</span>
                <span className="font-display text-4xl text-brand-charcoal font-light block mt-2">{diamonds.length}</span>
                <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider block mt-2">Loose Diamond Catalog →</span>
              </div>

            </div>

            {/* Quick Actions Panel */}
            <div className="bg-brand-sand border border-brand-charcoal/5 p-6 rounded-[3px] space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-brand-charcoal font-bold">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setActiveTab('products');
                    setProductForm({
                      id: '',
                      title: '',
                      category: 'Rings',
                      price: '',
                      images: [],
                      description: '',
                      moq: '3',
                      alloys: '14k / 18k Yellow Gold, White Gold, Rose Gold, Platinum (PT950)',
                      gemstones: '',
                      packaging: '10-12 Business Days',
                      active: true
                    });
                  }}
                  className="bg-brand-gold hover:bg-brand-charcoal text-white text-xs uppercase tracking-widest px-6 py-3 transition-colors rounded-[2px] font-semibold cursor-pointer shadow-sm flex items-center space-x-2"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('diamonds');
                    setDiamondForm({
                      id: '',
                      shape: 'Round',
                      carat: '1.00',
                      cut: 'Excellent',
                      color: 'D',
                      clarity: 'VVS1',
                      polish: 'Excellent',
                      symmetry: 'Excellent',
                      fluorescence: 'None',
                      lab: 'GIA',
                      certificateNumber: '',
                      price: '',
                      featured: false,
                      active: true
                    });
                  }}
                  className="bg-brand-gold hover:bg-brand-charcoal text-white text-xs uppercase tracking-widest px-6 py-3 transition-colors rounded-[2px] font-semibold cursor-pointer shadow-sm flex items-center space-x-2"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  <span>Add Diamond</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className="border border-brand-charcoal/20 text-brand-charcoal hover:bg-brand-charcoal hover:text-white bg-transparent text-xs uppercase tracking-widest px-6 py-3 transition-all rounded-[2px] font-semibold cursor-pointer flex items-center space-x-2"
                >
                  <CogIcon className="w-3.5 h-3.5" />
                  <span>Edit Settings</span>
                </button>
              </div>
            </div>

            {/* Recent inquiries preview */}
            <div className="bg-brand-ivory border border-brand-charcoal/5 rounded-[3px] p-6 space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-brand-charcoal/5 pb-3">
                <h3 className="text-xs uppercase tracking-widest text-brand-charcoal font-bold">Recent Inquiries</h3>
                <button onClick={() => setActiveTab('inquiries')} className="text-[10px] text-brand-gold uppercase tracking-widest font-semibold hover:underline">View All</button>
              </div>
              {inquiries.slice(0, 3).length === 0 ? (
                <p className="text-sm italic text-brand-slate">No inquiries available.</p>
              ) : (
                <div className="divide-y divide-brand-charcoal/5">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-brand-charcoal">{inq.name}</h4>
                        <p className="text-xs text-brand-slate mt-0.5">{inq.email} • {new Date(inq.timestamp).toLocaleDateString()}</p>
                      </div>
                      <span className="text-[10px] bg-brand-sand border border-brand-gold/15 text-brand-gold uppercase font-bold px-2 py-0.5 rounded-[1px] font-mono">
                        {inq.itemId || inq.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: INQUIRIES */}
        {/* ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl text-brand-charcoal font-light">Client Inquiries</h1>
                <p className="text-xs text-brand-slate tracking-widest uppercase mt-1">Manage bulk orders, designs & feedback</p>
              </div>
              
              {/* Search input */}
              <div className="relative w-full sm:max-w-xs">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-slate/50">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full bg-brand-ivory border border-brand-charcoal/10 focus:border-brand-gold pl-9 pr-4 py-2.5 text-sm focus:outline-none rounded-[2px]"
                />
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="text-center py-20 bg-brand-ivory border border-brand-charcoal/5 rounded-[3px] shadow-sm">
                <InboxIcon className="w-8 h-8 text-brand-slate/30 mx-auto mb-3" />
                <p className="text-brand-slate text-sm font-display italic">No client inquiries match your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredInquiries.map((inq) => {
                  const isWholesale = inq.itemId === 'wholesale' || inq.type === 'wholesale';
                  const isBespoke = inq.itemId === 'bespoke' || inq.type === 'bespoke';
                  const isDiamonds = inq.itemId === 'diamonds' || inq.type === 'diamonds';
                  
                  let badgeColors = 'bg-brand-charcoal/5 border-brand-charcoal/10 text-brand-charcoal';
                  if (isWholesale) badgeColors = 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold';
                  else if (isBespoke) badgeColors = 'bg-amber-800/10 border-amber-800/20 text-amber-900';
                  else if (isDiamonds) badgeColors = 'bg-slate-700/10 border-slate-700/20 text-slate-800';

                  return (
                    <div key={inq.id} className="bg-brand-ivory border border-brand-charcoal/5 p-6 rounded-[3px] shadow-sm hover:shadow-md transition-shadow space-y-4">
                      
                      {/* Inquiry Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-brand-charcoal/5 pb-3">
                        <div>
                          <h3 className="font-semibold text-brand-charcoal text-base">{inq.name}</h3>
                          <div className="text-xs text-brand-slate mt-1 flex flex-wrap gap-x-3 gap-y-1">
                            <a href={`mailto:${inq.email}`} className="hover:text-brand-gold transition-colors">{inq.email}</a>
                            {inq.phone && (
                              <>
                                <span>•</span>
                                <a href={`tel:${inq.phone}`} className="hover:text-brand-gold transition-colors">{inq.phone}</a>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-left sm:text-right shrink-0">
                          <span className={`text-[9px] border font-bold uppercase tracking-wider px-2.5 py-1 rounded-[1px] inline-block font-mono ${badgeColors}`}>
                            {inq.itemId || inq.type}
                          </span>
                          <p className="text-[10px] text-brand-slate mt-1.5 font-mono">{new Date(inq.timestamp).toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Message Content */}
                      <p className="text-sm text-brand-charcoal bg-brand-cream/50 p-4 border border-brand-charcoal/5 rounded-[2px] leading-relaxed whitespace-pre-wrap font-sans">
                        {inq.message}
                      </p>

                      {/* Actions */}
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex gap-4">
                          <a
                            href={`mailto:${inq.email}?subject=Regarding your Aurion Jewels Inquiry`}
                            className="text-xs text-brand-gold hover:text-brand-charcoal font-semibold uppercase tracking-widest"
                          >
                            Reply via Email
                          </a>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="text-xs text-red-600 hover:text-red-800 transition-colors uppercase tracking-widest font-semibold cursor-pointer flex items-center space-x-1"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: PRODUCTS */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl text-brand-charcoal font-light">Product Catalog</h1>
                <p className="text-xs text-brand-slate tracking-widest uppercase mt-1">Manage featured masterpieces and collections</p>
              </div>

              <div className="flex items-center gap-4 w-full sm:max-w-lg shrink-0 justify-end font-sans">
                {/* Category Filter */}
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="bg-brand-ivory border border-brand-charcoal/10 focus:border-brand-gold p-2 text-sm focus:outline-none rounded-[2px] cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Rings">Rings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Bracelets">Bracelets</option>
                </select>

                {/* Search */}
                <div className="relative flex-grow max-w-xs font-normal">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-slate/50">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-brand-ivory border border-brand-charcoal/10 focus:border-brand-gold pl-9 pr-4 py-2 text-sm focus:outline-none rounded-[2px]"
                  />
                </div>

                <button
                  onClick={() => setProductForm({
                    id: '',
                    title: '',
                    category: 'Rings',
                    price: '',
                    images: [],
                    description: '',
                    moq: '3',
                    alloys: '14k / 18k Yellow Gold, White Gold, Rose Gold, Platinum (PT950)',
                    gemstones: '',
                    packaging: '10-12 Business Days',
                    active: true
                  })}
                  className="bg-brand-gold hover:bg-brand-charcoal text-white text-xs uppercase tracking-widest px-4 py-2.5 transition-colors rounded-[2px] font-semibold cursor-pointer shadow-sm flex items-center space-x-2 shrink-0 h-fit"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Catalog list table */}
            <div className="overflow-x-auto border border-brand-charcoal/5 rounded-[3px] bg-brand-ivory shadow-sm">
              <table className="w-full border-collapse text-left text-sm text-brand-slate font-sans">
                <thead className="bg-brand-sand border-b border-brand-charcoal/5 text-[10px] uppercase tracking-widest font-bold text-brand-charcoal">
                  <tr>
                    <th className="p-4 pl-6">Display</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price Structure</th>
                    <th className="p-4">MOQ</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-charcoal/5">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-brand-sand/15 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="w-12 h-12 overflow-hidden bg-brand-sand border border-brand-charcoal/5 rounded-[2px]">
                          <img
                            src={p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200'}
                            className="w-full h-full object-cover"
                            alt={p.title}
                          />
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-brand-charcoal">{p.title}</td>
                      <td className="p-4">
                        <span className="text-[10px] bg-brand-sand/50 text-brand-slate uppercase font-semibold px-2 py-0.5 rounded-[1px] border border-brand-charcoal/5 font-mono">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-xs">{p.price}</td>
                      <td className="p-4 font-mono text-xs">{p.moq} pcs</td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleProductActive(p)}
                          className={`text-[10px] border font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] transition-all duration-300 font-mono cursor-pointer ${
                            p.active !== false
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 hover:bg-emerald-500/20'
                              : 'bg-brand-charcoal/10 border-brand-charcoal/20 text-brand-slate hover:bg-brand-charcoal/20'
                          }`}
                          title="Click to toggle status"
                        >
                          {p.active !== false ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="p-4 pr-6 text-right space-x-3 whitespace-nowrap">
                        <button
                          onClick={() => setProductForm({
                            ...p,
                            images: p.images && p.images.length > 0 ? p.images : [],
                            alloys: p.alloys ? p.alloys.join(', ') : '',
                            active: p.active !== false
                          })}
                          className="text-xs text-brand-gold hover:text-brand-charcoal transition-colors uppercase tracking-widest font-semibold cursor-pointer inline-flex items-center space-x-1"
                        >
                          <EditIcon className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-xs text-red-600 hover:text-red-800 transition-colors uppercase tracking-widest font-semibold cursor-pointer inline-flex items-center space-x-1"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-brand-slate font-display italic">
                        No masterpieces found in collection matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: DIAMONDS */}
        {/* ========================================================= */}
        {activeTab === 'diamonds' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl text-brand-charcoal font-light">Loose Diamonds Registry</h1>
                <p className="text-xs text-brand-slate tracking-widest uppercase mt-1">Manage certified diamond catalog stock</p>
              </div>

              <div className="flex items-center gap-4 w-full sm:max-w-md shrink-0 justify-end font-sans">
                {/* Search */}
                <div className="relative flex-grow max-w-xs font-normal">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-slate/50">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Search cert, shape..."
                    value={diamondSearch}
                    onChange={(e) => setDiamondSearch(e.target.value)}
                    className="w-full bg-brand-ivory border border-brand-charcoal/10 focus:border-brand-gold pl-9 pr-4 py-2 text-sm focus:outline-none rounded-[2px]"
                  />
                </div>

                <button
                  onClick={() => setDiamondForm({
                    id: '',
                    shape: 'Round',
                    carat: '1.00',
                    cut: 'Excellent',
                    color: 'D',
                    clarity: 'VVS1',
                    polish: 'Excellent',
                    symmetry: 'Excellent',
                    fluorescence: 'None',
                    lab: 'GIA',
                    certificateNumber: '',
                    price: '',
                    featured: false
                  })}
                  className="bg-brand-gold hover:bg-brand-charcoal text-white text-xs uppercase tracking-widest px-4 py-2.5 transition-colors rounded-[2px] font-semibold cursor-pointer shadow-sm flex items-center space-x-2 shrink-0 h-fit"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  <span>Add Diamond</span>
                </button>
              </div>
            </div>

            {/* List Table */}
            <div className="overflow-x-auto border border-brand-charcoal/5 rounded-[3px] bg-brand-ivory shadow-sm">
              <table className="w-full border-collapse text-left text-sm text-brand-slate font-sans">
                <thead className="bg-brand-sand border-b border-brand-charcoal/5 text-[10px] uppercase tracking-widest font-bold text-brand-charcoal">
                  <tr>
                    <th className="p-4 pl-6">Certificate</th>
                    <th className="p-4">Shape</th>
                    <th className="p-4">Carat</th>
                    <th className="p-4">Color / Clarity</th>
                    <th className="p-4">Lab / Tag</th>
                    <th className="p-4">Price (USD)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-charcoal/5">
                  {filteredDiamonds.map((d) => (
                    <tr key={d.id} className="hover:bg-brand-sand/15 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-brand-charcoal font-mono text-xs">{d.certificateNumber}</td>
                      <td className="p-4">{d.shape}</td>
                      <td className="p-4 font-mono text-xs">{d.carat} ct</td>
                      <td className="p-4 font-mono text-xs">{d.color} / {d.clarity}</td>
                      <td className="p-4 flex items-center space-x-2 pt-5">
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-[1px] font-mono">
                          {d.lab}
                        </span>
                        {d.featured && (
                          <span className="bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-[1px] font-mono">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-semibold text-brand-charcoal font-mono text-xs">${Number(d.price).toLocaleString()}</td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleDiamondActive(d)}
                          className={`text-[10px] border font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] transition-all duration-300 font-mono cursor-pointer ${
                            d.active !== false
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 hover:bg-emerald-500/20'
                              : 'bg-brand-charcoal/10 border-brand-charcoal/20 text-brand-slate hover:bg-brand-charcoal/20'
                          }`}
                          title="Click to toggle status"
                        >
                          {d.active !== false ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="p-4 pr-6 text-right space-x-3 whitespace-nowrap">
                        <button
                          onClick={() => setDiamondForm({ ...d, active: d.active !== false })}
                          className="text-xs text-brand-gold hover:text-brand-charcoal transition-colors uppercase tracking-widest font-semibold cursor-pointer inline-flex items-center space-x-1"
                        >
                          <EditIcon className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteDiamond(d.id)}
                          className="text-xs text-red-600 hover:text-red-800 transition-colors uppercase tracking-widest font-semibold cursor-pointer inline-flex items-center space-x-1"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredDiamonds.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-12 text-center text-brand-slate font-display italic">
                        No diamond records available matching search filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl text-brand-charcoal font-light">Website Settings</h1>
              <p className="text-xs text-brand-slate tracking-widest uppercase mt-1">Configure global store details & design assets</p>
            </div>

            <div className="bg-brand-ivory border border-brand-charcoal/5 p-8 rounded-[3px] shadow-sm max-w-3xl font-sans">
              <form onSubmit={handleSettingsSubmit} className="space-y-8">
                
                {/* Section 1: Contacts */}
                <div className="space-y-5">
                  <h3 className="text-xs uppercase tracking-widest text-brand-gold font-bold border-b border-brand-charcoal/5 pb-2">
                    Concierge Channels & Atelier Address
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">WhatsApp Number</label>
                      <input
                        type="text"
                        required
                        value={settings.whatsappNumber || ''}
                        onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                        className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                        placeholder="+15550199"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Concierge Email</label>
                      <input
                        type="email"
                        required
                        value={settings.email || ''}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                        placeholder="inquire@aurionjewels.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Instagram Link</label>
                      <input
                        type="url"
                        value={settings.instagramLink || ''}
                        onChange={(e) => setSettings({ ...settings, instagramLink: e.target.value })}
                        className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                        placeholder="https://instagram.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Facebook Link</label>
                      <input
                        type="url"
                        value={settings.facebookLink || ''}
                        onChange={(e) => setSettings({ ...settings, facebookLink: e.target.value })}
                        className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Atelier Address</label>
                      <input
                        type="text"
                        required
                        value={settings.address || ''}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                        placeholder="Street details..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Google Maps Embed Link / Address URL</label>
                      <input
                        type="text"
                        value={settings.mapLink || ''}
                        onChange={(e) => setSettings({ ...settings, mapLink: e.target.value })}
                        className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                        placeholder="Google Maps sharing embed URL or search address..."
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Banner text */}
                <div className="space-y-5">
                  <h3 className="text-xs uppercase tracking-widest text-brand-gold font-bold border-b border-brand-charcoal/5 pb-2">
                    Hero Section Text Assets
                  </h3>
                  
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Homepage Hero Headline</label>
                    <input
                      type="text"
                      required
                      value={settings.heroHeadline}
                      onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                      className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Homepage Hero Subheadline</label>
                    <textarea
                      rows="3"
                      required
                      value={settings.heroSubheadline}
                      onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                      className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Section 3: Hero Carousel Images */}
                <div className="space-y-5">
                  <h3 className="text-xs uppercase tracking-widest text-brand-gold font-bold border-b border-brand-charcoal/5 pb-2">
                    Homepage Hero Images Carousel
                  </h3>
                  
                  {/* Upload Button */}
                  <div>
                    <input
                      type="file"
                      id="hero-file-upload"
                      multiple
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="hero-file-upload"
                      className="border border-dashed border-brand-gold/40 hover:border-brand-gold bg-brand-cream/30 hover:bg-brand-gold/5 text-brand-gold text-xs uppercase tracking-widest px-6 py-4 rounded-[3px] cursor-pointer font-semibold transition-all flex items-center justify-center space-x-2"
                    >
                      {uploading ? (
                        <>
                          <div className="w-3.5 h-3.5 border border-brand-gold border-t-transparent rounded-full animate-spin" />
                          <span>Uploading Files...</span>
                        </>
                      ) : (
                        <>
                          <span>✦ Upload Hero Images from PC</span>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Previews and URL List */}
                  <div className="space-y-3">
                    {(settings.heroImages || []).map((imgUrl, idx) => (
                      <div key={idx} className="flex gap-4 items-center bg-brand-cream/20 p-3 border border-brand-charcoal/5 rounded-[3px]">
                        {/* Image Preview Thumbnail */}
                        <div className="w-16 h-16 overflow-hidden bg-brand-sand border border-brand-charcoal/10 rounded-[2px] shrink-0">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              className="w-full h-full object-cover"
                              alt={`Preview ${idx + 1}`}
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-brand-slate italic bg-brand-sand">No img</div>
                          )}
                        </div>

                        {/* URL Text / Read-only input */}
                        <input
                          type="text"
                          value={imgUrl}
                          readOnly
                          className="flex-grow bg-brand-cream border border-brand-charcoal/5 p-2 text-xs focus:outline-none rounded-[2px] font-mono text-brand-slate select-all cursor-default"
                          placeholder="Image URL path..."
                        />

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => handleHeroImageDelete(idx, imgUrl)}
                          className="text-red-600 hover:text-red-800 text-xs font-semibold uppercase tracking-wider px-3 py-2 cursor-pointer border border-red-600/10 hover:border-red-600/20 rounded-[2px] transition-colors shrink-0 bg-white"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    {(settings.heroImages || []).length === 0 && (
                      <p className="text-xs text-brand-slate italic">No images in carousel. The homepage will display the fallback default ring image.</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 font-sans font-bold">
                  <button
                    type="submit"
                    className="bg-brand-charcoal hover:bg-brand-gold text-white text-xs uppercase tracking-widest px-8 py-3.5 transition-colors rounded-[2px] font-semibold cursor-pointer shadow"
                  >
                    Save Configuration Settings
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* MODAL: PRODUCT FORM */}
      {/* ========================================================= */}
      {productForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/40 backdrop-blur-xs p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-brand-ivory border border-brand-charcoal/5 rounded-[4px] shadow-2xl p-8 max-h-[90vh] overflow-y-auto font-sans">
            
            {/* Close Button */}
            <button
              onClick={() => setProductForm(null)}
              className="absolute right-6 top-6 text-brand-slate hover:text-brand-charcoal transition-colors cursor-pointer"
            >
              <CloseIcon />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-1 block">Catalog Spec</span>
              <h3 className="font-display text-2xl text-brand-charcoal font-light">
                {productForm.id ? 'Edit Masterpiece Product' : 'Add New Masterpiece Product'}
              </h3>
              <div className="w-8 h-[1px] bg-brand-gold/30 mt-3" />
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                    placeholder="e.g. Solitaire Diamond Ring"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  >
                    <option>Rings</option>
                    <option>Necklaces</option>
                    <option>Earrings</option>
                    <option>Bracelets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Price Tag / Range</label>
                  <input
                    type="text"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                    placeholder="e.g. FOB $1,250 - $1,500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Minimum Order (MOQ)</label>
                  <input
                    type="number"
                    value={productForm.moq}
                    onChange={(e) => setProductForm({ ...productForm, moq: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Product Images</label>
                
                {/* Upload Button and Hidden File Input */}
                <div className="mb-4">
                  <input
                    type="file"
                    id="product-file-upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="product-file-upload"
                    className="border border-dashed border-brand-gold/40 hover:border-brand-gold bg-brand-cream/30 hover:bg-brand-gold/5 text-brand-gold text-xs uppercase tracking-widest px-6 py-4 rounded-[3px] cursor-pointer font-semibold transition-all flex items-center justify-center space-x-2"
                  >
                    {uploading ? (
                      <>
                        <div className="w-3.5 h-3.5 border border-brand-gold border-t-transparent rounded-full animate-spin" />
                        <span>Uploading Files...</span>
                      </>
                    ) : (
                      <>
                        <span>✦ Upload Images from PC</span>
                      </>
                    )}
                  </label>
                </div>

                {/* Previews and URL List */}
                <div className="space-y-3">
                  {(productForm.images || []).map((imgUrl, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-brand-cream/20 p-3 border border-brand-charcoal/5 rounded-[3px]">
                      {/* Image Preview Thumbnail */}
                      <div className="w-16 h-16 overflow-hidden bg-brand-sand border border-brand-charcoal/10 rounded-[2px] shrink-0">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            className="w-full h-full object-cover"
                            alt={`Preview ${idx + 1}`}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-brand-slate italic bg-brand-sand">No img</div>
                        )}
                      </div>

                      {/* URL Text / Read-only input */}
                      <input
                        type="text"
                        value={imgUrl}
                        readOnly
                        className="flex-grow bg-brand-cream border border-brand-charcoal/5 p-2 text-xs focus:outline-none rounded-[2px] font-mono text-brand-slate select-all cursor-default"
                        placeholder="Image URL path..."
                      />

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => handleImageDelete(idx, imgUrl)}
                        className="text-red-600 hover:text-red-800 text-xs font-semibold uppercase tracking-wider px-3 py-2 cursor-pointer border border-red-600/10 hover:border-red-600/20 rounded-[2px] transition-colors shrink-0 bg-white"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Alloys (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.alloys}
                    onChange={(e) => setProductForm({ ...productForm, alloys: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                    placeholder="e.g. 14k / 18k Yellow Gold, White Gold, Rose Gold, Platinum (PT950)"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Gemstones</label>
                  <input
                    type="text"
                    value={productForm.gemstones || ''}
                    onChange={(e) => setProductForm({ ...productForm, gemstones: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                    placeholder="e.g. 1.2ct Diamond"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Est. Production Lead</label>
                  <input
                    type="text"
                    value={productForm.packaging || ''}
                    onChange={(e) => setProductForm({ ...productForm, packaging: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                    placeholder="e.g. 10-12 Business Days"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    id="active-product"
                    checked={productForm.active !== false}
                    onChange={(e) => setProductForm({ ...productForm, active: e.target.checked })}
                    className="w-4 h-4 rounded-[2px] border-brand-charcoal/10 accent-brand-gold cursor-pointer"
                  />
                  <label htmlFor="active-product" className="ml-2 text-xs uppercase tracking-widest text-brand-slate font-semibold cursor-pointer">
                    Active (visible in store collections)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Detailed Description</label>
                <textarea
                  rows="4"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] resize-none"
                  placeholder="Details on cutting, diamonds, bands..."
                />
              </div>

              <div className="flex space-x-4 pt-4 border-t border-brand-charcoal/5 font-semibold">
                <button
                  type="submit"
                  className="bg-brand-gold hover:bg-brand-charcoal text-white text-xs uppercase tracking-widest px-8 py-3.5 transition-colors rounded-[2px] font-semibold cursor-pointer shadow-sm"
                >
                  Save Masterpiece
                </button>
                <button
                  type="button"
                  onClick={() => setProductForm(null)}
                  className="border border-brand-charcoal/20 text-brand-charcoal text-xs uppercase tracking-widest px-8 py-3.5 bg-transparent rounded-[2px] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DIAMOND FORM */}
      {/* ========================================================= */}
      {diamondForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/40 backdrop-blur-xs p-6 overflow-y-auto font-sans">
          <div className="relative w-full max-w-3xl bg-brand-ivory border border-brand-charcoal/5 rounded-[4px] shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setDiamondForm(null)}
              className="absolute right-6 top-6 text-brand-slate hover:text-brand-charcoal transition-colors cursor-pointer"
            >
              <CloseIcon />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-1 block">Inventory Item</span>
              <h3 className="font-display text-2xl text-brand-charcoal font-light">
                {diamondForm.id ? 'Edit Loose Diamond Spec' : 'Register New Loose Diamond'}
              </h3>
              <div className="w-8 h-[1px] bg-brand-gold/30 mt-3" />
            </div>

            <form onSubmit={handleDiamondSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Shape Cut</label>
                  <select
                    value={diamondForm.shape}
                    onChange={(e) => setDiamondForm({ ...diamondForm, shape: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  >
                    <option>Round</option>
                    <option>Oval</option>
                    <option>Princess</option>
                    <option>Emerald</option>
                    <option>Pear</option>
                    <option>Cushion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Carat Weight (ct)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={diamondForm.carat}
                    onChange={(e) => setDiamondForm({ ...diamondForm, carat: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                    placeholder="1.00"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Color Grade</label>
                  <select
                    value={diamondForm.color}
                    onChange={(e) => setDiamondForm({ ...diamondForm, color: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  >
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                    <option>H</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Clarity Grade</label>
                  <select
                    value={diamondForm.clarity}
                    onChange={(e) => setDiamondForm({ ...diamondForm, clarity: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  >
                    <option>FL</option>
                    <option>IF</option>
                    <option>VVS1</option>
                    <option>VVS2</option>
                    <option>VS1</option>
                    <option>VS2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Cut Grade</label>
                  <select
                    value={diamondForm.cut}
                    onChange={(e) => setDiamondForm({ ...diamondForm, cut: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  >
                    <option>Ideal</option>
                    <option>Excellent</option>
                    <option>Very Good</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Polish Grade</label>
                  <select
                    value={diamondForm.polish}
                    onChange={(e) => setDiamondForm({ ...diamondForm, polish: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  >
                    <option>Excellent</option>
                    <option>Very Good</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Symmetry Grade</label>
                  <select
                    value={diamondForm.symmetry}
                    onChange={(e) => setDiamondForm({ ...diamondForm, symmetry: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  >
                    <option>Excellent</option>
                    <option>Very Good</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Fluorescence</label>
                  <select
                    value={diamondForm.fluorescence}
                    onChange={(e) => setDiamondForm({ ...diamondForm, fluorescence: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  >
                    <option>None</option>
                    <option>Faint</option>
                    <option>Medium</option>
                    <option>Strong</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Certificate Lab</label>
                  <select
                    value={diamondForm.lab}
                    onChange={(e) => setDiamondForm({ ...diamondForm, lab: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                  >
                    <option>GIA</option>
                    <option>IGI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">Certificate Number</label>
                  <input
                    type="text"
                    required
                    value={diamondForm.certificateNumber}
                    onChange={(e) => setDiamondForm({ ...diamondForm, certificateNumber: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                    placeholder="e.g. GIA 2348501"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-slate font-semibold mb-2">FOB Price (USD)</label>
                  <input
                    type="number"
                    required
                    value={diamondForm.price}
                    onChange={(e) => setDiamondForm({ ...diamondForm, price: e.target.value })}
                    className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px]"
                    placeholder="e.g. 3500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 pt-6 space-y-4 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="feat-diamond"
                      checked={diamondForm.featured}
                      onChange={(e) => setDiamondForm({ ...diamondForm, featured: e.target.checked })}
                      className="w-4 h-4 rounded-[2px] border-brand-charcoal/10 accent-brand-gold cursor-pointer"
                    />
                    <label htmlFor="feat-diamond" className="ml-2 text-xs uppercase tracking-widest text-brand-slate font-semibold cursor-pointer">
                      Feature Showcase
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="active-diamond"
                      checked={diamondForm.active !== false}
                      onChange={(e) => setDiamondForm({ ...diamondForm, active: e.target.checked })}
                      className="w-4 h-4 rounded-[2px] border-brand-charcoal/10 accent-brand-gold cursor-pointer"
                    />
                    <label htmlFor="active-diamond" className="ml-2 text-xs uppercase tracking-widest text-brand-slate font-semibold cursor-pointer">
                      Active Status
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t border-brand-charcoal/5 font-semibold">
                <button
                  type="submit"
                  className="bg-brand-gold hover:bg-brand-charcoal text-white text-xs uppercase tracking-widest px-8 py-3.5 transition-colors rounded-[2px] font-semibold cursor-pointer shadow-sm"
                >
                  Save Diamond Specification
                </button>
                <button
                  type="button"
                  onClick={() => setDiamondForm(null)}
                  className="border border-brand-charcoal/20 text-brand-charcoal text-xs uppercase tracking-widest px-8 py-3.5 bg-transparent rounded-[2px] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 transition-all transform duration-500 animate-[fadeIn_0.3s_ease-out] font-sans">
          <div className="flex items-center gap-3 px-6 py-4 bg-brand-charcoal text-white rounded-[2px] shadow-xl border border-brand-gold/20 min-w-[280px]">
            {notification.type === 'error' ? (
              <div className="w-5 h-5 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs shrink-0">✕</div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold text-xs shrink-0">✓</div>
            )}
            <div className="flex-grow">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-gold">
                {notification.type === 'error' ? 'Notification Alert' : 'System Success'}
              </p>
              <p className="text-xs text-brand-cream/90 mt-0.5 font-light">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-brand-cream/40 hover:text-white text-xs ml-2 cursor-pointer font-bold font-mono transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
