# Deepening Rationale and Insight - abur970

Paper: [Mateos, Veronica & Gallardo, Alberto & Richter, Thomas & Bellido, Luis & Debicki, Peter & Villagra, Victor. (2011). LiLa Booking System: Architecture and Conceptual Model of a Rig Booking System for On-Line Laboratories. iJOE. 7. 26-35. 10.3991/ijoe.v7i4.1837. ](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.1017.7016&rep=rep1&type=pdf)

## Introduction to LiLa System

I decided to review the research paper titled *LiLa Booking System: Architecture and Conceptual Model of a Rig Booking System for On-Line Laboratories*. The "Library of Labs" (LiLa) booking system is a system that manages the reservations for "scarce and expensive resources" for rigs in laboratories. A rig is some physical hardware that is controlled remotely via these reservations. An example of a rig would be a robot.

The paper focuses on the design and architecture of LiLa, as well as the users and their interactions. Teachers can administer experiments for students, which allows the students to book a time slot to interact with rigs. Students can interact with LiLa through the LiLa Portal through a Web browser. The authors also identify challenges with "controlling access to [rigs] to avoid conflicts and to maximise their availability."

## Why was this paper useful? 

This paper gave me greater insight into the rationale of my project. Before reading this paper, I had not thought deeply about the rationale of this project. I understood that a booking and user management system would be helpful to an administrator, but I couldn't visualise the bigger picture. The abstract of this paper clearly provides insight into why their system was needed, and therefore provided me with understanding as well. Some sort of booking system is crucial in optimising the use of limited and costly resources. That system allows the resources to be shared, increasing the utilisation of the resources, making the most out of what is available to help students and staff learn and research their areas of expertise.

This paper elaborates on the roles of the users of a booking system. It identifiers content providers, teachers, and students as the users of the application. This is in contrast to our system, whose stakeholders are the super-admins, admins, and end-users, which could be students or staff. These stakeholders must be identified as their values determine how helpful any service will be for them. A critical difference between our client's system and LiLa's user role is that there is not a concept of a teacher in our system. Instead, the resources are freely available, and the admin role is a restricted version of the super-admin role.

It also gives a solid technical example of how a booking system can be implemented for resources. It includes many helpful UML diagrams, such as sequence diagrams, activity diagrams, and class diagrams.

## What from it will be valuable that your client would appreciate you understanding and being aware of? 

I think my client will appreciate that there are security concerns around access and privacy that need to be examined. We should be helping our users while simultaneously respecting their privacy. I also can relate more to our client - who acts as the admin - and their needs from the system, rather than only focusing on the end-users (academic staff and students). They would also appreciate that I understand some of the potential ways users interact with existing solutions and the flows of different scenarios, such as adding a new resource.

## Was there anything you found in the paper that surprised you? 

The goal of LiLa was not just to produce a booking system but that the booking system had to be compatible with other methods to increase its reach and impact. I was surprised at the complexity and scope of the system and the interconnectivity between the resources and the various users of the system. It was also surprising that access control was mandated from the client-side, resulting in less security.

## Any new learning that will inform how you might tackle your project? 

Even in a complicated system such as LiLa, they still have some point where they trust the user's to do what they believe is correct. They provide flexibility instead of enforcing a rigid structure. For example, they trust the users to name the resources with meaningful names and prevent naming conflicts.

## How has it shaped your perspective on the project? 

My personal discovery of the deeper rationale of the project reframes my perspective from potential solutions being used as a convenience to possible solutions improving the valued use of hardware for the purpose of academic research.

This paper has shifted my focus from the need to satisfy not just the end-user but also the super admins and admins for my project. It doesn't just focus on the end users' (students) perspective but equally on the experience of the content providers and teachers.

## From reading this paper, what questions have you come up that you would like to ask the client about the project's rationale?

I want to ask my client whether they think there is value in sharing this booking system or making it compatible with other systems. In the paper, they mention that the amount of security needed depends on the requirements, and for their use case, they didn't require strict access control to the reservations. Therefore, it would be essential to ask my client how much the super-admins, admins, and end-users value this security for any potential solutions.
