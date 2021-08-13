# Food Delivery Web App

## Project Requirements

- User must be able to create an account and log in.
- Implment 2 roles with different permission levels.
  - `Regular User`: Can see all restaurants and place orders from them.
  - `Restaurant Owner`: Can CRUD Restaurants and Meals.
- A Restaurant should have a name and description of the type of good they serve.
- A meal should have a name, description and price.
- Orders consist of a list of all meals, date, total amount and status.
- An Order should be placed for a single Restaurant only. but it can have multiple meals.
- Restaurant Owners and Regular Users can change the Order Status respecting below flow and permissions.
  - `Placed`: Once a Regular user places an Order.
  - `Canceled`: If the Regular User cancel the Order.
  - `Processing`: Once the Restaurant Owner starts to make the meals.
  - `In Route`: Once the meal is finished and Restaurant Owner marks it's on the way.
  - `Delivered`: Once the Restaurant Owner receives information that the meal was delivered by their staff.
  - `Received`: Once the Regular User receives the meal and marks it as Received.
- Status should follow the sequence as stated above, and not allowed to move back.
- Status can not be changed by a different user than is stated above.
- Orders sbould have a history about the date and time of the status changing.
- Both Regular Users and Restaurant Owners should be able to see a list of the orders.
- Restaurant Owners have the ability to block a User.

---

- REST/`GraphQL` API. Make it possible to perfect all user actions via the API, including authentication.
- Prepare Test cases to functionally test the API Layer directly. Use `Postman` or `cURL`
- Make sure it's a single-page application. All actions need to be client-side using AJAX, refreshing the page is not acceptable.
- Functional UI/UX design is needed. (A framework can be used)
- `BONUS:` **UNIT & E2E Tests.**

---

## Backend

### Technical Features

- GraphQL API (using Apollo and Express)
- Multi-Database (using Prisma)
- Typescript
