Techsy E-Commerce Website
Techsy is a responsive and feature-rich e-commerce platform that simplifies online shopping with an intuitive design, seamless navigation, and modern technology integration.
Project Setup Instructions
Prerequisites
•	Node.js (v16 or higher recommended)
•	npm  for package management
•	Git for version control
•	
Steps to Setup the Project Locally
1.	Clone the Repository
git clone https://github.com/RavinduLakshitha/Techsy.git
2.	Navigate to the Project Directory
cd techsy-ecommerce
3.	Install Dependencies Run the following command to install the required packages:
npm install
4.	Start the Development Server Launch the project in your local environment:
npm start
The application will be available at http://localhost:3000.

Build for Production
npm run build

Known Issues and Limitations
1.	Limited Backend Integration:
o	Currently, the project operates with mock data for products and orders. Backend APIs are yet to be fully integrated.
2.	State Persistence:
o	Redux store does not persist between page reloads. Implementing a solution like redux-persist is under consideration.
3.	Toast Notifications:
o	Notifications may stack excessively when triggered in quick succession. Limiting the maximum number of concurrent toasts is planned.
4.	
Limitations
1.	Payment Processing:
o	Payment gateway integration (e.g., Stripe, PayPal) is not yet implemented, limiting order finalization to a demo workflow.
2.	Mobile Responsiveness:
o	While the site is generally mobile-friendly, certain pages (e.g., Order Summary) may require additional layout adjustments for smaller screens.
3.	Admin Panel:
o	The project does not currently include administrative functionality for managing products or orders.
4.	Authentication:
o	User authentication and account management features are not available. These are planned for future updates.
5.	The Orders page is designed to display user orders, including details such as total price and individual items. However, due to the lack of    backend API integration, this functionality is currently limited.

Screenshots
https://drive.google.com/drive/folders/1P6UIp3CAwI8F5xT1RSkJVBSy8VElEchc?usp=sharing



