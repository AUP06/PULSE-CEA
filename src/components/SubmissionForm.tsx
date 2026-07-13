/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Eye, Cpu, Heart } from 'lucide-react';
import { DEFAULT_PULSE_CONFIG } from '../constants';
import { IdeaSubmission } from '../types';

interface SubmissionFormProps {
  onSuccess: (newSubmission: IdeaSubmission) => void;
}

export default function SubmissionForm({ onSuccess }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    semester: 'S3', // default to S3
    rollNumber: '',
    phoneNumber: '',
    email: '',
    ideaTitle: '',
    description: '',
    estimatedDuration: '30 mins',
    volunteersNeeded: '4',
    materialsRequired: '',
    whyIncluded: '',
    willHelpConduct: 'Yes'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [config, setConfig] = useState(DEFAULT_PULSE_CONFIG);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectSemester = (sem: string) => {
    setFormData((prev) => ({ ...prev, semester: sem }));
  };

  const handleSelectConduct = (choice: string) => {
    setFormData((prev) => ({ ...prev, willHelpConduct: choice }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.ideaTitle || !formData.description) {
      alert('Please fill out the required fields: Name, Idea Title, and Description.');
      return;
    }

    setIsSubmitting(true);

    // Programmatically submit the form to the hidden iframe to send the data to Google Forms
    if (formRef.current) {
      formRef.current.submit();
    }

    // Let the iframe submit trigger in the background
    // Since Google Forms doesn't support CORS response headers, the iframe onload is our success trigger.
    // We trigger the success callback after a short delay (e.g. 1 second) or when the iframe loads.
    setTimeout(() => {
      const uniqueId = `idea-${Date.now()}`;
      const newSubmission: IdeaSubmission = {
        id: uniqueId,
        fullName: formData.fullName,
        semester: formData.semester as any,
        rollNumber: formData.rollNumber,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        ideaTitle: formData.ideaTitle,
        description: formData.description,
        estimatedDuration: formData.estimatedDuration,
        volunteersNeeded: parseInt(formData.volunteersNeeded) || 0,
        materialsRequired: formData.materialsRequired,
        whyIncluded: formData.whyIncluded,
        willHelpConduct: formData.willHelpConduct as any,
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        likesCount: 1 // Start with 1 default self upvote
      };

      // Save to localStorage so they show in the live dashboard
      const existingIdeas = JSON.parse(localStorage.getItem('pulse_ideas') || '[]');
      localStorage.setItem('pulse_ideas', JSON.stringify([newSubmission, ...existingIdeas]));

      onSuccess(newSubmission);
      setIsSubmitting(false);

      // Reset form but keep name/semester for quick future entries
      setFormData((prev) => ({
        ...prev,
        ideaTitle: '',
        description: '',
        materialsRequired: '',
        whyIncluded: '',
        volunteersNeeded: '4',
        estimatedDuration: '30 mins'
      }));
    }, 1500);
  };

  return (
    <section
      id="submit-idea"
      className="relative py-24 px-6 bg-[#030303] border-t border-white/5 overflow-hidden"
    >
      {/* Dynamic ambient meshes */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-orange/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Embedded hidden iframe for Google Forms submit redirect bypass */}
      <iframe
        name="google_form_iframe"
        id="google_form_iframe"
        ref={iframeRef}
        style={{ display: 'none' }}
        title="Google Form Target"
      />

      <div className="max-w-4xl mx-auto">
        
        {/* Header Title */}
        <div className="max-w-2xl mx-auto text-center mb-16 flex flex-col items-center">
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange text-xs font-mono uppercase tracking-widest mb-4 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span>SUBMISSION INTERFACE</span>
          </motion.div>
          
          <motion.h2
            className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-white mb-6 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Propose Your Orientation Idea
          </motion.h2>
          
          <motion.p
            className="text-white/55 font-light text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Fill out the form below. Your concept will be saved directly into PULSE CEA's official Google Sheets and displayed in our local interactive timeline.
          </motion.p>
        </div>

        {/* Premium Form Container */}
        <motion.div
          className="glass-panel p-6 sm:p-10 md:p-12 rounded-[24px] border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Shimmer background when loading */}
          {isSubmitting && <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-20 flex flex-col items-center justify-center">
            <div className="relative w-20 h-20 flex items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-brand-orange/20 border-t-brand-orange animate-spin" />
              <Cpu className="w-8 h-8 text-brand-orange animate-pulse" />
            </div>
            <p className="text-white font-bold text-lg tracking-tight">Transmitting Proposal...</p>
            <p className="text-white/40 text-xs mt-1">Uploading secure data payloads to Google Forms</p>
          </div>}

          {/* Real Form submitting to Google Form Action */}
          <form
            ref={formRef}
            action={config.googleFormUrl}
            method="POST"
            target="google_form_iframe"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            
            {/* Step Section 1: Contributor Metadata */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono font-bold">1</span>
                <h3 className="font-bold text-white text-lg">Contributor Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider flex items-center gap-1">
                    <span>Full Name *</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    name="fullName"
                    placeholder="Enter your official name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  {/* Google Forms mapping input */}
                  <input type="hidden" name={config.googleFormFields.fullName} value={formData.fullName} />
                </div>

                {/* Roll Number field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="rollNumber" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Roll Number (Optional)
                  </label>
                  <input
                    id="rollNumber"
                    type="text"
                    name="rollNumber"
                    placeholder="e.g. CEA24CS048"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <input type="hidden" name={config.googleFormFields.rollNumber} value={formData.rollNumber} />
                </div>

                {/* Phone Number field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phoneNumber" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    placeholder="e.g. +91 9845******"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <input type="hidden" name={config.googleFormFields.phoneNumber} value={formData.phoneNumber} />
                </div>

                {/* Email address field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Email Address (Optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="e.g. name@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <input type="hidden" name={config.googleFormFields.email} value={formData.email} />
                </div>

              </div>

              {/* Semester Select Group */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider mb-1">
                  Current Semester *
                </span>
                <div className="grid grid-cols-4 gap-3">
                  {['S1', 'S3', 'S5', 'S7'].map((sem) => {
                    const isSelected = formData.semester === sem;
                    return (
                      <button
                        key={sem}
                        id={`sem-btn-${sem}`}
                        type="button"
                        onClick={() => handleSelectSemester(sem)}
                        className={`py-3 rounded-xl text-sm font-bold border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-brand-orange to-brand-amber border-transparent text-black shadow-lg shadow-brand-orange/20'
                            : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {sem}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name={config.googleFormFields.semester} value={formData.semester} />
              </div>
            </div>

            {/* Step Section 2: Idea Content */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono font-bold">2</span>
                <h3 className="font-bold text-white text-lg">Event Mechanics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Idea Title */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="ideaTitle" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Idea Title *
                  </label>
                  <input
                    id="ideaTitle"
                    type="text"
                    required
                    name="ideaTitle"
                    placeholder="Provide a short, punchy, memorable title"
                    value={formData.ideaTitle}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <input type="hidden" name={config.googleFormFields.ideaTitle} value={formData.ideaTitle} />
                </div>

                {/* Idea Description */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="description" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Describe Your Idea *
                  </label>
                  <textarea
                    id="description"
                    required
                    name="description"
                    rows={5}
                    placeholder="Step-by-step description of how the game/activity operates, rules, and student involvement..."
                    value={formData.description}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <input type="hidden" name={config.googleFormFields.description} value={formData.description} />
                </div>

              </div>
            </div>

            {/* Step Section 3: Logistics & Why */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono font-bold">3</span>
                <h3 className="font-bold text-white text-lg">Logistics & Convincing</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Estimated Duration */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="estimatedDuration" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Estimated Duration *
                  </label>
                  <input
                    id="estimatedDuration"
                    type="text"
                    required
                    name="estimatedDuration"
                    placeholder="e.g. 20-30 mins"
                    value={formData.estimatedDuration}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <input type="hidden" name={config.googleFormFields.estimatedDuration} value={formData.estimatedDuration} />
                </div>

                {/* Volunteers Needed */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="volunteersNeeded" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Volunteers Needed *
                  </label>
                  <input
                    id="volunteersNeeded"
                    type="number"
                    required
                    min="0"
                    name="volunteersNeeded"
                    placeholder="Number of senior coordinators"
                    value={formData.volunteersNeeded}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <input type="hidden" name={config.googleFormFields.volunteersNeeded} value={formData.volunteersNeeded} />
                </div>

                {/* Materials Required */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="materialsRequired" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Materials Required (Optional)
                  </label>
                  <input
                    id="materialsRequired"
                    type="text"
                    name="materialsRequired"
                    placeholder="e.g. Projector, mic, cards, sticky tapes, charts"
                    value={formData.materialsRequired}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <input type="hidden" name={config.googleFormFields.materialsRequired} value={formData.materialsRequired} />
                </div>

                {/* Why Should This Activity Be Included? */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="whyIncluded" className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Why should this activity be included? *
                  </label>
                  <textarea
                    id="whyIncluded"
                    required
                    name="whyIncluded"
                    rows={3}
                    placeholder="Explain the impact of this event: e.g. breaks the ice, drives teamwork, showcases creative intelligence..."
                    value={formData.whyIncluded}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <input type="hidden" name={config.googleFormFields.whyIncluded} value={formData.whyIncluded} />
                </div>

                {/* Will you help conduct it? */}
                <div className="flex flex-col gap-3 md:col-span-2">
                  <span className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                    Would you like to help conduct it? *
                  </span>
                  <div className="flex gap-4">
                    {['Yes', 'No'].map((choice) => {
                      const isSelected = formData.willHelpConduct === choice;
                      return (
                        <button
                          key={choice}
                          id={`conduct-btn-${choice}`}
                          type="button"
                          onClick={() => handleSelectConduct(choice)}
                          className={`px-6 py-3 rounded-xl text-sm font-bold border transition-all duration-300 cursor-pointer w-28 ${
                            isSelected
                              ? 'bg-gradient-to-r from-brand-orange to-brand-amber border-transparent text-black shadow-lg shadow-brand-orange/20'
                              : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                  <input type="hidden" name={config.googleFormFields.willHelpConduct} value={formData.willHelpConduct} />
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
              <button
                id="submit-proposal-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber font-bold text-black uppercase tracking-widest shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:scale-[1.01] transition-all duration-300 cursor-pointer disabled:opacity-50 text-sm"
              >
                <span>Submit Idea to Hub</span>
                <Send className="w-5 h-5" />
              </button>
            </div>

          </form>

          {/* Hidden iframe to intercept Google Form redirect and prevent reload/tab block */}
          <iframe
            ref={iframeRef}
            name="google_form_iframe"
            id="google_form_iframe"
            style={{ display: 'none' }}
            title="Google Form Submission Receiver"
          />
        </motion.div>

      </div>
    </section>
  );
}
