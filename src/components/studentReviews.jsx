import React, { useMemo, useRef, useState, useEffect } from "react";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import "./StudentReviews.css";

const reviews = [
  {
    name: "Soya",
    role: "React Native Developer",
    text: "At Jobzenter, I worked on a real-time project, which helped me secure a position as a React Native Developer in an MNC. The training was thorough and practical.",
    img: "/feed1.png",
  },
  {
    name: "Priya",
    role: "Fullstack Developer",
    text: "Jobzenter offers a friendly and practical environment that made learning enjoyable. The hands-on experience was invaluable in preparing me for the real world.",
    img: "/feed2.png",
  },
  {
    name: "Akash",
    role: "QA Engineer",
    text: "As a first-year student, I found Jobzenter for Software Testing and got real project exposure, improving my automation skills and employability.",
    img: "/feed3.png",
  },
  {
    name: "Deepak",
    role: "Backend Developer",
    text: "I worked with mentors having industry expertise. Learned advanced Node.js concepts and debugging practices through real-time case studies.",
    img: "/feed4.png",
  },
  {
    name: "Kiran",
    role: "Frontend Developer",
    text: "I was struggling with frontend frameworks before joining Jobzenter. Their step-by-step approach and project guidance made me interview-ready.",
    img: "/feed5.png",
  },
  {
    name: "Manisha",
    role: "Data Analyst",
    text: "Jobzenter’s Power BI course helped me land a data analytics role. The project-focused approach gave me strong visualization and DAX skills.",
    img: "/feed6.png",
  },
];

const StudentReviews = () => {
  const [index, setIndex] = useState(0);
  const cardsPerView = 2;
  const groups = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < reviews.length; i += cardsPerView) {
      chunks.push(reviews.slice(i, i + cardsPerView));
    }
    return chunks;
  }, []);
  const totalGroups = groups.length;
  const slideRefs = useRef([]);
  const [translateY, setTranslateY] = useState(0);
  const [viewHeight, setViewHeight] = useState(null);

  const nextReviews = () => {
    if (index + 1 < totalGroups) setIndex(index + 1);
  };

  const prevReviews = () => {
    if (index > 0) setIndex(index - 1);
  };

  useEffect(() => {
    const slide = slideRefs.current[index];
    if (slide) {
      setTranslateY(slide.offsetTop);
      setViewHeight(slide.offsetHeight);
    }
  }, [index]);

  useEffect(() => {
    const handleResize = () => {
      const slide = slideRefs.current[index];
      if (slide) {
        setTranslateY(slide.offsetTop);
        setViewHeight(slide.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [index]);

  return (
    <section className="student-reviews-section d-flex flex-column align-items-center bg-white">
      <div className="student-reviews-header text-center">
        <h2 className="student-reviews-title">What Our Students Says</h2>
        <p className="student-reviews-subtitle">
          Real stories from learners who transformed their careers with us.
        </p>
      </div>

      {index > 0 && (
        <button
          onClick={prevReviews}
          className="student-reviews-arrow student-reviews-arrow-up"
          aria-label="Show previous reviews"
        >
          <IoChevronUp />
        </button>
      )}

      <div className="student-reviews-view" style={{ height: viewHeight ?? "auto" }}>
        <div
          className="student-reviews-track"
          style={{ transform: `translateY(-${translateY}px)` }}
        >
          {groups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="student-reviews-slide"
              ref={(el) => (slideRefs.current[groupIndex] = el)}
            >
              {group.map((r, i) => (
                <div key={i} className="student-review-card">
                  <div className="student-review-surface ">
                    <div className="student-review-stars d-flex align-items-center">
                      {Array(5)
                        .fill()
                        .map((_, j) => (
                          <FaStar key={j} />
                        ))}
                    </div>

                    <p className="student-review-text">{r.text}</p>

                    <div className="student-review-footer">
                      <img
                        src={r.img}
                        alt={r.name}
                        className="student-review-avatar"
                      />

                      <div className="student-review-meta">
                        <h4 className="student-review-name">{r.name}</h4>
                        <p className="student-review-role">{r.role}</p>
                        <div className="student-review-actions">
                          <button
                            type="button"
                            className="student-review-action student-review-like"
                            aria-label="Like review"
                          >
                            <FaThumbsUp />
                          </button>
                          <button
                            type="button"
                            className="student-review-action student-review-dislike"
                            aria-label="Dislike review"
                          >
                            <FaThumbsDown />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {index + 1 < totalGroups && (
        <button
          onClick={nextReviews}
          className="student-reviews-arrow student-reviews-arrow-down"
          aria-label="Show next reviews"
        >
          <IoChevronDown />
        </button>
      )}
    </section>
  );
};

export default StudentReviews;
