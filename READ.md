## Project Setup

### Client

1. Navigate to the client dir:
    ```shell
    cd client
2.  ```shell
    yarn
3.  ```shell
    yarn dev

### Server
1. Navigate to the server dir:
   ```shell
   cd server
2. ```shell
   docker-compose build && docker-compose up
3. Open new terminal and run to create prisma migration:
   ``` shell
   docker exec -it <[id] of container created> npx prisma migrate dev
