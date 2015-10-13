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
	var thisWeekStartDay = this.getAttribute("weekstart", "Monday");
	var thisConfiguration = this.getAttribute("configuration");
	var thisConfigurationTiddlerTitle = "$:/data/plugins/inmysocks/Calendar/Custom Configuration/";

	thisConfigurationTiddlerTitle = thisConfigurationTiddlerTitle + thisConfiguration;

	var badYear,
		isLeap = 0,
		numDays,
		calendarString,
		thisMonthNum,
		dayOfTheWeek,
		headingClasses,
		dayClasses,
		specialDate = 0;

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
		
		//Set if the week starts on Monday or Sunday.
		//The javascript date object has Sunday set as day 0, if the week starts on Monday this needs to be shifted.
		if (thisWeekStartDay === "Sunday") {
			dayOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			headingClasses = ["calendar_sunday_heading_class", "calendar_monday_heading_class", "calendar_tuesday_heading_class", "calendar_wednesday_heading_class", "calendar_thursday_heading_class", "calendar_friday_heading_class", "calendar_saturday_heading_class"];
			dayClasses = ["calendar_sunday_day_class", "calendar_monday_day_class", "calendar_tuesday_day_class", "calendar_wednesday_day_class", "calendar_thursday_day_class", "calendar_friday_day_class", "calendar_saturday_day_class"];
		} else {
			//If it starts on Sunday 0 needs to be changed to 6
			if (startingDay === 0) {
				startingDay = 6;
			} else {
				//Starting day gets moved down by 1 to work when the week starts on Monday
				startingDay--;
			}
			dayOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
			headingClasses = ["calendar_monday_heading_class", "calendar_tuesday_heading_class", "calendar_wednesday_heading_class", "calendar_thursday_heading_class", "calendar_friday_heading_class", "calendar_saturday_heading_class", "calendar_sunday_heading_class"];
			dayClasses = ["calendar_monday_day_class", "calendar_tuesday_day_class", "calendar_wednesday_day_class", "calendar_thursday_day_class", "calendar_friday_day_class", "calendar_saturday_day_class", "calendar_sunday_day_class"];
		}

		if (thisConfigurationTiddlerTitle) {
			var thisConfigurationTiddler = this.wiki.getTiddler(thisConfigurationTiddlerTitle);
			if (thisConfigurationTiddler) {
				//Build the calendar theme.
				var thisThemeTiddler = thisConfigurationTiddler.getFieldString("theme_tiddler");
				var themeTiddler = this.wiki.getTiddler(thisThemeTiddler);
				//Get classes for each thing.
				var customHeadingClasses = ['','','','','','',''],
					customDayClasses = ['','','','','','',''],
					customTableClass = '',
					customNormalWeekendClass = '',
					customNormalWeekdayClass = '',
					customEmptySpaceClass = '',
					customCalendarHeadingClass = '';
				if(themeTiddler) {
					customTableClass = themeTiddler.getFieldString("calendar_table_class", "''");
					customNormalWeekendClass = themeTiddler.getFieldString("calendar_normal_weekend_class", "''");
					customNormalWeekdayClass = themeTiddler.getFieldString("calendar_normal_weekday_class", "''");
					customCalendarHeadingClass = themeTiddler.getFieldString("calendar_heading_class", "''");
					customEmptySpaceClass = themeTiddler.getFieldString("empty_space_class", "''");
					//This part takes care of the differences between weeks starting on Monday and weeks starting on Sunday.
					customHeadingClasses[0] = themeTiddler.getFieldString(headingClasses[0], "''");
					customHeadingClasses[1] = themeTiddler.getFieldString(headingClasses[1], "''");
					customHeadingClasses[2] = themeTiddler.getFieldString(headingClasses[2], "''");
					customHeadingClasses[3] = themeTiddler.getFieldString(headingClasses[3], "''");
					customHeadingClasses[4] = themeTiddler.getFieldString(headingClasses[4], "''");
					customHeadingClasses[5] = themeTiddler.getFieldString(headingClasses[5], "''");
					customHeadingClasses[6] = themeTiddler.getFieldString(headingClasses[6], "''");
					customDayClasses[0] = themeTiddler.getFieldString(dayClasses[0], "''");
					customDayClasses[1] = themeTiddler.getFieldString(dayClasses[1], "''");
					customDayClasses[2] = themeTiddler.getFieldString(dayClasses[2], "''");
					customDayClasses[3] = themeTiddler.getFieldString(dayClasses[3], "''");
					customDayClasses[4] = themeTiddler.getFieldString(dayClasses[4], "''");
					customDayClasses[5] = themeTiddler.getFieldString(dayClasses[5], "''");
					customDayClasses[6] = themeTiddler.getFieldString(dayClasses[6], "''");
				}

				var specialDates = {},
					dateTypes = {},
					dateTypesArray = [];
				//Get a list of the special date types. It will be from a data tiddler.
				var thisSpecialDateTiddlerTitle = thisConfigurationTiddler.getFieldString("special_date_types_tiddler", "''");
				if (thisSpecialDateTiddlerTitle !== '') {
					//I should also allow custom day macros for special dates. But that is going to come later. It shouldn't be a huge change but I am lazy.
					var dateTypeFilter = "[[" + thisSpecialDateTiddlerTitle + "]tags[]]";
					dateTypesArray = this.wiki.filterTiddlers(dateTypeFilter,this);
					var dateTypes = {};
					for (var i = 0; i < dateTypesArray.length; i++) {
						dateTypes[dateTypesArray[i]] = {};
					}
					//Get information for each date type.
					for (var i = 0; i < dateTypesArray.length; i++) {
						var dateTypeTiddler = this.wiki.getTiddler("$:/data/plugins/inmysocks/Calendar/Special Date Types/".concat(dateTypesArray[i].toString()));
						if (dateTypeTiddler) {
							//Get the css class for the date type.
							dateTypes[dateTypesArray[i]]["cssClass"] = dateTypeTiddler.getFieldString("css_class", "''");
							//Get if the date type uses a tag or field for identification.
							dateTypes[dateTypesArray[i]].tagOrField = dateTypeTiddler.getFieldString("tag_or_field");
							if (dateTypes[dateTypesArray[i]]["tagOrField"] === "Tag") {
								//Get the tag used.
								dateTypes[dateTypesArray[i]]["tagUsed"] = dateTypeTiddler.getFieldString("identifier_tag");
							} else if (dateTypes[dateTypesArray[i]]["tagOrField"] === "Field") {
								//Get the field used.
								dateTypes[dateTypesArray[i]]["fieldUsed"] = dateTypeTiddler.getFieldString("identifier_field_name");
								dateTypes[dateTypesArray[i]]["fieldContents"] = dateTypeTiddler.getFieldString("identifier_field_contents");
							}
						}
					}
					//Get a list of special dates for the current month.
					for (var i = 0; i < dateTypesArray.length; i++) {
						if (dateTypes[dateTypesArray[i]]["tagOrField"] === "Tag") {
							//If the current date type uses a tag.
							var dateFilter = "[tag[" + dateTypes[dateTypesArray[i]]["tagUsed"] + "]month[" + thisMonth + "]year[" + thisYear + "]get[day]]";
							var specialDatesArray = this.wiki.filterTiddlers(dateFilter,this);
							specialDates[dateTypesArray[i]] = specialDatesArray;
						} else if (dateTypes[dateTypesArray[i]]["tagOrField"] === "Field") {
							//If the current date type uses a field.
							var dateFilter = "[" + dateTypes[i]["fieldUsed"] + "[" + dateTypes[dateTypesArray[i]]["fieldContents"] + "]month[" + thisMonth + "]year[" + thisYear + "]get[day]]";
							var specialDatesArray = this.wiki.filterTiddlers(dateFilter,this);
							for (var j = 0; j < specialDatesArray.length; j++) {
								specialDates[dateTypesArray[i]] = specialDatesArray[j];
							}
						}
					}
				}

				//Determine which tiddlers to list in the calendar.
				var pretiddlerList = {};
				var prefilter = false;
				if (prefilter) {
					//Filter the tiddlers using the given filter.
					pretiddlerList = this.wiki.filterTiddlers(filter,this);
				} else {
					pretiddlerList = null;
				}

				//Use the output of the prefilter as the input here. This uses the day, month and year values to put each tiddler in the correct day.
				var tiddlerList = {};
				for (var i = 0; i < numDays; i++) {
					if (true) { //(fieldsAreUsed) {
						//Filter tiddlers using the fields as criteria, move through each day of the month to build the filter
						var filter = "[year[" + thisYear + "]month[" + thisMonth + "]day[" + i + "]]";
						tiddlerList[i] = this.wiki.filterTiddlers(filter,this,pretiddlerList);
					} 
//					else if (tagsAreUsed) {
//						//Make the filter using tags
//						filter = [];
//						tiddlerList{i} = this.wiki.filterTiddlers(filter,this,pretiddlerList);
//					}
				}


				var currentDate = 1;
				//Create the calendar header.
				calendarString = "<table class = " + customTableClass + "><tr class = " + customCalendarHeadingClass + "><th class = " + customHeadingClasses[0] + ">" + dayOfTheWeek[0] + "</th><th class =  " + customHeadingClasses[1] + ">" + dayOfTheWeek[1] + "</th><th class =  " + customHeadingClasses[2] + ">" + dayOfTheWeek[2] + "</th><th class =  " + customHeadingClasses[3] + ">" + dayOfTheWeek[3] + "</th><th class =  " + customHeadingClasses[4] + ">" + dayOfTheWeek[4] + "</th><th class =  " + customHeadingClasses[5] + ">" + dayOfTheWeek[5] + "</th><th class =  " + customHeadingClasses[6] + ">" + dayOfTheWeek[6] + "</th></tr>";
				while(currentDate <= numDays) {
					calendarString = calendarString + "<tr>";
					//Add the next week
					for(var i = 0; i < 7; i++) {
						if((currentDate === 1 && i < startingDay) || (currentDate > numDays && i < 7)) {
							//If the location in the calendar is either before the start of the month or after the last day of the month add an empty block.
							calendarString = calendarString + "<td class = " + customEmptySpaceClass + "></td>";
						} else if(currentDate <= numDays) {
							if (dateTypesArray.length !== 0) {
								//Iterate through each special date type.
								for (var j = 0; j < dateTypesArray.length; j++) {
									//Check if the current date is listed as the current date type.
									if (specialDates[dateTypesArray[j]] && specialDates[dateTypesArray[j]].indexOf(currentDate.toString()) !== -1 && specialDate !== 1) {
										//Check if the day is a week day or weekend.
										if ((thisWeekStartDay === "Monday" && (i === 5 || i === 6)) || (thisWeekStartDay === "Sunday" && (i === 0 || i === 6))) {
											//Add the day with the appropriate class.
											calendarString = calendarString + "<td class = " + customNormalWeekendClass + "><div class = '" + customDayClasses[i] + "' style='height:100%;width:100%'><div class = '" + dateTypes[dateTypesArray[j]].cssClass + "' style='height:100%;width:100%'><$macrocall $name='" + thisDayMacro + "' day=" + currentDate + " month=" + thisMonthNum + " year=" + thisYear + " dayOfTheWeek=" + i + "/></div></div></td>";
										} else {
											calendarString = calendarString + "<td class = " + customNormalWeekdayClass + "><div class = '" + customDayClasses[i] + "' style='height:100%;width:100%'><div class = '" + dateTypes[dateTypesArray[j]].cssClass + "' style='height:100%;width:100%'><$macrocall $name='" + thisDayMacro + "' day=" + currentDate + " month=" + thisMonthNum + " year=" + thisYear + " dayOfTheWeek=" + i + "/></div></div></td>";
										}
										specialDate = 1;
									}
								}
							} 
							if (specialDate !== 1) {
								//Add the day as a normal day, checking if it is a weekday or weekend and using the appropriate class.
								if ((thisWeekStartDay === "Monday" && (i === 5 || i === 6)) || (thisWeekStartDay === "Sunday" && (i === 0 || i === 6))) {
									//Use the weekend class if it is a weekend day.
									calendarString = calendarString + "<td class = '" +  customNormalWeekendClass + "'><div class = '" + customDayClasses[i] + "' style='height:100%;width:100%'><$macrocall $name='" + thisDayMacro + "' day=" + currentDate + " month=" + thisMonthNum + " year=" + thisYear + " dayOfTheWeek=" + i + "/></div></td>";
								} else {
									//Otherwise use the normal weekday class.
									calendarString = calendarString + "<td class = '" + customNormalWeekdayClass + "'><div class = '" + customDayClasses[i] + "' style='height:100%;width:100%'><$macrocall $name='" + thisDayMacro + "' day=" + currentDate + " month=" + thisMonthNum + " year=" + thisYear + " dayOfTheWeek=" + i + "/></div></td>";
								}
							}
							//Increment the current date.
							currentDate++;
							specialDate = 0;
						}
					}
					//End the row.
					calendarString = calendarString + "</tr>";
				}
				//End the table.
				calendarString = calendarString + "</table>";
			} else {
				calendarString = "Invalid configuration tiddler given.";
			}
		} else {
			//Make the first week, adding empty days to the front as needed.
			var currentDate = 1;
			calendarString = "<table class = calendar_table_class><tr class = calendar_heading_class><th class = " + headingClasses[0] + ">" + dayOfTheWeek[0] + "</th><th class =  " + headingClasses[1] + ">" + dayOfTheWeek[1] + "</th><th class =  " + headingClasses[2] + ">" + dayOfTheWeek[2] + "</th><th class =  " + headingClasses[3] + ">" + dayOfTheWeek[3] + "</th><th class =  " + headingClasses[4] + ">" + dayOfTheWeek[4] + "</th><th class =  " + headingClasses[5] + ">" + dayOfTheWeek[5] + "</th><th class =  " + headingClasses[6] + ">" + dayOfTheWeek[6] + "</th></tr>";
			while(currentDate <= numDays) {
				calendarString = calendarString + "<tr>";
				for(var i = 0; i < 7; i++) {
					if((currentDate === 1 && i < startingDay) || (currentDate > numDays && i < 7)) {
						//If the current location in the calendar is either before the 1st or after the last day of the month add an empty block.
						calendarString = calendarString + "<td class = empty_space_class></td>";
					} else if(currentDate <= numDays) {
						//Add the day as a normal day, checking if it is a weekday or weekend and using the appropriate class.
						if ((thisWeekStartDay === "Monday" && (i === 5 || i === 6)) || (thisWeekStartDay === "Sunday" && (i === 0 || i === 6))) {
							//Use the weekend class if it is a weekend day.
							calendarString = calendarString + "<td class = 'calendar_normal_weekend_class'><div class = '" + dayClasses[i] + "' style='height:100%;width:100%'><$macrocall $name='" + thisDayMacro + "' day=" + currentDate + " month=" + thisMonthNum + " year=" + thisYear + " dayOfTheWeek=" + i + "/></div></td>";
						} else {
							//Otherwise use the normal weekday class.
							calendarString = calendarString + "<td class = 'calendar_normal_weekday_class'><div class = '" + dayClasses[i] + "' style='height:100%;width:100%'><$macrocall $name='" + thisDayMacro + "' day=" + currentDate + " month=" + thisMonthNum + " year=" + thisYear + " dayOfTheWeek=" + i + "/></div></td>";
						}
						//Increment the current date.
						currentDate++;
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
	}
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
Calendar.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["month"] || changedAttributes["year"] || changedAttributes["day_macro"] || changedAttributes["class"] || changedAttributes["weekstart"] || changedAttributes["configuration"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

exports["calendar-month"] = Calendar;

})();