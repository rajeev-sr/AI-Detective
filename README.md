# 🕵️‍♂️ AI vs Human Detective Challenge
### CSP-Based Investigation System with Competitive AI

**Course**: CSL304 - Artificial Intelligence  
**Project Type**: AI Detective Game with CSP & Search Algorithms  

### 👥 Team Members
| Name | Roll Number | Email |
|------|-------------|-------|
| Rajeev Kumar | 12341700 | rajeevk@iitbhilai.ac.in |
| Rahul Raj | 12341680 | rahulr@iitbhilai.ac.in |
| Aditya P. Rehpade | 12340120 | adityapr@iitbhilai.ac.in |
| Aditya Saini | 12340130 | adityasai@iitbhilai.ac.in |

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [AI Algorithms Implemented](#ai-algorithms-implemented)
4. [System Architecture](#system-architecture)
5. [Technology Stack](#technology-stack)
6. [Installation & Setup](#installation--setup)
7. [How to Play](#how-to-play)
8. [Algorithm Implementation Details](#algorithm-implementation-details)
9. [Project Structure](#project-structure)
10. [Future Enhancements](#future-enhancements)
11. [References](#references)

---

## 🎯 Project Overview

**AI vs Human Detective Challenge** is an interactive web-based application that demonstrates the practical application of Artificial Intelligence algorithms in solving constraint satisfaction problems. The system models a classic "whodunit" mystery puzzle where players compete against an AI to deduce the correct combination of **suspect**, **weapon**, and **location**.

### Key Objectives:
- Demonstrate real-world application of CSP (Constraint Satisfaction Problem) solving
- Implement and visualize A* search algorithm for optimal decision making
- Create an interactive learning platform for understanding AI algorithms
- Compare human intuition vs algorithmic reasoning in problem-solving

### Problem Statement:
Given a set of clues about a crime, determine:
- **WHO** committed it (Suspect)
- **WHAT** weapon was used (Weapon)
- **WHERE** it happened (Location)

The system uses AI algorithms to solve this systematically while allowing human players to compete using their intuition and deductive reasoning.

---

## ✨ Features

### 🎮 Gameplay Features
- **Competitive Race Mode**: Human vs AI detective competition
- **Real-time Investigation**: Take actions and gather evidence simultaneously
- **Cost-Based System**: Each investigation action has an associated cost
- **Dynamic Clue Generation**: Clues are generated based on the random solution
- **Multiple Investigation Paths**: Different ways to reach the solution

### 🤖 AI Features
- **A* Search Algorithm**: Optimal action selection using heuristic evaluation
- **CSP Solver**: Constraint propagation and arc consistency
- **Auto-Solve Mode**: Watch AI solve the entire case autonomously
- **Algorithm Visualization**: See AI's decision-making process in real-time
- **Smart Suggestions**: Get AI recommendations for next best actions

### 🎨 UI/UX Features
- **Split-Screen Design**: Side-by-side comparison of human and AI progress
- **Live Statistics**: Track cost, actions, and possible solutions
- **Algorithm Step Tracking**: Educational visualization of AI reasoning
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern, eye-friendly interface with Poppins font

---

## 🧠 AI Algorithms Implemented

### 1. **A* Search Algorithm**

**Purpose**: Find the optimal next action to investigate

**Implementation**:

```python
def a_star_search(problem):
    # Initialize the open and closed lists
    open_list = PriorityQueue()
    closed_list = set()

    # Add the starting node to the open list
    open_list.put((0, problem.initial))

    while not open_list.empty():
        # Get the node with the lowest f-cost
        current_node = open_list.get()[1]

        # Check if we reached the goal
        if problem.is_goal(current_node):
            return problem.reconstruct_path(current_node)

        closed_list.add(current_node)

        # Explore neighbors
        for neighbor in problem.get_neighbors(current_node):
            if neighbor in closed_list:
                continue

            # Calculate costs
            g_cost = problem.g_cost(current_node) + problem.cost(current_node, neighbor)
            h_cost = problem.heuristic(neighbor)
            f_cost = g_cost + h_cost

            # Add to open list if not already present
            open_list.put((f_cost, neighbor))

    return None  # No solution found
```

### 2. **CSP Solver with Arc Consistency**

**Purpose**: Solve the constraint satisfaction problem for case details

**Implementation**:

```python
def ac3(csp):
    queue = Queue()
    # Initialize the queue with all arcs in the CSP
    for x in csp.variables:
        for y in csp.neighbors[x]:
            queue.put((x, y))

    while not queue.empty():
        (x, y) = queue.get()
        if revise(csp, x, y):
            for z in csp.neighbors[x]:
                if z != y:
                    queue.put((z, x))

def revise(csp, x, y):
    revised = False
    for x_val in csp.assignment[x]:
        # Check if there is a consistent value in y's domain
        if not any(satisfies_constraint(x, x_val, y, y_val) for y_val in csp.assignment[y]):
            csp.assignment[x].remove(x_val)
            revised = True
    return revised
```

---

## 🏗 System Architecture

- **Client-Server Model**: The application follows a client-server architecture where the client is the web interface and the server handles the AI computations.
- **Modular Design**: Separate modules for AI algorithms, CSP handling, and web communication ensure scalability and maintainability.
- **Real-time Data Processing**: The server processes data and updates the client in real-time using WebSockets.

---

## 🛠 Technology Stack

- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Python, Flask
- **AI & ML**: Python, scikit-learn, TensorFlow (for future enhancements)
- **Database**: MongoDB (for storing user data and game stats)
- **Hosting**: Heroku / AWS

---

## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/aivsdetectionchallenge.git
   cd aivsdetectionchallenge
   ```

2. **Install dependencies**:
   - For frontend:
     ```bash
     cd client
     npm install
     ```
   - For backend:
     ```bash
     cd server
     pip install -r requirements.txt
     ```

3. **Set up the database**:
   - Create a MongoDB cluster and database
   - Update the connection string in the backend configuration

4. **Run the application**:
   - Start the backend server:
     ```bash
     cd server
     python app.py
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```

5. **Access the application**:
   - Open your browser and go to `http://localhost:3000`

---

## 🎮 How to Play

1. **Start a New Game**: Click on "New Game" to begin
2. **Choose Detective Mode**: Select to play as Human, AI, or Watch AI
3. **Investigate**: Take actions to gather clues
4. **Make Deductions**: Use clues to deduce the suspect, weapon, and location
5. **Solve the Case**: Submit your solution to see if you're correct

---

## 📊 Algorithm Implementation Details

- **A* Search**: Implemented with a priority queue and heuristic-based cost function.
- **CSP Solver**: Uses arc consistency (AC-3) algorithm to reduce search space.

---

## 📂 Project Structure

```
/aivsdetectionchallenge
|-- /client              # Frontend code
|-- /server              # Backend code
|-- /shared              # Shared models and utilities
|-- README.md
|-- requirements.txt
```

---

## ⏭ Future Enhancements

- Implement additional AI algorithms for comparison (e.g., Minimax, Genetic Algorithms)
- Enhance the web interface with more interactive elements
- Add user authentication and leaderboards
- Mobile app version for iOS and Android

---

## 📚 References

- Russell, S., & Norvig, P. (2016). Artificial Intelligence: A Modern Approach.
- Dechter, R. (2003). Constraint Processing. Morgan Kaufmann.
- Various online resources and documentation for React, Flask, and MongoDB.

---
