import { useState } from 'react'
import './Grievance.css'
import Silk from '../components/Silk'
import TextType from '../components/TextType'
import BlurText from '../components/BlurText'
import SplitText from '../components/SplitText'

const GR_CAT = [
  "Device Malfunction or Sensor Failure",
  "Delayed Emergency Response or Alert",
  "Incorrect Hospital or Specialist Assignment",
  "Data Privacy or Unauthorized Data Sharing",
  "App or Software Performance Issues",
  "Billing and Subscription Disputes",
  "Customer Service Experience",
  "Other Service-Related Issues"
]

const GR_CON = [
  "If you have experienced a failure in device performance, emergency response timing, hospital routing accuracy, specialist assignment, data privacy, or any other aspect of our service, please report it here.",
  "Every complaint is logged, assigned a unique ticket number, and reviewed by our product and operations team within 48 business hours.",
  "We do not treat complaints as inconveniences — we treat them as opportunities to build a more reliable system."
]

const GR_FC = [
  "Our technical support team handles all hardware diagnostics, device connectivity issues, software bugs, and integration problems with hospital systems or ambulance networks.",
  "You can reach them directly for faster resolution of technical complaints.",
  "Technical Helpdesk Email: nexvitalssupport@gmail.com",
  "Direct Support Line: +91-9182424505",
  "Remote Diagnostics Service: Available Monday to Saturday, 10 AM – 6 PM IST",
  "On-Site Support: Available for fleet operators and enterprise clients. Raise a request via email to schedule a visit."
]

const initialFormData = {
  email: '',
  deviceId: '',
  category: '',
  complaint: '',
  files: []
}

const initialErrors = {
  email: '',
  deviceId: '',
  category: '',
  complaint: '',
  files: ''
}

function Grievance() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(initialErrors)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPosting, setIsPosting] = useState(false)

  const handleQuoteComplete = () => {
    console.log('Quote animation completed!')
  }

  const handleGTHComplete = () => {
    console.log('GTH completed!')
  }

  const handleGTComplete = () => {
    console.log('GT completed!')
  }

  const handleFHComplete = () => {
    console.log('FH completed!')
  }

  const handleGFEComplete = () => {
    console.log('FE completed!')
  }

  const handleGFCComplete = () => {
    console.log('GFC completed!')
  }

  const validateEmail = (email) => {
    const emailRegex = /^(?!.*\.\.)(?!\.)([A-Za-z0-9._%+-]+)@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/
    return emailRegex.test(email.trim())
  }

  const validateDeviceId = (deviceId) => {
    const deviceRegex = /^[A-Za-z0-9]{10}$/
    return deviceRegex.test(deviceId.trim())
  }

  const validateFiles = (files) => {
    if (!files || files.length === 0) return ''
    if (files.length > 2) return 'You can upload a maximum of 2 files only.'

    const allowedTypes = ['image/png', 'image/jpeg']
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return 'Only PNG or JPG files are allowed.'
      }
    }

    return ''
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email ID is required.'
        if (!validateEmail(value)) return 'Enter a valid email ID.'
        return ''

      case 'deviceId':
        if (!value.trim()) return 'NexVitals Device ID is required.'
        if (!validateDeviceId(value)) {
          return 'Device ID must be exactly 10 alphanumeric characters.'
        }
        return ''

      case 'category':
        if (!value.trim()) return 'Please select a grievance category.'
        return ''

      case 'complaint':
        if (!value.trim()) return 'Complaint message is required.'
        return ''

      case 'files':
        return validateFiles(value)

      default:
        return ''
    }
  }

  const validateForm = () => {
    const newErrors = {
      email: validateField('email', formData.email),
      deviceId: validateField('deviceId', formData.deviceId),
      category: validateField('category', formData.category),
      complaint: validateField('complaint', formData.complaint),
      files: validateField('files', formData.files)
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const cleanedValue =
      name === 'deviceId'
        ? value.replace(/[^A-Za-z0-9]/g, '').slice(0, 10)
        : value

    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, cleanedValue)
    }))
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || [])
    const fileError = validateFiles(selectedFiles)

    setFormData((prev) => ({
      ...prev,
      files: fileError ? [] : selectedFiles
    }))

    setErrors((prev) => ({
      ...prev,
      files: fileError
    }))

    if (fileError) {
      e.target.value = ''
    }
  }

  const handleSubmitGrievance = async (submittedFormData) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/grievance/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        EmailId: submittedFormData.email,
        NexVitalsDeviceId: submittedFormData.deviceId,
        GrievanceCatagory: submittedFormData.category,
        Complaint: submittedFormData.complaint
      })
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to submit grievance.')
    }

    return result
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isPosting) return

    setIsSubmitted(false)

    if (!validateForm()) return

    try {
      setIsPosting(true)
      await handleSubmitGrievance(formData)
      setIsSubmitted(true)
      setFormData(initialFormData)
      setErrors(initialErrors)
      e.target.reset()
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setIsPosting(false)
    }
  }

  const footerIntroItems = GR_FC.slice(0, 2)
  const footerSideItems = GR_FC.slice(2, 5)
  const footerLongItem = GR_FC[5]

  return (
    <div className="Grievance">
      <div className="Grievance-background">
        <Silk
          speed={3.5}
          scale={1}
          color="#B2DAE4"
          noiseIntensity={2.5}
          rotation={0}
        />
      </div>

      <div className="Grievance-Heading">
        <TextType
          text={[
            "- Welcome to NexVitals Grievance Cell ! -",
            "- Your Concerns, Our Commitment -"
          ]}
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

      <div className="Grievance-subheading">
        <BlurText
          text="Every Complaint Is a Signal That Helps Us Strengthen the Systems That Protect Lives"
          delay={200}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={handleQuoteComplete}
          className="quote-text"
        />
      </div>

      <section className="Grievance-content">
        <div className="Grievance-content-stack">
          <div className="Grievance-types">
            <div className="Grievance-types-heading">
              <SplitText
                key="Grievance-types-heading"
                text="- Tell Us What Went Wrong So We Can Make It Right, Faster -"
                className="Grievance-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleGTHComplete}
                showCallbacks={true}
              />
            </div>

            <div className="Grievance-types-content">
              <div className="Grievance-type-item Grievance-type-item-intro">
                {GR_CON.map((type, index) => (
                  <SplitText
                    key={`Grievance-type-${index}`}
                    text={type}
                    className={`Grievance-type-text ${index === 0 ? 'Grievance-type-text-intro' : ''}`}
                    delay={index * 100}
                    duration={1.2}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="left"
                    onLetterAnimationComplete={handleGTComplete}
                    showCallbacks={false}
                  />
                ))}
              </div>
            </div>

            <div className="Grievance-from">
              <div className="Grievance-form-heading">
                <SplitText
                  key="Grievance-form-heading"
                  text="- Post a Complaint -"
                  className="Grievance-form-title"
                  delay={30}
                  duration={1.05}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleFHComplete}
                  showCallbacks={false}
                />
              </div>

              <div className="Grievance-form-panel">
                <form className="Grievance-form" onSubmit={handleSubmit} noValidate>
                  <div className="Grievance-form-group">
                    <label htmlFor="email" className="Grievance-label">
                      Email ID
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`Grievance-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="Enter your email ID"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isPosting}
                    />
                    {errors.email && <span className="Grievance-error">{errors.email}</span>}
                  </div>

                  <div className="Grievance-form-group">
                    <label htmlFor="deviceId" className="Grievance-label">
                      NexVitals Device ID
                    </label>
                    <input
                      id="deviceId"
                      name="deviceId"
                      type="text"
                      className={`Grievance-input ${errors.deviceId ? 'input-error' : ''}`}
                      placeholder="Enter 10-character device ID"
                      value={formData.deviceId}
                      onChange={handleChange}
                      maxLength={10}
                      disabled={isPosting}
                    />
                    {errors.deviceId && <span className="Grievance-error">{errors.deviceId}</span>}
                  </div>

                  <div className="Grievance-form-group">
                    <label htmlFor="category" className="Grievance-label">
                      Grievance Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className={`Grievance-input Grievance-select ${errors.category ? 'input-error' : ''}`}
                      value={formData.category}
                      onChange={handleChange}
                      disabled={isPosting}
                    >
                      <option value="">Select a category</option>
                      {GR_CAT.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errors.category && <span className="Grievance-error">{errors.category}</span>}
                  </div>

                  <div className="Grievance-form-group">
                    <label htmlFor="complaint" className="Grievance-label">
                      Complaint
                    </label>
                    <textarea
                      id="complaint"
                      name="complaint"
                      className={`Grievance-input Grievance-textarea ${errors.complaint ? 'input-error' : ''}`}
                      placeholder="Describe your grievance here"
                      value={formData.complaint}
                      onChange={handleChange}
                      rows={6}
                      disabled={isPosting}
                    />
                    {errors.complaint && <span className="Grievance-error">{errors.complaint}</span>}
                  </div>

                  <div className="Grievance-form-group">
                    <label htmlFor="files" className="Grievance-label">
                      Upload files
                    </label>
                    <input
                      id="files"
                      name="files"
                      type="file"
                      className={`Grievance-input Grievance-file ${errors.files ? 'input-error' : ''}`}
                      accept="image/png,image/jpeg,.jpg,.jpeg,.png"
                      multiple
                      onChange={handleFileChange}
                      disabled={isPosting}
                    />
                    <span className="Grievance-helper">
                      You may upload up to 2 files only, in PNG or JPG format.
                    </span>
                    {errors.files && <span className="Grievance-error">{errors.files}</span>}
                  </div>

                  <div className="Grievance-form-actions">
                    <button
                      type="submit"
                      className="Grievance-submit-btn"
                      disabled={isPosting}
                    >
                      {isPosting ? 'Posting Grievance...' : 'Post Grievance'}
                    </button>
                  </div>

                  {isSubmitted && (
                    <div className="Grievance-success">
                      Your grievance has been submitted successfully.
                    </div>
                  )}
                </form>
              </div>

              <div className="Grievance-form-end">
                <SplitText
                  key="Grievance-form-ending"
                  text="Emergency complaints are escalated to our Crisis Response Team within 2 hours"
                  className="Grievance-form-end-text"
                  delay={30}
                  duration={1.05}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleGFEComplete}
                  showCallbacks={false}
                />
              </div>

              <div className="Grievance-footer">
                <div className="Grievance-footer-heading">
                  <SplitText
                    key="Grievance-footer-heading"
                    text="- Technical Support Team -"
                    className="Grievance-form-title"
                    delay={30}
                    duration={1.05}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 24 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="center"
                    onLetterAnimationComplete={handleGFEComplete}
                    showCallbacks={false}
                  />
                </div>

                <div className="Grievance-footer-grid">
                  <div className="Grievance-footer-card Grievance-footer-card-main">
                    {footerIntroItems.map((type, index) => (
                      <SplitText
                        key={`Grievance-footer-intro-${index}`}
                        text={type}
                        className={`Grievance-footer-content-text ${index === 0 ? 'Grievance-footer-content-text-intro' : ''}`}
                        delay={index * 100}
                        duration={1.2}
                        ease="power3.out"
                        splitType="words"
                        from={{ opacity: 0, y: 20 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="0px"
                        textAlign="left"
                        onLetterAnimationComplete={handleGFCComplete}
                        showCallbacks={false}
                      />
                    ))}
                  </div>

                  {footerSideItems.map((type, index) => (
                    <div
                      key={`Grievance-footer-side-${index}`}
                      className="Grievance-footer-card Grievance-footer-card-side"
                    >
                      <SplitText
                        key={`Grievance-footer-side-text-${index}`}
                        text={type}
                        className="Grievance-footer-content-text"
                        delay={(index + 2) * 100}
                        duration={1.2}
                        ease="power3.out"
                        splitType="words"
                        from={{ opacity: 0, y: 20 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="0px"
                        textAlign="left"
                        onLetterAnimationComplete={handleGFCComplete}
                        showCallbacks={false}
                      />
                    </div>
                  ))}

                  <div className="Grievance-footer-card Grievance-footer-card-wide">
                    <SplitText
                      key="Grievance-footer-wide-text"
                      text={footerLongItem}
                      className="Grievance-footer-content-text"
                      delay={500}
                      duration={1.2}
                      ease="power3.out"
                      splitType="words"
                      from={{ opacity: 0, y: 20 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="0px"
                      textAlign="left"
                      onLetterAnimationComplete={handleGFCComplete}
                      showCallbacks={false}
                    />
                  </div>
                </div>

                <div className="Grievance-footer-quote">
                  <SplitText
                    key="Grievance-footer-heading"
                    text="- Smarter Vehicles. Faster Care. Safer Lives. -"
                    className="Grievance-form-title"
                    delay={30}
                    duration={1.05}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 24 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="center"
                    onLetterAnimationComplete={handleGFEComplete}
                    showCallbacks={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Grievance