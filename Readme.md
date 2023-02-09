### Cara Menjalankan Project di Local Komputer
1. Lakukan Git Clone project dengan cara mengetikkan baris code berikut didalam terminal
``git clone https://github.com/fadilalfarisy/learning-platform.git``
2. Setelah masuk kedalam directory folder project, lalu install dependencies yang diperlukan dengan cara mengetikkan baris code berikut didalam terminal
``npm i``
3. Ketikkan command line didalam terminal
``npm run start``

***

## Documentation REST API Online Learning Platform

***

##### **Info**
- Title: Online Learning Platform
- Description: Online Learning Platform with JWT Authorization
- Version : 1.0.0

##### **Server**
- URL : ``http://localhost:3000``
- Description : development
- URL : ``https://learning-platform-fadilportofolio.vercel.app/``
- Description : development
***

### ADMIN

<!-- REGISTER ADMIN -->
<details>

<summary> <code>POST</code> <code><b>/api/admin/register</b></code> Admin sign up </summary>

##### Request

- ##### Body

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | username  |  required |  String         |
    > | password  |  required |  String         |

- ##### Example 

    ```json
    {
        "username": "admin",
        "password": "123"
    }
    ```

</details>


<!-- LOGIN ADMIN -->
<details>

<summary> <code>POST</code> <code><b>/api/admin/login</b></code> Admin sign in </summary>

##### Request

- ##### Body

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | username  |  required |  String         |
    > | password  |  required |  String         |

- ##### Example 

    ```json
    {
        "username": "admin",
        "password": "123"
    }
    ```

</details>


<!-- LOGOUT ADMIN -->
<details>

<summary> <code>GET</code> <code><b>/api/admin/logout</b></code> Admin logout </summary>

</details>


<!-- GET ALL USER -->
<details>

<summary> <code>GET</code> <code><b>/api/admin/users</b></code> Get all data users </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

</details>


<!-- DELETE USER -->
<details>

<summary> <code>DELETE</code> <code><b>/api/admin/user/{id}</b></code> Delete user </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Params

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | id        |  required |  ObjectId       |

</details>

<!-- GET DATA STATISTICS -->
<details>

<summary> <code>GET</code> <code><b>/api/admin/statistics</b></code> Get data statistics </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

</details>


### CRUD COURSE (ADMIN ONLY)

<!-- CREATE COURSE -->
<details>

<summary> <code>POST</code> <code><b>/api/admin/course</b></code> Create course </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Form Data

    > | Name          |  Type     | Data Type                       |
    > |---------------|-----------|---------------------------------|
    > | course_name   |  required |  String                         |
    > | price         |  required |  Number                         |
    > | enroll        |  required |  Number                         |
    > | id_category   |  required |  ObjectId                       |
    > | course_image  |  required |  Binary                         |

</details>


<!-- GET COURSE -->
<details>

<summary> <code>GET</code> <code><b>api/admin/courses</b></code> Get Course </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Request Query

    > | Name    |  Type    | Description                             |
    > |---------|----------|-----------------------------------------|
    > | search  | optional | search course name by keyword           |
    > | price   | optional | sort course by price (lowest OR highest)|

</details>


<!-- UPDATE COURSE -->
<details>

<summary> <code>PUT</code> <code><b>/api/admin/course/{id}</b></code> Update course </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Params

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | id            |  required |  Object         |

- ##### Form Data

    > | Name          |  Type     | Data Type                       |
    > |---------------|-----------|---------------------------------|
    > | course_name   |  required |  String                         |
    > | price         |  required |  Number                         |
    > | enroll        |  required |  Number                         |
    > | id_category   |  required |  ObjectId                       |
    > | course_image  |  required |  Binary                         |

</details>


<!-- DELETE COURSE -->
<details>

<summary> <code>DELETE</code> <code><b>/api/admin/course/{id}</b></code> Delete course </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Params

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | id            |  required |  Object         |

</details>

### USERS

<!-- REGISTER USER -->
<details>

<summary> <code>POST</code> <code><b>/api/user/register</b></code> User sign up </summary>

##### Request

- ##### Body

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | username  |  required |  String         |
    > | password  |  required |  String         |

- ##### Example 

    ```json
    {
        "username": "admin",
        "password": "123"
    }
    ```

</details>


<!-- LOGIN USER -->
<details>

<summary> <code>POST</code> <code><b>/api/user/login</b></code> User sign in </summary>

##### Request

- ##### Body

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | username  |  required |  String         |
    > | password  |  required |  String         |

- ##### Example 

    ```json
    {
        "username": "admin",
        "password": "123"
    }
    ```

</details>


<!-- LOGOUT USER -->
<details>

<summary> <code>GET</code> <code><b>/api/user/logout</b></code> User logout </summary>

</details>

<!-- GET COURSE -->
<details>

<summary> <code>GET</code> <code><b>api/user/courses</b></code> Get Course </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Request Query

    > | Name    |  Type    | Description                             |
    > |---------|----------|-----------------------------------------|
    > | search  | optional | search course name by keyword           |
    > | price   | optional | sort course by price (lowest OR highest)|

</details>


<!-- GET DETAIL COURSE -->
<details>

<summary> <code>GET</code> <code><b>/api/user/course/{id}</b></code> Get detail course user </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Params

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | id        |  required |  ObjectId       |

</details>


<!-- GET CATEGORY -->
<details>

<summary> <code>GET</code> <code><b>/api/user/course/category</b></code> Get category course </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

</details>


<!-- GET POPULAR CATEGORY -->
<details>

<summary> <code>GET</code> <code><b>/api/user/course/category/popular</b></code> Get popular category course </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

</details>



### REFRESH TOKEN

<!-- REFRESH TOKEN -->
<details>

<summary> <code>GET</code> <code><b>/api/token</b></code> Refresh token user </summary>

##### Request

- ##### Cookies

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | refresh       |  required |  None           |

</details>




### CRUD CATEGORY (ADMIN ONLY)

<!-- CREATE CATEGORY -->
<details>

<summary> <code>POST</code> <code><b>/api/admin/category</b></code> Create category </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Body

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | category_name |  required |  String         |

- ##### Example 

    ```json
    {
        "category_name": "FE"
    }
    ```

</details>


<!-- GET CATEGORY -->
<details>

<summary> <code>GET</code> <code><b>api/admin/category</b></code> Get Course </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

</details>


<!-- DELETE CATEGORY -->
<details>

<summary> <code>DELETE</code> <code><b>/api/admin/category/{id}</b></code> Delete category </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Params

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | id            |  required |  Object         |

</details>
