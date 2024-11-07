# Node Hotel Application

- The Node Hotel application is a Node.js-based system developed using the Express.js framework, with MongoDB as the chosen database. 
- This application manages information related to persons (staff) and menu items. 
- It exposes specific endpoints to handle CRUD (Create, Read, Update, Delete) operations for both persons and menu items.

# Persons

1. Add a Person:
    - Endpoint: POST /person
    - Description: Adds a person to the system with details such as name, role, etc.

2. Get All Persons:
    - Endpoint: GET /person
    - Description: Retrieves a list of all persons in the system.

3. Get Persons by Work Type:
    - Endpoint: GET /person/:workType
    - Description: Retrieves a list of persons based on their work type (e.g., chef, waiter, manager).

4. Update a Person:
    - Endpoint: PUT /person/:id
    - Description: Updates the details of a specific person identified by their ID.

5. Delete a Person:
    - Endpoint: DELETE /person/:id
    - Description: Deletes a person from the system based on their ID.

# Menu Items

1. Add a Menu Item:
    - Endpoint: POST /menu
    - Description: Adds a menu item to the system with details such as name, price, taste, etc.

2. Get All Menu Items:
    - Endpoint: GET /menu
    - Description: Retrieves a list of all menu items in the system.

3. Get Menu Items by Taste:
    - Endpoint: GET /menu/:taste
    - Description: Retrieves a list of menu items based on their taste (e.g., sweet, spicy, sour).

4. Update a Menu Item:
    - Endpoint: PUT /menu/:id
    - Description: Updates the details of a specific menu item identified by its ID.

5. Delete a Menu Item:
    - Endpoint: DELETE /menu/:id
    - Description: Deletes a menu item from the system based on its ID.