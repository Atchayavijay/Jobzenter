import React, { useState } from "react";
import "./FaqSection.css";

const QA = [
  {
    q: "Will Jobzenter actually help me get a job? What does your placement support include?",
    a: "Yes—end-to-end support: resume & LinkedIn makeover, aptitude and communication prep, weekly mock interviews (HR/Technical), curated job alerts, referrals via partner/alumni network, interview scheduling, and 1:1 feedback until you convert. (No false 'guarantee'; outcomes depend on your performance, but we stay with you.)",
  },
  {
    q: "What real projects will I build that impress recruiters?",
    a: "Every track includes hands-on labs and a capstone (e.g., Selenium automation suite, AWS CI/CD pipeline, BI dashboards with DAX, Full-Stack CRUD with auth, React Native app). You'll push code to GitHub with a professional README and present impact metrics—ready for portfolio and interviews.",
  },
  {
    q: "Can I learn while studying/working? What if I miss a class?",
    a: "Yes—flexible batches (weekday/weekend/evening), backup classes, doubt-clearing support, and recordings for online/hybrid sessions ensure you never fall behind.",
  },
  {
    q: "Who are the trainers and how is the class conducted?",
    a: "Industry practitioners lead small cohorts with structured roadmaps, live coding, assignments, code reviews, and interview-style checkpoints. You get personal feedback and a clear weekly progression plan.",
  },
  {
    q: "What do I walk away with at the end of the program?",
    a: "A Jobzenter certificate, 1–2 showcase projects, a recruiter-ready resume/LinkedIn, mock-interview reports, a 90-day job-search playbook, and continued access to our alumni/job updates community.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq-section position-relative d-flex flex-column align-items-center">
      <h2 className="faq-title text-center">
        Frequently Ask Questions
      </h2>

      <div className="faq-row d-flex flex-wrap align-items-start justify-content-between">
        <div className="faq-list d-flex flex-column">
          {QA.map((item, index) => {
            const active = open === index;
            return (
              <div
                key={index}
                className={`faq-card bg-white ${active ? "active" : ""}`}
              >
                <div className="faq-toggle d-flex align-items-start">
                  <span className="faq-toggle-plus">+</span>
                  <span className="faq-question flex-grow-1">{item.q}</span>
                  <button
                    type="button"
                    onClick={() => setOpen(active ? null : index)}
                    className="faq-toggle-icon d-flex align-items-center justify-content-center"
                    aria-expanded={active}
                    aria-label={active ? "Collapse question" : "Expand question"}
                  >
                    <span className="faq-toggle-icon-inner">
                      {active ? "−" : "+"}
                    </span>
                  </button>
                </div>

                <div className={`faq-answer ${active ? "show" : ""}`}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-side d-flex flex-column align-items-center text-center">
          <div className="faq-blob position-relative d-flex align-items-center justify-content-center">
            <img
              src="/Vector 2.png"
              alt="outer blob"
              className="faq-blob-outline position-absolute"
            />
            <img
              src="/Vector 1.png"
              alt="blob"
              className="faq-blob-image position-absolute"
            />
            <img
              src="/questionmark.png"
              alt="question mark"
              className="faq-blob-icon position-relative"
            />
          </div>

          <h3 className="faq-side-title text-center">Any Question?</h3>
          <p className="faq-side-text text-center">
            You can ask anything you want to know Feedback
          </p>

          <div className="faq-input-group d-flex flex-column">
            <label className="faq-input-label">Let me know</label>
            <div className="faq-input-wrapper d-flex align-items-center">
              <input
                type="text"
                placeholder="Enter Here"
                className="faq-input"
              />
              <span className="faq-input-clear">×</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
