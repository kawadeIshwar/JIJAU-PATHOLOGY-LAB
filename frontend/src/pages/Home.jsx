import React, { useState, useRef, useEffect } from 'react'
import img1 from '../assets/image1.png'
import img2 from '../assets/image2.png'
import img3 from '../assets/image3.png'
import img4 from '../assets/image4.png'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
// Hero backgrounds removed: using theme gradients instead of images
import image17 from '../assets/image17.jpg'
import { whatsappService } from '../utils/whatsappService'



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
  const allTestsRef = useRef(null)
  const [showMoreHematology, setShowMoreHematology] = useState(false)
  const [showMoreBiochemistry, setShowMoreBiochemistry] = useState(false)
  const [showMoreSerology, setShowMoreSerology] = useState(false)
  const [showMoreHistopathology, setShowMoreHistopathology] = useState(false)
  const [showMoreReviews, setShowMoreReviews] = useState(false)
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' })
  const [formBanner, setFormBanner] = useState({ show: false, type: 'success', message: '' })
  
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
  const [currentBg, setCurrentBg] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [modalEnter, setModalEnter] = useState(false)


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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % 4)
    }, 10000)
    return () => clearInterval(intervalId)
  }, [])

  // Delay showing the booking modal on initial load (e.g., 7 seconds)
  useEffect(() => {
    const timeoutId = setTimeout(() => setShowBookingModal(true), 7000)
    return () => clearTimeout(timeoutId)
  }, [])

  // Animate modal on open
  useEffect(() => {
    if (showBookingModal) {
      const id = requestAnimationFrame(() => setModalEnter(true))
      return () => cancelAnimationFrame(id)
    } else {
      setModalEnter(false)
    }
  }, [showBookingModal])

  const handleBookingSubmitModal = (e) => {
    handleBookingSubmit(e)
    setShowBookingModal(false)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    
    // Use direct WhatsApp Web method instead of API
    try {
      whatsappService.sendViaWhatsAppWeb(bookingForm, 'booking')
      setToast({ show: true, type: 'success', message: 'Opening WhatsApp to send your booking...' })
      setFormBanner({ show: true, type: 'success', message: 'WhatsApp opened! Please send the message to complete your booking.' })
      setTimeout(() => setFormBanner(prev => ({ ...prev, show: false })), 4000)
      
      // Reset form
      setBookingForm({ 
        name: '', 
        phone: '', 
        address: '', 
        testType: '', 
        customTestType: '' 
      })
    } catch (error) {
      console.error('Error opening WhatsApp:', error)
      setToast({ show: true, type: 'error', message: 'Could not open WhatsApp. Please try again.' })
      setFormBanner({ show: true, type: 'error', message: 'We could not open WhatsApp. Please try again.' })
      setTimeout(() => setFormBanner(prev => ({ ...prev, show: false })), 5000)
    }
  }

  const handleDirectWhatsAppSend = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.testType) {
      setToast({ show: true, type: 'error', message: 'Please fill in all required fields.' })
      return
    }
    
    // Send directly via WhatsApp Web
    whatsappService.sendViaWhatsAppWeb(bookingForm, 'booking')
    
    setToast({ show: true, type: 'success', message: 'Opening WhatsApp to send your booking...' })
    setFormBanner({ show: true, type: 'success', message: 'WhatsApp opened! Please send the message to complete your booking.' })
    setTimeout(() => setFormBanner(prev => ({ ...prev, show: false })), 5000)
    
    // Reset form
    setBookingForm({ 
      name: '', 
      phone: '', 
      address: '', 
      testType: '', 
      customTestType: '' 
    })
  }

  const handleBookTest = (test) => {
    // Use direct WhatsApp Web method instead of API
    try {
      whatsappService.sendViaWhatsAppWeb(test, 'test')
      setToast({ show: true, type: 'success', message: `Opening WhatsApp to book ${test.name}...` })
    } catch (error) {
      console.error('Error opening WhatsApp:', error)
      setToast({ show: true, type: 'error', message: 'Could not open WhatsApp. Please try again.' })
    }
  }

  const handleDirectBookTestWhatsApp = (test) => {
    // Send directly via WhatsApp Web
    whatsappService.sendViaWhatsAppWeb(test, 'test')
    
    setToast({ show: true, type: 'success', message: `Opening WhatsApp to book ${test.name}...` })
  }

  const handlePackageBookWhatsApp = (packageName, packagePrice) => {
    // Send package booking via WhatsApp Web
    const packageData = {
      name: packageName,
      price: packagePrice,
      type: 'package'
    }
    whatsappService.sendViaWhatsAppWeb(packageData, 'package')
    
    setToast({ show: true, type: 'success', message: `Opening WhatsApp to book ${packageName}...` })
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

  const reviews = [
    {
      id: 1,
      name: "Ketan Gaidhane",
      role: "Local Guide",
      rating: 5,
      date: "7 months ago",
      review: "Good and fast Service. Advanced Research Dynamic Solutions. Innovative Lab Precision Testing.",
      avatar: "KG"
    },
    {
      id: 2,
      name: "Eshwari Badakh",
      role: "4 reviews",
      rating: 5,
      date: "4 months ago",
      review: "Very cooperative and caring team, they did all the necessary tests and created the reports with highest accuracy even late night, so that the right treatment for me to start immediately. Thanks 🙏",
      avatar: "EB"
    },
    {
      id: 3,
      name: "Shriganesh Admane",
      role: "3 reviews",
      rating: 5,
      date: "7 months ago",
      review: "I had an excellent experience with Jijau Pathology! The service is top-notch, and the accuracy of the tests is impressive. The doctors and nurses are extremely knowledgeable and highly professional, making the entire process smooth and reassuring. I highly recommend them for anyone looking for reliable and efficient pathology services. Truly a place you can trust!",
      avatar: "SA"
    },
    {
      id: 4,
      name: "Dhananjay Khandagale",
      role: "1 review",
      rating: 5,
      date: "7 months ago",
      review: "Report Result is always correct. Staff Behaviour is also good for patients. Report Process is fast and correct. To use best Technology for Report sending patients. Educated Staff. Proper Cleaning Blood Sample instrument. All test are available in this lab. Best lab for shrirampur in blood sample testing always visit to test your blood sample in Jijau Pathology lab Shrirampur",
      avatar: "DK"
    },
    {
      id: 5,
      name: "Satish Jha",
      role: "3 reviews",
      rating: 5,
      date: "7 months ago",
      review: "I'm really impressed with Jijau Pathology! Dr. Pavan Bhand and the staff are amazing—very knowledgeable and professional. The tests are accurate, and the whole process is smooth. Highly recommend this place for anyone looking for reliable pathology services!",
      avatar: "SJ"
    },
    {
      id: 6,
      name: "Gajanan Shinde",
      role: "2 reviews",
      rating: 5,
      date: "7 months ago",
      review: "Good health care and service provider as well knowledgeable staff. Affordable and Happy with service.",
      avatar: "GS"
    },
    {
      id: 7,
      name: "Harshal Chavan",
      role: "5 reviews",
      rating: 5,
      date: "7 months ago",
      review: "Nice experience in my first visit in Jijau Pathology Lab.",
      avatar: "HC"
    },
    {
      id: 8,
      name: "Komal Anhad",
      role: "1 review",
      rating: 5,
      date: "7 months ago",
      review: "Provides accurate and timely diagnostic services with a professional and caring approach.",
      avatar: "KA"
    },
    {
      id: 9,
      name: "Manoj Raut",
      role: "1 review",
      rating: 5,
      date: "7 months ago",
      review: "Fast report good service",
      avatar: "MR"
    },
    {
      id: 10,
      name: "Kaustubh Janrao",
      role: "1 review",
      rating: 5,
      date: "7 months ago",
      review: "Best Patient Counselling",
      avatar: "KJ"
    }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100" style={{ paddingBottom: '0', paddingTop: '80px' }}>
      {toast.show && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[70] px-4 py-3 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : toast.type === 'info' ? 'bg-blue-600' : 'bg-red-600'}`} onAnimationEnd={() => {}}>
          <div className="flex items-center gap-3">
            <span className="font-semibold">{toast.type === 'success' ? 'Success' : toast.type === 'info' ? 'Info' : 'Error'}</span>
            <span className="opacity-90">{toast.message}</span>
            <button className="ml-3 text-white/80 hover:text-white" onClick={() => setToast({ ...toast, show: false })}>✕</button>
          </div>
        </div>
      )}
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${modalEnter ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowBookingModal(false)}></div>
          <div className={`relative bg-white w-[95vw] max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 z-[61] transform transition-all duration-300 ease-out ${modalEnter ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}`}>
            {/* Left Illustration */}
            <div className="hidden md:block bg-white p-0">
              <img src={image17} alt="Booking illustration" className="w-full h-full object-contain" />
            </div>
            {/* Right Form */}
            <div className="p-6 sm:p-8">
              <button onClick={() => setShowBookingModal(false)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-700" aria-label="Close">
                ✕
              </button>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Test</h3>
              <p className="text-gray-600 mb-6">Fill the form and we'll call you within 15 minutes</p>
              <form onSubmit={handleBookingSubmitModal} className="space-y-4">
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
                  className="w-full py-3 px-6 bg-green-600 text-white rounded-lg font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:bg-green-700 flex items-center justify-center gap-2"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.471.099-.174.05-.347-.025-.471-.075-.124-.67-1.612-.916-2.206-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.011-1.04 2.475 0 1.464 1.065 2.875 1.215 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Book Test
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  *All fields are mandatory. Terms and conditions apply.
                </p>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Click "Send via WhatsApp" to send your booking details directly to our admin
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
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
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                +91 8605941731
              </a>
              <a
                href="tel:+91 02422299688"
                className="text-white hover:text-purple-200 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-white/20 rounded-lg inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 2422299688
              </a>
              <a
                href="https://maps.app.goo.gl/MJEnATgUghqZ5SqZ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-200 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-white/20 rounded-lg inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Find Us
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
      {/* Hero Section - Fullscreen Sliding Background */}
      <section className="relative w-screen min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-screen overflow-hidden pt-8 md:pt-10 lg:pt-14">
  {/* Background slides (white), 4 slides crossfade */}
  {[0, 1, 2, 3].map((index) => (
    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${currentBg === index ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-white"></div>
    </div>
  ))}

  {/* Hero Content Overlay */}
  <div className="relative z-10 h-full flex items-center">
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center justify-items-center md:justify-items-start h-full -mt-0 md:-mt-4 lg:mt-0">
        {/* Left: Slide content blocks */}
        <div className="relative">
          {/* Slide 1: Accurate Diagnostics */}
          <div className={`max-w-3xl transition-opacity duration-700 text-center md:text-left mx-auto md:mx-0 ${currentBg === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-purple-900 mb-2 sm:mb-3 leading-tight">
              Accurate Diagnostics
            </h1>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-700 md:text-gray-800 mb-3">
              Trusted Lab Results You Can Rely On
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-purple-700 max-w-2xl mb-6 md:mb-8">
              State-of-the-art equipment and certified technicians ensure accurate results
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <a href="#all-tests" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 transition-colors shadow-lg">
                View Tests
              </a>
              <a href="#packages" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
                View Packages
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 shadow-sm">
                <div className="text-lg sm:text-xl font-bold">50K+</div>
                <div className="text-xs sm:text-sm text-gray-500">Happy Patients</div>
              </div>
              <div className="bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 shadow-sm">
                <div className="text-lg sm:text-xl font-bold">99.8%</div>
                <div className="text-xs sm:text-sm text-gray-500">Report Accuracy</div>
              </div>
              <div className="bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 shadow-sm col-span-2 sm:col-span-1">
                <div className="text-lg sm:text-xl font-bold">3–6 hrs</div>
                <div className="text-xs sm:text-sm text-gray-500">Fast Reports</div>
              </div>
            </div>
          </div>

          {/* Slide 2: Preventive Health Packages */}
          <div className={`max-w-3xl transition-opacity duration-700 text-center md:text-left mx-auto md:mx-0 ${currentBg === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-purple-900 leading-tight mb-2">
              Preventive Health <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">Packages</span>
            </h2>
            <h3 className="text-lg sm:text-xl md:text-2xl tracking-wide text-gray-800 mb-2">
              STAY AHEAD WITH REGULAR CHECKUPS 
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-purple-700 max-w-2xl mb-4">
              Specialy Designed Packages to Monitor Your Overall Health
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-emerald-700 font-bold shadow-lg mb-6 bg-yellow-400">
              <span className="text-sm">Starting from</span>
              <span className="text-lg">₹599/-</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <a href="#packages" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-emerald-300 to-cyan-300 hover:from-emerald-400 hover:to-cyan-400 transition-colors shadow-lg">
                Explore Packages
              </a>
              <a href="#booking" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
                Book a Checkup
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 shadow-sm">
                <div className="text-sm text-gray-500">Includes</div>
                <div className="text-base sm:text-lg font-semibold">CBC, LFT, RFT</div>
              </div>
              <div className="bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 shadow-sm">
                <div className="text-sm text-gray-500">Add-ons</div>
                <div className="text-base sm:text-lg font-semibold">HbA1c, TSH, Lipids</div>
              </div>
            </div>
          </div>

          {/* Slide 3: Safe & Hygienic */}
          <div className={`max-w-3xl transition-opacity duration-700 text-center md:text-left mx-auto md:mx-0 ${currentBg === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-900 leading-tight mb-3">
              Safe & <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">Hygienic</span>
            </h2>
            <h3 className="text-lg sm:text-2xl md:text-3xl tracking-wide text-gray-800 mb-4">
              YOUR SAFETY IS OUR TOP PRIORITY
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-700 max-w-2xl mb-8">
              Strict sanitization and safety protocols followed for every test
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10">
              <a href="#booking" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-black bg-gradient-to-r from-emerald-300 to-cyan-300 hover:from-emerald-400 hover:to-cyan-400 transition-colors shadow-lg">
                Book Home Collection
              </a>
              <a href="#features" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
                See Safety Protocols
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white border border-gray-200 text-gray-900 rounded-xl px-6 py-4 shadow-sm">
                <div className="text-sm text-gray-500">PPE</div>
                <div className="text-lg sm:text-xl font-semibold">Masks & Gloves</div>
              </div>
              <div className="bg-white border border-gray-200 text-gray-900 rounded-xl px-6 py-4 shadow-sm">
                <div className="text-sm text-gray-500">Sanitization</div>
                <div className="text-lg sm:text-xl font-semibold">Before & After Visit</div>
              </div>
            </div>
          </div>

          {/* Slide 4: Home Sample Collection */}
          <div className={`max-w-3xl transition-opacity duration-700 text-center md:text-left mx-auto md:mx-0 ${currentBg === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-900 leading-tight mb-3">
              Home Sample Collection
            </h2>
            {/* <h3 className="text-xl sm:text-xl md:text-2xl tracking-wide text-gray-800 mb-4">
              Convenient, Safe & Fast Sample Collection at Your Doorstep
            </h3> */}
            <p className="text-lg sm:text-xl md:text-2xl text-black max-w-2xl mb-8">
              Enjoy doorstep sample pickup by certified phlebotomists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10">
              <a href="#booking" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-black bg-gradient-to-r from-sky-300 to-emerald-300 hover:from-sky-400 hover:to-emerald-400 transition-colors shadow-lg">
                Book Now
              </a>
              <a href="#features" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 transition-colors">
                How It Works
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white border border-gray-200 text-gray-900 rounded-xl px-6 py-4 shadow-sm">
                <div className="text-sm text-gray-500">Availability</div>
                <div className="text-lg sm:text-xl font-semibold">7 days a week</div>
              </div>
              <div className="bg-white border border-gray-200 text-gray-900 rounded-xl px-6 py-4 shadow-sm">
                <div className="text-sm text-gray-500">Turnaround</div>
                <div className="text-lg sm:text-xl font-semibold">Reports in 3–6 hrs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Slide images, crossfading */}
        <div className="relative w-full h-64 sm:h-80 md:h-[420px] lg:h-[520px] flex items-center justify-center">
          {[img2, img4, img3, img1].map((image, index) => (
            <div key={index} className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${currentBg === index ? 'opacity-100' : 'opacity-0'}`}>
              <img src={image} alt={`Slide ${index + 1}`} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Booking Form */}
      <section ref={bookingRef} id="booking" className="pt-4 pb-12 md:py-20 bg-gradient-to-br from-purple-50 via-white to-purple-100">
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
              {formBanner.show && (
                <div className={`mb-4 px-4 py-3 rounded-lg ${formBanner.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm">{formBanner.message}</p>
                    <button className="text-current/60 hover:text-current" onClick={() => setFormBanner(prev => ({ ...prev, show: false }))}>✕</button>
                  </div>
                </div>
              )}
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
                  *All fields are mandatory. Terms and conditions apply.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section id="packages" className="py-20 relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50" ref={packagesTopRef}>
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

                <button 
                  className="w-full text-white py-3 rounded-lg font-semibold transition-colors" 
                  style={{ backgroundColor: '#642EAA' }} 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} 
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}
                  onClick={() => handlePackageBookWhatsApp('JIJAU BASIC CARE', '₹1,499')}
                >
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

                <button 
                  className="w-full text-white py-3 rounded-lg font-semibold transition-colors" 
                  style={{ backgroundColor: '#642EAA' }} 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} 
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}
                  onClick={() => handlePackageBookWhatsApp('JIJAU ACTIVE CARE +', '₹1,799')}
                >
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

                <button 
                  className="w-full text-white py-3 rounded-lg font-semibold transition-colors" 
                  style={{ backgroundColor: '#642EAA' }} 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} 
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}
                  onClick={() => handlePackageBookWhatsApp('JIJAU WOMEN\'S CARE', '₹2,400')}
                >
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
                    <button 
                      className="w-full text-white py-3 rounded-lg font-semibold transition-colors" 
                      style={{ backgroundColor: '#642EAA' }} 
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} 
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}
                      onClick={() => handlePackageBookWhatsApp('JIJAU DIABETIC CARE', '₹599')}
                    >
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
                    <button 
                      className="w-full text-white py-3 rounded-lg font-semibold transition-colors" 
                      style={{ backgroundColor: '#642EAA' }} 
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} 
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}
                      onClick={() => handlePackageBookWhatsApp('JIJAU FEVER CARE', '₹999')}
                    >
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
                    <button 
                      className="w-full text-white py-3 rounded-lg font-semibold transition-colors" 
                      style={{ backgroundColor: '#642EAA' }} 
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'} 
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}
                      onClick={() => handlePackageBookWhatsApp('SENIOR CITIZEN CARE', '₹2,999')}
                    >
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
            <section ref={allTestsRef} className="py-16 bg-secondary-50">
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
                          onClick={() => handleDirectBookTestWhatsApp(test)}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                          style={{ backgroundColor: '#642EAA' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#4A1F7A'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#642EAA'}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.471.099-.174.05-.347-.025-.471-.075-.124-.67-1.612-.916-2.206-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.011-1.04 2.475 0 1.464 1.065 2.875 1.215 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.645 5.11"/>
                          </svg>
                          Book Test
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

            {/* About Us Section */}
            <section className="py-20 w-full" style={{ backgroundColor: 'rgb(99, 44, 118)', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: '#E8D5F2', color: '#642EAA' }}>
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#642EAA' }}></span>
                    About Us
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Your Trusted Healthcare Partner
                  </h2>
                  <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                    Founded by Mr. Pavan Eknath Bhand with a vision to provide reliable, affordable, and advanced diagnostic services to the people of Shrirampur and nearby areas.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
                    <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                      Since our establishment in 2022, we have grown into a trusted name for precise testing, hygienic facilities, and patient-friendly service. At Jijau Pathology Lab, we believe that accurate diagnosis is the first step towards a healthy life, and we are proud to be your trusted partner in healthcare.
                    </p>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h4>
                      <p className="text-gray-600">To empower patients and doctors with accurate diagnostic results that support timely treatment and better health outcomes.</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">Founded by Mr. Pavan Eknath Bhand</h5>
                          <p className="text-gray-600 text-sm">Committed to community healthcare</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">Strong Reputation</h5>
                          <p className="text-gray-600 text-sm">Positive feedback from patients</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">Convenient Location</h5>
                          <p className="text-gray-600 text-sm">Near Kavde Sonography Hospital, Kamgar Hospital Road, Shrirampur MIDC</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">Always Available</h5>
                          <p className="text-gray-600 text-sm">Open all days to serve patients without delay</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Accuracy & Integrity</h4>
                      <p className="text-gray-600 text-sm">Delivering test results you can trust</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Patient-Centric Care</h4>
                      <p className="text-gray-600 text-sm">Friendly staff and comfortable experience</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Safety & Hygiene</h4>
                      <p className="text-gray-600 text-sm">Maintaining the highest standards of cleanliness</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Accessibility & Affordability</h4>
                      <p className="text-gray-600 text-sm">Quality healthcare that everyone can reach</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Testing</h4>
                      <p className="text-gray-600 text-sm">A wide range of pathology tests including blood, urine, stool, serology and other tests</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Health Check-up Packages</h4>
                      <p className="text-gray-600 text-sm">Designed for preventive care and early detection</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Modern Equipment</h4>
                      <p className="text-gray-600 text-sm">Use of modern equipment and strict quality control protocols for reliable results</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: '#E8D5F2', color: '#642EAA' }}>
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#642EAA' }}></span>
                    Customer Reviews
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    What Our Patients Say
                  </h2>
                  <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    Don't just take our word for it. Here's what our satisfied patients have to say about their experience with Jijau Pathology Laboratory.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(showMoreReviews ? reviews : reviews.slice(0, 6)).map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {review.avatar}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-900 truncate">{review.name}</h4>
                          <p className="text-sm text-gray-500">{review.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed line-clamp-4">{review.review}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button 
                    onClick={() => setShowMoreReviews(!showMoreReviews)}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>{showMoreReviews ? 'Show Less Reviews' : 'Show More Reviews'}</span>
                    <svg className={`w-5 h-5 ml-2 transition-transform duration-300 ${showMoreReviews ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
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
                    <div className="relative bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold absolute -top-3 -left-3"
                           style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>1</div>
                        <div className="w-14 h-14 mx-auto">
                          <svg className="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">Give us a call</h3>
                      <p className="text-secondary-600">Book your test through our helpline or online form</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold absolute -top-3 -left-3"
                           style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>2</div>
                        <div className="w-14 h-14 mx-auto">
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
                    <div className="relative bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold absolute -top-3 -left-3"
                           style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>3</div>
                        <div className="w-14 h-14 mx-auto">
                          <svg className="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">Home Visit</h3>
                      <p className="text-secondary-600">Our expert phlebotomist collects your sample</p>
                    </div>

                    {/* Step 4 */}
                    <div className="relative bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold absolute -top-3 -left-3"
                           style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>4</div>
                        <div className="w-14 h-14 mx-auto">
                          <svg className="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">Lab Analysis</h3>
                      <p className="text-secondary-600">Sample processed in our lab</p>
                    </div>

                    {/* Step 5 */}
                    <div className="relative bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold absolute -top-3 -left-3"
                           style={{ backgroundColor: '#7F55B1', boxShadow: '0 0 0 5px #f0e6ff' }}>5</div>
                        <div className="w-14 h-14 mx-auto">
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
                      {/* WhatsApp */}
                      <a 
                        href="https://wa.me/918605941731" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group p-3 rounded-full bg-white/10 hover:bg-green-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                      >
                        <svg className="w-6 h-6 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </a>
                      
                      {/* Facebook */}
                      <a 
                        href="https://www.facebook.com/share/16xLA3dfJe/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group p-3 rounded-full bg-white/10 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                      >
                        <svg className="w-6 h-6 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      
                      {/* Instagram */}
                      <a 
                        href="https://www.instagram.com/jijau.pathologylab?igsh=MXZha3h4Y21ybnR1YQ==" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group p-3 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                      >
                        <svg className="w-6 h-6 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
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

                      {/* Login link removed */}
                      <li><button onClick={() => scrollToSection(bookingRef)} className="text-secondary-300 hover:text-white">Book Appointment</button></li>
                      <li><button onClick={() => scrollToSection(packagesTopRef)} className="text-secondary-300 hover:text-white">Explore Packages</button></li>
                      <li><button onClick={() => scrollToSection(allTestsRef)} className="text-secondary-300 hover:text-white">All Available Tests</button></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                    <div className="space-y-4 text-secondary-300">
                      <div className="flex items-start gap-2">
                        <svg className="flex-shrink-0 mt-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p>
                          <a href="https://wa.me/918605941731" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+91 8605941731</a>
                          <br />+91 2422299688
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="flex-shrink-0 mt-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
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
                        <svg className="flex-shrink-0 mt-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
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