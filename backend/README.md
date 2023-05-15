# Progress

# Getting Started

## Backend
0. Before running any commands, set up a `.env` file in the backend folder by copying the contents from the `sample-env.env` and adding the corresponding variables in the fields with `xxx` as its value. 

1. Start a PostgreSQL docker container to run the postgres DB.
```
    docker-compose up -d
```
> Note: to end this process, run `docker-compose down`

2. To run the Go backend server, enter the following command.
```
    go run main.go
```
3. To test if the server is up and running, ping the `http://localhost:8000/api/healthchecker` API endpoint.

