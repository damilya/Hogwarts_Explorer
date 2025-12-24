## Intro
The Hogwarts Explorer is a pet project-assignment by nFactorial school.h
It's a fully functional project with basic functionalities to look up fictional Harry Potter characters per faculty and chat with them via OpenAI API.

## Context
I am currently a Machine Learning developer, who is pationate about AI, yet a strong believer that simple solutions are often sufficient enough to produce value. This project was mostly vibe coded using copilot integrated into VSCode.
I would often see a familiar issue but unsure how to tackle it, I would aks copilot to implement or correct it.
I started with a basic page and a backend disconnected from each other, but working separately locally. I would make sure the backend is callable (see CORS issue in the bottom of the page), then when I had an MVP, I started checking how to deploy the app. I followed your recommendations and deployed the app on Vercel and Render.
Then I decided on adding a chat possibility using LLM. I asked the copilot to implement it. The I kept tuning the code and checking that after each new commit merge, both backend and frontend are still up and running after redeployment.
The final part was to write this README file and make sure the link I provide you is healthy and works as intended. I cannot foresee all possible issues when you access this link, but I expect everything to work smoothly. If not, please don't hesitate to reach out to me via whatsapp/email!


## Try it out right away!
- Go to https://hogwarts-explorer-kk5pdqxzk-damilyas-projects.vercel.app and enjoy!

Select the faculty you wish you could study in, then load the characters, click on Details button and talk to a new friend!


## How to start it up locally - limited since an API key is currently in my .env file
A possible work around would be to add it to SecretManager on AWS, but due to limited time given, I provide this documentation block for reference. To assess my project, please JUMP TO THE NEXT README BLOCK.
1. Clone the repository:
    ```bash
    git clone https://github.com/damilya/Hogwarts_Explorer/tree/main
    cd hogwarts-faculty-explorer
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory
    - ATTENTION: this will only work on my personal PC
    - Add your OpenAI API key:
      ```
      OPENAI_API_KEY=your_api_key_here
      ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`

## How to access the web page externally
I deployed the frontend part on Vercel.
- Go to https://hogwarts-explorer-kk5pdqxzk-damilyas-projects.vercel.app and enjoy!

The backend is deployed on Render
- Go to [https://hogwarts-explorer.onrender.com](https://hogwarts-explorer.onrender.com) to access the backend API.

## Issues I encountered
1. - CORS issue:
    CORS settings did not allow LAN origin and similar local IPs to establish a connection
   - CORS issue resolution:
    Using developer tools in my browser, I checked the message returned when I clicked the button, then pasted it to the chat and copilot helped me with the resolution.
2. - Secure exposure of OpenAPI key on Render
    Locally I could startup the app with .env file holding sensitive info, but to make sure it can remain secure on Render, I added an Environment Variable on Render page of my deployed project
3. - Cold start problem
    I am using a free tier solution on Render which auto-stops the app after 15min of inactivity. If someone loads it after a long period of inactivity, it first takes a couple of minutes to startup.
   - Cold start resolution:
    Option 1: upgrade the Render plan
    Option 2: create a cron job to ping my app every X minutes/hours - my choice. I connected the backend Render link to https://uptimerobot.com

## Future plans
I am not great at frontend development, but I would keep improving the UI by adding some background, animation and music.
For the backend part, I would be interested in exploring the tuning of the OpenAI models to reflect the character traits even better.
For the scaling part, I would also check how to make the app available to more users with minimal downtime.
