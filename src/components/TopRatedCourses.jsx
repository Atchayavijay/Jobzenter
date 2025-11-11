
// export default TopRatedCourses;
import React, { useMemo, useRef, useState, useEffect } from "react";
import "./TopRatedCourses.css";

const TopRatedCourses = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [viewWidth, setViewWidth] = useState(null);
  const slideRefs = useRef([]);

  const courses = [
    {
      id: 1,
      title: "React Native Fullstack",
      description:
        "React Native Fullstack development combines React Native for mobile apps with Node.js, Express, and a database (like MongoDB or PostgreSQL) on the backend.",
      image: "/reactnative.png",
      stars: [
        "/star1i120-ds8j.svg",
        "/star2i120-c1xf.svg",
        "/star3i120-xnzh.svg",
        "/star4i120-py9o.svg",
        "/star5i120-mwov.svg",
      ],
      buttonStyle: { marginTop: "5px" },
    },
    {
      id: 2,
      title: "Software Testing",
      description:
        "Software Testing is the process of evaluating software to identify defects and ensure it meets the required quality standards.",
      image: "/software-testing.png",
      stars: [
        "/star1i120-8ujw.svg",
        "/star2i120-4u4.svg",
        "/star3i120-6vc.svg",
        "/star4i120-i28d.svg",
        "/star5i120-bani.svg",
      ],
      buttonStyle: { marginTop: "9px" },
    },
    {
      id: 3,
      title: "JAVA Fullstack Development",
      description:
        "Java Full Stack Development is the process of building complete web applications using both frontend (JavaScript) and backend (Java, Spring Boot) technologies.",
      image: "/fullstack development.png",
      stars: [
        "/star1i120-x4ds.svg",
        "/star2i120-1k3.svg",
        "/star3i120-bhyj.svg",
        "/star4i120-b5u.svg",
        "/star5i120-eouq.svg",
      ],
      buttonStyle: { marginTop: "-6px" },
    },
    {
      id: 4,
      title: "Business Intelligence",
      description:
        "Business Intelligence (BI) transforms raw data into meaningful insights to drive strategic business decisions. It helps organizations analyze trends, measure performance, and uncover growth opportunities.",
      image: "/Business.png",
      stars: [
        "/star1i120-ds8j.svg",
        "/star2i120-c1xf.svg",
        "/star3i120-xnzh.svg",
        "/star4i120-py9o.svg",
        "/star5i120-mwov.svg",
      ],
      buttonStyle: { marginTop: "-5px" },
    },
    {
      id: 5,
      title: "MERN Stack Development",
      description:
        "MERN Stack Development combines MongoDB, Express.js, React.js, and Node.js to build powerful full-stack web applications.",
      image: "/MERN.png",
      stars: [
        "/star1i120-8ujw.svg",
        "/star2i120-4u4.svg",
        "/star3i120-6vc.svg",
        "/star4i120-i28d.svg",
        "/star5i120-bani.svg",
      ],
      buttonStyle: { marginTop: "9px" },
    },
    {
      id: 6,
      title: "AWS",
      description:
        "AWS is a secure cloud platform offering computing power, database storage, and content delivery services on demand.",
      image: "/AWS.png",
      stars: [
        "/star1i120-x4ds.svg",
        "/star2i120-1k3.svg",
        "/star3i120-bhyj.svg",
        "/star4i120-b5u.svg",
        "/star5i120-eouq.svg",
      ],
      buttonStyle: { marginTop: "-6px" },
    },
  ];

  const cardsPerPage = 3;
  const groups = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < courses.length; i += cardsPerPage) {
      chunks.push(courses.slice(i, i + cardsPerPage));
    }
    return chunks;
  }, [courses]);
  const totalPages = groups.length;

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  useEffect(() => {
    const slide = slideRefs.current[currentPage];
    if (slide) {
      setTranslateX(slide.offsetLeft);
      setViewWidth(slide.offsetWidth);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      const slide = slideRefs.current[currentPage];
      if (slide) {
        setTranslateX(slide.offsetLeft);
        setViewWidth(slide.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage]);

  return (
    <section className="top-rated-section d-flex justify-content-center">
      <div className="top-rated-container position-relative">
        <div className="top-rated-header">
          <h2 className="top-rated-title">Top Rated Courses</h2>
          <p className="top-rated-subtitle">
            Explore the most trusted and highly reviewed courses loved by learners.
          </p>
        </div>

        <div className="top-rated-cards-view">
          <div
            className="top-rated-cards-track"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {groups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="top-rated-slide"
                ref={(el) => (slideRefs.current[groupIndex] = el)}
              >
                {group.map((course) => (
                  <div key={course.id} className="course-card position-relative">
                    <div className="course-card-image d-flex align-items-start justify-content-center">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="course-card-thumbnail img-fluid"
                      />
                    </div>
                    <div className="course-card-content">
                      <h3 className="course-card-title">{course.title}</h3>
                      <p className="course-card-description">{course.description}</p>
                      <div className="course-card-stars d-flex alignments-center">
                        {course.stars.map((star, starIndex) => (
                          <img key={starIndex} src={star} alt="star" />
                        ))}
                      </div>
                      <div className="course-card-button-wrapper d-flex justify-content-center">
                        <button className="course-card-btn" style={course.buttonStyle}>
                          Download Brochure
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="top-rated-controls d-flex alignments-center justify-content-center">
          <button
            onClick={handlePrevious}
            disabled={isFirstPage}
            aria-label="previous"
            className="top-rated-control-btn"
          >
            <img
              src="/weuiarrowfilledi120-6nd.svg"
              alt="left"
              className="top-rated-control-icon top-rated-control-icon-left"
            />
          </button>

          <div className="top-rated-dots d-flex align-items-center">
            {groups.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index)}
                className={`top-rated-dot ${index === currentPage ? "active" : ""}`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={isLastPage}
            aria-label="next"
            className="top-rated-control-btn"
          >
            <img
              src="/weuiarrowfilledi120-6nd.svg"
              alt="right"
              className="top-rated-control-icon"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedCourses;
