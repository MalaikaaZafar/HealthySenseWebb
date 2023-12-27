import React from "react";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faqScreen">
      <div className="faqBody">
        <div className="faqTitle">
          <h1>Frequently Asked Questions</h1>
        </div>
        <div className="faqContent">
          <div className="faqContentGroup">
            <h2>General Questions</h2>
            <div className="faqContentQuetion">
              <h3>1. What is HealthySense?</h3>
              <p>
                HealthySense is a comprehensive healthcare platform designed to
                simplify the process of finding and engaging with healthcare
                providers. It allows patients to book, cancel, reschedule
                appointments, and offers online consultations. For doctors, it
                provides a platform to enhance visibility, manage appointments,
                and conduct online video consultations.
              </p>
              <h3>2. How can I use HealthySense?</h3>
              <p>
                Patients can sign up and use the platform to search for doctors,
                book appointments, and access online consultations. Doctors can
                register, diagnose patients, manage consultations, and more. The
                platform caters to the needs of both patients and healthcare
                professionals.
              </p>
            </div>
          </div>
          <div className="faqContentGroup">
            <h2>User Panels</h2>
            <div className="faqContentQuetion">
              <h3>3. What features are available in the Admin Panel?</h3>
              <p>
                The Admin Panel allows administrators to manage doctors and
                patients, monitor activities, verify or ban doctors, and view
                essential statistics. It is the control center for overseeing
                the platform's operations.
              </p>
              <h3>4. How can doctors benefit from the Doctor Panel?</h3>
              <p>
                Doctors can register, give diagnoses, generate reports, update
                patient information, manage consultations, and conduct video
                consultations through the Doctor Panel. It provides tools for
                efficient practice management.
              </p>
              <h3>
                5. What functionalities are available in the Patient Panel?
              </h3>
              <p>
                Patients can view diagnoses, prescriptions, recommended tests,
                manage appointments, search for doctors, write reviews, and
                conduct video consultations. The Patient Panel caters to various
                healthcare needs.
              </p>
            </div>
          </div>
          <div className="faqContentGroup">
            <h2>Account Management</h2>
            <div className="faqContentQuetion">
              <h3>6. How can I register as a doctor or patient?</h3>
              <p>
                To register, click on the "Sign Up" button on the homepage,
                choose your role (doctor or patient), and follow the
                registration process. Provide the required information, and your
                account will be created.
              </p>
              <h3>7. Can I edit or update my account information?</h3>
              <p>
                Yes, both doctors and patients can manage their accounts by
                logging in and accessing the "Account Management" section. Here,
                you can edit, update, or delete your account information.
              </p>
            </div>
          </div>
          <div className="faqContentGroup">
            <h2>Appointments and Consultations</h2>
            <div className="faqContentQuetion">
              <h3>8. How do I schedule a new appointment?</h3>
              <p>
                Patients can schedule appointments by selecting the desired
                doctor, choosing an available time slot, and confirming the
                booking. Doctors can manage appointments through the Doctor
                Panel.
              </p>
              <h3>9. Can I cancel or reschedule an appointment?</h3>
              <p>
                Yes, both patients and doctors have the flexibility to cancel or
                reschedule appointments. Log in to your account, go to the
                "Appointments" section, and follow the prompts to make changes.
              </p>
            </div>
          </div>
          <div className="faqContentGroup">
            <h2>Appointments and Consultations</h2>
            <div className="faqContentQuetion">
              <h3>8. How do I schedule a new appointment?</h3>
              <p>
                Patients can schedule appointments by selecting the desired
                doctor, choosing an available time slot, and confirming the
                booking. Doctors can manage appointments through the Doctor
                Panel.
              </p>
              <h3>9. Can I cancel or reschedule an appointment?</h3>
              <p>
                Yes, both patients and doctors have the flexibility to cancel or
                reschedule appointments. Log in to your account, go to the
                "Appointments" section, and follow the prompts to make changes.
              </p>
            </div>
            <div className="faqContentGroup">
              <h2>Video Consultations</h2>
              <div className="faqContentQuetion">
                <h3>10. How do video consultations work?</h3>
                <p>
                  Video consultations are available for both doctors and
                  patients. Doctors can conduct consultations through the Doctor
                  Panel, and patients can join video sessions from the Patient
                  Panel. Ensure you have a stable internet connection for a
                  seamless experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
