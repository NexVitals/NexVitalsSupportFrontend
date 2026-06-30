import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Updates.css';
import ShapeGrid from '../components/ShapeGrid';
import TextType from '../components/TextType';
import BlurText from '../components/BlurText';

const UPD_CATEGORIES = {
  'product-updates': 'Product Updates',
  'workflow-announcements': 'Workflow Announcements',
  'maintenance-notices': 'Maintenance Notices',
  'partnership-network-expansion': 'Partnership & Expansion',
  'policy-compliance': 'Policy & Compliance',
  'internal-team-announcements': 'Team Announcements',
};

// Private fields that should NOT be displayed on frontend (both camelCase and PascalCase variations)
const HIDDEN_UPDATE_FIELDS = new Set([
  'updateId',
  'UpdateId',
  'postedAt',
  'PostedAt',
  'postedBy',
  'PostedBy',
  'category',
  'Category',
  'createdAt',
  'CreatedAt',
  'updatedAt',
  'UpdatedAt',
]);

/**
 * Normalize field names from database column names (PascalCase) to camelCase
 * to maintain consistency in grouping and filtering
 */
function normalizeFieldNames(obj) {
  const normalized = {};
  
  const fieldMapping = {
    // Core fields
    'UpdateId': 'updateId',
    'Category': 'category',
    'PostedBy': 'postedBy',
    'PostedAt': 'postedAt',
    
    // Product Updates
    'UpdateTitle': 'updateTitle',
    'DateOfRelease': 'dateOfRelease',
    'VersionNumber': 'versionNumber',
    'WhatChanged': 'whatChanged',
    'WhoItAffects': 'whoItAffects',
    
    // Workflow Announcements
    'ProtocolUpdate': 'protocolUpdate',
    'EffectiveFrom': 'effectiveFrom',
    'UpdateDescription': 'updateDescription',
    'ImplementingDateExpected': 'implementingDateExpected',
    
    // Maintenance Notices
    'NoticeTitle': 'noticeTitle',
    'StartDateTime': 'startDateTime',
    'EndDateTime': 'endDateTime',
    'Details': 'details',
    
    // Partnership & Expansion
    'PartnerTitle': 'partnerTitle',
    'PartnerEffectiveFrom': 'partnerEffectiveFrom',
    'PartnerDescription': 'partnerDescription',
    
    // Policy & Compliance
    'PolicyTitle': 'policyTitle',
    'PolicyEffectiveDate': 'policyEffectiveDate',
    'PolicyDescription': 'policyDescription',
    
    // Team Announcements
    'TeamDate': 'teamDate',
    'AchievementTitle': 'achievementTitle',
    'TeamDescription': 'teamDescription',
  };
  
  Object.entries(obj).forEach(([key, value]) => {
    // Map PascalCase to camelCase, or keep camelCase as is
    const normalizedKey = fieldMapping[key] || key;
    normalized[normalizedKey] = value;
  });
  
  return normalized;
}

function formatFieldLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (char) => char.toUpperCase());
}

function UPDItem(data) {
  // Filter out private fields
  const entries = Object.entries(data).filter(
    ([key, value]) =>
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !HIDDEN_UPDATE_FIELDS.has(key)
  );

  return (
    <article className="upd-item">
      <div className="upd-item-grid">
        {entries.map(([key, value]) => (
          <div className="upd-field" key={key}>
            <span className="upd-field-label">{formatFieldLabel(key)}</span>
            <p className="upd-field-value">{String(value)}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function Updates() {
  const [updatesData, setUpdatesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedupdCategory, setSelectedupdCategory] = useState('product-updates');

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/updates');
      const result = await response.json();

      const grouped = {
        'product-updates': [],
        'workflow-announcements': [],
        'maintenance-notices': [],
        'partnership-network-expansion': [],
        'policy-compliance': [],
        'internal-team-announcements': [],
      };

      const updates = Array.isArray(result) ? result : result.data || [];

      updates.forEach((update) => {
        // Normalize the update object to use camelCase field names
        const normalizedUpdate = normalizeFieldNames(update);
        
        // Get category with proper fallback
        const category = normalizedUpdate.category || 'product-updates';
        
        // Only add to grouped if category exists in our categories
        if (grouped.hasOwnProperty(category)) {
          grouped[category].push(normalizedUpdate);
        }
      });

      setUpdatesData(grouped);
      console.log('Updates loaded and normalized:', grouped);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch updates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteComplete = () => {
    console.log('Quote animation completed!');
  };

  if (loading) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
        Loading updates...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="updates">
      <div className="updates-background" aria-hidden="true">
        <ShapeGrid
          speed={0.3}
          direction="diagonal"
          borderColor="#38395b"
          hoverFillColor="#222"
          hoverTrailAmount={4}
          hoverColor="#aebfd9"
          size={22}
          shape="hexagon"
        />
      </div>

      <section className="updates-content">
        <div className="updates-hero">
          <div className="updates-header">
            <TextType
              text={['- Welcome to NexVitals Updates ! -']}
              typingSpeed={70}
              deletingSpeed={45}
              pauseDuration={1200}
              initialDelay={300}
              showCursor
              cursorCharacter="|"
              cursorBlinkDuration={0.7}
              loop={true}
              className="heading-text"
            />
          </div>

          <div className="updates-sub-header">
            <BlurText
              text="- Stay Informed. Stay Prepared. Every Update Brings You Closer to Safer Roads -"
              delay={100}
              animateBy="letters"
              direction="bottom"
              onAnimationComplete={handleQuoteComplete}
              className="quote-text"
            />
          </div>
        </div>

        <div className="updates-body">
          <div className="updates-panel">
            <div className="updates-tabs">
              {Object.entries(UPD_CATEGORIES).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedupdCategory(key)}
                  className={`updates-tab-button ${
                    selectedupdCategory === key ? 'updates-tab-button-active' : ''
                  }`}
                >
                  <span className="updates-tab-label">{label}</span>

                  <AnimatePresence>
                    {selectedupdCategory === key && (
                      <motion.span
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="updates-tab-highlight"
                      />
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>

            <div className="updates-content-area">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedupdCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="updates-list"
                >
                  {updatesData[selectedupdCategory] &&
                  updatesData[selectedupdCategory].length > 0 ? (
                    updatesData[selectedupdCategory].map((upd, index) => (
                      <UPDItem key={`${selectedupdCategory}-${index}`} {...upd} />
                    ))
                  ) : (
                    <div style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>
                      No updates available for this category.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Updates;