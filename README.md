# TW5-Calendar

To see this plugin in use you can see it on my page [[here|http://ooktech.com/jed/externalbrain/#Blog%20Archives]]

This plugin has:

*The calendar-month widget
*Default css class for the calendar month widget
*Default macro for calendar days
*This readme

!The calendar-month widget

Usage: `<$calendar-month year=YYYY month=MM day_macro=someMacro class=someCSSClass/>`

Content of the `<$calendar-month>` widget is ignored.

|!Attribute |!Description |
|year |The year that the month displayed is from. It must be in 4 digit YYYY format and has no default value. |
|month |The month to display. See list below for valid month values. month has no default value. |
|day_macro |(optional) The macro that defines the content of each calendar day. It is passed the parameter `day` with the value of the current day of the month. Defaluts to `CalendarListDailyThings` defined in [[Calendar Default Macros|$:/plugins/inmysocks/Calendar/Calendar Default Macros]] |
|class |(optional) A css class to use. Defaults to the class `calendar-table` defined in [[Calendar Table Style|$:/plugins/inmysocks/Calendar/Calendar Table Style]] |

!The default ~CalendarListDailyThings macro

This macro lists any tiddlers that have fields called `day`, `month` and `year` in the matching calendar day. If you click on a cell than a tiddler with a title in the form of (day)-(month)-(year) is opened.

!Month values

This is a complete list of the month values the widget understands, if you want some other format added leave a message at [[my site|http://www.inmysocks.tiddlyspot.com]].:

1
01
Jan
Jan.
January

2
02
Feb
Feb.
February

3
03
Mar
Mar.
March

4
04
Apr
Apr.
April

5
05
May

6
06
Jun
Jun.
June

7
07
Jul
Jul.
July

8
08
Aug
Aug.
August

9
09
Sep
Sep.
Sept
Sept.
September

10
Oct
Oct.
October

11
Nov
Nov.
November

12
Dec
Dec.
December

!Example:

```
Select year: <$select field='year'><$list filter='1990 1991 1992 1993 1994 1995 1996 1997 1998 1999 2000'><option><<currentTiddler>></option></$list></$select>

Select month: <$select field='month'><$list filter='1 2 3 4 5 6 7 8 9 10 11 12'><option><<currentTiddler>></option></$list></$select>

<$calendar-month year={{!!year}} month={{!!month}}/>
```

Select year: <$select field='year'><$list filter='1990 1991 1992 1993 1994 1995 1996 1997 1998 1999 2000'><option><<currentTiddler>></option></$list></$select>

Select month: <$select field='month'><$list filter='1 2 3 4 5 6 7 8 9 10 11 12'><option><<currentTiddler>></option></$list></$select>

<$calendar-month year={{!!year}} month={{!!month}}/>
