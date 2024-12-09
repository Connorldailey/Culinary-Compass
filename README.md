Culinary Compass

Culinary Compass is an intuitive application designed for food enthusiasts to explore, manage, and personalize their culinary journey. Users can search for recipes, categorize them as "Favorites" or "Try It," and access detailed instructions with the assistance of an AI-powered helper.

Features Overview

Account Management

User Sign-Up:

Users can sign up with a username, email, and password.

Credentials are securely stored in the user database.

Validation ensures strong passwords and prevents duplicate usernames or emails.

Successful sign-up redirects to a personalized home page.

Error messages are displayed for invalid inputs.

User Login:

Users can log in with valid credentials.

Successful login redirects to the home page.

Error messages notify users of incorrect credentials.

Session Management:

Users remain logged in for one hour or until logging out.

Logging out clears the session and redirects to the login screen.

Home Page and Navigation

Home Page:

Displays a navigation bar with options for Home, Favorites, and "Recipes to Try."

Includes recipe search functionality as the primary feature.

Navigation Bar:

Provides seamless access to all sections of the app.

Features a "Log Out" option to end sessions securely.

Recipe Search

Search Functionality:

Users can search for recipes by keywords (e.g., "Pasta").

Results include a thumbnail image, recipe title, and actions to add to categories or view details.

Search Validation:

Notifications are provided when no results are found, prompting new search terms.

Recipe Management

Recipes to Try:

Displays a list of user-added recipes to try.

Includes options to move recipes to Favorites, remove them, or view details.

Favorites:

Displays a list of user-favorited recipes.

Includes options to remove recipes or view details.

Add/Remove Recipes:

Users can add recipes to categories with confirmation messages.

Removing recipes updates the list immediately with confirmation.

Recipe Details

Detailed View:

Includes preparation instructions, an ingredients list, and an AI assistant.

Recipe Interaction:

Users can add recipes to "Favorites" or "Try It" with feedback notifications.

AI Assistant:

Responds to user queries about the recipe (e.g., substitutions).

General Usability

Feedback and Validation:

User actions provide real-time feedback through confirmation or error messages.

Responsive Design:

Optimized for desktop, tablet, and mobile devices.

API Endpoints

Authentication

POST /register: Register a new user account.

POST /login: Authenticate a user and return a session token.

Recipe Management

GET /api/user-recipes: Fetch all user recipes categorized as "Favorites" or "Try It" (requires authentication).

POST /api/user-recipes: Add a recipe to a user’s "Favorites" or "Try It" list (requires authentication).

PUT /api/user-recipes/:recipeId: Update the category of a user’s recipe.

DELETE /api/user-recipes/:recipeId: Remove a recipe from the user’s list (requires authentication).

Development Setup

Prerequisites

Node.js installed

MongoDB for the database

An .env file with the following:

JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection_string

Installation

Clone the repository:

git clone https://github.com/your-repo/culinary-compass.git
cd culinary-compass

Install dependencies:

npm install

Start the development server:

npm run dev

Testing with Insomnia

Import the provided API collection into Insomnia.

Use the /register and /login endpoints to create a session.

Test user-recipe endpoints with the token obtained during login.

Contributing

Contributions are welcome! Please open an issue or submit a pull request to suggest changes or report bugs.

License

This project is licensed under the MIT License.