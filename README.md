Description
This is a dynamic web application built using Next.js that simulates a personalized user dashboard. It focuses on displaying posts and comments based on the logged-in user’s data fetched from the JSONPlaceholder API. Tailwind CSS is used for responsive design and clean UI structure.
________________________________________
Tech Stack & Dependencies
This project is developed with the following modern tools and libraries:
Tool/Library	Purpose
Next.js	App framework (routing, SSR, etc.)
Tailwind CSS	Styling and layout
React Hooks	State management and lifecycle
JSONPlaceholder	API for mock user/posts/comments data
Vercel	Deployment platform
GitHub	Source control and collaboration
________________________________________
Key Functionalities
User Authentication (Client-Side)
•	Uses localStorage to check login state
•	Redirects to /login if no session exists
Post & Comment Display
•	Retrieves posts authored by the logged-in user
•	Filters and displays comments related to each post
•	Automatically resolves commenter and post author usernames using user data
Dynamic Data Handling
•	Fetches three APIs in parallel for performance:
o	/posts?userId={id} — user posts
o	/comments — all comments
o	/users — all user info for name/email mapping
Responsive UI
•	Clean layout using Tailwind
•	Dynamic rendering based on data presence (e.g., “No posts yet”)
Scroll to Top
•	One-click button to navigate smoothly back to the top of the page
________________________________________
Setup Instructions
1.	Clone the Repository
2.	git clone https://github.com/jan101199/app-dev.git
3.	cd mypostpage-app
4.	Install Dependencies
5.	npm install
6.	Run Development Server
7.	npm run dev
8.	Access App
Navigate to http://localhost:3000 in your browser.
________________________________________
Sample Login Info
This app expects a user object saved in localStorage. Here’s how to simulate that:
Open DevTools → Console → Paste:
localStorage.setItem('user', JSON.stringify({
  id: 1,
  name: 'Leanne Graham',
  email: 'Sincere@april.biz'
}));
Then refresh the app.
________________________________________
Deployment
This app can be deployed to any Vercel-compatible platform.
vercel
URL after deployment:
app-dev-peach.vercel.app

________________________________________
Group Responsibilities

Member	Task Assignment


Mariane Vhonn Cielo Calacday - Setup, Github, VS Code, edit video presentation and voice over

Steven Jan Estremera - Fetch API integration

Mark Lester Jazo - UI design with Tailwind and voice over

Angelo Alvarez - Post/comment rendering and filtering
________________________________________

