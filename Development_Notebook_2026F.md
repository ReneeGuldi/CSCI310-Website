**CSCI-310 Development Notebook**

---

**Guideline:** 

* Please document all your development activities, whether you use any AI coding tool or not. You might mix your manual coding or AI tool usage. Just document the entire process.   
  * If this is a team project or assignment, list all team members’ names in the “Name” field. For each iteration, record the name of the person who contributed any part of the work in the “What do you do?” field.  
* Any interactions with AI coding tools such as ChatGPT, Gemini, Copilot, and others must capture the full conversation history.   
* Use the format below to record your development activities in a clear and consistent manner.   
  * Adding more iteration sections if needed.

---

#### **Name: Renee Guldi **

#### **Project/Assignment: Project One -- Personal portfolio website (index.html home page, project.html projects page, demo.html interactive JavaScript demo) built with vanilla HTML, CSS, and JavaScript, no framework.**

##### **Problem/Task: Design and build a personal portfolio site that meets CSCI-310 assignment specifications. I.e. a home page that introduces myself, a projects page surrounding 6 projects that will be covered over the semester, an interactive JavaScript demonstration, and a responsive (mobile-friendly) layout.**

##### **Development Log**

- **Iteration 1:**  
  - **Goal/Task/Rationale:**  
      Scaffold the entire site from scratch, a home page (index.html) with a header/nav bar, a hero section containing a dark-mode toggle button, and a JS-driven greeting, a projects listing page (project.html), the base stylesheet (css/style.css, ~415 lines covering layout, theme variables, and component styles), the interaction script (js/script.js, ~161 lines: theme toggle, nav, greeting, etc.), and a placeholder project image.
      Resources:
      https://www.w3schools.com/howto/howto_js_toggle_dark_mode.asp
      https://codingartistweb.com/2025/05/custom-greetings-with-html-css-and-javascript/
      https://www.cleanpng.com/png-computer-icons-art-museum-lanter-wqopve/


      
  - **What do you do?**   
    {If you ask AI, provide your prompt and link. If you fix it yourself, describe how you do it.}  
       
      
- **Response/Result:**
    Created index.html, project.html, css/style.css, js/script.js, images/placeholder.jpg, and .gitignore. Commited as "Initial Repository push"

  

- **Your Evaluation:** {Issues/errors/your decision:done/discard/revise prompt}
    I didn't have any major issues I was privy to at the time of this commit, the site's overall structure, base CSS styles, and simple javascript effects (like the theme toggle and the greeting for different times of day), and they all worked pretty much as I intended for them too. Decision: done, moved on to refining details in later iterations. I caught smaller errors like "CSCI-320" instead of "CSCI-310", and "My Projects" instead of "My Project" following assignment specifications in iteration three.

- **Iteration 2:**  
  - **Goal/Task/Rationale:**  
      Separate the JavaScript demo out of project.html into its own standalone page instead of showing it inline on the Projects page, and add a styled "Back to Projects" link for navigating out of the demo.
      
  - **What do you do?**   
    {If you ask AI, provide your prompt and link. If you fix it yourself, describe how you do it.}  
       
      
- **Response/Result:**
    Created demo.html (43 lines) with a click-counter widget and live clock demo, added a .back-link style plus hover state to css/style.css, and removed the inline demo markup from project.html

  

- **Your Evaluation:** {Issues/errors/your decision:done/discard/revise prompt}
    Demo page separated cleanly with no big issues; the back-link and page-to-page navigation worked as I expected on the first pass. Decision: done.

- **Iteration 3:**  
  - **Goal/Task/Rationale:**  
      Fix a factual error (accidently listed as CSCI-320 instead of CSCI-310) on project.html, add a text color variant for list items, replace the placeholder image on Project One with a real screenshot of the JavaScript demo, and correct the page title from "My Projects" to "My Project" to match assignment specifications.
      
  - **What do you do?**   
    {If you ask AI, provide your prompt and link. If you fix it yourself, describe how you do it.}  
       
      
- **Response/Result:**
    Updated project.html and index.html, added images/javaScriptdemo.png, and made small style.css additions.

  

- **Your Evaluation:** {Issues/errors/your decision:done/discard/revise prompt}
    Caught and fixed the CSCI-320 type and incorrect "My Projects" title from iteration one during review. I also replaced the placeholder image without layout issues for the javascript demonstration. Decision: done.



- **Iteration 4:**  
  - **Goal/Task/Rationale:**  
      Improve text readability on mobile: the page container was initially too wide for small screens, so the max-width variable and horizontal padding were tightened and made more responsive with clamp().
      
  - **What do you do?**   
    {If you ask AI, provide your prompt and link. If you fix it yourself, describe how you do it.}  
      I asked ChatGPT to help in fixing the mobile layout issue. I provided it with my CSS and described the problem: that text was running edge-to-edge on small screens instead of having padding. I asked what the best approach would be to fix it so the layout would resize to fit different screen sizes while staying readable and not overly stretched. ChatGPT suggested using clamp() on --page-max and .wrap padding instead of having fixed values, which I then applied and adjusted to the values shown in the Response/Result above.
       
      
- **Response/Result:**
      In css/style.css, changes --page-max from clamp(680px, 90vw, 1400px) to clamp(680px, 82vw, 1200px), and changed .wrap padding from a fixed 24px to clamp(24px, 4vw, 64px).

  

- **Your Evaluation:** {Issues/errors/your decision:done/discard/revise prompt}
    The clamp() approach fixed the worst of the edge-to-edge text issue and the AI's suggestion was effective, but after testing on a narrower viewport, the container still felt too wide and the text blocks were not constrained. Decision: done for this pass, but flagged for a follow-up which I addressed in iteration 5 rather than fully resolving in one attempt.



- **Iteration 5:**  
  - **Goal/Task/Rationale:**  
      Add further mobile specific layout rules inside the existing @media (max-width: 480px) block: tighter side padding on .wrap for small screens, and a max-width constraint on long text blocks (.about, .contact, .lede) so paragraphs don't stretch edge to edge on phone screens.
      
  - **What do you do?**   
    {If you ask AI, provide your prompt and link. If you fix it yourself, describe how you do it.}  
       
      
- **Response/Result:**
      Added 13 lines to the mobile media query in css/style.css (28px side padding on .wrap, 32em max-width on text blocks).

  

- **Your Evaluation:** {Issues/errors/your decision:done/discard/revise prompt}
    Mobile layout finally matches the intended specifications (2-columns, tighter padding, and capping the text width) after this iteration with no additional issues found. Decision: done, this finished the mobile-responsive work started in iteration 4.