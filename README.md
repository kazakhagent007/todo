## Getting Started

First, install dependencies:
1. docker
2. postgres
3. node 22 and later
4. npm and yarn

```bash
#1 Start docker
#2 Start docker container postgres
docker-compose up -d
#3 Start next.js project 
yarn dev
```

Open [http://localhost:2025](http://localhost:3000) with your browser to see the result.

```bash
#4 prisma migrate
npx prisma migrate dev --name init

# To open prisma-postgres database on browser 
npx prisma studio
  
```

## Deploy on Vercel

```bash
# Deploy on deevelop
vercel 
# Deploy on prod
versel --prod
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
