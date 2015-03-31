/*\
title: $:/plugins/inmysocks/Calendar/calendar-widget.js
type: application/javascript
module-type: widget

A widget that creates a calendar given a year and month.

\*/

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;
var widgets;
var container;

var Calendar = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
Calendar.prototype = new Widget();

/*
Render this widget into the DOM
*/
Calendar.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	var domNode = this.document.createElement("div");
	parent.insertBefore(domNode,nextSibling);
	domNode.className = this.CalendarCSS;
	this.renderChildren(domNode,null);
	this.domNodes.push(domNode);
};

/*
Compute the internal state of the widget
*/
Calendar.prototype.execute = function() {
	//Get widget attributes.
	var thisMonth = this.getAttribute("month",-1);
	var thisYear = this.getAttribute("year",-1);
	var thisDayMacro = this.getAttribute("day_macro","CalendarListDailyThings");
	var thisCalendarCSS = this.getAttribute("class", "calendar-table");

	var badYear;
	var isLeap = 0;
	var numDays;
	var calendarString;
	var thisMonthNum;

	//Check to make sure a 4 digit year was passed
	if(thisYear/1000 < 1 || thisYear === -1 || isNaN(parseFloat(thisYear))) {
		badYear = 1;
	} else {
		badYear = 0;
	}

	//If it is February, check if the current year is a leap year. Then get the number of days in the current month.
	if(thisMonth === "2" || thisMonth === "02" || thisMonth === "Feb" || thisMonth === "Feb." || thisMonth === "February") {
		isLeap = ((((thisYear % 4) === 0) && (thisYear % 100 !== 0)) || (((thisYear % 100) === 0) && (thisYear % 400) === 0));
	}
	switch (thisMonth){
		case "1": numDays = 31; thisMonthNum = 1; break;
		case "01": numDays = 31; thisMonthNum = 1; break;
		case "Jan": numDays = 31; thisMonthNum = 1; break;
		case "Jan.": numDays = 31; thisMonthNum = 1; break;
		case "January": numDays = 31; thisMonthNum = 1; break;
		case "2": numDays = isLeap ? 29:28; thisMonthNum = 2; break;
		case "02": numDays = isLeap ? 29:28; thisMonthNum = 2; break;
		case "Feb": numDays = isLeap ? 29:28; thisMonthNum = 2; break;
		case "Feb.": numDays = isLeap ? 29:28; thisMonthNum = 2; break;
		case "February": numDays = isLeap ? 29:28; thisMonthNum = 2; break;
		case "3": numDays = 31; thisMonthNum = 3; break;
		case "03": numDays = 31; thisMonthNum = 3; break;
		case "Mar": numDays = 31; thisMonthNum = 3; break;
		case "Mar.": numDays = 31; thisMonthNum = 3; break;
		case "March": numDays = 31; thisMonthNum = 3; break;
		case "4": numDays = 30; thisMonthNum = 4; break;
		case "04": numDays = 30; thisMonthNum = 4; break;
		case "Apr": numDays = 30; thisMonthNum = 4; break;
		case "Apr.": numDays = 30; thisMonthNum = 4; break;
		case "April": numDays = 30; thisMonthNum = 4; break;
		case "5": numDays = 31; thisMonthNum = 5; break;
		case "05": numDays = 31; thisMonthNum = 5; break;
		case "May": numDays = 31; thisMonthNum = 5; break;
		case "6": numDays = 30; thisMonthNum = 6; break;
		case "06": numDays = 30; thisMonthNum = 6; break;
		case "Jun": numDays = 30; thisMonthNum = 6; break;
		case "Jun.": numDays = 30; thisMonthNum = 6; break;
		case "June": numDays = 30; thisMonthNum = 6; break;
		case "7": numDays = 31; thisMonthNum = 7; break;
		case "07": numDays = 31; thisMonthNum = 7; break;
		case "Jul": numDays = 31; thisMonthNum = 7; break;
		case "Jul.": numDays = 31; thisMonthNum = 7; break;
		case "July": numDays = 31; thisMonthNum = 7; break;
		case "8": numDays = 31; thisMonthNum = 8; break;
		case "08": numDays = 31; thisMonthNum = 8; break;
		case "Aug": numDays = 31; thisMonthNum = 8; break;
		case "Aug.": numDays = 31; thisMonthNum = 8; break;
		case "August": numDays = 31; thisMonthNum = 8; break;
		case "9": numDays = 30; thisMonthNum = 9; break;
		case "09": numDays = 30; thisMonthNum = 9; break;
		case "Sep": numDays = 30; thisMonthNum = 9; break;
		case "Sep.": numDays = 30; thisMonthNum = 9; break;
		case "Sept": numDays = 30; thisMonthNum = 9; break;
		case "Sept.": numDays = 30; thisMonthNum = 9; break;
		case "September": numDays = 30; thisMonthNum = 9; break;
		case "10": numDays = 31; thisMonthNum = 10; break;
		case "Oct": numDays = 31; thisMonthNum = 10; break;
		case "Oct.": numDays = 31; thisMonthNum = 10; break;
		case "October": numDays = 31; thisMonthNum = 10; break;
		case "11": numDays = 30; thisMonthNum = 11; break;
		case "Nov": numDays = 30; thisMonthNum = 11; break;
		case "Nov.": numDays = 30; thisMonthNum = 11; break;
		case "November": numDays = 30; thisMonthNum = 11; break;
		case "12": numDays = 31; thisMonthNum = 12; break;
		case "Dec": numDays = 31; thisMonthNum = 12; break;
		case "Dec.": numDays = 31; thisMonthNum = 12; break;
		case "December": numDays = 31; thisMonthNum = 12; break;
		default: numDays = -1;		
	}

	if(badYear === 1 || numDays === -1) {
		//If the input doesn't make sense give an error.
		var parser = this.wiki.parseText("text/vnd.tiddlywiki","Invalid month or year. Years need to be 4 digits, months must be given as a numeric value from 1...12.",{parseAsInline: false});
    	var parseTreeNodes = parser ? parser.tree : [];
		this.CalendarCSS = thisCalendarCSS;
		this.makeChildWidgets(parseTreeNodes);
		this.innerHTML = "Invalid month or year. Years need to be 4 digits, see readme for accepted month names.";
	} else {
		//Get the first of the month to base everything else off of.
		var firstDate = new Date(thisYear,thisMonthNum-1,1);
		var startingDay = firstDate.getDay();
		
		//Make the first week, adding empty days to the front as needed.
		var currentDate = 1;
		calendarString = "<table><tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr>";
		while(currentDate <= numDays) {
			calendarString = calendarString + "<tr>";
			for(var i = 0; i < 7; i++) {
				if(currentDate === 1 && i < startingDay) {
					calendarString = calendarString + "<td></td>";
				} else if(currentDate <= numDays) {
					calendarString = calendarString + "<td><$macrocall $name='" + thisDayMacro + "' day=" + currentDate + " month=" + thisMonthNum + " year=" + thisYear + "/></td>";
					currentDate++;
				} if(currentDate > numDays && i < 6) {
					calendarString = calendarString + "<td></td>";
				}
			}
			calendarString = calendarString + "</tr>";
		}
		calendarString = calendarString + "</table>";
	}

	var stringPassed = calendarString;
	var parser = this.wiki.parseText("text/vnd.tiddlywiki",calendarString,{parseAsInline: false});
    var parseTreeNodes = parser ? parser.tree : [];
	this.CalendarCSS = thisCalendarCSS;
	this.makeChildWidgets(parseTreeNodes);
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
Calendar.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["month"] || changedAttributes["year"] || changedAttributes["day_macro"] || changedAttributes["class"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

exports["calendar-month"] = Calendar;

})();