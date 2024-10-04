import React, { useState, useEffect, useRef } from "react";
import "./Segmented.css";

const SegmentedControl = ({ segments, onSegmentChange }) => {
  const [selectedSegment, setSelectedSegment] = useState(segments[0].id);
  const [activeStyle, setActiveStyle] = useState({});
  const segmentRefs = useRef([]);

  useEffect(() => {
    const activeSegmentIndex = segments.findIndex(
      (segment) => segment.id === selectedSegment
    );
    if (segmentRefs.current[activeSegmentIndex]) {
      const activeSegment = segmentRefs.current[activeSegmentIndex];
      setActiveStyle({
        width: `${activeSegment.offsetWidth}px`,
        height: `${activeSegment.offsetHeight}px`,
        left: `${activeSegment.offsetLeft}px`,
      });
    }
  }, [selectedSegment, segments]);

  const handleSegmentChange = (id) => {
    setSelectedSegment(id);
    onSegmentChange(id);
  };
  return (
    <div className='segmented-control'>
      <div className='active-segment' style={activeStyle}></div>
      {segments.map((segment, index) => (
        <button
          key={segment.id}
          ref={(el) => (segmentRefs.current[index] = el)}
          onClick={() => handleSegmentChange(segment.id)}
          className={`segment ${
            selectedSegment === segment.id ? "active" : ""
          }`}>
          {segment.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
