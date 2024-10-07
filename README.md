# APDS Part 2

## GROUP MEMEBERS (Contributors)

### Nkosinathi Ngozo - ST10215069
### Thobani Khumalo - ST10092282
### Samendra Morgan - ST10092045


## YOUTUBE VIDEO LINK

https://youtu.be/y_0U-_qhd2U


## MAIN GITHUB REPOSITORY USED
https://github.com/system-sculpters/APDS7311.git

- This is the main repo used by group throughout the project to avoid problems with circl ci and sonarqube (sonar cloud)
- All the tests with both these software was conducted on this repo 


## Running the app
The main package manager used was yarn but npm still works in the project

### Start up
#### Frontennd (Angular)
To start up the front-end cd to the frontend directory then run 'ng serve --open' this will automatically start-up the angular app in the browser on port 4200

![Screenshot 2024-10-07 215801](https://github.com/user-attachments/assets/4f4c12c2-24a0-4226-bc9d-16b7b98ef263)



#### Backend (NodeJS)
To start up the backend cd to the backend directory then run 'nodemon server.js' if you are using npm or 'yarn start' if you are using yarn as your package manager

![Screenshot 2024-10-07 215426](https://github.com/user-attachments/assets/5a99c55c-3ca7-4fbd-a41f-0874d0f8c7f2)

![Screenshot 2024-10-07 215309](https://github.com/user-attachments/assets/d59ac015-0650-4c8d-880d-6c9dd5957629)


### Possible problems
Both the forntend and backend are configured for https and there the anitvirus may have problems with the running of the app and server due to the certificates there we would manually need to accept the certificates on our browser. 
For the backend open a new tab in the browser and go to 'https://localhost:5000/' an accept the certificate.


![Screenshot 2024-10-07 215559](https://github.com/user-attachments/assets/e8914125-1404-4127-b565-4bab61ee7163)

- click 'show details'


![Screenshot 2024-10-07 223627](https://github.com/user-attachments/assets/b7c320f5-ab8f-4c6b-ac81-143daecde9c1)

- click 'wish to continue'


![WhatsApp Image 2024-10-07 at 21 58 34_451e39ef](https://github.com/user-attachments/assets/0b3869a3-b8a7-453d-b074-5df37fe416da)

- click 'ok' to accept the certificate

Remember: the steps may differ with different antiviruses as these instructions are for kaspersky


## CircleCI
## Link: https://app.circleci.com/pipelines/circleci/2LPvfd5p2Zyq3sDi1KZk76/15rmwQ2giCs4znYTYuLyw1 
## The CircleCI configuration file (.circleci/config.yml) was set up to automate the CI/CD process for the MEAN stack project APDS7311. It defines the steps to build, test, and deploy the application, ensuring a smooth and automated workflow for integrating code changes and verifying that everything works as expected
![image](https://github.com/user-attachments/assets/629ed1b1-1ef8-45b7-8dd4-7d4a007bc97b)
![image](https://github.com/user-attachments/assets/6654f585-0967-431a-847b-e23484db0197)


![image](https://github.com/user-attachments/assets/e4b9cb5b-76a7-4a77-b637-f557c4ea78fb)
![image](https://github.com/user-attachments/assets/661065e1-0b33-46d6-a93b-1ae53d0165d4)


![image](https://github.com/user-attachments/assets/a6f486f8-952e-4adb-849c-060f8421115b)
![image](https://github.com/user-attachments/assets/eebe74e2-921c-4ff6-8968-95c66350a976)


![image](https://github.com/user-attachments/assets/1734dab9-6384-498a-80dc-bbd91c0d16be)
![image](https://github.com/user-attachments/assets/f16b3cff-d5ba-4aa8-96ed-2e1057192ac6)


## SONAR Cloud 
## Link: https://sonarcloud.io/summary/overall?id=system-sculpters_APDS7311 
![image](https://github.com/user-attachments/assets/9936a18f-969d-4fa7-8fa3-05f6f75171f2)
![image](https://github.com/user-attachments/assets/a3f00052-6a5e-4d62-a45b-2848110082c5)


![image](https://github.com/user-attachments/assets/b547e9fa-5eda-48b7-ae78-11fbc72a92dd)
![image](https://github.com/user-attachments/assets/6314c1e6-eb76-4528-840e-f3832371c85c)


![image](https://github.com/user-attachments/assets/de1e1162-f3ab-40fb-bb0c-640f6e3deb8b)
This shows the status of the APDS7311 main branch with a "Passed" quality gate. It highlights that the code is clean with no major issues. A progress bar shows the distribution of TypeScript, JavaScript, HTML, and CSS files. 




