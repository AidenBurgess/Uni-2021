# Deepening Rationale and Insight - abur970

You need to demonstrate your awakened insight: 

- Why was this paper useful? 
- What from it will be valuable that your client would appreciate you understanding and being aware of? 
- Was there anything you found in the paper that surprised you? 
- Any new learning that will inform how you might tackle your project? 
- How has it shaped your perspective on the project? 
- From reading this paper, what questions have you come up that you would like to ask the client about the project’s rationale?

Paper: [Mateos, Veronica & Gallardo, Alberto & Richter, Thomas & Bellido, Luis & Debicki, Peter & Villagra, Victor. (2011). LiLa Booking System: Architecture and Conceptual Model of a Rig Booking System for On-Line Laboratories. iJOE. 7. 26-35. 10.3991/ijoe.v7i4.1837. ](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.1017.7016&rep=rep1&type=pdf)

"scarce and expensive" resource sharing should be optimised. A "booking system helps administer access to them"

What is this paper?

"This paper reports on the architecture and conceptual model of the [LiLa] booking system". "The design of the system is based on a requirements analysis". LiLa stands for "Library of Labs", and facilitates virtual and remote experiments for online students. Students can interact with LiLa with just a web browser. "Challenge of controlling access [to limited resources] to avoid conflicts and to maximise their availability"

LiLa is built around 3 different portal user roles: content providers, teachers, and students. 5 Elements: experiments, rigs, reservation for teachers, reservation for students, and tickets.

No need for a central admin with separation of roles and Shibboleth (authentication and authorization mechanism). 



"Several experiments can operate on the same rig (same as our system). An experiment cannot be run on  more than one rig (same as ours too) as they didn't want to increase the overall complexity of the system unnecessarily."



User's responsibility to name the rigs, and keep them meaningful and avoid collisions.



ROLES

"Content providers act as vendors who provide their services.

Teachers act as representatives for the vendors

Students act as customers"

"Content providers do not need to care about the fine-grained time-slots distribution among students"

"Students are user of LiLa experiments. ... To run an experiment that requires booking, a student must have a named account"

Which of these roles can I translate into our use case (super admin, admin, end user)? I think in our system there is no need for a teacher role, as we don't want as much restriction as LiLa.



To manage bookings, tickets are used. A student receives a ticket when they enter a valid reservation code. Once received, they can view the list of time slots which the rig is still available for use. When the student selects a time slot, the system creates a stamped ticket for the student. Stamped tickets grant students access to rigs in the time slot selected by the student. (Can see some user flow figure). The ticket is only valid for one time slot at a time, and is only allowed to be reused after performing the experiment.



In our use case we kinda have permanent tickets where end users are always granted access to see a specific resource.



TECHNICAL PERSPECTIVE

It seems like they decided to follow many existing methods such as SCORM and IEEE 1484.11.2 - 2003 Standard for Learning Technology (some specification for ECMAScript)

ACCESS CONTROL

"LiLa  embeds a JavaScript code fragment to every uploaded  experiment that requires the booking system."

This code fragment "is responsible for checking  against a RESTful server that the user of an  experiment has a valid stamped ticket and that she is  accessing the experiment at her reserved time-slot. If this  is not the case, the code will render an informative  message and will redirect the user to an interface (hosted  in LiLa) to allow her making a new reservation"

Why did they use this client-side access control fragment?

Compatibility: Their experiments can be exported from LiLa into other systems, while still having access control.

However there is a downside: "Students with appropriate programming skills could locally edit the JavaScript code to their advantage and overpass the access control."

This downside can be overlooked as LiLa is a tool to help administer rigs availability, and that level of rubustness is not in scope for LiLa. (In our project we probably need better access control than this.) They also had to adhere to the requirement of sticking to "interfaces guaranteed by SCORM and these are based on client-side execution of JavaScript."

Furthermore, we could also enforce ticket checking on the server side anyway, as has been done before with WebLabs (University of Cambridge).

This method also restricts execution to Javascript devices, which is also a SCORM restriction, so no real restriction there.



Shibboleth is a federative infrastructure for web sign-on that allows sites to make informed authorization decisions for individual access of protected online resources in a privacy-preserving manner.



BOOKING SYSTEM

"The LiLa Booking System is implemented as a client-server solution." "The server is a Web application. [sic] It implements a RESTful API."

"The server persists all reservations-related data in a  database. The persisted data include information about the  rigs, time-slots reserved and a codified user unique  identifier (to preserve user privacy)."



SCENARIOS

Activity diagram available for "making a rig available and using it."

How a content provider makes a rig available for teachers. 

- Add a new rig object
- Update booking system to allow this rig to be booked
- \# Instances of this rig
- \# users per instance of the rig (typically 1)

How a teacher allocates resources for her students

- Not too relevant as we don't have this concept of assigning or giving students access to experiments
- Looks like the reservation slots are managed with a calendar interface (Fig. 12)

How a student accesses a schedule-controlled rig

- Teacher gives URL and booking code
