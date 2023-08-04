# techfest-moneymanger

# Description
Moneymanager is a fullstack web application that was built using the create T3 app. This application provides users the ability to track their expenses and provide monthly analysis on their spendings. Users can sign in easily using by connecting with their google accounts. This app also allows users to add friends and create shared payments with them, allowing users to keep track of friends who owe them money and notifying their friends on overdue payments 

# Languages and Technology used
* TypeScript
* Next.js
* NextAuth.js
* Prisma
* TRPC
* Tailwind css
* Chakra UI
* Zodd
* Formik 

# Reasons for Technology and Frameworks used
I decided to use T3 app to learn typescript and the frameworks make use TypeScript strong typing to ensure type safety within the entire application, frontend and backend. 

**TRPC** 
This library enables me to create type-safe APIS using Typescript. Using the zod validation library, the backend is able to validate inputs before adding to the database. TRPC also integrates React Query, which helps handle backend issues, allowing the application to cache query data and only refetching data when there is a CRUD request being made, in which the data fetched is invalidated. This allows the application to be more efficient and prevents unneccessary api calls to refetch data from the database whenever the page is rendered. 

**Next.js** 
Unlike react.js that only uses client-side rendering, next.js allows pages to be pre-rendered at build time. This allows for this web application to display static html content to users on the initial render instead of a blank html page when using react.js. Additionally, since expenses recorded before are unlikely to be updated frequently by the user, the application uses static site generation for the spending list component and individual spending pages. This allows for data fetched from the database to be cached in CDN, giving a faster user experience. 

# Features 
* Home Page
* Dashboard Page
    * Allows users to monitor spendings with graphs
    * Allows users to keep track of payments they owe their friends and payments to collect
* Create Spending Page
    * Allows users to track spendings by category
* Contacts Page
    * Allows users to search and add Friends
* Edit spending and add Payment Page
    * Allows users to make changes to spending recorded
    * Allows users to include friends in the payments, which they will then be notified

# Working Snippets 
**Home Page**
![image](https://github.com/Kb-Tay/money_manager/assets/110143162/f258ae0e-84a8-4034-8cd6-8c7650cf71ea)

**Dashboard**
![image](https://github.com/Kb-Tay/money_manager/assets/110143162/e79ecc11-171a-414a-bdd7-6abbed89a678)

**Create Spending Page**
![image](https://github.com/Kb-Tay/money_manager/assets/110143162/cbb50d20-8491-40a3-ad9c-d6850dd21b80)

**Contacts Page**
![image](https://github.com/Kb-Tay/money_manager/assets/110143162/8f838c42-cc4c-4590-8715-9df02c579b17)

**Edit Spending Page**
![image](https://github.com/Kb-Tay/money_manager/assets/110143162/3ae0181e-7ff6-43cd-a185-1bf4ab9b196d)

