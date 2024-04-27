# kanaban-board-interview-task

Title: Frontend Developer Interview Task

Objective:
Modify the existing Kanban board project found at (https://github.com/benlutz/kanban) to enhance its functionality and interactivity based on the specifications provided below.

Tasks Overview:

Your tasks revolve around implementing new features and user interactions within the existing Kanban board structure. Specifically, you will:

1. Add a New Card Feature:
   - Introduce an "Add Card" button adjacent to each column title. This button, when clicked, should prompt the addition of a new card within that specific column.

2. Active Card Indicator:
   - Implement functionality such that clicking any card within the board marks it as an "active-card". Highlight this active card by altering its background color or border to visually distinguish it from other cards.

3. Conditional Card Addition:
   - Modify the "Add Card" feature so that new cards are added based on the presence of an "active-card":
     - If there is an active card within the column, the new card should be inserted immediately after the active card.
     - If there is no active card, the new card should be added to the end of the list of cards in that column.

4- On the first time the user open the Kanban board, use the following API to return all the posts and place them as cards ( we will deal with posts as tickets/cards) : 
https://jsonplaceholder.typicode.com/posts


Assessment Criteria:

- Functionality: The implemented features work as described in the tasks overview.
- Code Quality: The code is clean, well-organized, and efficiently implements the required features without introducing unnecessary complexity.
- UI/UX: The new features integrate seamlessly with the existing UI, providing a user-friendly experience.
- Problem-Solving: Your approach to implementing these features demonstrates effective problem-solving skills and understanding of React.
