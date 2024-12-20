import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../Styles/SemesterSubjects.css';
import Dashboard from './Dashboard'; // Import Dashboard component

// Importing subject images for all semesters
import chemistryImage from '../Assets/chemistry.jpg';
import mathImage from '../Assets/math.jpg';
import pythonImage from '../Assets/python.jpg';
import caedImage from '../Assets/caed.jpg';
import electricalImage from '../Assets/electrical.jpg';
import mechanicalImage from '../Assets/mechanical.jpg';

import renewableResourceImage from '../Assets/Renewable.webp';
import cProgrammingImage from '../Assets/cProgramming.png';
import physicsForCSImage from '../Assets/physicsForCS.jpg';
import mathCSStream2Image from '../Assets/mathCSStream2.jpg';
import electronicsImage from '../Assets/electronics.jpg';

import dataStructuresImage from '../Assets/dataStructures.jpg';
import operatingSystemImage from '../Assets/operatingSystem.jpg';
import javaImage from '../Assets/java.jpg';
import mathCSImage from '../Assets/mathCS.jpg';
import digitalDesignImage from '../Assets/digitalDesign.jpg';

import humanValuesImage from '../Assets/humanValues.jpg';
import algoDesignImage from '../Assets/algoLab.jpg';
import advancedJavaImage from '../Assets/advancedJava.jpg';
import dbmsImage from '../Assets/dbms.jpg';
import graphTheoryImage from '../Assets/graphTheory.webp';
import biologyForEngineersImage from '../Assets/biologyForEngineers.webp';

import softwareEngineeringImage from '../Assets/softwareEngineering.jpg';
import networksImage from '../Assets/cn.jpg';
import theoryOfComputationImage from '../Assets/toc.jpeg';
import cloudComputingImage from '../Assets/cc.jpg';
import aiImage from '../Assets/ai.jpg';
import distributedSystemsImage from '../Assets/distributedSystems.jpg';
import unixProgrammingImage from '../Assets/unix.jpg';
import researchIPRImage from '../Assets/researchIPR.jpg';

// Subject data for all semesters
const subjectsData = {
  1: [
    { id: 'chemistry', name: 'Chemistry', image: chemistryImage },
    { id: 'math_cs_stream_1', name: 'Mathematics for CS Stream-I', image: mathImage },
    { id: 'python', name: 'Introduction to Python', image: pythonImage },
    { id: 'caed', name: 'Computer-Aided Engineering Drawing', image: caedImage },
    { id: 'electrical', name: 'Electrical Engineering', image: electricalImage },
    { id: 'mechanical', name: 'Mechanical Engineering', image: mechanicalImage },
  ],
  2: [
    { id: 'renewable_resourse', name: 'Renewable Resourse', image: renewableResourceImage },
    { id: 'c_programming', name: 'Principles of Programming using C', image: cProgrammingImage },
    { id: 'physics_for_CS', name: 'Physics for CS', image: physicsForCSImage },
    { id: 'math_CS_stream_2', name: 'Mathematics for CS Stream-II', image: mathCSStream2Image },
    { id: 'electronics', name: 'Introduction to Electronics', image: electronicsImage },
  ],
  3: [
    { id: 'data_structures', name: 'Data Structures and Applications', image: dataStructuresImage },
    { id: 'operating_system', name: 'Operating System', image: operatingSystemImage },
    { id: 'object_oriented_programming', name: 'Object-Oriented Programming with Java', image: javaImage },
    { id: 'math_CS', name: 'Mathematics for CS', image: mathCSImage },
    { id: 'digital_design', name: 'Digital Design & Computer Organization', image: digitalDesignImage },
  ],
  4: [
    { id: 'human_values', name: 'Universal Human Values Course', image: humanValuesImage },
    { id: 'algo_design', name: 'Analysis and Design of Algorithms', image: algoDesignImage },
    { id: 'advanced_java', name: 'Advanced Java', image: advancedJavaImage },
    { id: 'dbms', name: 'Database Management Systems', image: dbmsImage },
    { id: 'graph_theory', name: 'Graph Theory', image: graphTheoryImage },
    { id: 'biology_for_engineers', name: 'Biology for Engineers', image: biologyForEngineersImage },
  ],
  5: [
    { id: 'software_engineering', name: 'Software Engineering and Project Management', image: softwareEngineeringImage },
    { id: 'computer_networks', name: 'Computer Networks', image: networksImage },
    { id: 'theory_of_computation', name: 'Theory of Computation', image: theoryOfComputationImage },
    { id: 'cloud_computing', name: 'Cloud Computing', image: cloudComputingImage },
    { id: 'artificial_intelligence', name: 'Artificial Intelligence', image: aiImage },
    { id: 'distributed_systems', name: 'Distributed Systems', image: distributedSystemsImage },
    { id: 'unix_system_programming', name: 'UNIX System Programming', image: unixProgrammingImage },
    { id: 'research_ipr', name: 'Research Methodology and IPR', image: researchIPRImage },
  ],
};

const SemesterSubjects = () => {
  const { year, semesterId } = useParams(); // Get year and semesterId from URL parameters

  // Check if subjects data exists for the current semester
  const subjects = subjectsData[semesterId] || [];
  console.log("Year:", year, "Semester ID:", semesterId);

  return (
    <div className="semester-subjects">
      <Dashboard /> {/* Add the Dashboard button here */}
      <h1>{`Subjects for Semester ${semesterId}`}</h1>
      <div className="subjects-list">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            to={`/year/${year}/semester/${semesterId}/subject/${subject.id}`} // Navigate to the respective subject page
            className="subject-item"
          >
            <img src={subject.image} alt={subject.name} className="subject-image" />
            <span>{subject.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SemesterSubjects;
