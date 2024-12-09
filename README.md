# Culinary Compass

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

Culinary Compass is a recipe management platform designed to inspire and empower food enthusiasts. By integrating the Spoonacular API, the application allows users to explore an extensive variety of recipes, categorize them into "Favorites" or "Try It" lists, and access detailed cooking instructions and ingredient breakdowns. The platform further enhances the culinary experience with an AI-powered assistant, leveraging the ChatGPT API to provide personalized insights, tips, and recommendations.

Featuring a sleek and intuitive interface, Culinary Compass simplifies the journey from discovery to execution. Users can create personalized accounts, search for recipes by keywords, and efficiently organize their culinary aspirations with seamless list management. The platform's responsive design and robust functionality ensure a consistent and delightful user experience across all devices.

Deployed on Render, Culinary Compass benefits from a modern and scalable infrastructure, offering reliable performance and effortless updates. Users can confidently explore, manage, and refine their cooking adventures with access to the latest features and improvements.

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To run the application in development mode, follow these steps: 

1. **Clone the repository:**

    `git clone git@github.com:Connorldailey/Culinary-Compass.git`

2. **Navigate to the project directory:**

    `cd Culinary-Compass`

3. **Install dependencies:**

    `npm install`

4. **Set up environment variables:**

    - Create a `.env` file in the `server` directory.
    - Use the `.env.example` file as a template, filling in the necessary values.
    - Ensure you have PostgreSQL installed locally and generate API keys for the Spoonacular and GitHub APIs.

5. **Build the application:**

    `npm run build`

6. **Seed the database:**

    `npm run seed`

7. **Launch application:**

    `npm run start:dev`

Once the application is running, you can log in using a pre-seeded user account or create a new account through the sign-up page.

## Usage

To use the application, visit the [live site](https://culinary-compass-8j0q.onrender.com).

### How to Get Started:

1. **Navigate the Site:**

    - Upon accessing the Culinary Compass application, you'll be greeted with a streamlined and responsive home page featuring a navigation bar at the top.
    - If you're a returning user, log in with your credentials to access your personalized recipe lists. New users can sign up via the "Sign Up" page to create an account.
    - Once logged in, the navigation bar provides quick links to explore "Favorites", "Try It" (recipes to try), and the search functionality.

2. **Explore Recipes:**

    - **Search for Recipes:**
        - Enter a keyword (e.g., "pasta," "chicken," or "dessert") in the search bar to discover recipes. Results include recipe titles, thumbnail images, and options for further actions.
        - Click on the "View Details" icon for a detailed view of a recipe, including step-by-step instructions, ingredients, preparation time, and servings.

    - **Manage Your Recipes:**
        - Save recipes to your "Favorites" or "Try It" lists using the corresponding action buttons. These lists are displayed on dedicated pages, accessible from the navigation bar.
        - From the "Favorites" or "Recipes to Try" pages, you can:
            - Remove recipes from your list.
            - Move recipes between categories.
            - Access detailed views to review preparation instructions and information.

    - **AI-Powered Assistance:**
        - On the recipe detail page, interact with an AI assistant to get tips, suggest ingredient substitutions, or ask questions about the recipe.

3. **Manage Your Account:**
    - Use the "Log Out" button in the navigation bar to securely end your session.
    - Return anytime to pick up where you left off, with all your recipes and lists saved to your account.

4. **Responsive Experience:**
    - Culinary Compass is designed to function seamlessly on desktop, tablet, and mobile devices, ensuring a user-friendly experience no matter where you are.

## Credits

This project was developed collaboratively by the following team members:

- **Connor Dailey**  
- **Chad Harris**  
- **De vona Canada**  
- **Luke Washington**  

We extend our gratitude to the following APIs and resources that powered this application:

- **[Spoonacular API](https://spoonacular.com/food-api):** For providing comprehensive recipe data and search capabilities.  
- **[GitHub API](https://platform.openai.com/docs/overview):** For enabling personalized AI assistant.  
- **[Coolors](https://coolors.co/):** For generating and maintaining the color palette used in the application.  
- **[Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/):** For providing a framework for responsive design and built-in icons.  
- **[Render](https://render.com/):** For hosting and deploying the application with ease and reliability.  

Thank you to all contributors and resources that supported this project!

## License

This project is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) for details. 

## Contributing

We welcome contributions to **Culinary Compass**! Whether you want to report a bug, suggest an improvement, or contribute directly to the codebase, your input is valuable and appreciated.

### How to Contribute

1. **Fork the Repository**  
   - Click the "Fork" button at the top right of the repository page to create your copy.

2. **Clone Your Forked Repository**  
    - Clone the repository to your local machine:  
        ```bash
        git clone https://github.com/your-username/Culinary-Compass.git
        cd Culinary-Compass
        ```

3. **Create a New Branch**  
    - Create a branch for your feature or fix:  
        ```bash
        git checkout -b feature/your-feature-name
        ```

4. **Make Your Changes**  
   - Implement your feature, fix bugs, or improve the project.  
   - Ensure your code follows the project's style guidelines.

5. **Test Your Changes**  
   - Thoroughly test your code to ensure it functions as expected without introducing new issues.

6. **Commit Your Changes**  
   - Write a clear and descriptive commit message:  
     ```bash
     git commit -m "Add a descriptive commit message"
     ```

7. **Push Your Changes**  
   - Push your changes to your forked repository:  
     ```bash
     git push origin feature/your-feature-name
     ```

8. **Submit a Pull Request**  
   - Navigate to the original repository and click "New Pull Request."  
   - Select your branch and provide a clear description of your changes.  
   - Wait for feedback or approval from the maintainers.

## Tests

This project does not currently include automated test coverage. However, rigorous **manual testing** was conducted to ensure functionality and deliver a seamless user experience across various devices and browsers. Below are the key areas covered during testing:

### API Testing
- **Tools Used**: [Insomnia](https://insomnia.rest/)  
- **Endpoints**: Verified the behavior and accuracy of all API routes, including user authentication, recipe search, and recipe management endpoints.  
- **Error Handling**: Ensured appropriate error messages and status codes are returned for invalid inputs or edge cases.

### User Interface Testing
- **Responsive Design**: Confirmed that all components adapt and function correctly on desktop, tablet, and mobile devices.  
- **Navigation**: Validated the functionality of the navbar, links, and redirects throughout the site.  
- **Dynamic Updates**: Tested dynamic updates such as adding/removing recipes from lists and real-time feedback for user actions.

### Authentication Testing
- **Login/Sign-Up**: Tested user sign-up and login workflows with valid and invalid credentials to ensure security and usability.  
- **Session Management**: Verified session persistence, expiration handling, and logout functionality.

### Recipe Management Testing
- **Search**: Validated recipe search functionality with various queries and ensured results display correctly.  
- **Categorization**: Tested adding recipes to "Favorites" and "Try It" lists and confirmed accurate updates to the database.  
- **Details View**: Confirmed that recipe details, including instructions and ingredients, are displayed accurately.

While automated testing may be considered in future development, the current manual testing approach has ensured the application meets the expected standards for functionality and user experience.

## Questions

If you have any questions about this project, feel free to reach out: 

- **GitHub:** [connorldailey](https://github.com/connorldailey)
- **Email:** connorldailey@gmail.com