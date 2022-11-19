# survey-website
a survey website for school task created using react, lumen and JWT as authentication

## API / Back-end Reference


### Authentication

#### Login

```http
  POST /api/auth/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email For Login |
| `password` | `string` | **Required**. Password For Login |

#### Logout
```http
  POST /api/auth/logout
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Token` | `Bearer` | **Required**.  |

