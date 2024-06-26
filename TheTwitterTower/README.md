Your README provides a clear overview of TheTwitterTower application and its features. It includes detailed instructions on how to use the program, including the functionalities of each button in the JavaFX window.

Here's a revised version with minor improvements for clarity and readability:

---

# TheTwitterTower

TheTwitterTower is a JavaFX application designed to explore geometric concepts by calculating properties of square and triangular towers.

## Table of Contents

- [Features](#features)
- [Usage](#usage)

## Features

- **Square Tower**: Users can input the width and height of a square tower to calculate either its area or perimeter. The result depends on the difference between the width and height.
  
- **Triangular Tower**: Users can input the width and height of a triangular tower. They have the option to calculate its perimeter or print a triangle pattern made of stars.

## Usage

Upon launching the program, a JavaFX window displays with three buttons:

1. **Square Tower**:
   - Click the "Square Tower" button to calculate the characteristics of a square tower.
   - Enter the width and height when prompted.
   - The program will print either the area or perimeter of the square tower based on the input.

2. **Triangle Tower**:
   - Click the "Triangular Tower" button to work with triangular towers.
   - Enter the width and height in the dialog box.
   - A new JavaFX window opens with two options:
     - Calculate the perimeter of the triangle.
     - Print a triangular pattern made of stars.
   - Choose the desired option to proceed.

   Explanation of the triangle pattern:
   - Start with a row of one asterisk at the top.
   - Print multiple rows with three asterisks, the number determined by the modulo calculation of the height minus two for odd numbers.
   - Continue printing rows with a number of asterisks equal to the width minus two divided by the number of odd numbers until reaching the total width.
   - Finish with one row of asterisks.

3. **Exiting the Program**:
   - Click the "Exit" button to close the program.
   - Alternatively, use the window's close button (X) in the upper right corner.


