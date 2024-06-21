import React, { useState } from "react";

const InputField = ({ label, name, value, placeholder, onChange }) => (
  <div className=" mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 text-gray-700"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);
const skillsNum = [];
for (let i = 0; i < 4; i++) {
  skillsNum.push(i);
}

const expNum = [];
for (let i = 0; i < 1; i++) {
  expNum.push(i);
}

const languagesNum = [];
for (let i = 0; i < 1; i++) {
  languagesNum.push(i);
}

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const MonthDropdown = ({ label, name, value, onChange }) => (
  <div className="form-group mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 bg-white text-black"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Month</option>
      {months.map((month, index) => (
        <option key={index} value={month.value}>
          {month.label}
        </option>
      ))}
    </select>
  </div>
);

const currentYear = new Date().getFullYear();
const years = [];
for (let i = 1988; i <= currentYear; i++) {
  years.push(i);
}

const YearDropdown = ({ label, name, value, onChange }) => (
  <div className="form-group mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 bg-white text-black"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Year</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
);

const levels = [
  { value: 1, label: "Novice" },
  { value: 2, label: "Competent" },
  { value: 3, label: "Proficient" },
  { value: 4, label: "Expert" },
];

const LevelsDropdown = ({ label, name, value, onChange }) => (
  <div className="form-group mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 bg-white text-black"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Level</option>
      {levels.map((level, index) => (
        <option key={index} value={level.value}>
          {level.label}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, name, value, placeholder, onChange }) => (
  <div className="form-group mb-4">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full p-2.5 text-gray-700"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const ResumeMaker = () => {
  const initialUserData = {
    name: "",
    email: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  };

  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const [skillCounter, setSkillCount] = useState(4);

  const addSkill = (event) => {
    if (skillCounter < 12) {
      setSkillCount(skillCounter + 1);
      skillsNum.push(skillCounter);
    }
    event.preventDefault();
  };

  const removeSkill = (event) => {
    if (skillCounter > 4) {
      setSkillCount(skillCounter - 1);
      skillCounter.pop();
    }
    event.preventDefault();
  };

  const [expCounter, setExpCounter] = useState(1);

  const addExp = (event) => {
    if (expCounter < 3) {
      setExpCounter(expCounter + 1);
      expNum.push(expCounter);
    }
    event.preventDefault();
  };

  const removeExp = (event) => {
    if (expCounter > 1) {
      setExpCounter(expCounter - 1);
      expNum.pop();
    }
    event.preventDefault();
  };

  const [langCounter, setLangCounter] = useState(1);

  const addLanguage = (event) => {
    if (langCounter < 4) {
      setLangCounter(langCounter + 1);
      languagesNum.push(langCounter);
    }
    event.preventDefault();
  };

  const removeLanguage = (event) => {
    if (langCounter > 1) {
      setLangCounter(langCounter - 1);
      languagesNum.pop();
    }
    event.preventDefault();
  };

  const generateResumePreview = () => {
    const previewContent = (
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <h2 className="text-xl font-bold">{userData.name}</h2>
        <ul className="list-none mt-2 mb-4">
          <li>
            <a
              href={`mailto:${userData.email}`}
              className="text-blue-500 hover:underline"
            >
              {userData.email}
            </a>
          </li>
          <li>
            <a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={userData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
          </li>
        </ul>
        <h3 className="text-lg font-medium mb-2">Summary</h3>
        <p>{userData.summary}</p>
        <h3 className="text-lg font-medium mb-2">Experience</h3>
        <ul>
          {/* Replace with dynamic experience entries based on userData.experience */}
          <li>
            <div className="flex justify-between items-center mb-2">
              <span>Software Engineer (2020 - Present)</span>
              <span>Company Name</span>
            </div>
            <p>Brief description of responsibilities and achievements.</p>
          </li>
        </ul>
        <h3 className="text-lg font-medium mb-2">Education</h3>
        <ul>
          {/* Replace with dynamic education entries based on userData.education */}
          <li>
            <span>Bachelor of Science in Computer Science (2018)</span>
            <span>University Name</span>
          </li>
        </ul>
        <h3 className="text-lg font-medium mb-2">Skills</h3>
        <InputField
          label="Skills"
          name="skills"
          value={userData.skills}
          placeholder="Comma-separated list of skills"
          onChange={handleChange}
        />
      </div>
    );

    // Display the preview content dynamically (replace with your preferred method)
    console.log(previewContent); // For demonstration purposes
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="w-full md:w-1/2 bg-white rounded shadow-md p-4">
          <h1 className="text-xl font-bold mb-4">Enter Your Info</h1>
          <form className="space-y-4">
            <InputField
              label="Name"
              name="name"
              value={userData.name}
              placeholder="Enter your name"
              onChange={handleChange}
              autocomplete="Name"
            />
            <InputField
              label="Email"
              name="email"
              value={userData.email}
              placeholder="Enter your email address"
              onChange={handleChange}
              autocomplete="Email"
            />
            <InputField
              label="LinkedIn Profile URL"
              name="linkedin"
              value={userData.linkedin}
              placeholder="Enter your LinkedIn URL (optional)"
              onChange={handleChange}
            />
            <InputField
              label="GitHub Profile URL"
              name="github"
              value={userData.github}
              placeholder="Enter your GitHub URL (optional)"
              onChange={handleChange}
            />
            <TextAreaField
              label="Summary"
              name="summary"
              value={userData.summary}
              placeholder="Write a brief overview of yourself and your skills"
              onChange={handleChange}
            />
            <h1> Languages </h1>
            <div class="grid grid-cols-4 gap-4">
              {languagesNum.map((lang) => (
                <div>
                  <InputField
                    name={`lang${lang + 1}`}
                    placeholder="Language"
                    onChange={handleChange}
                    value={userData[`lang${lang + 1}`]}
                  />
                  <LevelsDropdown
                    name={`langLevel${lang + 1}`}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-row  justify-evenly">
              <button
                class="flex items-center justify-center w-12 h-12 <?php // Choose the desired option below ?> rounded-full hover:bg-slate-100"
                onClick={addLanguage}
              >
                <svg
                  class="w-6 h-6 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>

              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={removeLanguage}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
            </div>
            <h1> Skills </h1>
            <div class="grid grid-cols-4 gap-4">
              {skillsNum.map((skill) => (
                <InputField
                  placeholder={`Skill ${skill + 1}`}
                  name={`skill${skill + 1}`}
                  onChange={handleChange}
                  value={userData[`skill${skill + 1}`]}
                />
              ))}
            </div>
            <div className="flex flex-row  justify-evenly">
              <button
                class="flex items-center justify-center w-12 h-12 <?php // Choose the desired option below ?> rounded-full hover:bg-slate-100"
                onClick={addSkill}
              >
                <svg
                  class="w-6 h-6 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>

              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={removeSkill}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
            </div>
            <h1> Experiences </h1>
            {expNum.map((exp) => (
              <div>
                <div className="flex flex-row ">
                  <div class="flex-grow mb-4">
                    <InputField
                      label={`Title - experience ${exp + 1}`}
                      name={`expTitle${exp + 1}`}
                      value={userData[`expTitle${exp + 1}`]}
                      placeholder="Job Title"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="flex-grow mb-4 ml-1">
                    <InputField
                      label={`Workplace Name - experience ${exp + 1}`}
                      name={`expWorkplace${exp + 1}`}
                      value={userData[`expWorkplace${exp + 1}`]}
                      placeholder="Name of your place of work"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between ">
                  <YearDropdown
                    label="From Year"
                    name={`expStartYear${exp + 1}`}
                    value={userData[`expStartYear${exp + 1}`]}
                    onChange={handleChange}
                  />
                  <MonthDropdown
                    label="From Month"
                    name={`expStartMonth${exp + 1}`}
                    value={userData[`expStartMonth${exp + 1}`]}
                    onChange={handleChange}
                  />
                  <YearDropdown
                    label="To Tear"
                    name={`expEndYear${exp + 1}`}
                    value={userData[`expEndYear${exp + 1}`]}
                    onChange={handleChange}
                  />
                  <MonthDropdown
                    label="To Month"
                    name={`expEndMonth${exp + 1}`}
                    value={userData[`expEndMonth${exp + 1}`]}
                    onChange={handleChange}
                  />
                </div>
                <TextAreaField
                  label="Description"
                  name={`expDescription${exp + 1}`}
                  value={userData[`expDescription${exp + 1}`]}
                  placeholder="description of your place of work"
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="flex flex-row  justify-evenly">
              <button
                class="flex items-center justify-center w-12 h-12 <?php // Choose the desired option below ?> rounded-full hover:bg-slate-100"
                onClick={addExp}
              >
                <svg
                  class="w-6 h-6 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </button>

              <button
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-100"
                onClick={removeExp}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 bg-gray-50 rounded shadow-md p-4">
          <h1 className="text-xl font-bold mb-4">Resume Preview</h1>
          {/* Dynamically generated preview content */}
          {/* {previewContent} */}
        </div>
      </div>
    </div>
  );
};

export default ResumeMaker;
