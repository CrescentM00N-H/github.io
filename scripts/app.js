"use strict";

//IIFE - Immediately Invoked Function Expression
(function() {
    function displayHomePage() {
        console.log("Home Page...");
        let AboutUsbtn = document.getElementById("AboutUsbtn");
        AboutUsbtn.addEventListener("click", function() {
            console.log("About Us Button Clicked!");
        });

        let Maincontent = document.getElementsByTagName("main")[0];
        let mainparagraph = document.createElement("p");
        mainparagraph.setAttribute("id", "mainparagraph");
        mainparagraph.setAttribute("class", "mt-3");

        mainparagraph.textContent = "This is the main paragraph";
        Maincontent.appendChild(mainparagraph);

        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph`;
        mainparagraph.textContent = SecondString;
        Maincontent.appendChild(mainparagraph);

        let DocumentBody = document.body;
        let Article = document.createElement("article");
        let ArticleParagraph = document.createElement("p");
        ArticleParagraph.setAttribute("id", "ArticleParagraph");
        ArticleParagraph.setAttribute("class", "mt-3 container");
        ArticleParagraph.textContent = "This is my  Article paragraph";
        Article.appendChild(ArticleParagraph);
    }

    function displayAboutPage() {
        console.log("About Page...");
    }

    function displayContactPage() {
        console.log("Contact Page...");
    }

    function displayServicesPage() {
        console.log("Services Page...");
    }

    function displayProjectsPage() {
        console.log("Projects Page...");
    }

    function Start() {
        console.log("Starting...");
        switch (document.title) {
            case "Home":
                displayHomePage();
                break;
            case "About":
                displayAboutPage();
                break;
            case "Contact":
                displayContactPage();
                break;
            case "Services":
                displayServicesPage();
                break;
            case "Projects":
                displayProjectsPage();
                break;
        }
    }
    window.addEventListener("load", Start);
})();