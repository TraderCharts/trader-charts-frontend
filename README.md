
<div align="center">
    <img src="https://avatars.githubusercontent.com/u/235483245?u=f1859a88b3e3c9d1b5a5857079c364d3746a1ad9" width="200"/>
    <h1>
       Trader Charts
    </h1>
    <h3>
        Trader Charts is a tool for performing technical analysis with interactive charts. It allows users to visualize stock data or other asset data depending on what the data providers supply, and to apply technical indicators to analyze price trends 
    </h3>
   <h5>
      * One charting tool to rule them all *
   </h5>
</div>

---

### Interactive Web Interface
![React](https://img.shields.io/badge/React-18.3.1-4B32C3?logo=react&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-6.5.0-007FFF?logo=mui&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-4.1.2-E3FF00?logo=redux&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-4.11.0-F9A03C?logo=d3.js&logoColor=white)
        <img src="https://img.shields.io/badge/React%20Financial%20Charts-2.0.2-0A66C2?logo=chart.js&logoColor=white"/>
![License](https://img.shields.io/badge/License-MIT-C0C0C0)

### React Financial Charts - Exclusive version
![React](https://img.shields.io/badge/React-16%7C17%7C18%7C19-4B32C3?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-2.9.1-E3FF00?logo=d3.js&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-6.1.20-5B8CD6?logo=storybook&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8.40.0-61DAFB?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-2.8.8-FDE2C6?logo=prettier&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-C0C0C0)



---

## Trader Charts Frontend - Overview
The **Frontend** is the user-facing application built with React, MUI, Redux, and D3.js.  
It provides interactive charts and dashboards for visualizing data collected and processed by the backend and data collector.  
[See backend →](https://github.com/TraderCharts/trader-charts-backend) | [See data collector →](https://github.com/TraderCharts/trader-charts-data-collector)

---


🚀 **Want to contribute?**

We welcome collaborators who wish to contribute and help enhance this trading tool. Feel free to reach out to the maintainers to get involved.

---

## Trader Charts Frontend

There's 3 environments: mock, develop and production


### Install dependencies to be able to start project

1. Create main project

        $ mkdir trader-charts
        $ cd trader-charts

2. Clone sub-projects

        $ git clone https://github.com/sgonzaloc/react-financial-charts.git
        $ git clone https://github.com/sgonzaloc/trader-charts-frontend.git

3. Build react-financial-charts

        $ cd react-financial-charts
        $ npm ci && npm build

4. Install yalc globally:

        $ npm install -g yalc

5. Go to each package inside *react-financial-charts/packages* folder (anotations, axes, ...), and publish packages to yalc: 

        $ yalc publish

6. Start project Mock/Develop environment

### Start Mock Environment

For using the mock environment, you will need to run
*'mock server'*, and then website itself that use the server that
retrieves mock data. Please run the following commands:

1. Start the mock server:

        $ npm run mock-api

2. Run the website, which retrieves data from the mock-api:

        $ npm run start-mock


### Start Develop environment:

For using the develop environment, you will need to run
*'backend'*, and then website itself that use the server that
retrieves mock data. Please run the following commands:

1. Go to Backend project and run the project:
2. For running website, which retrieves data from the backend server:

        $ npm run start-develop


### Roadmap features

- [x] Design main project structure
- [x] Add Auth0 login component for login with Email
- [x] Add Auth0 login component for login with Facebook
- [x] Add general layout, main frame, upper bar, sidebar and profile picture
- [x] Add profile menu


- [x] Add charts section design
- [x] Add candlesticks type to charts
- [x] Add volume indicator to charts
- [x] Add volume profile indicator to charts


- [x] Allow running project with simulated data, to be able to develop this project independently of the backend project.


- [x] Add tickers search box
- [x] Add Open-High-Low-Close price fixed indicator (OHLC)
- [x] Add moving average interactive indicator (SMA)
- [x] Add exponential moving average interactive indicator (OHLC)
- [x] Add indicators search box, to be able to add them to chart
- [x] Allow to select the thickness of interactive indicators
- [x] Allow to select the color of interactive indicators
- [x] Add color picker, to be able to select the color of interactive indicators
- [x] Add labels with details of interactive indicators
- [x] Allow to edit interactive indicators, clicking on labels
- [x] Add alerts section design
- [x] Allow create alerts
- [x] Allow edit alerts
- [x] Fork finance chart library, and add new features to be able to delete selected lines


### Future features

- [ ] Allow to remove all chart components
- [ ] Save chart components on templates

### Trading Charts demo

* [Demo Video](https://drive.google.com/file/d/1P6rXxtZItBR0-MQnIe-N1WODwIFOgjrf/view?usp=drive_link)

<div>
   <video width="320" height="240" controls autoplay>
     <source src="https://drive.google.com/file/d/1P6rXxtZItBR0-MQnIe-N1WODwIFOgjrf/view?usp=drive_link" type="video/mp4">
   </video>
</div>

### Captures

* Auth0 email login:

![Email login](assets/img/readme/auth0_email_login.png)

* Auth0 Facebook login:

![Facebook login](assets/img/readme/auth0_facebook_login.png)

* Charts section:

![Charts section](assets/img/readme/charts_section.png)

* Alerts section:

![Alerts section](assets/img/readme/alerts_section.png)


* Alerts editable details:

![Alerts details](assets/img/readme/alerts_details.png)
![Alerts details indicators](assets/img/readme/alerts_details_indicators.png)
![Alerts details conditions](assets/img/readme/alerts_details_conditions.png)

* Profile Menu:

![Profile Menu](assets/img/readme/profile_menu_2.png)

* Tickers search box:

![Tickers search box](assets/img/readme/tickers_searchbox.png)

* Interactive components of Fibonacci retracements and parallel channels:

![fibonacci_and_parallel_channel_ic](assets/img/readme/fibonacci_and_parallel_channel_ic.png)

* Interactive components of Trend lines:

![trendlines_ic](assets/img/readme/trendlines_ic.png)

* Interactive components of Rays and Extended lines:

![rays_extendLines_ic](assets/img/readme/rays_extendLines_ic.png)

* Gann fans interactive component:

![gann_fans_ic](assets/img/readme/gann_fans_ic.png)

* Gann fans interactive component:

![gann_fans_ic](assets/img/readme/gann_fans_ic.png)

* Indicator's search box:

![indicators_searchbox](assets/img/readme/indicators_searchbox.png)

* Indicator's details:

![indicator_details_1](assets/img/readme/indicator_details_1.png)

* Indicator's color picker:

![indicator_details_2](assets/img/readme/indicator_details_2.png)

## Contributors ✨

Thanks goes to these wonderful people:

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sgonzaloc"><img src="https://avatars.githubusercontent.com/u/6353386?v=4?s=100" width="100px;" alt="gonzalo"/><br /><sub><b>Gonzalo Sanchez Cano</b></sub></a></td>
    </tr>
  </tbody>
</table>
