import { Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import ShapeGrid from '../components/ShapeGrid';
import TextType from '../components/TextType';
import SplitText from '../components/SplitText';
import { Form } from '../components/UpdateForm';

const CATEGORY_OPTIONS = [
  { value: 'product-updates', label: 'Product Updates' },
  { value: 'workflow-announcements', label: 'Workflow Announcements' },
  { value: 'maintenance-notices', label: 'Maintenance Notices' },
  { value: 'partnership-network-expansion', label: 'Partnership and Network Expansion Updates' },
  { value: 'policy-compliance', label: 'Policy and Compliance Updates' },
  { value: 'internal-team-announcements', label: 'Internal Team Announcements' },
];

const initialFormState = {
  category: 'product-updates',
  updateTitle: '',
  dateOfRelease: '',
  versionNumber: '',
  whatChanged: '',
  whoItAffects: '',
  protocolUpdate: '',
  effectiveFrom: '',
  updateDescription: '',
  implementingDateExpected: '',
  noticeTitle: '',
  startDateTime: '',
  endDateTime: '',
  details: '',
  partnerTitle: '',
  partnerEffectiveFrom: '',
  partnerDescription: '',
  policyTitle: '',
  policyEffectiveDate: '',
  policyDescription: '',
  teamDate: '',
  achievementTitle: '',
  teamDescription: '',
};

const initialAdminFormState = {
  eventType: 'add',
  adminEmail: '',
  adminPassword: '',
};

function Admin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const [adminFormData, setAdminFormData] = useState(initialAdminFormState);
  const [adminSubmitMessage, setAdminSubmitMessage] = useState('');
  const [adminSubmitError, setAdminSubmitError] = useState('');

  const handleUFComplete = () => {
    console.log('Update Form Heading animation completed');
  };

  const handleARComplete = () => {
    console.log('Add Remove heading animation completed');
  };

  const handleFEComplete = () => {
    console.log('Footer End animation completed');
  };

  const handleFieldHeadingComplete = (field) => {
    console.log(`${field} heading animation completed`);
  };

  const clearAuthStorage = () => {
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('isAdminAuthenticated');
  };

  const handleLogout = () => {
    clearAuthStorage();
    navigate('/preadmin', { replace: true });
  };

  const handleUnauthorized = (message = 'Session expired. Please log in again.') => {
    clearAuthStorage();
    setSubmitMessage('');
    setAdminSubmitMessage('');
    setSubmitError(message);
    setAdminSubmitError(message);

    setTimeout(() => {
      navigate('/preadmin', { replace: true });
    }, 800);
  };

  const getStoredToken = () => {
    return localStorage.getItem('adminToken');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitMessage('');
    setSubmitError('');
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminSubmitMessage('');
    setAdminSubmitError('');
    setAdminFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const requiredFieldsByCategory = useMemo(
    () => ({
      'product-updates': [
        'updateTitle',
        'dateOfRelease',
        'versionNumber',
        'whatChanged',
        'whoItAffects',
      ],
      'workflow-announcements': [
        'protocolUpdate',
        'effectiveFrom',
        'updateDescription',
        'implementingDateExpected',
      ],
      'maintenance-notices': [
        'noticeTitle',
        'startDateTime',
        'endDateTime',
        'details',
      ],
      'partnership-network-expansion': [
        'partnerTitle',
        'partnerEffectiveFrom',
        'partnerDescription',
      ],
      'policy-compliance': [
        'policyTitle',
        'policyEffectiveDate',
        'policyDescription',
      ],
      'internal-team-announcements': [
        'teamDate',
        'achievementTitle',
        'teamDescription',
      ],
    }),
    []
  );

  const isFieldFilled = (value) => String(value).trim() !== '';

  const isFormValid = useMemo(() => {
    const requiredFields = requiredFieldsByCategory[formData.category] || [];
    return requiredFields.every((field) => isFieldFilled(formData[field]));
  }, [formData, requiredFieldsByCategory]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isAdminFormValid = useMemo(() => {
    const emailFilled = isFieldFilled(adminFormData.adminEmail);
    const validEmail = isValidEmail(adminFormData.adminEmail);

    if (adminFormData.eventType === 'add') {
      return (
        isFieldFilled(adminFormData.eventType) &&
        emailFilled &&
        validEmail &&
        adminFormData.adminPassword.trim().length >= 6
      );
    }

    return (
      isFieldFilled(adminFormData.eventType) &&
      emailFilled &&
      validEmail
    );
  }, [adminFormData]);

  const buildUpdatePayload = () => {
    switch (formData.category) {
      case 'product-updates':
        return {
          category: formData.category,
          updateTitle: formData.updateTitle.trim(),
          dateOfRelease: formData.dateOfRelease,
          versionNumber: formData.versionNumber.trim(),
          whatChanged: formData.whatChanged.trim(),
          whoItAffects: formData.whoItAffects.trim(),
        };

      case 'workflow-announcements':
        return {
          category: formData.category,
          protocolUpdate: formData.protocolUpdate.trim(),
          effectiveFrom: formData.effectiveFrom,
          updateDescription: formData.updateDescription.trim(),
          implementingDateExpected: formData.implementingDateExpected,
        };

      case 'maintenance-notices':
        return {
          category: formData.category,
          noticeTitle: formData.noticeTitle.trim(),
          startDateTime: formData.startDateTime,
          endDateTime: formData.endDateTime,
          details: formData.details.trim(),
        };

      case 'partnership-network-expansion':
        return {
          category: formData.category,
          partnerTitle: formData.partnerTitle.trim(),
          partnerEffectiveFrom: formData.partnerEffectiveFrom,
          partnerDescription: formData.partnerDescription.trim(),
        };

      case 'policy-compliance':
        return {
          category: formData.category,
          policyTitle: formData.policyTitle.trim(),
          policyEffectiveDate: formData.policyEffectiveDate,
          policyDescription: formData.policyDescription.trim(),
        };

      case 'internal-team-announcements':
        return {
          category: formData.category,
          teamDate: formData.teamDate,
          achievementTitle: formData.achievementTitle.trim(),
          teamDescription: formData.teamDescription.trim(),
        };

      default:
        return { ...formData };
    }
  };

  const visibleFields = useMemo(() => {
    switch (formData.category) {
      case 'product-updates':
        return (
          <Fragment>
            <FieldHeading text="Update Title" onComplete={() => handleFieldHeadingComplete('Update Title')} />
            <input
              type="text"
              name="updateTitle"
              value={formData.updateTitle}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Enter update title"
              required
            />

            <FieldHeading text="Date of Release" onComplete={() => handleFieldHeadingComplete('Date of Release')} />
            <input
              type="date"
              name="dateOfRelease"
              value={formData.dateOfRelease}
              onChange={handleChange}
              className="admin-form-input"
              required
            />

            <FieldHeading text="Version Number" onComplete={() => handleFieldHeadingComplete('Version Number')} />
            <input
              type="text"
              name="versionNumber"
              value={formData.versionNumber}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="e.g. v2.1.0"
              required
            />

            <FieldHeading text="What Changed" onComplete={() => handleFieldHeadingComplete('What Changed')} />
            <textarea
              name="whatChanged"
              value={formData.whatChanged}
              onChange={handleChange}
              className="admin-form-textarea"
              placeholder="Describe the updates made"
              rows="4"
              required
            />

            <FieldHeading text="Who It Affects" onComplete={() => handleFieldHeadingComplete('Who It Affects')} />
            <textarea
              name="whoItAffects"
              value={formData.whoItAffects}
              onChange={handleChange}
              className="admin-form-textarea"
              placeholder="Mention the impacted users or teams"
              rows="3"
              required
            />
          </Fragment>
        );

      case 'workflow-announcements':
        return (
          <Fragment>
            <FieldHeading text="Protocol Update" onComplete={() => handleFieldHeadingComplete('Protocol Update')} />
            <input
              type="text"
              name="protocolUpdate"
              value={formData.protocolUpdate}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Enter protocol update"
              required
            />

            <FieldHeading text="Effective From" onComplete={() => handleFieldHeadingComplete('Effective From')} />
            <input
              type="date"
              name="effectiveFrom"
              value={formData.effectiveFrom}
              onChange={handleChange}
              className="admin-form-input"
              required
            />

            <FieldHeading text="Update Description" onComplete={() => handleFieldHeadingComplete('Update Description')} />
            <textarea
              name="updateDescription"
              value={formData.updateDescription}
              onChange={handleChange}
              className="admin-form-textarea"
              placeholder="Describe the workflow announcement"
              rows="4"
              required
            />

            <FieldHeading
              text="Implementing Date Expected"
              onComplete={() => handleFieldHeadingComplete('Implementing Date Expected')}
            />
            <input
              type="date"
              name="implementingDateExpected"
              value={formData.implementingDateExpected}
              onChange={handleChange}
              className="admin-form-input"
              required
            />
          </Fragment>
        );

      case 'maintenance-notices':
        return (
          <Fragment>
            <FieldHeading text="Notice Title" onComplete={() => handleFieldHeadingComplete('Notice Title')} />
            <input
              type="text"
              name="noticeTitle"
              value={formData.noticeTitle}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Enter maintenance notice title"
              required
            />

            <FieldHeading
              text="Starting Date and Time"
              onComplete={() => handleFieldHeadingComplete('Starting Date and Time')}
            />
            <input
              type="datetime-local"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
              className="admin-form-input"
              required
            />

            <FieldHeading
              text="Ending Date and Time"
              onComplete={() => handleFieldHeadingComplete('Ending Date and Time')}
            />
            <input
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
              className="admin-form-input"
              required
            />

            <FieldHeading text="Details" onComplete={() => handleFieldHeadingComplete('Details')} />
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="admin-form-textarea"
              placeholder="Provide maintenance details"
              rows="4"
              required
            />
          </Fragment>
        );

      case 'partnership-network-expansion':
        return (
          <Fragment>
            <FieldHeading
              text="Partnering Company / Organization Title"
              onComplete={() => handleFieldHeadingComplete('Partnering Company / Organization Title')}
            />
            <input
              type="text"
              name="partnerTitle"
              value={formData.partnerTitle}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Enter partner organization name"
              required
            />

            <FieldHeading text="Effective From" onComplete={() => handleFieldHeadingComplete('Partner Effective From')} />
            <input
              type="date"
              name="partnerEffectiveFrom"
              value={formData.partnerEffectiveFrom}
              onChange={handleChange}
              className="admin-form-input"
              required
            />

            <FieldHeading text="Description" onComplete={() => handleFieldHeadingComplete('Partner Description')} />
            <textarea
              name="partnerDescription"
              value={formData.partnerDescription}
              onChange={handleChange}
              className="admin-form-textarea"
              placeholder="Describe the partnership or expansion update"
              rows="4"
              required
            />
          </Fragment>
        );

      case 'policy-compliance':
        return (
          <Fragment>
            <FieldHeading
              text="Policy Update Title"
              onComplete={() => handleFieldHeadingComplete('Policy Update Title')}
            />
            <input
              type="text"
              name="policyTitle"
              value={formData.policyTitle}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Enter policy title"
              required
            />

            <FieldHeading text="Effective Date" onComplete={() => handleFieldHeadingComplete('Policy Effective Date')} />
            <input
              type="date"
              name="policyEffectiveDate"
              value={formData.policyEffectiveDate}
              onChange={handleChange}
              className="admin-form-input"
              required
            />

            <FieldHeading text="Description" onComplete={() => handleFieldHeadingComplete('Policy Description')} />
            <textarea
              name="policyDescription"
              value={formData.policyDescription}
              onChange={handleChange}
              className="admin-form-textarea"
              placeholder="Describe the policy or compliance update"
              rows="4"
              required
            />
          </Fragment>
        );

      case 'internal-team-announcements':
        return (
          <Fragment>
            <FieldHeading text="Date" onComplete={() => handleFieldHeadingComplete('Team Date')} />
            <input
              type="date"
              name="teamDate"
              value={formData.teamDate}
              onChange={handleChange}
              className="admin-form-input"
              required
            />

            <FieldHeading text="Achievement Title" onComplete={() => handleFieldHeadingComplete('Achievement Title')} />
            <input
              type="text"
              name="achievementTitle"
              value={formData.achievementTitle}
              onChange={handleChange}
              className="admin-form-input"
              placeholder="Enter achievement title"
              required
            />

            <FieldHeading text="Description" onComplete={() => handleFieldHeadingComplete('Team Description')} />
            <textarea
              name="teamDescription"
              value={formData.teamDescription}
              onChange={handleChange}
              className="admin-form-textarea"
              placeholder="Describe the internal announcement"
              rows="4"
              required
            />
          </Fragment>
        );

      default:
        return null;
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = requiredFieldsByCategory[formData.category] || [];
    const firstMissingField = requiredFields.find((field) => !isFieldFilled(formData[field]));

    if (firstMissingField) {
      setSubmitMessage('');
      setSubmitError('Please fill in all required fields before posting the update.');
      return;
    }

    const token = getStoredToken();

    if (!token) {
      setSubmitMessage('');
      setSubmitError('Admin token not found. Please log in again.');
      return;
    }

    try {
      const payload = buildUpdatePayload();

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/updates/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to post update.');
      }

      setSubmitError('');
      setSubmitMessage('Update posted successfully.');
      setFormData(initialFormState);
    } catch (error) {
      setSubmitMessage('');
      setSubmitError(error.message || 'Error posting update.');
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(adminFormData.adminEmail)) {
      setAdminSubmitMessage('');
      setAdminSubmitError('Please enter a valid admin email address.');
      return;
    }

    if (adminFormData.eventType === 'add' && adminFormData.adminPassword.trim().length < 6) {
      setAdminSubmitMessage('');
      setAdminSubmitError('Admin password must be at least 6 characters long.');
      return;
    }

    const token = getStoredToken();

    if (!token) {
      setAdminSubmitMessage('');
      setAdminSubmitError('Admin token not found. Please log in again.');
      return;
    }

    try {
      let response;

      if (adminFormData.eventType === 'add') {
        response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            AdminEmailId: adminFormData.adminEmail.trim(),
            AdminPassword: adminFormData.adminPassword,
          }),
        });
      } else {
        const encodedEmail = encodeURIComponent(adminFormData.adminEmail.trim());
        response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/remove?adminEmailId=${encodedEmail}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Failed to ${adminFormData.eventType} admin.`);
      }

      setAdminSubmitError('');
      setAdminSubmitMessage(
        `Admin ${adminFormData.eventType === 'add' ? 'added' : 'removed'} successfully.`
      );
      setAdminFormData(initialAdminFormState);
    } catch (error) {
      setAdminSubmitMessage('');
      setAdminSubmitError(error.message || 'Error processing admin request.');
    }
  };

  return (
    <div className="admin">
      <div className="admin-background" aria-hidden="true">
        <ShapeGrid
          speed={0.3}
          squareSize={40}
          direction="diagonal"
          borderColor="#38395b"
          hoverFillColor="#222"
          hoverTrailAmount={4}
          hoverColor="#aebfd9"
          size={22}
          shape="hexagon"
        />
      </div>

      <button
        type="button"
        className="admin-logout-btn"
        onClick={handleLogout}
        aria-label="Logout"
      >
        Logout
      </button>

      <section className="admin-content">
        <div className="admin-content-inner">
          <div className="admin-headings">
            <div className="admin-content-heading">
              <TextType
                text={['Welcome to NexVitals Command Centre !']}
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

            <div className="admin-content-update-form-heading">
              <SplitText
                key="update-form-heading"
                text="- Post Updates -"
                className="update-form-heading-text"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleUFComplete}
                showCallbacks={true}
              />
            </div>

            <div className="admin-content-update-form">
              <Form className="admin-form-shell" onSubmit={handleSubmit}>
                <div className="admin-form-card">
                  <FieldHeading
                    text="Update Category"
                    onComplete={() => handleFieldHeadingComplete('Update Category')}
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="admin-form-select"
                    required
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <div className="admin-form-fields">
                    {visibleFields}
                  </div>

                  <button
                    type="submit"
                    className="admin-submit-btn"
                    disabled={!isFormValid}
                  >
                    Post Update
                  </button>

                  {submitError && (
                    <p className="admin-form-status admin-form-status-error">{submitError}</p>
                  )}

                  {submitMessage && (
                    <p className="admin-form-status">{submitMessage}</p>
                  )}
                </div>
              </Form>
            </div>

            <div className="admin-add-remove-panel">
              <div className="admin-add-remove-heading">
                <SplitText
                  key="add-remove-heading"
                  text="- Add/Remove Admins -"
                  className="add-remove-heading-text"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleARComplete}
                  showCallbacks={true}
                />
              </div>

              <div className="admin-add-remove-form">
                <form className="admin-manage-form" onSubmit={handleAdminSubmit}>
                  <div className="admin-manage-form-card">
                    <FieldHeading
                      text="Event Type"
                      onComplete={() => handleFieldHeadingComplete('Event Type')}
                    />
                    <select
                      name="eventType"
                      value={adminFormData.eventType}
                      onChange={handleAdminChange}
                      className="admin-form-select"
                      required
                    >
                      <option value="add">Add</option>
                      <option value="remove">Remove</option>
                    </select>

                    <FieldHeading
                      text="Admin Email"
                      onComplete={() => handleFieldHeadingComplete('Admin Email')}
                    />
                    <input
                      type="email"
                      name="adminEmail"
                      value={adminFormData.adminEmail}
                      onChange={handleAdminChange}
                      className="admin-form-input"
                      placeholder="Enter admin email"
                      autoComplete="email"
                      required
                    />

                    {adminFormData.eventType === 'add' && (
                      <Fragment>
                        <FieldHeading
                          text="Admin Password"
                          onComplete={() => handleFieldHeadingComplete('Admin Password')}
                        />
                        <input
                          type="password"
                          name="adminPassword"
                          value={adminFormData.adminPassword}
                          onChange={handleAdminChange}
                          className="admin-form-input"
                          placeholder="Enter admin password"
                          autoComplete="current-password"
                          minLength={6}
                          required
                        />
                      </Fragment>
                    )}

                    <button
                      type="submit"
                      className="admin-submit-btn"
                      disabled={!isAdminFormValid}
                    >
                      {adminFormData.eventType === 'add' ? 'Add Admin' : 'Remove Admin'}
                    </button>

                    {adminSubmitError && (
                      <p className="admin-form-status admin-form-status-error">{adminSubmitError}</p>
                    )}

                    {adminSubmitMessage && (
                      <p className="admin-form-status">{adminSubmitMessage}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="admin-content-footer">
              <div className="admin-footer-cp">
                <p className="admin-footer-text">NexVitals &copy; 2026. All rights reserved.</p>
              </div>
              <div className="admin-footer-end">
                <SplitText
                  key="admin-footer-end"
                  text="Every Update We Post Is a Step Closer to a World Where No Emergency Goes Unanswered"
                  className="admin-footer-end-text"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleFEComplete}
                  showCallbacks={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FieldHeading({ text, onComplete }) {
  return (
    <div className="admin-field-heading-wrap">
      <SplitText
        text={text}
        className="admin-field-heading"
        delay={18}
        duration={0.7}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 16 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.05}
        rootMargin="0px"
        textAlign="center"
        onLetterAnimationComplete={onComplete}
        showCallbacks={false}
      />
    </div>
  );
}

export default Admin;