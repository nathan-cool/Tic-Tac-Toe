<h1 align="center">Tic-Tac-Toe Game </h1>

[Play the game here](https://nathan-cool.github.io/Tic-Tac-Toe/)

This project presents a simple yet engaging Tic-Tac-Toe game, designed to provide a fun, interactive experience for users. Aimed at users of all ages, this game offers both single and multiplayer options, adapting seamlessly across various devices.

![mockup](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/2eef36d9-3eca-4765-b953-1d2e778742be)

# User Story

## New User Stories

- Easily navigate and understand the game's objective.
- Choose between single or multiplayer modes.
- Enjoy a responsive gaming experience on both desktop and mobile devices.
- As a new user, I want the ability to customize game settings such as difficulty level

## Existing User Story 

- Return to the game for a quick and enjoyable gaming session.
- Experience a consistent, error-free game environment.

# Design
## Wireframes
## Colour Scheme
- A soothing colour palette with contrasting elements for visibility and aesthetics.
- ![image](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/393b33f7-2591-4680-be45-d11b1986e8dc)


## Typography
- 'Quicksand' font for its modern and readable appearance.

## Effects
- Interactive elements like cells and buttons with hover effects for better user engagement.
  ![image](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/86450571-5917-4368-aa91-f0f4eb350d53)
  ![image](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/6b010992-a13b-402c-a261-46e723be611f)

## Design choices

# Features

## Existing Features

### Title Screen
- Welcome and Choose Mode: When you open the game, you see instructions on how to play Tic-Tac-Toe. You can pick to play either against the computer (AI) or with someone else who is with you.

![image](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/52599833-92d7-429e-a6cc-56fdbcf13d09)

### MiniMax
- The MiniMax algorithm is used as the computer's AI. It helps an AI player make the best move by considering all possible future moves and their outcomes. The algorithm simulates the game several moves ahead, scoring each outcome (win, lose, or tie) 


### Difficulty
- Pick How Hard the Game Is: If you play by yourself against the computer, you can choose how hard you want the game to be. There are three levels: Easy, Normal, and Hard. Easy is good for starters, while Normal and Hard are for those who want a bigger challenge. For the game difficulty, the AI will choose a spot at random for the Easy level. In the Normal level, the AI may choose a spot at random or it may choose the best available spot  and this is done 50% of the time. For the Hard level, the AI will always choose the best available spot using the minimax algorithm.

![image](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/685ecc06-4704-47e0-b366-348b8780d7c9)


###Playing with a Friend
- Two People Can Play Together: You and a friend can play against each other in this game. It's a fun way for two people in the same place to enjoy a quick game.

### Keeping Track of Your Games
- Displays messages at the end of each game to show the result - win for X or O, or a tie

![image](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/55664137-de16-4fa1-bb23-9e4b4c4a20c4)


### Easy Restart and Reset
- Restart: You can easily start a new game or reset the current game anytime you want. This makes it simple to play again and again without waiting

![image](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/7c65d80a-9009-4bee-b7e9-598a2887a9da)


### Interactive Game Board
- Easy-to-Use Board: The game board is easy to use. You just click where you want to play. Highlight where the user is  It works well on computers and phones.

### Animated Jiggle
- Winning Animations: When someone wins a game, the winning combination will jiggle.

![Jiggle-ezgif com-video-to-gif-converter](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/ce4d9d39-dbe7-48a4-971f-c82470590b73)


### Turn Display
- Whose Turn It Is: The game always shows you whose turn it is, so you can easily follow along and plan your next move.

![image](https://github.com/nathan-cool/Tic-Tac-Toe/assets/127421398/b3e738d7-fa14-45fc-9f81-40e83c8f2b67)


### Game Pausing
- Cooldown between turns: The game has a cool-down feature, which acts like a short pause between turns. This is to stop the AI from responding too quickly.


## Future Features
- Implement a score tracking system.

# Technologies Used
## Languages
- HTML5
- CSS3
- ES6+ JavaScript
- Google Chrome Dev tools
- Google Lighthouse for audits
- vs code


## Tools and Libraries
- Visual Studio Code, GitHub for development and version control.
- Google Fonts for typography.

# Testing
## Device Testing

## Device Testing
At the beginning of the project, a mobile-first design was implemented and adjustments were made to ensure it looked good on all screen sizes. The following devices were tested:

<table>
  <thead>
    <tr>
      <th>Device</th>
      <th>Test One</th>
      <th>Test Two</th>
      <th>Result One</th>
      <th>Result Two</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>iPhone SE</td>
      <td>Responsiveness</td>
      <td>Buttons/Features</td>
      <td>Pass</td>
      <td>Pass</td>
    </tr>
    <tr>
      <td>iPhone X</td>
      <td>Responsiveness</td>
      <td>Buttons/Features</td>
      <td>Pass</td>
      <td>Pass</td>
    </tr>
    <tr>
      <td>iPhone 14</td>
      <td>Responsiveness</td>
      <td>Buttons/Features</td>
      <td>Pass</td>
      <td>Pass</td>
    </tr>
    <tr>
      <td>iPhone 6</td>
      <td>Responsiveness</td>
      <td>Buttons/Features</td>
      <td>Pass</td>
      <td>Pass</td>
    </tr>
    <tr>
      <td>Galaxy Fold</td>
      <td>Responsiveness</td>
      <td>Buttons/Features</td>
      <td>Pass</td>
      <td>Pass</td>
    </tr>
    <tr>
      <td>24-inch Monitor</td>
      <td>Responsiveness</td>
      <td>Buttons/Features</td>
      <td>Pass</td>
      <td>Pass</td>
    </tr>
    <tr>
      <td>13-inch Laptop</td>
      <td>Responsiveness</td>
      <td>Buttons/Features</td>
      <td>Pass</td>
      <td>Pass</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Test Method</th>
      <th>Expected Outcome</th>
      <th>Test Result</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Game Board Interaction</td>
      <td>Click-through Testing</td>
      <td>Each cell registers click, updates game state</td>
      <td>Pass</td>
      <td>Responsive to user interactions</td>
    </tr>
    <tr>
      <td>Game Mode Selection</td>
      <td>Manual Testing on Browsers</td>
      <td>Single and Multiplayer modes selectable</td>
      <td>Pass</td>
      <td>Tested across Chrome, Firefox, Safari</td>
    </tr>
    <tr>
      <td>Game Reset Feature</td>
      <td>Manual Testing</td>
      <td>Game resets correctly for new matches</td>
      <td>Pass</td>
      <td>Ensures game state is cleared and ready</td>
    </tr>
    <tr>
      <td>Responsive Design</td>
      <td>Device Testing, Visual Check</td>
      <td>Game displays correctly across devices</td>
      <td>Pass</td>
      <td>Consistent experience on mobile, tablet, and desktop</td>
    </tr>
    <tr>
      <td>Winning Combination Highlight</td>
      <td>Visual Inspection</td>
      <td>Winning line is highlighted upon game end</td>
      <td>Pass</td>
      <td>Enhances user experience by clearly showing win</td>
    </tr>
    <tr>
      <td>Game Instructions</td>
      <td>Content Verification</td>
      <td>Clear, concise instructions for players</td>
      <td>Pass</td>
      <td>Instructions are easy to understand</td>
    </tr>
  </tbody>
</table>


## Code Validation
- HTML, CSS, and JavaScript validated for syntax and efficiency.

## User Feedback
- User testing conducted to refine gameplay and UI/UX.

# Deployment
Steps for deploying the project on GitHub Pages:
1. Access the repository on GitHub.
2. Navigate to "Settings" and locate the "GitHub Pages" section.
3. Select the main branch as the source and save the changes.

## HTML-W3C-Validator 

## CSS-Validator  
## Lighthouse testing
## Fixed Bugs
## Implementation

# Credits
I would like to express my gratitude to the Slack Community for their invaluable assistance. Stephen Seagrave for helping me throughout my coding. My mentor Brian Macharia.

# Contents

Tutorial and documentation used:

https://www.w3schools.com/html/
https://developer.mozilla.org/en-US/docs/
https://css-tricks.com/
https://www.youtube.com/watch?v=AnmwHjpEhtA
https://www.youtube.com/watch?v=rA7tfvpkw0I
CS50 AI (minimax)
