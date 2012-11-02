var dayList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var monthList = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];    

var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();
var previousMonth = currentMonth-1;
var nextMonth = currentMonth+1;
var currentDate = new Date().getDate();
var currentDay = new Date().getDate();
var firstDayOfMonth = new Date(currentYear,currentMonth).getDay(0);
var lastDateOfMonth = new Date(currentYear, currentMonth+1, 0).getDate();   
var monthSelector = "";
var calendarData = {};

$(document).ready(function(){
    createCalendar();
    $('.changeMonth').live('click', function(){
        changeMonth($(this).attr('id'));
    });
});

function createCalendar(){
    $('#calendar').append('<div id="header"></div>');
    $('#calendar').append('<div id="month"></div>');

    var counter = 1;
    if(lastDateOfMonth+firstDayOfMonth>35)
        blocks = 42;
    else if (lastDateOfMonth+firstDayOfMonth<29)
        blocks = 28;
    else 
        blocks = 35;
    for(var i=0; i<blocks; i++){
        //setup the header with list of days
        if(i==0){
            $('#header').append('<p class="months"><span id="prevMonth" class="changeMonth">'+monthList[previousMonth]+'</span><span id="currentMonth">'+monthList[currentMonth]+' '+currentYear+'</span><span id="nextMonth" class="changeMonth">'+monthList[nextMonth]+'</span></p><br/>');
        }
        if(i<7){
            $('#header').append('<div class="dayName"><p>'+dayList[i]+'</p></div>');
        }            
        //create a box for each day within the #month div
        if(i<firstDayOfMonth){
            $('#month').append('<div class="empty"></div>');
        }
        else if(i>lastDateOfMonth+firstDayOfMonth-1){
            $('#month').append('<div class="empty"></div>');
        }
        else{
            $('#month').append('<div id="'+counter+'"class="dayBox"><span class="date">'+counter+'</span></div>');        
            counter++;
        }
        //clear div to stretch out background
        if(i==blocks-1){
            $('#month').append('<div class="clear"></div>');
        }            
    }

    $('#header').append('<div id="createEvent"></div>');
    $('#createEvent').css('display', 'none');
    
    //change bg for current date
    if(currentYear == new Date().getFullYear() && currentMonth == new Date().getMonth()){
        $('#'+currentDay+'').css({
            backgroundColor : '#DDEDF0'
        });
    }     
    
    // when we hover over a dayBox
    $('.dayBox').hover(
        function(){
            $(this).css({borderColor:'#ccc',
            boxShadow: 'none'})
        }, 
        function(){
            $(this).css({borderColor:'#ccc',
            boxShadow: '#ddd 2px 2px'})
        }
    );        

    //display calender after it's built
    $('#calendar').css('display', 'block');      
}

function changeMonth(id){
    if(id == "prevMonth"){
        if(currentMonth == 0){ 
            currentMonth = 11;
            currentYear = currentYear-1; 
        }
        else{            
         currentMonth = currentMonth-1;
        }

        if(currentMonth==0)
            previousMonth = 11;
        else{          
            previousMonth = currentMonth-1;
        }

        if(currentMonth==11){
            nextMonth = 0;
        }
        else{
            nextMonth = currentMonth+1;
        }

        firstDayOfMonth = new Date(currentYear,currentMonth).getDay(1);
        lastDateOfMonth = new Date(currentYear, currentMonth-1, 0).getDate();    
        monthSelector = currentYear+'-'+(new Date(currentYear,currentMonth).getMonth());
        $('#calendar').html('');
        createCalendar();
    }

    if(id == "nextMonth"){
        if(currentMonth == 11){ 
            currentMonth = 0;
            currentYear = currentYear+1; 
        }
        else{            
            currentMonth = currentMonth+1;
        }

        if(currentMonth==11)
            nextMonth = 0;
        else{          
            nextMonth = currentMonth+1;
        }

        if(currentMonth==0){
            previousMonth = 11;
        }
        else{
            previousMonth = currentMonth-1;
        }

        firstDayOfMonth = new Date(currentYear,currentMonth).getDay(1);
        lastDateOfMonth = new Date(currentYear, currentMonth+1, 0).getDate();    
        monthSelector = currentYear+'-'+(new Date(currentYear,currentMonth).getMonth());
        $('#calendar').html('');
        createCalendar();
    }
}