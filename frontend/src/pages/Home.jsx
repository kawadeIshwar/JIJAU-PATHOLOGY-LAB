import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ImageCarousel from '../ui/ImageCarousel'
import SlidingText from '../ui/SlidingText'
import Logo from '../assets/Logo.png'



function Home() {
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    address: '',
    testType: '',
    customTestType: ''
  })
  const [showMorePackages, setShowMorePackages] = useState(false)
  const packagesTopRef = useRef(null)
  const bookingRef = useRef(null)
  const [showMoreHematology, setShowMoreHematology] = useState(false)
  const [showMoreBiochemistry, setShowMoreBiochemistry] = useState(false)
  const [showMoreSerology, setShowMoreSerology] = useState(false)
  const [showMoreHistopathology, setShowMoreHistopathology] = useState(false)
  
  // States from Tests.jsx
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Set initial tests data
  useEffect(() => {
    setTests(mockTests);
  }, []);

  // Categories from Tests.jsx
  const categories = [
    { value: 'all', label: 'All Tests' },
    { value: 'blood', label: 'Blood Tests' },
    { value: 'organ', label: 'Organ Function' },
    { value: 'hormone', label: 'Hormone Tests' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'cardiac', label: 'Cardiac' },
    { value: 'vitamin', label: 'Vitamins' },
    { value: 'inflammatory', label: 'Inflammatory' },
    { value: 'urine', label: 'Urine Tests' }
  ];
  const [menuOpen, setMenuOpen] = useState(false);


  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Add custom CSS for wiggle rotation animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes wiggle-rotate {
        0% { transform: rotate(5deg); }
        25% { transform: rotate(0deg); }
        50% { transform: rotate(-5deg); }
        75% { transform: rotate(0deg); }
        100% { transform: rotate(5deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    // Handle booking submission
    const finalTestType = bookingForm.testType === 'other' ? bookingForm.customTestType : bookingForm.testType
    alert('Booking request submitted! We will call you shortly.')
    setBookingForm({ 
      name: '', 
      phone: '', 
      address: '', 
      testType: '', 
      customTestType: '' 
    })
  }

  const handleBookTest = (test) => {
    alert(`Booking ${test.name} for ₹${test.price}. We will contact you shortly!`);
  }

  // Filter and sort tests
  useEffect(() => {
    let filtered = tests;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(test => 
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.info.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(test => test.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredTests(filtered);
  }, [tests, searchTerm, selectedCategory, sortBy]);

 
  // Mock data for tests
  const mockTests = [
    { id: 1, name: 'Complete Blood Count (CBC)', price: 200, category: 'blood', info: 'Comprehensive blood analysis including red blood cells, white blood cells, and platelets', code: 'CBC001', fasting: false, reportTime: '2 hours' },
    { id: 2, name: 'Liver Function Test (LFT)', price: 500, category: 'organ', info: 'Assessment of liver health through various enzymes and proteins', code: 'LFT001', fasting: false, reportTime: '2 hours' },
    { id: 3, name: 'Thyroid Function Test (TFT)', price: 400, category: 'hormone', info: 'Measures thyroid function and helps diagnose thyroid disorders', code: 'TSH001', fasting: false, reportTime: '2 hours' },
    { id: 4, name: 'C-reactive Protein (CRP)', price: 300, category: 'inflammatory', info: 'Measures inflammation levels in the body', code: 'CRP001', fasting: false, reportTime: '6 hours' },
    { id: 5, name: 'HbA1C (Diabetes)', price: 400, category: 'diabetes', info: 'Measures average blood sugar levels over the past 2-3 months', code: 'HBA001', fasting: false, reportTime: '6 hours' },
    { id: 6, name: 'Lipid Profile', price: 550, category: 'cardiac', info: 'Comprehensive cholesterol and lipid analysis', code: 'LIP001', fasting: true, reportTime: '2 hours' },
    { id: 7, name: 'Kidney Function Test (KFT)', price: 450, category: 'organ', info: 'Assessment of kidney health and function', code: 'KFT001', fasting: false, reportTime: '2 hours' },
    { id: 8, name: 'Vitamin D', price: 1000, category: 'vitamin', info: 'Measures vitamin D levels in the blood', code: 'VIT001', fasting: false, reportTime: '6 hours' },
    { id: 9, name: 'Iron Studies', price: 500, category: 'blood', info: 'Comprehensive iron level analysis', code: 'IRN001', fasting: false, reportTime: '6 hours' },
    { id: 10, name: 'Complete Urine Examination', price: 100, category: 'urine', info: 'Comprehensive urine analysis for various health indicators', code: 'UR001', fasting: false, reportTime: '2 hours' },
    { id: 11, name: 'Diabetes Basic Panel(sugar Fasting & post prandial)', price: 130, category: 'diabetes', info: 'Basic diabetes screening including glucose and HbA1C', code: 'DB001', fasting: true, reportTime: '4 hours' },
    { id: 12, name: 'Diabetes Advanced Panel(sugar Fasting & post prandial-HBA1C)', price: 500, category: 'diabetes', info: 'Comprehensive diabetes assessment with multiple parameters', code: 'DB002', fasting: true, reportTime: '6 hours' }
  ];

  const hematologyTests = [
    {
      name: 'Complete Blood Count (CBC)',
      desc: 'Measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets to detect anemia, infections, and blood disorders.',
      price: '₹200'
    },
    {
      name: 'Complte Blood Count + Blood Smear',
      desc: 'Examines blood cells under a microscope to identify abnormalities in shape, size, or number.',
      price: '₹250'
    },
    {
      name: 'Erythrocyte Sedimentation Rate (ESR)',
      desc: 'Measures the rate at which red blood cells settle; used to detect inflammation or infections.',
      price: '₹100'
    },
    {
      name: 'Prothrombin Time (PT) and INR',
      desc: 'Assesses blood clotting time to monitor bleeding or clotting disorders.',
      price: '₹350'
    },
    {
      name: 'Activated Partial Thromboplastin Time (aPTT)',
      desc: 'Checks for clotting disorders and monitors heparin therapy.',
      price: '₹500'
    },
    {
      name: 'Reticulocyte Count',
      desc: 'Measures immature red blood cells to evaluate bone marrow function and anemia.',
      price: '₹200'
    },
    {
      name: 'Hemoglobin Electrophoresis',
      desc: 'Identifies abnormal hemoglobin types, such as in sickle cell anemia or thalassemia.',
      price: '₹900'
    },
    {
      name: 'Iron Studies (Serum Iron, Ferritin, TIBC)',
      desc: 'Evaluates iron deficiency or overload in conditions like anemia.',
      price: '₹500'
    },
    {
      name: 'D-Dimer',
      desc: 'Detects blood clots, such as deep vein thrombosis or pulmonary embolism.',
      price: '₹1000'
    },
    {
      name: 'Bone Marrow Aspiration/Biopsy',
      desc: 'Examines bone marrow for leukemia, anemia, or other blood disorders.',
      price: '₹850'
    },
    {
      name: 'Vitamin B12 ',
      desc: 'Detects deficiencies causing anemia or nerve damage.',
      price: '₹750'
    },

    { name: 'HbA1c (Glycated Hemoglobin)', desc: 'Long-term overview of blood sugar control in diabetes.', price: '₹400' },
    {
      name: 'G6PD Test',
      desc: 'Diagnoses glucose-6-phosphate dehydrogenase deficiency.',
      price: '₹550'
    },
    {
      name: 'Coombs Test (Direct/Indirect)',
      desc: 'Detects antibodies that attack red blood cells; useful in autoimmune hemolytic anemia.',
      price: '₹1350'
    }
  ]

  const biochemistryTests = [
    { name: 'Blood Glucose Test (f & PP)', desc: 'Measures blood sugar levels to diagnose diabetes and monitor its management.', price: '₹130' },
	{ name: 'Liver Function Tests (LFTs)', desc: 'ALT, AST, ALP, bilirubin, albumin to evaluate liver health.', price: '₹500' },
    { name: 'Renal Function Tests (RFTs)', desc: 'Creatinine, BUN, Urea, Uric Acid, eGFR Ratio to assess kidney function.', price: '₹450' },
    { name: 'Lipid Profile', desc: 'Cholesterol, triglycerides, LDL, HDL for cardiac risk assessment.', price: '₹500' },
    { name: 'Electrolyte Panel', desc: 'Sodium, potassium, chloride, bicarbonate for fluid/electrolyte balance.', price: '₹350' },
    { name: 'Serum Proteins (Albumin and Globulin)', desc: 'Assesses nutritional status, liver function, and immune response.', price: '₹200' },
    { name: 'Thyroid Function Tests (TFTs)', desc: 'T3, T4, and TSH to diagnose and monitor thyroid disorders.', price: '₹400' },
    { name: 'Uric Acid', desc: 'Helps diagnose gout or kidney stones.', price: '₹200' }, { name: 'Calcium Test', desc: 'Checks calcium for bone health and parathyroid function.', price: '₹200' },
    { name: 'Phosphorus', desc: 'Evaluates phosphorus for bone and kidney function.', price: '₹500' },
    { name: 'Creatine Kinase (CK)', desc: 'Detects muscle damage or heart disease.', price: '₹750' },
    { name: 'C-Reactive Protein (CRP)', desc: 'Marker of inflammation in infections or autoimmune disease.', price: '₹300' },
    { name: 'Alkaline Phosphatase (ALP)', desc: 'Indicates liver or bone disorders.', price: '₹200' },
    { name: 'Amylase ', desc: 'Pancreatic enzymes to diagnose pancreatitis.', price: '₹500' },
    { name: 'Lipase', desc: 'Pancreatic enzymes to diagnose pancreatitis.', price: '₹600' },
    { name: 'Vitamin D', desc: 'Detects deficiencies affecting bone, nerve, and RBC production.', price: '₹1000' },
    { name: 'Bilirubin Test', desc: 'Measures bilirubin to diagnose jaundice or liver dysfunction.', price: '₹200' },
    { name: 'Hormonal Assays', desc: 'Estrogen, testosterone, prolactin, cortisol for endocrine function.', price: 'ask for details' }
  ]

  const serologyTests = [
    { name: 'Widal Test', desc: 'Detects antibodies against Salmonella typhi for typhoid diagnosis.', price: '₹200' },
    { name: 'VDRL Test', desc: 'Screens for syphilis by detecting antibodies in blood.', price: '₹100' },
    { name: 'ASO (Antistreptolysin O) Test', desc: 'Detects antibodies to streptococcal infections; rheumatic fever risk.', price: '₹600' },
    { name: 'Rheumatoid Factor (RF)', desc: 'Detects RF antibodies; helps diagnose rheumatoid arthritis.', price: '₹500' },
    { name: 'CRP (C-Reactive Protein)', desc: 'Identifies inflammation or infection in the body.', price: '₹300' },
    { name: 'Rapid Plasma Reagin (RPR)', desc: 'An alternate screening test for syphilis.', price: '₹100' },
    { name: 'HIV Antibody Test', desc: 'Detects antibodies against HIV.', price: '₹300' },
    { name: 'HBsAg', desc: 'Detects hepatitis B surface antigen for hepatitis B infection.', price: '₹200' },
    { name: 'Anti-HCV Antibody', desc: 'Identifies antibodies against hepatitis C virus.', price: '₹500' },
    { name: 'Dengue Serology', desc: 'IgM/IgG antibodies or NS1 antigen for dengue diagnosis.', price: '₹600' },
    { name: 'Malaria Antigen', desc: 'Rapid detection of Plasmodium species.', price: '₹200' },
    // { name: 'Leptospirosis Test', desc: 'Detects antibodies against Leptospira bacteria.', price: '₹—' },
    { name: 'Tuberculosis (TB) Tests', desc: 'Mantoux skin test.', price: '₹350' },
    { name: 'Anti-Nuclear Antibody (ANA)', desc: 'Autoantibodies used in diagnosing autoimmune diseases.', price: '₹900' },
    // { name: 'TORCH Panel', desc: 'Screens infections in pregnancy: Toxoplasma, Rubella, CMV, HSV.', price: '₹2500' },
    { name: 'Covid-19 Antibody', desc: 'Detects antibodies indicating prior exposure to SARS-CoV-2.', price: '₹900' },
    { name: 'Brucella Antibody', desc: 'Identifies antibodies for brucellosis.', price: '₹1850' },
    { name: 'Epstein-Barr Virus (EBV) Test', desc: 'Antibodies to diagnose infectious mononucleosis.', price: '₹1500' },
    { name: 'Helicobacter pylori Antibody', desc: 'Screens for H. pylori linked to peptic ulcers.', price: '₹1650' },
    { name: 'Scrub Typhus Test', desc: 'Detects antibodies to Orientia tsutsugamushi.', price: '₹1000' }
  ]

  const clinicalPathologyTests = [
    { name: 'Urine Routine Examination', desc: 'Physical, chemical, microscopic urine analysis for infections, kidney or metabolic disorders.', price: '₹100' },
    { name: 'Stool Routine Examination', desc: 'Checks stool for parasites, blood, mucus, or infections.', price: '₹300' },
    { name: 'Semen Analysis', desc: 'Sperm count, motility, morphology for fertility assessment.', price: '₹350' },
    { name: 'Body Fluid Analysis', desc: 'Pleural, peritoneal, synovial, CSF for infection, inflammation, or cancer.', price: 'Ask for details' },
    { name: 'Sputum Examination', desc: 'Detects bacterial, fungal or mycobacterial infections (e.g., TB).', price: '₹400' },
    { name: 'Pap Smear', desc: 'Screens for cervical cancer and cervical abnormalities.', price: '₹900' },
    // { name: 'Biopsy Examination', desc: 'Histopathology of tissue for cancer or chronic inflammatory diseases.', price: '₹—' },
    // { name: 'Fluid Cytology', desc: 'Cells in pleural/peritoneal fluids for malignancy or infection.', price: '₹—' },
    // { name: 'Synovial Fluid Analysis', desc: 'Joint fluid tests for gout, arthritis, infection.', price: '₹—' },
    // { name: 'Hematology Parameters', desc: 'CBC, ESR, coagulation studies as part of clinical assessment.', price: '₹—' },
    { name: 'Special Stain Tests', desc: 'Gram stain, Ziehl–Neelsen and others to detect specific pathogens.', price: 'Ask for details' },
    { name: 'Urine Culture', desc: 'Identifies bacteria causing urinary tract infections.', price: '₹1000' },
    { name: 'Stool Culture', desc: 'Detects pathogens causing GI infections.', price: '₹1000' },
    // { name: 'Sweat Test', desc: 'Chloride measurement for cystic fibrosis diagnosis.', price: '₹—' },
    // { name: 'Vaginal Smear', desc: 'Detects infections or hormonal imbalance.', price: '₹—' },
    { name: 'Cytopathology Tests', desc: 'Exfoliative/aspiration cytology for infections, malignancy or benign lesions.', price: '₹—' }
  ]

  const histopathologyTests = [
    { name: 'Excisional Biopsy', desc: 'Complete removal of a lesion or tumor, followed by detailed tissue analysis', price: '₹2,500' },
    { name: 'Incisional Biopsy', desc: 'Partial removal of tissue from a larger lesion for diagnostic purposes', price: '₹3,500' },
    { name: 'Endoscopic Biopsy', desc: 'Tissue samples obtained during endoscopy (e.g., gastrointestinal tract, bronchi) for disease diagnosis', price: '₹5,000' },
    { name: 'Cervical Biopsy', desc: 'Examination of cervical tissue to diagnose precancerous conditions or cervical cancer', price: '₹3,000' },
    { name: 'Lymph Node Biopsy', desc: 'Assesses lymph nodes for signs of infection, lymphoma, or metastasis from other cancers', price: '₹4,000' },
    { name: 'Skin Biopsy', desc: 'Examines skin tissue to diagnose conditions like psoriasis, eczema, skin cancer, or infections', price: '₹2,800' },
    { name: 'Bone Marrow Biopsy', desc: 'Analyzes bone marrow tissue to diagnose leukemia, anemia, or other bone marrow disorders', price: '₹6,000' },
    { name: 'Breast Tissue Analysis', desc: 'Includes core needle biopsy or excision biopsy to diagnose benign or malignant breast lesions', price: '₹4,500' },
    { name: 'Kidney Biopsy', desc: 'Evaluates kidney tissue for conditions like glomerulonephritis, nephrotic syndrome, or rejection after transplant', price: '₹5,500' },
    { name: 'Liver Biopsy', desc: 'Examines liver tissue to diagnose hepatitis, cirrhosis, or tumors', price: '₹5,000' },
    { name: 'Lung Biopsy', desc: 'Diagnoses lung infections, interstitial lung disease, or lung cancer', price: '₹6,500' },
    { name: 'Prostate Biopsy', desc: 'Assesses prostate tissue to diagnose benign prostatic hyperplasia (BPH) or prostate cancer', price: '₹7,000' },
    { name: 'Gastrointestinal Biopsy', desc: 'Includes esophageal, stomach, or colon biopsies to diagnose conditions like IBD, ulcers, or cancer', price: '₹4,800' },
    { name: 'Neuropathology Analysis', desc: 'Examines brain or nerve tissue for conditions like tumors, Alzheimer\'s disease, or infections', price: '₹8,000' },
    { name: 'Placental Histopathology', desc: 'Analyzes placental tissue to identify pregnancy-related complications or infections', price: '₹4,500' },
    { name: 'Surgical Specimen Analysis', desc: 'Analysis of tissues removed during surgery to determine benign vs malignant', price: '₹5,500' },
    { name: 'Frozen Section', desc: 'Rapid intraoperative tissue exam to guide immediate surgical decisions', price: '₹7,500' },
    { name: 'Immunohistochemistry (IHC)', desc: 'Antibody-based detection of antigens to classify tumors and infections', price: '₹6,500' },
    { name: 'Fine Needle Aspiration Cytology (FNAC)', desc: 'Cytology of needle-aspirated cells from masses for diagnosis', price: '₹3,500' }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100" style={{ paddingBottom: '0', paddingTop: '80px' }}>
      {/* Header */}
<header
      className="fixed w-full top-0 z-50 backdrop-blur-md border-b border-purple-200"
      style={{
        backgroundColor: "#662fa9",
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={Logo}
              alt="JIJAU Pathology Laboratory"
              className="h-20 w-auto"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-white hover:text-purple-200 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-white/20 rounded-lg"
              >
                Home
              </Link>
              <a
                href="https://wa.me/918605941731"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-200 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-white/20 rounded-lg inline-flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M19.11 17.12a5.61 5.61 0 0 1-2.41-.61c-.74-.35-1.58-.78-2.58-1.79s-2-2.53-2.31-3.2a6.1 6.1 0 0 1-.61-2.41 2.67 2.67 0 0 1 .86-2 1 1 0 0 1 .72-.32h.54a.68.68 0 0 1 .5.41l.77 1.8a.67.67 0 0 1 0 .52 1.77 1.77 0 0 1-.25.4c-.14.16-.28.34-.39.46a.84.84 0 0 0-.17.33c0 .12 0 .25.19.49a9.81 9.81 0 0 0 1.76 2.19 8.64 8.64 0 0 0 2 1.38c.24.11.37.1.5 0a3.34 3.34 0 0 0 .35-.3l.1-.1a.67.67 0 0 1 .67-.17l1.84.77a.68.68 0 0 1 .41.5v.54a1 1 0 0 1-.32.72 2.69 2.69 0 0 1-2.01.86Z" />
                </svg>
                +91 8605941731
              </a>
              <a
                href="tel:+91 02422299688"
                className="text-white hover:text-purple-200 py-2 text-sm font-semibold transition-all duration-300 hover:bg-white/20 rounded-lg inline-flex items-center gap-2"
              >
                📞 +91 2422299688
              </a>
              <a
                href="https://maps.app.goo.gl/MJEnATgUghqZ5SqZ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-200 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-white/20 rounded-lg inline-flex items-center gap-2"
              >
                📍 Find Us
              </a>
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? (
                // Close Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#662fa9] px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block text-white hover:text-purple-200 px-3 py-2 rounded-lg font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <a
            href="https://wa.me/918605941731"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white hover:text-purple-200 px-3 py-2 rounded-lg font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            WhatsApp
          </a>
          <a
            href="tel:+91 02422299688"
            className="block text-white hover:text-purple-200 px-3 py-2 rounded-lg font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Call
          </a>
          <a
            href="https://maps.app.goo.gl/MJEnATgUghqZ5SqZ9"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white hover:text-purple-200 px-3 py-2 rounded-lg font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Find Us
          </a>
        </div>
      )}
    </header>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Top Center - Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#9760de] via-[#7956a8] to-[#8647dd] mb-3" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
              Your Health, Our Priority
            </h1>
            <p className="text-xl text-purple-600 leading-relaxed max-w-4xl mx-auto">
              Get accurate blood test results from the comfort of your home.
              Our certified lab technicians ensure precision, speed, and reliability.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Image Carousel */}
              <div className="order-first">
                <ImageCarousel />
              </div>

              {/* Right Side - Sliding Text Content */}
              <div className="order-last lg:order-last">
                <SlidingText />
              </div>
            </div>
          </div>

          {/* Bottom Center - CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <button
              onClick={() => scrollToSection(bookingRef)}
              className="bg-gradient-to-r from-[#7e47c2] to-[#7F55B1] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#2B0A57] hover:to-[#5B2E98] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              Book Test Now
            </button>
            <button
              onClick={() => scrollToSection(packagesTopRef)}
              className="border-2 border-black text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gradient-to-r from-[#3B0F70] to-[#7F55B1] hover:text-white transition-all duration-300 transform hover:-translate-y-1">
              View All Tests
            </button>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section ref={bookingRef} id="booking" className="py-20 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#E8D5F2', color: '#642EAA' }}>
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#642EAA' }}></span>
              Quick & Easy Booking
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Schedule Your Test Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get professional pathology services at your doorstep. Our certified technicians will visit you within 30 minutes of booking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Home Sample Collection</h4>
                      <p className="text-gray-600">Professional phlebotomists visit your home</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fast Results</h4>
                      <p className="text-gray-600">Get reports within 6 hours online</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fully Automated Lab</h4>
                      <p className="text-gray-600">High Quality controls and calibration(biorad & randox)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                  <div className="text-2xl font-bold" style={{ color: '#642EAA' }}>50K+</div>
                  <div className="text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                  <div className="text-2xl font-bold" style={{ color: '#642EAA' }}>99.8%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-purple-200 rounded-3xl p-8 shadow-2xl border border-purple-100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Test</h3>
                <p className="text-gray-600">Fill the form and we'll call you within 15 minutes</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:border-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:border-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Complete Address *</label>
                  <textarea
                    required
                    value={bookingForm.address}
                    onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:border-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Enter your complete address"
                    rows="2"
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Test Type *</label>
                    <select
                      required
                      value={bookingForm.testType}
                      onChange={(e) => setBookingForm({ ...bookingForm, testType: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:border-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    >
                      <option value="">Select test type</option>
                      <option value="cbc">Complete Blood Count</option>
                      <option value="lft">Liver Function Test</option>
                      <option value="thyroid">Thyroid Test</option>
                      <option value="diabetes">Diabetes Panel</option>
                      <option value="lipid">Lipid Profile</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {bookingForm.testType === 'other' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Specify Test Type *</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.customTestType}
                        onChange={(e) => setBookingForm({ ...bookingForm, customTestType: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:border-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Enter the test type you need"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white rounded-lg font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  style={{ backgroundColor: '#642EAA' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}
                >
                  Book Test
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  *All fields are mandatory. Home sample collection charges will be applicable.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50" ref={packagesTopRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: '#E8D5F2', color: '#642EAA' }}>
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#642EAA' }}></span>
              Comprehensive Health Packages
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete Health Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose from our carefully designed health packages that offer complete diagnostic solutions at affordable prices.
              All packages include home sample collection and fast report delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* JIJAU ACTIVE CARE */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-purple-100 h-full flex flex-col group">
              <div className="px-6 py-6" style={{ backgroundColor: '#642EAA' }}>
                <h3 className="text-xl font-bold text-white uppercase">JIJAU ACTIVE CARE</h3>
                <p className="text-purple-100 text-sm mt-1">72 Tests</p>
              </div>

              <div className="p-6 bg-gray-50 flex flex-col flex-grow">
                <div className="text-center mb-6">
                  <div className="text-gray-600 line-through mb-2">MRP: ₹3,180/-</div>
                  <div className="relative">
                    <div className="text-white px-6 py-3 rounded-full shadow-lg" style={{ backgroundColor: '#642EAA', animation: 'wiggle-rotate 3s ease-in-out infinite' }}>
                      <span className="text-yellow-300 font-bold text-lg">Offer Price ₹999/-</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    COMPLETE BLOOD COUNT+PBS
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    ESR ERYTHROCYTE SEDIMENTATION RATE
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    BLOOD SUGAR FASTING & PP (BSF & PP)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    RENAL FUNCTION TEST (RFT)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    LIVER FUNCTION TEST (LFT)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    LIPID PROFILE
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    TOTAL CALCIUM
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    HbA1c: GLYCOSYLATED HEMOGLOBIN BY HPLC
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    THYROID STIMULATING HORMONE (TSH)-SERUM
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    URINE ROUTINE
                  </div>
                </div>

                <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#642EAA' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}>
                  Book Package
                </button>
              </div>
            </div>

            {/* JIJAU ACTIVE CARE + */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 relative h-full flex flex-col">
              <div className="absolute top-2 right-2 text-white px-2 py-1 rounded text-xs font-bold bg-green-500 anima">
                MOST POPULAR
              </div>
              <div className="px-6 py-4" style={{ backgroundColor: '#642EAA' }}>
                <h3 className="text-xl font-bold text-white uppercase">JIJAU ACTIVE CARE +</h3>
                <p className="text-white text-sm mt-1">95 Tests</p>
              </div>

              <div className="p-6 bg-gray-50 flex flex-col flex-grow">
                <div className="text-center mb-6">
                  <div className="text-gray-600 line-through mb-2">MRP: ₹4,930/-</div>
                  <div className="relative">
                    <div className="text-white px-6 py-3 rounded-full shadow-lg" style={{ backgroundColor: '#642EAA', animation: 'wiggle-rotate 3s ease-in-out infinite' }}>
                      <span className="text-yellow-300 font-bold text-lg">Offer Price ₹1,799/-</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    COMPLETE BLOOD COUNT +PBS
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    ESR-ERYTHROCYTE SEDIMENTATION RATE
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    BLOOD SUGAR FASTING & PP (BSF & PP)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    RENAL FUNCTION TEST (RFT)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    LIVER FUNCTION TEST (LFT)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    LIPID PROFILE
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    TOTAL CALCIUM
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    HbA1c: GLYCOSYLATED HEMOGLOBIN BY HPLC
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    Thyroid Function Test (TFT)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    VITAMIN B12 - SERUM
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    VITAMIN D-TOTAL (25-OH-VIT D)-SERUM
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    URINE ROUTINE
                  </div>
                </div>

                <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#642EAA' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}>
                  Book Package
                </button>
              </div>
            </div>

            {/* JIJAU WOMEN'S CARE */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 h-full flex flex-col">
              <div className="px-6 py-4" style={{ backgroundColor: '#642EAA' }}>
                <h3 className="text-xl font-bold text-white uppercase">JIJAU WOMEN'S CARE</h3>
                <p className="text-white text-sm mt-1">157 Tests</p>
              </div>

              <div className="p-6 bg-gray-50 flex flex-col flex-grow">
                <div className="text-center mb-6">
                  <div className="text-gray-600 line-through mb-2">MRP: ₹5,730/-</div>
                  <div className="relative">
                    <div className="text-white px-6 py-3 rounded-full shadow-lg" style={{ backgroundColor: '#642EAA', animation: 'wiggle-rotate 3s ease-in-out infinite' }}>
                      <span className="text-yellow-300 font-bold text-lg">Offer Price ₹2,400/-</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    BLOOD SUGAR FASTING & PP (BSF & PP)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    HbA1c: GLYCOSYLATED HEMOGLOBIN BY HPLC
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    RENAL FUNCTION TEST (RFT)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    LIVER FUNCTION TEST (LFT)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    LIPID PROFILE
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    TOTAL CALCIUM
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    IRON STUDIES
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    Thyroid Function Test (TFT)
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    FSH (FOLLICLE STIMULATING HORMONE)-SERUM
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    LH (LEUTNISING HRMONE)-SERUM
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    PROLACTIN-SERUM
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2" style={{ color: '#642EAA' }}>→</span>
                    VITAMIN B12 + VITAMIN D.TOTAL - SERUM
                  </div>
                </div>

                <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#642EAA' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}>
                  Book Package
                </button>
              </div>
            </div>

            {showMorePackages && (
              <>
                {/* JIJAU DIABETIC CARE */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-purple-100 h-full flex flex-col">
                  <div className="px-6 py-6" style={{ backgroundColor: '#642EAA' }}>
                    <h3 className="text-xl font-bold text-white uppercase">JIJAU DIABETIC CARE</h3>
                    <p className="text-purple-100 text-sm mt-1">45 Tests</p>
                  </div>
                  <div className="p-6 bg-gray-50 flex flex-col flex-grow">
                    <div className="text-center mb-6">
                      <div className="text-gray-600 line-through mb-2">MRP: ₹1,150/-</div>
                      <div className="relative">
                        <div className="text-white px-6 py-3 rounded-full shadow-lg" style={{ backgroundColor: '#642EAA', animation: 'wiggle-rotate 3s ease-in-out infinite' }}>
                          <span className="text-yellow-300 font-bold text-lg">Offer Price ₹599/-</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6 flex-grow">
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>BLOOD SUGAR FASTING & PP (BSF & PP)</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>COMPLETE BLOOD COUNT + PBS</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>HbA1c BY HPLC</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>SERUM CREATININE</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>TOTAL CHOLESTEROL - SERUM</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>URINE ROUTINE</div>
                    </div>
                    <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#642EAA' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}>
                      Book Package
                    </button>
                  </div>
                </div>

                {/* JIJAU FEVER CARE */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-purple-100 h-full flex flex-col">
                  <div className="px-6 py-6" style={{ backgroundColor: '#642EAA' }}>
                    <h3 className="text-xl font-bold text-white uppercase">JIJAU FEVER CARE</h3>
                    <p className="text-purple-100 text-sm mt-1">53 Tests</p>
                  </div>
                  <div className="p-6 bg-gray-50 flex flex-col flex-grow">
                    <div className="text-center mb-6">
                      <div className="text-gray-600 line-through mb-2">MRP: ₹1,850/-</div>
                      <div className="relative">
                        <div className="text-white px-6 py-3 rounded-full shadow-lg" style={{ backgroundColor: '#642EAA', animation: 'wiggle-rotate 3s ease-in-out infinite' }}>
                          <span className="text-yellow-300 font-bold text-lg">Offer Price ₹999/-</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6 flex-grow">
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>COMPLETE BLOOD COUNT + PBS</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>ESR</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>WIDAL SLIDE AGGLUTINATION</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>MALARIA ANTIGEN (Pv/Pf)</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>DENGUE (NS1, IgG, IgM) RAPID</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>URINE ROUTINE</div>
                    </div>
                    <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#642EAA' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}>
                      Book Package
                    </button>
                  </div>
                </div>

                {/* SENIOR CITIZEN CARE */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-purple-100 h-full flex flex-col">
                  <div className="px-6 py-6" style={{ backgroundColor: '#642EAA' }}>
                    <h3 className="text-xl font-bold text-white uppercase">SENIOR CITIZEN CARE</h3>
                    <p className="text-purple-100 text-sm mt-1">194 Tests</p>
                  </div>
                  <div className="p-6 bg-gray-50 flex flex-col flex-grow">
                    <div className="text-center mb-6">
                      <div className="text-gray-600 line-through mb-2">MRP: ₹2,350/-</div>
                      <div className="relative">
                        <div className="text-white px-6 py-3 rounded-full shadow-lg" style={{ backgroundColor: '#642EAA', animation: 'wiggle-rotate 3s ease-in-out infinite' }}>
                          <span className="text-yellow-300 font-bold text-lg">Offer Price ₹2,999/-</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6 flex-grow">
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>COMPLETE BLOOD COUNT + PBS</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>IRON STUDIES</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>BLOOD SUGAR FASTING & PP (BSF & PP)</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>HbA1c BY HPLC</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>RENAL FUNCTION TEST (RFT)</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>LIPID PROFILE</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>THYROID FUNCTION TEST (TFT)</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>VITAMIN D TOTAL (25-OH)</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>ESR</div>
                      <div className="flex items-center text-sm text-gray-700"><span className="mr-2" style={{ color: '#642EAA' }}>→</span>PSA (PROSTATE SPECIFIC ANTIGEN)</div>
                    </div>
                    <button className="w-full text-white py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#642EAA' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}>
                      Book Package
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => { if (showMorePackages && packagesTopRef.current) { packagesTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) }; setShowMorePackages(!showMorePackages) }} className="cta">
              <span>{showMorePackages ? 'Show fewer' : 'Show More'}</span>
              <svg width="30px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>



      {/* Diagnostic Tests Overview */}
      {/* Tests Overview Section */}
      <section className="pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">BLOOD TESTS OVERVIEW</h2>
            <p className="text-lg text-secondary-600">Explore our comprehensive range of diagnostic test categories</p>
          </div>

          <div className="space-y-4">
            {/* Hematology */}
            <details className="rounded-xl p-6 hover:shadow-lg transition-all duration-300  group" style={{ background: 'linear-gradient(90deg, #7F55B1 0%, #6B46A3 100%)' }}>
              <summary className="flex items-center justify-between list-none">
                <h3 className="text-xl font-semibold text-white">Hematology</h3>
                <svg className="w-6 h-6 text-white transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {(showMoreHematology ? hematologyTests : hematologyTests.slice(0, 5)).map((t, i) => (
                  <div key={i} className="bg-purple-50 rounded-xl shadow-md p-5 border border-purple-100 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-secondary-900 mb-2">{t.name}</h4>
                      <p className="text-secondary-700 text-sm">{t.desc}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#7F55B1] font-bold">{t.price}</span>
                      <button className="px-4 py-2 bg-[#7F55B1] hover:bg-[#6B46A3] text-white text-sm rounded-lg">Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <button onClick={() => setShowMoreHematology(!showMoreHematology)} className="cta cta--sm cta--white">
                  <span>{showMoreHematology ? 'Show fewer tests' : 'Show more'}</span>
                  <svg width="30px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>
            </details>

            {/* Biochemistry */}
            <details className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 group" style={{ background: 'linear-gradient(90deg, #7F55B1 0%, #6B46A3 100%)' }}>
              <summary className="flex items-center justify-between list-none">
                <h3 className="text-xl font-semibold text-white">Biochemistry</h3>
                <svg className="w-6 h-6 text-white transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {(showMoreBiochemistry ? biochemistryTests : biochemistryTests.slice(0, 5)).map((t, i) => (
                  <div key={i} className="bg-purple-50 rounded-xl shadow-md p-5 border border-purple-100 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-secondary-900 mb-2">{t.name}</h4>
                      <p className="text-secondary-700 text-sm">{t.desc}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#7F55B1] font-bold">{t.price}</span>
                      <button className="px-4 py-2 bg-[#7F55B1] hover:bg-[#6B46A3] text-white text-sm rounded-lg">Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <button onClick={() => setShowMoreBiochemistry(!showMoreBiochemistry)} className="cta cta--sm cta--white">
                  <span>{showMoreBiochemistry ? 'Show fewer tests' : 'Show more'}</span>
                  <svg width="30px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>
            </details>

            {/* Serology */}
            <details className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 group" style={{ background: 'linear-gradient(90deg, #7F55B1 0%, #6B46A3 100%)' }}>
              <summary className="flex items-center justify-between list-none">
                <h3 className="text-xl font-semibold text-white">Serology</h3>
                <svg className="w-6 h-6 text-white transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {(showMoreSerology ? serologyTests : serologyTests.slice(0, 5)).map((t, i) => (
                  <div key={i} className="bg-purple-50 rounded-xl shadow-md p-5 border border-purple-100 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-secondary-900 mb-2">{t.name}</h4>
                      <p className="text-secondary-700 text-sm">{t.desc}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#7F55B1] font-bold">{t.price}</span>
                      <button className="px-4 py-2 bg-[#7F55B1] hover:bg-[#6B46A3] text-white text-sm rounded-lg">Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <button onClick={() => setShowMoreSerology(!showMoreSerology)} className="cta cta--sm cta--white">
                  <span>{showMoreSerology ? 'Show fewer tests' : 'Show more'}</span>
                  <svg width="30px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>
            </details>

            {/* Clinical Pathology */}
            <details className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 group" style={{ background: 'linear-gradient(90deg, #7F55B1 0%, #6B46A3 100%)' }}>
              <summary className="flex items-center justify-between list-none">
                <h3 className="text-xl font-semibold text-white">Clinical Pathology</h3>
                <svg className="w-6 h-6 text-white transform transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {(showMoreSerology ? clinicalPathologyTests : clinicalPathologyTests.slice(0, 5)).map((t, i) => (
                  <div key={i} className="bg-purple-50 rounded-xl shadow-md p-5 border border-purple-100 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-secondary-900 mb-2">{t.name}</h4>
                      <p className="text-secondary-700 text-sm">{t.desc}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#7F55B1] font-bold">{t.price}</span>
                      <button className="px-4 py-2 bg-[#7F55B1] hover:bg-[#6B46A3] text-white text-sm rounded-lg">Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <button onClick={() => setShowMoreSerology(!showMoreSerology)} className="cta cta--sm cta--white">
                  <span>{showMoreSerology ? 'Show fewer tests' : 'Show more'}</span>
                  <svg width="30px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>
            </details>

            {/* Histopathology */}
            <details
              className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              style={{ background: 'linear-gradient(90deg, #7F55B1 0%, #6B46A3 100%)' }}
            >
              <summary className="flex items-center justify-between list-none">
                <h3 className="text-xl font-semibold text-white">Histopathology</h3>
                <svg
                  className="w-6 h-6 text-white transform transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {(showMoreHistopathology ? histopathologyTests : histopathologyTests.slice(0, 5)).map((t, i) => (
                  <div
                    key={i}
                    className="bg-purple-50 rounded-xl shadow-md p-5 border border-purple-100 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                        {t.name}
                      </h4>
                      <p className="text-secondary-700 text-sm">{t.desc}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#7F55B1] font-bold">{t.price}</span>
                      <button className="px-4 py-2 bg-[#7F55B1] hover:bg-[#6B46A3] text-white text-sm rounded-lg">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={() => setShowMoreHistopathology(!showMoreHistopathology)}
                  className="cta cta--sm cta--white"
                >
                  <span>
                    {showMoreHistopathology ? 'Show fewer tests' : 'Show more'}
                  </span>
                  <svg width="30px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>
            </details>

            {/* All Tests Section */}
            <section className="py-16 bg-secondary-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-secondary-900 mb-4">All Available Tests</h2>
                  <p className="text-lg text-secondary-600">Search and explore our comprehensive range of diagnostic tests</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">Search Tests</label>
                      <input
                        type="text"
                        placeholder="Search by test name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>{category.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="name">Name (A-Z)</option>
                        <option value="price-low">Price (Low to High)</option>
                        <option value="price-high">Price (High to Low)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTests.map(test => (
                    <div key={test.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-secondary-900">{test.name}</h3>
                        <span className="text-primary-600 font-bold text-xl">₹{test.price}</span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-secondary-600 mb-2">{test.info}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                            Code: {test.code}
                          </span>
                          <span className={`px-2 py-1 rounded-full ${test.fasting ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            {test.fasting ? 'Fasting Required' : 'No Fasting'}
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            Report: {test.reportTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleBookTest(test)}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                        >
                          Book Now
                        </button>
                        <button className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredTests.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                      <svg className="w-16 h-16 text-secondary-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.804-6.207-2.146M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-2">No tests found</h3>
                      <p className="text-secondary-600">Try adjusting your search criteria or browse all tests.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

             <div className="mt-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing the Right Test?</h2>
          <p className="text-lg mb-6">Our health advisors are here to help you select the most appropriate tests for your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-logo-vibrant hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Call Us: +91 8605941731
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-logo-vibrant px-8 py-3 rounded-lg font-semibold transition-colors">
              Request Call Back
            </button>
          </div>
        </div>

            {/* Features */}
            <section id="features" className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-secondary-900 mb-4">Why Choose JIJAU Pathology Laboratory?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Trained Team</h3>
                    <p className="text-secondary-600">Skilled professionals pathologist, Doctors & Technicians </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">100% Hygienic</h3>
                    <p className="text-secondary-600">Strict hygiene protocols and sanitized equipment for every collection and testing</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Quick Collection</h3>
                    <p className="text-secondary-600">Sample collection within 30 minutes of booking confirmation</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Home Visits Till 7PM</h3>
                    <p className="text-secondary-600">Flexible timing to accommodate your busy schedule</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Process */}
            <section className="py-16 relative overflow-hidden" style={{
              background: 'linear-gradient(90deg, #f0e6ff 0%, #e6d9ff 100%)',
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)'
            }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <span className="bg-purple-200 text-purple-800 text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">Simple Steps</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">Here's How The Process Works</h2>
                  <p className="text-lg text-secondary-600 max-w-2xl mx-auto">Follow these simple steps to get your blood tests done from the comfort of your home</p>
                </div>

                <div className="relative">
                  {/* Connecting Lines - Desktop */}
                  <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-300 to-purple-500 transform -translate-y-1/2" style={{ zIndex: 0 }}></div>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative" style={{ zIndex: 1 }}>
                    {/* Step 1 */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold absolute -top-3 -left-3"
                          style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>1</div>
                        <div className="w-16 h-16 mx-auto">
                          <svg className="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">Give us a call</h3>
                      <p className="text-secondary-600">Book your test through our helpline or online form</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold absolute -top-3 -left-3"
                          style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>2</div>
                        <div className="w-16 h-16 mx-auto">
                          <svg className="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">Location & Time</h3>
                      <p className="text-secondary-600">Share your address and preferred time for collection</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold absolute -top-3 -left-3"
                          style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>3</div>
                        <div className="w-16 h-16 mx-auto">
                          <svg className="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">Home Visit</h3>
                      <p className="text-secondary-600">Our expert phlebotomist collects your sample</p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold absolute -top-3 -left-3"
                          style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>4</div>
                        <div className="w-16 h-16 mx-auto">
                          <svg className="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">Lab Analysis</h3>
                      <p className="text-secondary-600">Sample processed in our lab</p>
                    </div>

                    {/* Step 5 */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold absolute -top-3 -left-3"
                          style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>5</div>
                        <div className="w-16 h-16 mx-auto">
                          <svg className="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">Quick Results</h3>
                      <p className="text-secondary-600">Get digital reports within 4-6 hours</p>
                    </div>
                  </div>

                  {/* Mobile Arrow Indicators */}
                  <div className="lg:hidden flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="text-white w-full" style={{
              background: 'linear-gradient(135deg, #642EAA 0%, #4A1F7A 50%, #2D1B69 100%)',
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)'
            }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">JIJAU PATHOLOGY LABORATORY</h3>
                    <p className="text-secondary-300 mb-4">Your trusted partner for blood test and reliable Pathology services.</p>
                    <div className="flex space-x-4">
                      <div className="p-2 rounded" style={{ backgroundColor: '#642EAA' }}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="p-2 rounded" style={{ backgroundColor: '#642EAA' }}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Services</h4>
                    <ul className="space-y-2 text-secondary-300">
                      <li>Home Sample Collection</li>
                      <li>Blood Tests</li>
                      <li>Pathology Tests</li>
                      <li>Health Checkups</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-secondary-300">

                      <li><Link to="/login" className="hover:text-white">Login</Link></li>
                      <li><button onClick={() => scrollToSection(bookingRef)} className="text-secondary-300 hover:text-white">Book Appointment</button></li>
                      <li><button onClick={() => scrollToSection(packagesTopRef)} className="text-secondary-300 hover:text-white">Explore Packages</button></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                    <div className="space-y-4 text-secondary-300">
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-1">📞</span>
                        <p>
                          <a href="https://wa.me/918605941731" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+91 8605941731</a>
                          <br />+91 2422299688
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-1">📧</span>
                        <p>
                          <a
                            href="mailto:smr.jijaupathologylab@gmail.com"
                            className="hover:text-white transition-colors"
                          >
                            smr.jijaupathologylab@gmail.com
                          </a>
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-1">📍</span>
                        <a
                          href="https://maps.app.goo.gl/MJEnATgUghqZ5SqZ9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="leading-relaxed hover:text-white transition-colors"
                        >
                          Ward no 6, Kamgar Hospital Road,<br />Near Dr. Kawade Diagnostic,<br />Shrirampur, Maharashtra 413709
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-white/10 mt-12 pt-8 text-center">
                  <p className="text-gray-300">&copy; 2025 JIJAU Pathology Laboratory. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
