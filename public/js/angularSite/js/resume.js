/*
	This is my basic angular file with data hardcoded in

	Ryan Dunton
	November 10, 2016

*/

var Resume = angular.module('Resume', []);

Resume.controller('contactInfo', function($scope) {
	// I would normally use $http.get to access json from server but 
	// in interest of showing work I listed it here
	$scope.contact = {
		Name : "John Doe",
		Phone : "(555) 555-5555",
		Email : "johndoe@example.com"
	};

	$scope.objective = {
		objective : "Excel in a web developer career"
	};

	$scope.skills = {
		development: [
			"HTML5",
			"Javascript",
			"Bootstrap",
			"AngularJS",
			"ReactJS",
			"CSS3",
			"Media Queries",
			"Development",
		],
		projectManagement: [
			"JIRA",
			"Bitbucket",
			"Confluence",
			"Git",
			"Github"
		]
	};

	$scope.employment = {
		jobs: [
			{Title: "Junior Web Developer",
		 	 Company: "Apple Inc",
		 	 Dates: "June 2015 to September 2016",
		 	 Responsibilities: [
		 		"Developed responsive corporate websites",
		 		"Did some cool stuff",
		 		"Let team in closing out JIRA bugs"
		 	]},

		 	{Title : "Web Development Intern",
			 Company : "Google Inc.",
		 	 Dates : "January 2015 to May 2015",
		 	 Responsibilities : [
		 		"Went on coffee runs for the team",
		 		"Team record for longest keg stand",
		 		"Once at 82 cupcakes during a team building event"
		 	]}
		]
	}

	$scope.education = {
		education: {
			Degree: "BBA",
			School: "Michigan State University",
			GPA: "2.2",
			Major: "Computer Science",
			Minor: "Philosophy"
		}
	}
});

