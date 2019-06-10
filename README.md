


```
db.createUser(
  {
    user: "ssp_user",
    pwd: "dev",
    roles: [
       { role: "readWrite", db: "ssp" }
    ]
  }
)
```
