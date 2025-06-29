# Brain Dump

## This is the repository for my personal Brain Dump App

### Description:

- Prior to realizing this project, I was overwhelmed with the number of concepts, ideas, and the eagerness to be creative and novel.
  Looking back to my UI/UX class in university, I learned the technique of mind mapping; the process of structuring ideas around a central theme.
  Building from this, I wanted to make something that allows me to simply dump all of my ideas in one space -- without a theme, just all of my thoughts in one space. Therefore, I created a brain dump, on paper, before implementing it into a website application. This helped me to narrow down ideas and
  organize my thoughts which ultimately helped me to decide what I really wanted to do: a brain dump!

### Installation Guide:

- Clone this repository with command: `git@github.com:indofriedrice/brain-dump.git`
- Bootstrap a new project with command: `npm create vite@latest . -- --template react`
- Install all dependencies with command: `npm install`

### How To: Run Development Server

- Run with command: `npm run dev`

## How To: Connect to Airtable Database

- Create a .env.local file in root directory
- Enter the following credentials: 
VITE_PAT=patOqCOVbn1agQVk3.4f3e28ea015f24700f1f661275b32884b454ffb6089e4835f15658a303e5fd17
VITE_BASE_ID=appDcTKPEy9q9jNLT
VITE_TABLE_NAME=Ideas

## Database Schema:

- content (String), category (string), positionX (integer), positionY (integer)

