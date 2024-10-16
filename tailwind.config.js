/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,handlebars}', // Adjust the path to your source files
    './public/**/*.html',               // Include public HTML files if applicable
    // Add any other specific paths that contain Tailwind styles
  ],
  theme: {
    extend: {}
  }
}