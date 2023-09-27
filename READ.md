## Project Setup

### Client

1. Navigate to the client dir:
   ```shell
   cd client
2.  yarn
3.  yarn dev

### Server
1. Navigate to the server dir:
2. docker-compose build && docker-compose up
3. Open new terminal and run to create prisma migration: docker exec -it <[id] of container created> npx prisma migrate dev
