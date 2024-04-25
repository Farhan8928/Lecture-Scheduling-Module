


# Online Lecture Scheduling Module

This is a lecture scheduling module designed to manage courses and lectures for instructors.

## Features

- Admin Panel:
  1. View list of all instructors.
  2. Add new courses with details such as name, level, description, and image.
  3. Assign multiple lectures (batches) to courses, specifying the date and time.
  4. Assign lectures to instructors on specific dates, ensuring no schedule clashes.

- Instructor Panel:
  1. View list of assigned lectures with dates and course names.

## Project Structure

### Frontend

The frontend of the application is structured as follows:

- `src/components/admin/`: Contains components related to the admin panel.
- `src/components/instructor/`: Contains components related to the instructor panel.
- `src/components/common/`: Contains common components shared across panels.
- `src/App.js`: Main component for routing.
- `src/index.js`: Entry point for the React application.

### Backend

The backend routes are organized as follows:

- `/routes/instructors.js`: Routes for managing instructors.
- `/routes/courses.js`: Routes for managing courses.
- `/routes/lectures.js`: Routes for managing lectures.
- `/routes/server.js`: Main file to mount all routes.

## Technologies Used

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Styling**: CSS

## Getting Started

To run the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd online-lecture-scheduling`
3. Install dependencies:
   ```bash
   # Navigate to frontend directory
   cd frontend
   npm install

   # Navigate to backend directory
   cd ../
   npm install
   ```
4. Set up the MongoDB database and connection URI.
5. Start the backend server:
   ```bash
   # Navigate to backend directory
   cd backend
   npm start
   ```
6. Start the frontend development server:
   ```bash
   # Navigate to frontend directory
   cd frontend
   npm start
   ```
7. Access the application at `http://localhost:3000`.

## License

This project is licensed under the [MIT License](LICENSE).

---

You can customize this README according to your project's specifics and add any additional sections or information as needed. If you have any questions or need further assistance, feel free to ask!